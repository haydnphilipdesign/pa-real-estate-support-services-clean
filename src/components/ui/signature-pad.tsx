import React, { useRef, useEffect, useState, useCallback } from 'react'
import { RotateCcw, Check, X } from 'lucide-react'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'

interface SignaturePadProps {
  value?: string
  onChange: (signature: string) => void
  label: string
  required?: boolean
  error?: boolean
  success?: boolean
  disabled?: boolean
  className?: string
}

export function SignaturePad({
  value,
  onChange,
  label,
  required = false,
  error = false,
  success = false,
  disabled = false,
  className
}: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasSignature, setHasSignature] = useState(false)
  const [strokeCount, setStrokeCount] = useState(0)

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * window.devicePixelRatio
    canvas.height = rect.height * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    // Set drawing styles
    ctx.strokeStyle = '#1e293b'
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    // Load existing signature if provided
    if (value) {
      const img = new Image()
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, rect.width, rect.height)
        setHasSignature(true)
        setStrokeCount(1) // Assume existing signature is valid
      }
      img.src = value
    }
  }, [value])

  // Get coordinates relative to canvas
  const getCoordinates = useCallback((event: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const rect = canvas.getBoundingClientRect()
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    }
  }, [])

  // Start drawing
  const startDrawing = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    if (disabled) return
    
    event.preventDefault()
    setIsDrawing(true)

    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const { x, y } = getCoordinates(event.nativeEvent)
    ctx.beginPath()
    ctx.moveTo(x, y)
  }, [disabled, getCoordinates])

  // Draw line
  const draw = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || disabled) return

    event.preventDefault()
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const { x, y } = getCoordinates(event.nativeEvent)
    ctx.lineTo(x, y)
    ctx.stroke()
  }, [isDrawing, disabled, getCoordinates])

  // Stop drawing
  const stopDrawing = useCallback(() => {
    if (!isDrawing) return
    
    setIsDrawing(false)
    setStrokeCount(prev => prev + 1)
    setHasSignature(true)

    // Convert canvas to base64 and notify parent
    const canvas = canvasRef.current
    if (canvas) {
      const dataURL = canvas.toDataURL('image/png')
      onChange(dataURL)
    }
  }, [isDrawing, onChange])

  // Clear signature
  const clearSignature = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasSignature(false)
    setStrokeCount(0)
    onChange('')
  }, [onChange])

  // Validate signature (minimum stroke count)
  const isValidSignature = hasSignature && strokeCount >= 3

  return (
    <div className={cn("space-y-3", className)}>
      {/* Label */}
      <div className="flex items-center justify-between">
        <label className={cn(
          "text-sm font-medium",
          error ? "text-red-600" : success ? "text-green-600" : "text-slate-700"
        )}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        {hasSignature && (
          <div className="flex items-center gap-2">
            {isValidSignature ? (
              <div className="flex items-center gap-1 text-green-600">
                <Check className="w-4 h-4" />
                <span className="text-xs">Valid</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-amber-600">
                <X className="w-4 h-4" />
                <span className="text-xs">Too short</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Signature Canvas */}
      <div className={cn(
        "relative border-2 border-dashed rounded-lg bg-white",
        error ? "border-red-300" : success ? "border-green-300" : "border-slate-300",
        disabled && "opacity-50 cursor-not-allowed"
      )}>
        <canvas
          ref={canvasRef}
          className="w-full h-32 cursor-crosshair touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          style={{ touchAction: 'none' }}
        />
        
        {/* Placeholder text */}
        {!hasSignature && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-slate-400 text-sm">
              {disabled ? 'Signature disabled' : 'Sign here'}
            </p>
          </div>
        )}

        {/* Clear button */}
        {hasSignature && !disabled && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={clearSignature}
            className="absolute top-2 right-2 h-8 w-8 p-0"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Validation message */}
      {hasSignature && !isValidSignature && (
        <p className="text-xs text-amber-600">
          Please provide a more complete signature (minimum 3 strokes)
        </p>
      )}
      
      {error && (
        <p className="text-xs text-red-600">
          Signature is required
        </p>
      )}
      
      {success && isValidSignature && (
        <p className="text-xs text-green-600">
          ✓ Signature captured successfully
        </p>
      )}
    </div>
  )
}
