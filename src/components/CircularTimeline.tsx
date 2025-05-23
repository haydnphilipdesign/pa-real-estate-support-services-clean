// ProfessionalJourneyInfographic.tsx
import React from 'react';
import styled, { keyframes } from 'styled-components';

// Define TypeScript types for the component props
type IconType = 'settings' | 'moneyBag' | 'growth' | 'pieChart' | 'checklist' | 'chart';

interface Step {
  iconType?: IconType;
  title?: string;
  text?: string;
  isArrow?: boolean;
}

interface ProfessionalJourneyInfographicProps {
  mainTitleText?: string;
  subTitleText?: string;
  steps: Step[];
  radius?: number;
  itemWidth?: number;
  itemHeight?: number;
  startAngle?: number;
  sweepAngle?: number;
}

interface PlaceholderIconProps {
  color?: string;
  type?: IconType;
}

// --- Placeholder Icons (from the first example, matching the "TEXT HERE" style) ---
const PlaceholderIcon: React.FC<PlaceholderIconProps> = ({ color = '#555', type = 'chart' }) => {
  if (type === 'settings') {
    return (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
      </svg>
    );
  }
  if (type === 'moneyBag') {
    return (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1-12 0c0-2.5.8-5 4-6"></path>
        <path d="M12 14a6 6 0 0 0-6-6h0"></path>
        <path d="M12 22L12 8"></path>
        <path d="M16 12h.01"></path>
        <path d="M19 15h.01"></path>
        <path d="M20 18h.01"></path>
        <path d="M18 8L18 6"></path>
        <path d="M21 8L21 6"></path>
      </svg>
    );
  }
   if (type === 'growth') { // A simple bar chart icon
    return (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"></line>
        <line x1="12" y1="20" x2="12" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="14"></line>
      </svg>
    );
  }
  if (type === 'pieChart') { // Placeholder for a pie chart type
     return (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.21 15.89A10 10 0 1 1 8.11 2.79"></path>
        <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
      </svg>
    );
  }
  if (type === 'checklist') { // Placeholder for checklist
    return (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 22L16 10"></path>
        <path d="M10 22L10 4"></path>
        <path d="M15 4l-3 3-3-3"></path>
        <path d="M9 20l3-3 3 3"></path>
        <path d="M20 16.58A5 5 0 0 0 18 7"></path>
        <path d="M4 16.58A5 5 0 0 1 6 7"></path>
      </svg>
    );
  }
  // Default chart icon (used as a generic placeholder)
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
    </svg>
  );
};
// --- End Placeholder Icons ---


const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const InfographicContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 600px;
  padding: 40px;
  font-family: 'Arial', sans-serif;
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
  className: 'circular-timeline-container';
`;

const PathWrapper = styled.div<{ radius: number; itemWidth: number; itemHeight: number }>`
  position: relative;
  width: ${props => props.radius * 2 + props.itemWidth}px;
  height: ${props => props.radius * 2 + props.itemHeight}px;
`;

const CentralTextContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 10;
  animation: ${fadeIn} 0.8s ease-out;
`;

const MainTitle = styled.h1`
  font-size: clamp(2rem, 5vw, 3.5rem);
  color: #6A0DAD;
  margin: 0 0 10px 0;
  font-weight: bold;
  text-shadow:
    -1px -1px 0 #000,
     1px -1px 0 #000,
    -1px  1px 0 #000,
     1px  1px 0 #000;
`;

const SubTitle = styled.p`
  font-size: clamp(0.9rem, 2.5vw, 1.2rem);
  color: #333;
  margin: 0;
  max-width: 350px;
  line-height: 1.4;
`;

interface SegmentProps {
  angle: number;
  radius: number;
  itemWidth: number;
  itemHeight: number;
  index: number;
  accentColor?: string;
}

const Segment = styled.div<SegmentProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${props => props.itemWidth}px;
  height: ${props => props.itemHeight}px;
  margin-left: ${props => -props.itemWidth / 2}px;
  margin-top: ${props => -props.itemHeight / 2}px;

  background-color: white;
  border: 2px solid black;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  border-radius: 15px 15px 0 0; // Rounded top corners for fan shape

  &::before {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    right: 3px;
    bottom: 3px;
    border-radius: 12px 12px 0 0; // Slightly smaller radius for inner fan border
    border: 4px solid ${props => props.accentColor || '#6A0DAD'};
    box-sizing: border-box;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 15px 10px 10px 10px;
  text-align: center;
  box-sizing: border-box;
  transform-origin: center center;
  transform: ${props => `
    rotate(${props.angle}deg)
    translateY(${-props.radius}px)
    rotate(${-props.angle}deg)
  `};
  animation: ${fadeIn} 0.5s ease-out backwards;
  animation-delay: ${props => props.index * 0.1}s;

  > * {
    position: relative;
    z-index: 1;
  }
`;

const SegmentIcon = styled.div`
  margin-bottom: 8px;
  svg {
    width: 30px;
    height: 30px;
  }
`;

const SegmentTitle = styled.h3`
  font-size: 0.75rem;
  color: #333;
  margin: 0 0 5px 0;
  font-weight: bold;
`;

const SegmentText = styled.p`
  font-size: 0.65rem;
  color: #555;
  margin: 0;
  line-height: 1.3;
`;

const ArrowSegment = styled(Segment)`
  background-color: transparent;
  border: none;
  box-shadow: none;
  padding: 0;
  align-items: center;
  justify-content: center;

  &::before {
    display: none;
  }

  div {
    width: 0;
    height: 0;
    border-left: ${props => props.itemWidth / 2.8}px solid transparent; // Adjusted for better arrow shape
    border-right: ${props => props.itemWidth / 2.8}px solid transparent;
    border-bottom: ${props => props.itemHeight / 1.8}px solid #0000CD; // Medium Blue
    transform: translateY(${props => -props.itemHeight / 10}px); // Push it slightly more "up"
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
`;

const ProfessionalJourneyInfographic: React.FC<ProfessionalJourneyInfographicProps> = ({
  mainTitleText = "Professional Journey",
  subTitleText = "My path to becoming your dedicated real estate transaction coordinator",
  steps = [],
  radius = 250,
  itemWidth = 110,  // Slightly narrower for fan shape
  itemHeight = 120, // Standard height
  startAngle = -125, // Start top-left-ish for "backwards C"
  sweepAngle = 290  // Total angle covered by items (leaves a gap)
}) => {

  // If steps.length is 1, angleIncrement becomes problematic with (steps.length - 1)
  const angleIncrement = steps.length > 1 ? sweepAngle / (steps.length - 1) : 0;

  return (
    <InfographicContainer className="circular-timeline-container">
      <PathWrapper radius={radius} itemWidth={itemWidth} itemHeight={itemHeight}>
        <CentralTextContainer>
          <MainTitle>{mainTitleText}</MainTitle>
          <SubTitle>{subTitleText}</SubTitle>
        </CentralTextContainer>

        {steps.map((step, index) => {
          const currentAngle = startAngle + (index * angleIncrement);
          // Blue for even index (0, 2, ...), Purple for odd index (1, 3, ...)
          const accentColor = index % 2 === 0 ? '#0000CD' : '#6A0DAD';

          if (step.isArrow) {
            return (
              <ArrowSegment
                key={index}
                index={index}
                angle={currentAngle}
                radius={radius}
                itemWidth={itemWidth * 0.8} // Arrow can be slightly narrower
                itemHeight={itemHeight * 0.8} // Arrow can be slightly shorter
              >
                <div />
              </ArrowSegment>
            );
          }

          return (
            <Segment
              key={index}
              index={index}
              angle={currentAngle}
              radius={radius}
              itemWidth={itemWidth}
              itemHeight={itemHeight}
              accentColor={accentColor}
            >
              <SegmentIcon>
                <PlaceholderIcon type={step.iconType} color={accentColor} />
              </SegmentIcon>
              <SegmentTitle>{step.title || "TEXT HERE"}</SegmentTitle>
              <SegmentText>
                {step.text || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor."}
              </SegmentText>
            </Segment>
          );
        })}
      </PathWrapper>
    </InfographicContainer>
  );
};

export default ProfessionalJourneyInfographic;

// --- How to use it in another component (e.g., App.js) ---
/*
import ProfessionalJourneyInfographic from './ProfessionalJourneyInfographic';

// 9 Slices: 8 content + 1 arrow
const journeyStepsData = [
  { iconType: 'growth', title: 'TEXT HERE', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { iconType: 'settings', title: 'TEXT HERE', text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna.' },
  { iconType: 'pieChart', title: 'TEXT HERE', text: 'Ut enim ad minim veniam, quis nostrud exercitation.' },
  { iconType: 'checklist', title: 'TEXT HERE', text: 'Duis aute irure dolor in reprehenderit in voluptate velit.' },
  { iconType: 'chart', title: 'TEXT HERE', text: 'Excepteur sint occaecat cupidatat non proident.' },
  { iconType: 'settings', title: 'TEXT HERE', text: 'Sunt in culpa qui officia deserunt mollit anim id est laborum.' },
  { iconType: 'moneyBag', title: 'TEXT HERE', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { iconType: 'growth', title: 'TEXT HERE', text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna.' },
  { isArrow: true } // The 9th item is the arrow
];


function App() {
  return (
    <div className="App">
      <ProfessionalJourneyInfographic
        steps={journeyStepsData}
        radius={280}        // Adjust as needed
        itemWidth={110}     // Width of each fan segment
        itemHeight={130}    // Height of each fan segment
        startAngle={-130}   // Start position for the first segment
        sweepAngle={300}    // How far around the items go, for a "C" shape
      />
    </div>
  );
}

export default App;
*/