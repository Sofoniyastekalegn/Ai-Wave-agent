import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, BarChart3, Users, ShieldCheck, Settings, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Home = () => {
  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Workflow Automation",
      description: "Streamline your business processes with intelligent AI-powered automation that saves time and reduces errors."
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Client Dashboards",
      description: "Beautiful, intuitive dashboards that give your clients real-time insights into their projects and progress."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "AI-Powered Reports",
      description: "Generate comprehensive reports automatically with AI analysis and actionable insights for better decision making."
    }
  ];

  const whyChooseUs = [
    {
      icon: <ShieldCheck className="h-8 w-8" />,
      title: "14-Day Free Trial",
      description: "Experience the benefits risk-free. See how our AI receptionist can transform your business with no commitment.",
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Customized Dashboards",
      description: "Monitor and manage your AI receptionist with ease through a personalized dashboard tailored to your needs.",
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: "Dedicated Customer Support",
      description: "We're here to help you every step of the way. Our team is committed to your success and satisfaction.",
    }
  ];

  return (
    <>
      <Helmet>
        <title>AI WaveAgency - Automate Your Business with AI-Powered Workflows</title>
        <meta name="description" content="We help MedSpas, law firms, and agencies streamline operations through smart automation. Transform your business with AI-powered workflows." />
      </Helmet>

      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center hero-pattern overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-slate-900/20"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8 text-center md:text-left"
              >
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    Automate Your Business with{' '}
                    <span className="gradient-text">AI-Powered Workflows</span>
                  </h1>
                  
                  <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto md:mx-0">
                    We help MedSpas, law firms, and agencies streamline operations through smart automation.
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center"
                >
                  <Link to="/contact">
                    <Button 
                      size="lg" 
                      className="gradient-bg hover:opacity-90 text-lg px-8 py-4 rounded-full group"
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  
                  <Link to="/about">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="text-lg px-8 py-4 rounded-full border-white/20 hover:bg-white/10"
                    >
                      Learn More
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.05, y: -10, transition: { duration: 0.3 } }}
                className="hidden md:block"
              >
                <img 
                  src="https://images.ctfassets.net/un655fb9wln6/1lNzwYsBP3p2rpTZe6ijqn/bb4bcbf22b29d6a812968fa02e640ac8/poster.png" 
                  alt="AI Automation Workflow" 
                  className="w-full h-auto object-contain drop-shadow-2xl"
                />
              </motion.div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 animate-float">
            <div className="w-20 h-20 rounded-full bg-blue-500/20 blur-xl"></div>
          </div>
          <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: '2s' }}>
            <div className="w-32 h-32 rounded-full bg-purple-500/20 blur-xl"></div>
          </div>
        </section>

        {/* Features Section */}
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
                Powerful Features for <span className="gradient-text">Modern Businesses</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Transform your operations with cutting-edge AI automation designed specifically for service-based businesses.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="glass-effect p-8 rounded-2xl card-hover"
                >
                  <div className="gradient-bg p-3 rounded-xl w-fit mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
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
                Why <span className="gradient-text">Choose Us?</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Discover the advantages of partnering with AI WaveAgency for your automation needs.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {whyChooseUs.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="glass-effect p-8 rounded-2xl card-hover"
                >
                  <div className="gradient-bg p-3 rounded-xl w-fit mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-900/50 to-purple-900/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-3xl md:text-5xl font-bold">
                Ready to <span className="gradient-text">Transform</span> Your Business?
              </h2>
              <p className="text-xl text-gray-300">
                Join hundreds of businesses that have already automated their workflows with AI WaveAgency.
              </p>
              <div className="flex justify-center">
                <Link to="/contact#contact-form">
                  <Button 
                    size="lg" 
                    className="gradient-bg hover:opacity-90 text-lg px-8 py-4 rounded-full"
                  >
                    Start Your Automation Journey
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;