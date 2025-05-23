export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface ColorRegion {
  color: RGB;
  coordinates: { x: number; y: number };
  size: number;       // region prominence (0-1)
  confidence: number; // match score (0-1)
}

export interface ImageColorMap {
  regions: ColorRegion[];
  dominantColors: RGB[];
  imageDimensions: { width: number; height: number };
}

export const COLOR_ANALYSIS_CONFIG = {
  minRegionSize: 0.1,    // 10% of image
  colorTolerance: 15,    // RGB delta
  maxAnalysisTime: 500,  // ms
  fallbackColorMorph: true,
  regionSampling: 'dense' as const,
  maxRegions: 10,       // Maximum number of regions to analyze
  minRegionProminence: 0.1, // Minimum prominence for a region to be considered
};

export const ZOOM_CONFIG = {
  targetZoomLevel: 1.2,
  zoomEasing: 'easeInOut',
  coordinatePrecision: 2,
  minZoomDuration: 800,  // ms
  maxZoomDuration: 1200, // ms
};

/**
 * Calculate color difference using Delta E (CIE76)
 */
export function colorDistance(c1: RGB, c2: RGB): number {
  const lab1 = rgbToLab(c1);
  const lab2 = rgbToLab(c2);
  
  return Math.sqrt(
    Math.pow(lab2.l - lab1.l, 2) +
    Math.pow(lab2.a - lab1.a, 2) +
    Math.pow(lab2.b - lab1.b, 2)
  );
}

/**
 * Convert RGB to LAB color space
 */
function rgbToLab({ r, g, b }: RGB) {
  // First convert to XYZ
  let _r = r / 255;
  let _g = g / 255;
  let _b = b / 255;

  _r = _r > 0.04045 ? Math.pow((_r + 0.055) / 1.055, 2.4) : _r / 12.92;
  _g = _g > 0.04045 ? Math.pow((_g + 0.055) / 1.055, 2.4) : _g / 12.92;
  _b = _b > 0.04045 ? Math.pow((_b + 0.055) / 1.055, 2.4) : _b / 12.92;

  let x = (_r * 0.4124 + _g * 0.3576 + _b * 0.1805) / 0.95047;
  let y = (_r * 0.2126 + _g * 0.7152 + _b * 0.0722) / 1.00000;
  let z = (_r * 0.0193 + _g * 0.1192 + _b * 0.9505) / 1.08883;

  x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
  y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
  z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;

  return {
    l: (116 * y) - 16,
    a: 500 * (x - y),
    b: 200 * (y - z)
  };
}

/**
 * Find best matching color regions between two images
 */
export function findBestColorMatch(
  currentRegions: ColorRegion[],
  nextRegions: ColorRegion[],
  tolerance: number = COLOR_ANALYSIS_CONFIG.colorTolerance
): { currentRegion: ColorRegion; nextRegion: ColorRegion; score: number } | null {
  let bestMatch = null;
  let bestScore = Number.POSITIVE_INFINITY;

  for (const curr of currentRegions) {
    for (const next of nextRegions) {
      const distance = colorDistance(curr.color, next.color);
      const sizeScore = Math.abs(curr.size - next.size) * 0.5; // Weight size difference
      const score = distance + sizeScore;
      
      if (score < bestScore) {
        bestScore = score;
        bestMatch = { currentRegion: curr, nextRegion: next, score };
      }
    }
  }


  // Only return a match if it's within tolerance
  return bestMatch && bestScore <= tolerance ? bestMatch : null;
}

/**
 * Analyze image colors and extract prominent regions
 */
export async function analyzeImageColors(
  image: HTMLImageElement,
  maxRegions: number = COLOR_ANALYSIS_CONFIG.maxRegions
): Promise<ImageColorMap> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Could not get canvas context');
  }

  // Set canvas dimensions to match image
  canvas.width = image.naturalWidth || image.width;
  canvas.height = image.naturalHeight || image.height;
  
  // Draw image to canvas
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  
  // Get image data
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  // Simple color quantization to find dominant colors
  const colorMap = new Map<string, { count: number; r: number; g: number; b: number }>();
  
  // Sample points across the image (every 10th pixel for performance)
  for (let i = 0; i < data.length; i += 40) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // Skip transparent pixels
    if (data[i + 3] < 128) continue;
    
    // Quantize color to reduce the number of unique colors
    const quantR = Math.round(r / 10) * 10;
    const quantG = Math.round(g / 10) * 10;
    const quantB = Math.round(b / 10) * 10;
    const colorKey = `${quantR},${quantG},${quantB}`;
    
    if (colorMap.has(colorKey)) {
      colorMap.get(colorKey)!.count++;
    } else {
      colorMap.set(colorKey, { count: 1, r, g, b });
    }
  }
  
  // Convert to array and sort by count (most common first)
  const sortedColors = Array.from(colorMap.entries())
    .map(([_, { count, r, g, b }]) => ({ color: { r, g, b }, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, maxRegions);
  
  // For each dominant color, find a representative region
  const regions: ColorRegion[] = [];
  
  for (const { color } of sortedColors) {
    // Find the first pixel that matches this color
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      if (Math.abs(r - color.r) < 10 && 
          Math.abs(g - color.g) < 10 && 
          Math.abs(b - color.b) < 10) {
        
        const x = (i / 4) % canvas.width;
        const y = Math.floor((i / 4) / canvas.width);
        
        // Simple region growing to find size of this color region
        const regionSize = 0.1 + Math.random() * 0.2; // Simplified for demo
        
        regions.push({
          color,
          coordinates: { x, y },
          size: regionSize,
          confidence: 0.9 - (regions.length * 0.1) // Slightly decrease confidence for subsequent regions
        });
        
        break;
      }
    }
  }
  
  return {
    regions,
    dominantColors: sortedColors.map(({ color }) => color),
    imageDimensions: { width: canvas.width, height: canvas.height }
  };
}
