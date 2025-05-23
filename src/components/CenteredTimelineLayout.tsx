// Filename: CenteredTimelineLayout.tsx
import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Book,
  Building,
  TrendingUp,
  Handshake,
  ChevronsRight
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
    color: "#7a2046" // Rich purple
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
    color: "#75592d" // Warm brown
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
    color: "#688e26" // Avocado green
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
    color: "#8e7a1b" // Gold
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
    color: "#d48910" // Burnt orange
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
    color: "#5889b0" // Sky blue
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
    color: "#3682b1" // Celestial blue
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
    color: "#ba2c73" // Magenta
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
    color: "#a15670" // Wine
  },
];


const CenteredTimelineLayout: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16 lg:py-20 relative text-white" ref={timelineRef}>
      {/* Timeline intro text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 sm:mb-16"
      >
        <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-4">
          My Professional Journey
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Years of Experience & Growth
        </h2>
        <p className="text-xl text-white/80 max-w-3xl mx-auto">
          From education to ownership, discover the path that shaped my expertise in real estate transaction management.
        </p>
      </motion.div>

      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-1 -ml-0.5 bg-white/10 z-0" aria-hidden="true"></div>

        <div className="relative z-10">
          {events.map((event, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={event.id}
                className="mb-24 md:mb-24 last:mb-8 sm:last:mb-12 relative pt-10 sm:pt-0"
                id={`timeline-event-${event.id}`}
              >
                <div className="absolute left-1/2 sm:top-0 top-[-25px] -translate-x-1/2 -translate-y-1/2 z-20">
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-xl font-bold text-lg sm:text-xl relative"
                    style={{
                      backgroundColor: event.color,
                      boxShadow: `0 0 20px ${event.color}60, 0 4px 12px rgba(0, 0, 0, 0.25)`
                    }}
                  >
                    <div className="absolute inset-0 rounded-full bg-black opacity-10" aria-hidden="true"></div>
                    <div className="absolute inset-0 rounded-full border-2 border-white/30" aria-hidden="true"></div>
                    <span className="z-10 text-white font-bold">{event.date.split('-')[0]}</span>
                  </div>
                </div>

                <div className={`flex ${isLeft ? 'justify-end' : 'justify-start'}`}>
                  <motion.div
                    className={`w-full md:w-5/12 ${isLeft ? 'md:mr-10' : 'md:ml-10'}`}
                    initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 50 }}
                  >
                    <div
                      className="rounded-xl overflow-hidden shadow-xl backdrop-blur-sm bg-blue-600/50 border border-white/10 relative"
                      style={{ borderTop: `4px solid ${event.color}`}}
                    >
                      {/* Card header - with proper alignment based on side */}
                      <div className={`p-4 md:p-5 ${isLeft ? 'text-left' : 'sm:text-right text-left'}`}>
                        <div className="flex items-center gap-3 justify-start">
                          {/* Icon always on left for mobile */}
                          <div
                            className="p-2 rounded-full flex-shrink-0 block"
                            style={{ backgroundColor: `${event.color}4D` }}
                          >
                            <event.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                          </div>
                          <div className="w-full">
                            <div className="space-y-1 sm:space-y-0.5 text-left">
                              <h3 className="text-base md:text-lg font-bold text-white leading-tight">
                                {event.title}
                              </h3>
                              <div className="text-white text-sm md:text-base font-medium leading-tight break-words">
                                {event.institution}
                              </div>
                            </div>
                            <p className="text-white/80 text-xs md:text-sm mt-1 text-left">
                              {event.category} ({event.date})
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Description content - always shown */}
                      <div
                        id={`timeline-desc-${event.id}`}
                        className="border-t border-white/20 px-4 md:px-5 py-4 bg-blue-800/70 backdrop-blur-sm rounded-b-xl"
                      >
                        <ul className="space-y-2 mt-1">
                          {event.description.map((item, i) => (
                            <li
                              key={i}
                              className={`flex items-start gap-2 ${isLeft ? 'justify-start' : 'sm:justify-end justify-start'}`}
                            >
                              {/* Always show chevron on left for all items in mobile view */}
                              <ChevronsRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-white" />
                              <span className="text-white text-sm text-left">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CenteredTimelineLayout;