declare module 'react-chrono' {
  export interface ChronoProps {
    items: any[];
    mode?: 'VERTICAL' | 'HORIZONTAL' | 'VERTICAL_ALTERNATING';
    theme?: {
      primary?: string;
      secondary?: string;
      cardBgColor?: string;
      cardForeColor?: string;
      titleColor?: string;
      titleColorActive?: string;
      [key: string]: any;
    };
    fontSizes?: {
      cardSubtitle?: string;
      cardText?: string;
      cardTitle?: string;
      title?: string;
      [key: string]: any;
    };
    classNames?: {
      card?: string;
      cardMedia?: string;
      cardSubTitle?: string;
      cardText?: string;
      cardTitle?: string;
      controls?: string;
      title?: string;
      [key: string]: any;
    };
    enableOutline?: boolean;
    scrollable?: boolean | { scrollbar?: boolean };
    timelinePointDimension?: number;
    timelinePointShape?: 'circle' | 'square' | 'diamond';
    slideShow?: boolean;
    slideItemDuration?: number;
    slideShowType?: string;
    cardHeight?: number;
    cardWidth?: number;
    disableClickOnCircle?: boolean;
    disableNavOnKey?: boolean;
    hideControls?: boolean;
    highlightCardsOnHover?: boolean;
    lineWidth?: number;
    mediaHeight?: number;
    nestedCardHeight?: number;
    onItemSelected?: (index: number) => void;
    timelineCircleDimension?: number;
    useReadMore?: boolean;
    children?: React.ReactNode;
  }

  export const Chrono: React.FC<ChronoProps>;
}