import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About AI WaveAgency - AI Receptionist for Local Businesses</title>
        <meta name="description" content="AI WaveAgency specializes in AI-powered automation for Dental Clinics, Med Spas, and Law Firms, featuring our 24/7 AI Receptionist to capture every lead." />
      </Helmet>

      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center hero-pattern overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-slate-900/20"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold leading-tight mb-4"
            >
              About <span className="gradient-text">AI WaveAgency</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Innovating the future of business automation for local service providers.
            </motion.p>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="py-20 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Our <span className="gradient-text">Mission</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                At AI WaveAgency, our mission is to empower local businesses with cutting-edge AI solutions,
                transforming their operations and client interactions for unparalleled growth and efficiency.
              </p>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mt-4">
                Extending Our Expertise to Dental Clinics
                We are proud to extend our innovative solutions to the dental industry. We understand the unique scheduling and patient communication challenges dental clinics face. Our mission is to provide dentists with the tools they need to focus on patient care while we handle the front desk.
              </p>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mt-4">
                Introducing the AI Receptionist: Never Miss a Lead Again
                In today's competitive market, businesses are losing valuable leads and frustrating potential clients with unanswered phones, busy signals, and calls being forwarded to voicemail. Each missed call is a missed opportunity for growth.
              </p>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mt-4">
                Our AI Receptionist ends this problem. It answers every call instantly, 24/7, with a natural, human-like voice. It can handle appointment scheduling, answer FAQs, and qualify leads, ensuring your business captures every opportunity. With our AI, your phone line becomes a relentless business development tool, not a point of failure.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Our Expertise Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Our <span className="gradient-text">Expertise</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We craft tailored AI solutions for specific industries, ensuring maximum impact and seamless integration.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Med Spas */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="glass-effect p-8 rounded-2xl card-hover"
              >
                <img className="w-full h-48 object-cover rounded-xl mb-6" alt="Medical spa automation" src="https://horizons-cdn.hostinger.com/7318627e-f892-4e3a-a3be-f82bdcc3a605/medical-spa-q09rg.jpeg" />
                <h3 className="text-2xl font-bold mb-4">Med Spas</h3>
                <p className="text-gray-300 leading-relaxed">
                  Elevating patient experience with seamless booking and intelligent inquiry handling via our AI Receptionist.
                </p>
              </motion.div>

              {/* Law Firms */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="glass-effect p-8 rounded-2xl card-hover"
              >
                <img className="w-full h-48 object-cover rounded-xl mb-6" alt="Law firm automation" src="https://media.istockphoto.com/photos/weight-scale-of-justice-lawyer-working-in-office-picture-id1066709742?k=20&m=1066709742&s=612x612&w=0&h=oaX1p47RUwc-HlzVgW6ot9UL_CKN3Y__lsLus1V7REQ=" />
                <h3 className="text-2xl font-bold mb-4">Law Firms</h3>
                <p className="text-gray-300 leading-relaxed">
                  Ensuring no case intake call is ever missed with our persistent and professional AI Receptionist.
                </p>
              </motion.div>

              {/* Dental Clinics */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="glass-effect p-8 rounded-2xl card-hover"
              >
                <img className="w-full h-48 object-cover rounded-xl mb-6" alt="Dental clinic automation" src="https://horizons-cdn.hostinger.com/7318627e-f892-4e3a-a3be-f82bdcc3a605/web_as_188818511-UI9eU.jpg" />
                <h3 className="text-2xl font-bold mb-4">Dental Clinics</h3>
                <p className="text-gray-300 leading-relaxed">
                  Streamlining patient appointments and reducing administrative burden with our 24/7 AI Receptionist.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;