import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ContentCard from './ContentCard';
import PreloadedAnimationWrapper from './PreloadedAnimationWrapper';

const testimonialData = [
  {
    id: 1,
    name: 'Bob Hay',
    role: 'Broker at Keller Williams, Former President of the Pennsylvania Association of Realtors (2008)',
    content: `Debbie has been my transaction coordinator since 2012, and before that, she worked with me as my assistant starting in 2006. I can't say enough good things about her! She is incredibly organized, staying on top of every step and detail to ensure smooth transactions every time.

Debbie's professionalism and pleasant demeanor shine through, even in the most difficult situations, making her an essential part of my team. She is, without a doubt, the best!`,
    image: '/bob-hay.jpg'
  },
  {
    id: 2,
    name: 'Cassie Transue',
    role: 'Keller Williams Realtor',
    content: `I have had the pleasure of working alongside Debbie for the past six years. During this time, she has consistently demonstrated outstanding dedication and skill as a transaction coordinator.

Debbie's meticulous approach to managing details in a fast-paced environment is unmatched and has been instrumental in the growth of my businesses. Running multiple businesses, I rely heavily on precise coordination, and Debbie plays a critical role in ensuring our success.

Her experience, judgment, and industry knowledge make her an invaluable team member. For anyone seeking a transaction coordinator with exceptional professionalism and commitment, I highly recommend Debbie.`,
    image: '/cassie-transue.jpg'
  },
  {
    id: 3,
    name: 'Robert Hoffman',
    role: 'Keller Williams Realtor',
    content: `Working with Debbie feels effortless. She's always on top of things, and her communication and customer service are easily 5-star.

Debbie handles challenges with grace, keeping everything on track without getting caught up in emotions. My clients constantly praise her, which speaks volumes about her professionalism and dedication.

With her wealth of experience, Debbie is much more than a transaction coordinator—she's a trusted advisor and an important part of my business success.`,
    image: '/robert-hoffman.jpg'
  },
  {
    id: 4,
    name: 'Axel Struckmeyer',
    role: 'Keller Williams Realtor',
    content: `I have used Debbie O'Brien's Transaction Coordinator services for around 13-14 years. When I was new to real estate, I was also managing another business, and having Debbie's help was invaluable.

She's always been incredibly reliable, detail-oriented, and proactive in managing transactions. Her professionalism and expertise have been a huge asset to my business, allowing me to focus on serving my clients while knowing the transaction details are in capable hands.`,
    image: '/axel-struckmeyer.jpg'
  },
  {
    id: 5,
    name: 'Jess Keller',
    role: 'Keller Williams Realtor',
    content: `Deb and I have been working together for over six years now, and I wouldn't have it any other way! She is an exceptional team player and has consistently exceeded my expectations on so many levels.

I'm grateful for the opportunity to work hand-in-hand with Debbie. She's a true professional who excels in her role.`,
    image: '/jess-keller.jpg'
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonialData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonialData.length - 1 : prevIndex - 1
    );
  };

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevTestimonial();
      } else if (event.key === 'ArrowRight') {
        nextTestimonial();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="section bg-white" data-section="testimonials">
      <div className="page-container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-2">
            What Our Clients Say
          </h2>
          <p className="text-lead">
            Read about the experiences of real estate professionals who have worked with us
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-6xl">
          <div className="flex items-center justify-center gap-4 md:gap-8">
            {/* Left Navigation Button */}
            <button
              onClick={prevTestimonial}
              className="btn btn-ghost p-3 md:p-4 rounded-full"
              aria-label="Previous testimonial"
            >
              <ArrowLeft size={18} className="md:w-5 md:h-5" />
            </button>

            {/* Testimonial Card */}
            <div className="flex-1 max-w-4xl">
              <div className="card card-elevated overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                key={testimonialData[currentIndex].id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row overflow-hidden"
              >
                <div className="md:w-1/3 flex justify-center items-center bg-gradient-to-br from-primary-600 to-primary-700 p-6 md:p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:24px_24px]" />

                  <motion.div
                    className="absolute top-10 right-10 w-20 h-20 opacity-20"
                    animate={{
                      y: [0, 10, 0],
                      opacity: [0.15, 0.25, 0.15]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <div className="w-full h-full bg-white rounded-full blur-xl" />
                  </motion.div>

                  <div className="relative">
                    <div className="w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white/80 shadow-lg relative">
                      <img
                        src={testimonialData[currentIndex].image}
                        alt={testimonialData[currentIndex].name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  </div>
                </div>

                <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-center bg-white">
                  <div className="mb-4">
                    <h3 className="heading-3 text-primary-600">
                      {testimonialData[currentIndex].name}
                    </h3>
                    <p className="text-primary-600/70 text-small">
                      {testimonialData[currentIndex].role}
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute top-0 left-0 text-6xl text-neutral-100 -z-10 opacity-50 font-serif">"</div>
                    <blockquote className="text-neutral-700 mb-4 relative z-10 leading-relaxed overflow-auto max-h-[240px] pr-4">
                      <div className="text-body leading-relaxed mb-4">
                        {testimonialData[currentIndex].content.split('.').slice(0, 2).join('.') + '.'}
                      </div>
                      <div className="text-lg font-semibold text-primary-600 italic">
                        "{testimonialData[currentIndex].content.split('.').slice(2, 3).join('.') + '.'}"
                      </div>
                    </blockquote>
                    <div className="absolute bottom-0 right-4 text-6xl text-neutral-100 -z-10 opacity-50 font-serif transform rotate-180">"</div>
                  </div>
                </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right Navigation Button */}
            <button
              onClick={nextTestimonial}
              className="btn btn-ghost p-3 md:p-4 rounded-full"
              aria-label="Next testimonial"
            >
              <ArrowRight size={18} className="md:w-5 md:h-5" />
            </button>
          </div>

          <div className="flex justify-center mt-8 gap-2">
            {testimonialData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                  currentIndex === index
                    ? 'w-8 h-3 bg-primary-600 shadow-md'
                    : 'w-3 h-3 bg-neutral-300 hover:bg-primary-500/50 hover:scale-110'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={currentIndex === index ? 'true' : 'false'}
              />
            ))}
          </div>
        </div>
      </div>
      
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 hidden lg:block"
        animate={{
          y: [0, 15, 0],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <div className="w-full h-full bg-primary-500/15 rounded-full blur-xl" />
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-20 w-24 h-24 hidden lg:block"
        animate={{
          y: [0, -10, 0],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <div className="w-full h-full bg-warning-500/15 rounded-full blur-xl" />
      </motion.div>
    </section>
  );
};

export default Testimonials;