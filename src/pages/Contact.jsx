import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, Send, MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useLocation } from 'react-router-dom';

const Contact = () => {
  const { toast } = useToast();
  const location = useLocation();
  const formRef = useRef(null);

  useEffect(() => {
    if (location.hash === '#contact-form' && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        variant: "destructive",
        title: "Please fill in all fields",
        description: "All fields are required to send your message."
      });
      return;
    }

    toast({
      title: "Message sent successfully! 🎉",
      description: "We'll get back to you within 24 hours."
    });

    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-white" />,
      title: "Email",
      details: [
        "joel@aiwaveagency.com",
      ]
    },
    {
      icon: <Phone className="h-6 w-6 text-white" />,
      title: "Phone",
      details: [
        "+12403939520",
      ]
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-white" />,
      title: "Response Time",
      details: [
        "Email: Within 24 hours",
        "Urgent matters: Same day"
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us - AI WaveAgency | Get in Touch for AI Automation</title>
        <meta name="description" content="Contact AI WaveAgency for AI automation solutions. Reach out to our team at joel@aiwaveagency.com for business automation." />
      </Helmet>

      <div className="pt-24 pb-12 bg-gray-900 text-white">
        <section className="py-20 bg-cover bg-center" style={{backgroundImage: "linear-gradient(rgba(14, 19, 40, 0.8), rgba(14, 19, 40, 0.9)), url('https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80')"}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-8"
            >
              <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl shadow-lg">
                <Mail className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Get in <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Touch</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                Ready to transform your business with AI automation? Let's discuss how we can help streamline your operations.
              </p>
            </motion.div>
          </div>
        </section>

        <section id="contact-form" ref={formRef} className="py-20 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-2xl shadow-2xl"
              >
                <h2 className="text-3xl font-bold text-white mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      placeholder="Tell us about your business and how we can help..."
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 py-3 text-lg font-semibold group transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Send Message
                    <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">Contact Information</h2>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    We're here to help you transform your business with AI automation. 
                    Reach out to us through any of the channels below, and we'll get back to you promptly.
                  </p>
                </div>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.15 }}
                      viewport={{ once: true }}
                      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-6 rounded-2xl shadow-lg"
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl">
                          {info.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white">{info.title}</h3>
                      </div>
                      <div className="space-y-2">
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-gray-300">
                            {info.title === "Email" ? (
                              <a 
                                href={`mailto:${detail}`}
                                className="hover:text-blue-400 transition-colors"
                              >
                                {detail}
                              </a>
                            ) : info.title === "Phone" ? (
                              <a 
                                href={`tel:${detail}`}
                                className="hover:text-blue-400 transition-colors"
                              >
                                {detail}
                              </a>
                            ) : (
                              detail
                            )}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                Frequently Asked <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Questions</span>
              </h2>
              <p className="text-xl text-gray-300">
                Quick answers to common questions about our AI automation services.
              </p>
            </motion.div>

            <div className="space-y-6">
              {[
                {
                  question: "How quickly can you implement automation for my business?",
                  answer: "Implementation timelines vary based on complexity, but most basic automations can be set up within 1-2 weeks. We'll provide a detailed timeline during our initial consultation."
                },
                {
                  question: "Do you work with businesses outside of MedSpas and law firms?",
                  answer: "Absolutely! While we specialize in MedSpas and law firms, we work with various service-based businesses including agencies, consultancies, and professional services."
                },
                {
                  question: "What kind of support do you provide after implementation?",
                  answer: "We provide ongoing support including system monitoring, updates, troubleshooting, and optimization. Our team is available to ensure your automations continue running smoothly."
                },
                {
                  question: "Can you integrate with our existing software systems?",
                  answer: "Yes! We specialize in creating seamless integrations with popular business software including CRMs, scheduling systems, payment processors, and more."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-6 rounded-2xl shadow-lg"
                >
                  <h3 className="text-xl font-bold text-white mb-3">{faq.question}</h3>
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;