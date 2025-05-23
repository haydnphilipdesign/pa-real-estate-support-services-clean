import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Book,
  Building,
  TrendingUp,
  Handshake,
  ChevronDown
} from "lucide-react";

interface TimelineEvent {
  id: number;
  title: string;
  institution: string;
  date: string;
  description: string[];
  category: string;
  icon: React.ElementType;
  color: string;
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
    icon: GraduationCap,
    color: "#7a2046", // Rich purple
  },
  {
    id: 2,
    title: "Closing Administrator at",
    institution: "Associates Abstract, Inc.",
    date: "1985-1989",
    description: [
      "Oversaw real estate closings and managed legal documentation.",
      "Collaborated with attorneys to ensure transaction accuracy.",
      "Developed streamlined processes for efficient transaction handling."
    ],
    category: "Early Career",
    icon: Briefcase,
    color: "#75592d", // Warm brown
  },
  {
    id: 3,
    title: "Office Manager at",
    institution: "MAC Mortgage Co., Inc.",
    date: "1989-1991",
    description: [
      "Managed daily mortgage operations and workflows efficiently.",
      "Strengthened client relationships through personalized service.",
      "Implemented systems to improve organizational efficiency."
    ],
    category: "Mortgage Industry",
    icon: Building,
    color: "#688e26", // Avocado green
  },
  {
    id: 4,
    title: "Bookkeeper/Secretary at",
    institution: "John C. Ernst Company",
    date: "1998-2000",
    description: [
      "Maintained financial records and legal documentation.",
      "Organized systems to support company operations.",
      "Ensured accuracy in bookkeeping and administrative processes."
    ],
    category: "Corporate Role",
    icon: Briefcase,
    color: "#8e7a1b", // Gold
  },
  {
    id: 5,
    title: "Executive Assistant and VP at",
    institution: "Homes of Distinction, Inc.",
    date: "2000-2005",
    description: [
      "Reported directly to renowned developer Michael Berardi.",
      "Oversaw real estate projects and client relations.",
      "Enhanced operations and strengthened industry partnerships.",
      "Managed communications and executive-level strategic initiatives."
    ],
    category: "Real Estate Development",
    icon: Building,
    color: "#d48910", // Burnt orange
  },
  {
    id: 6,
    title: "Obtained PA Real Estate License from",
    institution: "Pocono Real Estate Academy",
    date: "2005",
    description: [
      "Earned Pennsylvania real estate certification and licensure.",
      "Learned state regulations and advanced transaction skills.",
      "Developed expertise in market analysis and client relations."
    ],
    category: "Professional Growth",
    icon: Book,
    color: "#5889b0", // Sky blue
  },
  {
    id: 7,
    title: "Closing Administrator at",
    institution: "Fidelity Home Abstract, Inc.",
    date: "2005-2006",
    description: [
      "Handled closings and ensured title compliance.",
      "Reviewed title procedures for accuracy and completion.",
      "Coordinated transactions in alignment with legal standards."
    ],
    category: "Title Industry",
    icon: Briefcase,
    color: "#3682b1", // Celestial blue
  },
  {
    id: 8,
    title: "Transaction Coordinator/Compliance Review Officer for",
    institution: "Bob Hay, Broker for Keller Williams",
    date: "2006-2013",
    description: [
      "Streamlined processes and coordinated real estate transactions.",
      "Reviewed contracts for compliance with industry standards.",
      "Developed systems to improve transaction oversight and compliance."
    ],
    category: "Real Estate Brokerage",
    icon: Handshake,
    color: "#ba2c73", // Magenta
  },
  {
    id: 9,
    title: "Owner/President of",
    institution: 'PA Real Estate Support Services',
    date: "2013-Present",
    description: [
      "Provided strong leadership in real estate transaction support and management.",
      "Managed business operations and client success strategies.",
      "Oversaw transaction processes and ensured client satisfaction."
    ],
    category: "Independent Transaction Coordinator",
    icon: TrendingUp,
    color: "#a15670", // Wine
  },
];

// Timeline event card component
const TimelineCard: React.FC<{
  event: TimelineEvent;
  index: number;
  isExpanded: boolean;
  toggleExpand: () => void;
  isLastItem: boolean;
}> = ({ event, index, isExpanded, toggleExpand, isLastItem }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.25 });
  const Icon = event.icon;

  // Determine if card should be on the left or right side
  const isLeft = index % 2 === 0;

  return (
    <div className={`timeline-point ${isLeft ? 'timeline-left' : 'timeline-right'}`} ref={cardRef}>
      {/* Dot on the timeline */}
      <div className="timeline-dot" style={{ backgroundColor: event.color }}></div>

      {/* Connecting line from timeline to card */}
      <div
        className="timeline-connector"
        style={{ backgroundColor: `linear-gradient(${isLeft ? 'to right' : 'to left'}, ${event.color}00, ${event.color}bb)` }}
      ></div>

      {/* Year circle */}
      <motion.div
        className="timeline-year-circle"
        style={{
          backgroundColor: event.color,
          boxShadow: `0 0 20px ${event.color}80`
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onClick={toggleExpand}
      >
        <span className="text-white font-bold">{event.date.split('-')[0]}</span>
      </motion.div>

      {/* Timeline card */}
      <motion.div
        className="timeline-card"
        style={{
          background: `linear-gradient(135deg, ${event.color}30, ${event.color}15)`,
          borderLeft: isLeft ? 'none' : `4px solid ${event.color}`,
          borderRight: isLeft ? `4px solid ${event.color}` : 'none',
          borderTop: `1px solid rgba(255, 255, 255, 0.1)`,
          borderBottom: `1px solid rgba(255, 255, 255, 0.1)`,
        }}
        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -30 : 30 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="timeline-card-content">
          <h3 className="font-bold text-white text-xl mb-1 flex items-center gap-2">
            <Icon className="w-5 h-5" style={{ color: event.color }} />
            <span>{event.title}</span>
          </h3>
          <h4 className="text-white/80 font-medium mb-2">{event.institution}</h4>
          <p className="text-white/60 text-sm mb-3">{event.date}</p>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ul className="space-y-2 mb-4 text-sm">
                  {event.description.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="mr-2 mt-1">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: event.color }} />
                      </div>
                      <p className="text-white/80">{item}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={toggleExpand}
            className="text-white/60 text-sm flex items-center hover:text-white transition-colors"
          >
            <span>{isExpanded ? "Show less" : "Learn more"}</span>
            <ChevronDown
              className={`w-4 h-4 ml-1 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const ModernTimeline: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // For mobile view
  const [visibleEventIndex, setVisibleEventIndex] = useState(0);
  const showNextEvent = () => {
    setVisibleEventIndex((prev) => Math.min(prev + 1, events.length - 1));
  };
  const showPrevEvent = () => {
    setVisibleEventIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="timeline-container relative py-12 px-4">
      {/* Vertical center line */}
      <div className="timeline-line"></div>

      {/* Desktop Timeline */}
      <div className="hidden md:block">
        {events.map((event, index) => (
          <TimelineCard
            key={event.id}
            event={event}
            index={index}
            isExpanded={expandedId === event.id}
            toggleExpand={() => toggleExpand(event.id)}
            isLastItem={index === events.length - 1}
          />
        ))}
      </div>

      {/* Mobile Timeline */}
      <div className="md:hidden">
        {events.map((event, index) => (
          <div
            key={event.id}
            style={{ display: index === visibleEventIndex ? 'block' : 'none' }}
          >
            <TimelineCard
              event={event}
              index={index}
              isExpanded={true}
              toggleExpand={() => {}}
              isLastItem={index === events.length - 1}
            />
          </div>
        ))}

        {/* Mobile navigation controls */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={showPrevEvent}
            disabled={visibleEventIndex === 0}
            className={`px-4 py-2 rounded-full text-white text-sm flex items-center ${
              visibleEventIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10'
            }`}
          >
            <ChevronDown className="w-4 h-4 mr-1 rotate-90" />
            <span>Previous</span>
          </button>

          <div className="text-white/60 text-sm">
            {visibleEventIndex + 1} / {events.length}
          </div>

          <button
            onClick={showNextEvent}
            disabled={visibleEventIndex === events.length - 1}
            className={`px-4 py-2 rounded-full text-white text-sm flex items-center ${
              visibleEventIndex === events.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10'
            }`}
          >
            <span>Next</span>
            <ChevronDown className="w-4 h-4 ml-1 -rotate-90" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModernTimeline;