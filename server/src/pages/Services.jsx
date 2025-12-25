import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const pricingTiers = [
    {
      name: 'Starter',
      price: '100',
      description: 'Perfect for small businesses and startups getting started with AI.',
      features: [
        'Up to 500 Voice Bookings/Month',
        '24/7 AI Receptionist',
        'Basic Call Analytics',
        'Email & Chat Support',
      ],
      popular: false,
    },
    {
      name: 'Pro',
      price: '200',
      description: 'Ideal for growing businesses that need more power and customization.',
      features: [
        'Up to 1500 Voice Bookings/Month',
        'Advanced AI Receptionist Features',
        'Customized Dashboards',
        'Priority Phone Support',
        'CRM Integration',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Tailored solutions for large-scale operations and specific needs.',
      features: [
        'Unlimited Voice Bookings',
        'Fully Customized AI Agent',
        'Dedicated Account Manager',
        'On-premise Deployment Options',
        'API Access',
      ],
      popular: false,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Services & Pricing - AI WaveAgency</title>
        <meta name="description" content="Explore our AI receptionist service packages. Find the right plan for your business, from startups to enterprise-level solutions." />
      </Helmet>

      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 flex items-center justify-center hero-pattern overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-slate-900/20"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold leading-tight mb-4"
            >
              Our <span className="gradient-text">Services & Pricing</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Choose the perfect plan to automate your business and never miss a lead again.
            </motion.p>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8 items-stretch">
              {pricingTiers.map((tier, index) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`glass-effect p-8 rounded-2xl flex flex-col card-hover ${tier.popular ? 'border-2 border-purple-500 shadow-purple-500/30 shadow-2xl' : ''}`}
                >
                  {tier.popular && (
                    <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                      <span className="gradient-bg text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-center mb-2">{tier.name}</h3>
                    <p className="text-gray-400 text-center mb-6 h-12">{tier.description}</p>
                    <div className="text-center mb-8">
                      {tier.price === 'Custom' ? (
                        <span className="text-4xl font-bold">Custom</span>
                      ) : (
                        <>
                          <span className="text-4xl font-bold">${tier.price}</span>
                          <span className="text-gray-400">/month</span>
                        </>
                      )}
                    </div>
                    <ul className="space-y-4 mb-8">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-auto">
                    <Link to="/contact" className="w-full block">
                      <Button
                        size="lg"
                        className={`w-full ${tier.popular ? 'gradient-bg hover:opacity-90' : 'bg-white/10 hover:bg-white/20'}`}
                      >
                        {tier.price === 'Custom' ? 'Contact Sales' : 'Choose Plan'}
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Services;