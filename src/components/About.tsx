import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = './Harshwardhan Resume.pdf';
    link.download = 'Harshwardhan-Singh-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-surface dark:bg-light-surface"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            About Me
          </h2>
          <div className="w-24 h-1 bg-indigo-500 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-1 overflow-hidden">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src="/DSC_6482.JPG"
                    alt="Harshwardhan Singh"
                    className="w-full h-full object-cover"
                    style={{ 
                      objectPosition: 'center center',
                      transform: 'scale(0.99)',
                    }}
                  />
                </div>
              </div>
              <motion.div
                className="absolute -bottom-4 -right-4 w-24 h-24 bg-indigo-500 rounded-full opacity-20 blur-xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-300 dark:text-gray-700 leading-relaxed">
              I'm a <span className="text-indigo-400 font-semibold">Backend Developer</span> with 1+ year of
              experience building secure, scalable APIs and backend systems using Node.js/TypeScript and Python
              (Flask). I'm currently pursuing my MCA at Vivekananda Global University and working at BriskCovey
              Technologies.
            </p>
            <p className="text-lg text-gray-300 dark:text-gray-700 leading-relaxed">
              I've delivered production features across healthcare ERP, financial analytics/BI, and accounting
              platforms with strong ownership of PostgreSQL/MongoDB data modeling, SQLAlchemy query optimization,
              and robust validation and error handling.
            </p>
            <p className="text-lg text-gray-300 dark:text-gray-700 leading-relaxed">
              I also integrate third-party services like AWS S3, Twilio, and Cloudinary, and I care about
              maintainable delivery through testing (including 200+ unit tests) and structured logging.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadResume}
              className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-indigo-500/50"
            >
              <FaDownload />
              Download Resume
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

