import React from "react";
import { Chrono } from "react-chrono";
import {
  FaGraduationCap,
  FaBriefcase,
  FaBook,
  FaBuilding,
  FaChartLine,
  FaHandshake,
} from "react-icons/fa";
import { ensureCssImported } from './FixedCssImport';

// Ensure CSS is imported
ensureCssImported();

interface TimelineEvent {
  id: number;
  title: string;
  institution: string;
  date: string;
  description: string[];
  category: string;
  icon: JSX.Element;
  color: {
    bg: string;
    bgLight: string;
    texthover: string;
    boxShadow: string;
  };
}

const events: TimelineEvent[] = [
  {
    id: 1,
    title: "Graduated from",
    institution: "Kittatinny Regional HS",
    date: "1984",
    description: [
      "Developed business foundations and administrative skills.",
      "Learned effective time management and organizational skills.",
      "Built a strong academic and practical foundation for future endeavors."
    ],
    category: "Education",
    icon: <FaGraduationCap size={24} />,
    color: {
      bg: "#7a2046", // Brighter purple
      bgLight: "#c43975",
      texthover: "#FFF",
      boxShadow: "rgba(122, 32, 70, 0.48)",
    }
  },
  {
    id: 2,
    title: "Closing Administrator",
    institution: "Associates Abstract, Inc.",
    date: "1985-1989",
    description: [
      "Oversaw real estate closings and managed legal documentation.",
      "Collaborated with attorneys to ensure transaction accuracy.",
      "Developed streamlined processes for efficient transaction handling."
    ],
    category: "Early Career",
    icon: <FaBriefcase size={24} />,
    color: {
      bg: "#75592d", // Lighter Field Drab
      bgLight: "#aa8347",
      texthover: "#FFF",
      boxShadow: "rgba(117, 89, 45, 0.48)",
    }
  },
  {
    id: 3,
    title: "Office Manager",
    institution: "MAC Mortgage Co., Inc.",
    date: "1989-1991",
    description: [
      "Managed daily mortgage operations and workflows efficiently.",
      "Strengthened client relationships through personalized service.",
      "Implemented systems to improve organizational efficiency."
    ],
    category: "Mortgage Industry",
    icon: <FaBuilding size={24} />,
    color: {
      bg: "#688e26", // Avocado
      bgLight: "#8dc133",
      texthover: "#FFF",
      boxShadow: "rgba(104, 142, 38, 0.48)",
    }
  },
  {
    id: 4,
    title: "Bookkeeper/Secretary",
    institution: "John C. Ernst Company",
    date: "1998-2000",
    description: [
      "Maintained financial records and legal documentation.",
      "Organized systems to support company operations.",
      "Ensured accuracy in bookkeeping and administrative processes."
    ],
    category: "Corporate Role",
    icon: <FaBriefcase size={24} />,
    color: {
      bg: "#8e7a1b", // Darker Satin Sheen Gold
      bgLight: "#b5a02b",
      texthover: "#FFF",
      boxShadow: "rgba(142, 122, 27, 0.48)",
    }
  },
  {
    id: 5,
    title: "Executive Assistant and VP",
    institution: "Homes of Distinction, Inc.",
    date: "2000-2005",
    description: [
      "Reported directly to renowned developer Michael Berardi.",
      "Oversaw real estate projects and client relations.",
      "Enhanced operations and strengthened industry partnerships.",
      "Managed communications and executive-level strategic initiatives."
    ],
    category: "Real Estate Development",
    icon: <FaBuilding size={24} />,
    color: {
      bg: "#d48910", // Darker Orange (Web)
      bgLight: "#fbb843",
      texthover: "#FFF",
      boxShadow: "rgba(212, 137, 16, 0.48)",
    }
  },
  {
    id: 6,
    title: "PA Real Estate License",
    institution: "Pocono Real Estate Academy",
    date: "2005",
    description: [
      "Earned Pennsylvania real estate certification and licensure.",
      "Learned state regulations and advanced transaction skills.",
      "Developed expertise in market analysis and client relations."
    ],
    category: "Professional Growth",
    icon: <FaBook size={24} />,
    color: {
      bg: "#5889b0", // Darker Sky Blue
      bgLight: "#78a5c8",
      texthover: "#FFF",
      boxShadow: "rgba(88, 137, 176, 0.48)",
    }
  },
  {
    id: 7,
    title: "Closing Administrator",
    institution: "Fidelity Home Abstract, Inc.",
    date: "2005-2006",
    description: [
      "Handled closings and ensured title compliance.",
      "Reviewed title procedures for accuracy and completion.",
      "Coordinated transactions in alignment with legal standards."
    ],
    category: "Title Industry",
    icon: <FaBriefcase size={24} />,
    color: {
      bg: "#3682b1", // Slightly Darker Celestial Blue
      bgLight: "#569ed1",
      texthover: "#FFF",
      boxShadow: "rgba(54, 130, 177, 0.48)",
    }
  },
  {
    id: 8,
    title: "Transaction Coordinator/Compliance Review Officer",
    institution: "For Bob Hay, Broker for Keller Williams",
    date: "2006-2013",
    description: [
      "Streamlined processes and coordinated real estate transactions.",
      "Reviewed contracts for compliance with industry standards.",
      "Developed systems to improve transaction oversight and compliance."
    ],
    category: "Real Estate Brokerage",
    icon: <FaHandshake size={24} />,
    color: {
      bg: "#ba2c73", // Magenta Dye
      bgLight: "#d4498f",
      texthover: "#FFF",
      boxShadow: "rgba(186, 44, 115, 0.48)",
    }
  },
  {
    id: 9,
    title: "Owner/President",
    institution: 'PA Real Estate Support Services',
    date: "2013-Present",
    description: [
      "Provided strong leadership in real estate transaction support and management.",
      "Managed business operations and client success strategies.",
      "Oversaw transaction processes and ensured client satisfaction."
    ],
    category: "Independent Transaction Coordinator",
    icon: <FaChartLine size={24} />,
    color: {
      bg: "#a15670", // Lighter Wine
      bgLight: "#c1798d",
      texthover: "#FFF",
      boxShadow: "rgba(161, 86, 112, 0.48)",
    }
  },
];

// Transform events for react-chrono
const items = events.map(event => ({
  title: event.date,
  cardTitle: `${event.title} ${event.institution}`,
  cardSubtitle: event.category,
  cardDetailedText: event.description.join(' '),
  media: {
    name: event.icon,
    source: {
      type: "svg",
      element: event.icon
    }
  },
  timelineContent: (
    <div
      className="timeline-card-content"
      style={{
        background: `linear-gradient(135deg, ${event.color.bg}, ${event.color.bgLight})`,
        borderRadius: "8px",
        padding: "15px",
        color: event.color.texthover
      }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-full bg-white/20">
          {event.icon}
        </div>
        <h3 className="font-bold text-xl">{event.institution}</h3>
      </div>
      <h4 className="font-medium mb-4">{event.title}</h4>
      <ul className="list-disc pl-5 space-y-1">
        {event.description.map((desc, i) => (
          <li key={i}>{desc}</li>
        ))}
      </ul>
    </div>
  )
}));

const Timeline: React.FC = () => {
  return (
    <div className="min-h-screen py-16 font-['Open Sans']">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Professional Journey</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Three decades of experience in real estate and administrative excellence
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-xl timeline-container">
          <Chrono
            items={items}
            mode="VERTICAL_ALTERNATING"
            theme={{
              primary: "#7a2046",
              secondary: "#ffffff",
              cardBgColor: "rgba(255, 255, 255, 0.05)",
              cardForeColor: "#ffffff",
              titleColor: "#ffffff",
              titleColorActive: "#ffffff",
            }}
            fontSizes={{
              cardSubtitle: '0.85rem',
              cardText: '0.9rem',
              cardTitle: '1.1rem',
              title: '1rem',
            }}
            classNames={{
              card: "timeline-card bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300",
              cardMedia: "timeline-card-media",
              cardSubTitle: "text-white/70 font-medium",
              cardText: "text-white/90",
              cardTitle: "text-white font-bold",
              controls: "timeline-controls",
              title: "timeline-title font-bold px-3 py-1 rounded-full bg-white/10"
            }}
            enableOutline
            scrollable={{ scrollbar: true }}
            timelinePointDimension={20}
            timelinePointShape="circle"
            slideShow
            slideItemDuration={4500}
            cardHeight={300}
          >
            {items.map((item, index) => (
              <div key={index}>
                {item.timelineContent}
              </div>
            ))}
          </Chrono>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
