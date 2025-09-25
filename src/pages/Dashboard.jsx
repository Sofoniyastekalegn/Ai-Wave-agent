import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import SoundWave from '@/components/SoundWave';
import { ArrowRight, ArrowUp, ArrowDown, Phone, Star, Clock, Calendar, User, Bot, CheckCircle } from 'lucide-react';

const StatCard = ({ title, value, change, changeType, icon: Icon, iconBgColor }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="glass-effect p-4 rounded-xl flex flex-col justify-between card-hover"
  >
    <div className="flex justify-between items-start">
      <span className="text-sm text-gray-400">{title}</span>
      <div className={`p-2 rounded-full ${iconBgColor}`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
    </div>
    <div className="mt-2">
      <p className="text-3xl font-bold">{value}</p>
      <div className={`flex items-center text-xs ${changeType === 'positive' ? 'text-green-400' : 'text-red-400'}`}>
        {changeType === 'positive' ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
        <span>{change} vs last week</span>
      </div>
    </div>
  </motion.div>
);

const RecentCall = ({ number, status, rating, duration, time, value, progress }) => (
  <div className="flex items-center justify-between py-3 border-b border-white/10">
    <div className="flex items-center">
      <Phone className="h-5 w-5 text-gray-400 mr-4" />
      <div>
        <p className="font-semibold">{number}</p>
        <div className="flex items-center text-xs text-gray-400 mt-1 space-x-3">
          <span className={`font-semibold ${status === 'Booked' ? 'text-purple-400' : 'text-gray-400'}`}>{status}</span>
          <span className="flex items-center"><Star className="h-3 w-3 mr-1 text-yellow-400" /> {rating}</span>
          <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> {duration}</span>
        </div>
      </div>
    </div>
    <div className="text-right">
      <p className="font-semibold">{value}</p>
      <p className="text-xs text-green-400">{progress}% completed</p>
    </div>
  </div>
);

const Dashboard = () => {
  const stats = [
    { title: 'Total Calls', value: '10', change: '+12%', changeType: 'positive', icon: Phone, iconBgColor: 'bg-blue-500/50' },
    { title: 'Success Rate', value: '70%', change: '+8%', changeType: 'positive', icon: Star, iconBgColor: 'bg-green-500/50' },
    { title: 'Bookings Made', value: '4', change: '+15%', changeType: 'positive', icon: Calendar, iconBgColor: 'bg-purple-500/50' },
    { title: 'Booking Rate', value: '40%', change: '+3%', changeType: 'positive', icon: Bot, iconBgColor: 'bg-indigo-500/50' },
    { title: 'Booking Value', value: '$1630', change: '+$320', changeType: 'positive', icon: Star, iconBgColor: 'bg-yellow-500/50' },
    { title: 'Avg Duration', value: '4 min', change: '-5%', changeType: 'negative', icon: Clock, iconBgColor: 'bg-orange-500/50' },
    { title: 'Satisfaction', value: '4.1/5', change: '+0.2', changeType: 'positive', icon: Star, iconBgColor: 'bg-pink-500/50' },
    { title: 'AI Performance', value: '82%', change: '+3%', changeType: 'positive', icon: Bot, iconBgColor: 'bg-teal-500/50' },
  ];

  const recentCalls = [
    { number: '+1-555-0111', status: 'Booked', rating: '5/5', duration: '5m 10s', time: 'Sep 15, 10:41', value: '$250', progress: 95 },
    { number: '+1-555-0222', status: 'Booked', rating: '4/5', duration: '4m 35s', time: 'Sep 15, 10:41', value: '$180', progress: 89 },
    { number: '+1-555-0333', status: 'Follow-up', rating: '3/5', duration: '3m 13s', time: 'Sep 15, 10:41', value: '$0', progress: 94 },
  ];

  return (
    <>
      <Helmet>
        <title>AI Agent Dashboard - AI WaveAgency</title>
        <meta name="description" content="Access your AI Voice Agent dashboard. Manage your AI receptionist, view analytics, and configure your settings with AI WaveAgency." />
      </Helmet>

      <div className="pt-16">
        <section className="relative pt-20 pb-12 flex items-center justify-center hero-pattern overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-slate-900/20"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Your AI Voice Agent <span className="gradient-text">Dashboard</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                Manage your AI receptionist, monitor call analytics, and configure your automated workflows all in one place.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="my-12"
            >
              <SoundWave />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <a
                href="https://dashboard.vapi.ai/assistants/f27fd9a0-c3c2-47aa-a1d2-2bb269d8bf17"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button 
                  size="lg" 
                  className="gradient-bg hover:opacity-90 text-lg px-8 py-4 rounded-full group"
                >
                  Get Started with AI Wave
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
              {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="lg:col-span-2 glass-effect p-6 rounded-xl"
              >
                <h2 className="text-xl font-bold mb-4">Performance Over Time</h2>
                <div className="h-64 bg-white/5 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400">Chart Placeholder</p>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="glass-effect p-6 rounded-xl"
              >
                <h2 className="text-xl font-bold mb-4">Recent Calls</h2>
                <div>
                  {recentCalls.map((call, index) => (
                    <RecentCall key={index} {...call} />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-center mb-6">
                Live <span className="gradient-text">Conversation</span> Example
              </h2>
              <div className="glass-effect rounded-2xl p-6 h-[500px] flex flex-col">
                <div className="flex-grow space-y-4 overflow-y-auto pr-2">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-500 rounded-full"><Bot className="h-5 w-5" /></div>
                    <div className="bg-white/20 p-3 rounded-lg rounded-tl-none">
                      <p>Thank you for calling Wellness Partners. This is Riley. How can I help you today?</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 justify-end">
                    <div className="bg-blue-500 p-3 rounded-lg rounded-br-none">
                      <p>Hi Riley, I'd like to book a massage appointment.</p>
                    </div>
                    <div className="p-2 bg-blue-500/70 rounded-full"><User className="h-5 w-5" /></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-500 rounded-full"><Bot className="h-5 w-5" /></div>
                    <div className="bg-white/20 p-3 rounded-lg rounded-tl-none">
                      <p>Of course! Let me just check the schedule for you. Are you a new or existing client?</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-center mb-6">
                Seamless <span className="gradient-text">Booking</span> UI
              </h2>
              <div className="glass-effect rounded-2xl p-6 h-[500px] flex flex-col justify-center items-center text-center">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
                  className="bg-green-500/20 border-2 border-green-400 p-8 rounded-full aspect-square flex flex-col items-center justify-center"
                >
                  <CheckCircle className="h-16 w-16 text-green-400 mb-4" />
                  <h3 className="text-2xl font-bold">Appointment Booked!</h3>
                  <p className="text-gray-300 mt-2">Massage with Sarah<br />September 25, 2025 at 2:00 PM</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;