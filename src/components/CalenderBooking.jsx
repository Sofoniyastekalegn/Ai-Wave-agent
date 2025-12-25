import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, X, ArrowLeft, ChevronLeft, ChevronRight, User, MessageSquare, Calendar as CalendarIcon, Globe, Zap, Sparkles } from 'lucide-react';

/**
 * Professional Interactive CalendarBooking Component
 * Features: Dynamic month/year selection, interactive controls, real-time feedback
 */
const CalendarBooking = () => {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1); // 1: Quick Select, 2: Date, 3: Time, 4: Details
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [meetingTitle, setMeetingTitle] = useState('');
  const [attendeeName, setAttendeeName] = useState('');
  const [attendeeEmail, setAttendeeEmail] = useState('');
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' or 'list'
  const [hoveredDate, setHoveredDate] = useState(null);
  const [selectedQuickMonth, setSelectedQuickMonth] = useState(null);
  const [selectedQuickYear, setSelectedQuickYear] = useState(null);

  // Constants
  const START_YEAR = 2025;
  const END_YEAR = 2050;
  const TIME_SLOTS = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00'
  ];
  
  const MONTHS = [
    { name: 'January', short: 'Jan', color: 'from-blue-600 to-cyan-600' },
    { name: 'February', short: 'Feb', color: 'from-purple-600 to-pink-600' },
    { name: 'March', short: 'Mar', color: 'from-green-600 to-emerald-600' },
    { name: 'April', short: 'Apr', color: 'from-yellow-600 to-amber-600' },
    { name: 'May', short: 'May', color: 'from-red-600 to-orange-600' },
    { name: 'June', short: 'Jun', color: 'from-indigo-600 to-purple-600' },
    { name: 'July', short: 'Jul', color: 'from-blue-500 to-teal-500' },
    { name: 'August', short: 'Aug', color: 'from-purple-500 to-pink-500' },
    { name: 'September', short: 'Sep', color: 'from-green-500 to-emerald-500' },
    { name: 'October', short: 'Oct', color: 'from-orange-600 to-red-600' },
    { name: 'November', short: 'Nov', color: 'from-amber-600 to-yellow-600' },
    { name: 'December', short: 'Dec', color: 'from-cyan-600 to-blue-600' }
  ];

  const QUARTERS = [
    { name: 'Q1', months: [0, 1, 2], color: 'from-blue-600 to-cyan-600' },
    { name: 'Q2', months: [3, 4, 5], color: 'from-green-600 to-emerald-600' },
    { name: 'Q3', months: [6, 7, 8], color: 'from-purple-600 to-pink-600' },
    { name: 'Q4', months: [9, 10, 11], color: 'from-orange-600 to-red-600' }
  ];

  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Generate years array
  const years = useMemo(() => {
    const yearsArray = [];
    for (let year = START_YEAR; year <= END_YEAR; year++) {
      yearsArray.push(year);
    }
    return yearsArray;
  }, []);

  // Get current decade
  const currentDecade = useMemo(() => {
    const start = Math.floor(selectedYear / 10) * 10;
    return Array.from({ length: 10 }, (_, i) => start + i);
  }, [selectedYear]);

  // Generate days in month
  const getDaysInMonth = (year, month) => {
    const date = new Date(year, month, 1);
    const days = [];
    const firstDay = date.getDay();
    
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      const dayOfWeek = currentDate.getDay();
      days.push({
        day: i,
        date: `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`,
        isToday: isToday(year, month, i),
        isPast: isPastDate(year, month, i),
        isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
        dayOfWeek: dayOfWeek,
        isAvailable: !isPastDate(year, month, i)
      });
    }
    
    return days;
  };

  const daysInMonth = useMemo(() => 
    getDaysInMonth(selectedYear, selectedMonth), 
    [selectedYear, selectedMonth]
  );

  // Helper functions
  const isToday = (year, month, day) => {
    const today = new Date();
    return year === today.getFullYear() && 
           month === today.getMonth() && 
           day === today.getDate();
  };

  const isPastDate = (year, month, day) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected = new Date(year, month, day);
    return selected < today && !isToday(year, month, day);
  };

  // Navigation handlers
  const handleQuickSelect = (year, month) => {
    setSelectedYear(year);
    setSelectedMonth(month);
    setSelectedQuickYear(year);
    setSelectedQuickMonth(month);
    setStep(2);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    if (selectedQuickMonth !== null) {
      handleQuickSelect(year, selectedQuickMonth);
    }
  };

  const handleMonthSelect = (monthIndex) => {
    setSelectedMonth(monthIndex);
    if (selectedQuickYear !== null) {
      handleQuickSelect(selectedQuickYear, monthIndex);
    }
  };

  const handleDateSelect = (date) => {
    if (!date) return;
    setSelectedDate(date);
    setStep(3);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setStep(4);
  };

  const handlePreviousMonth = () => {
    if (selectedMonth === 0) {
      setSelectedYear(prev => prev - 1);
      setSelectedMonth(11);
    } else {
      setSelectedMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedYear(prev => prev + 1);
      setSelectedMonth(0);
    } else {
      setSelectedMonth(prev => prev + 1);
    }
  };

  const handlePreviousYear = () => {
    setSelectedYear(prev => Math.max(START_YEAR, prev - 1));
  };

  const handleNextYear = () => {
    setSelectedYear(prev => Math.min(END_YEAR, prev + 1));
  };

  const handlePreviousDecade = () => {
    setSelectedYear(prev => Math.max(START_YEAR, prev - 10));
  };

  const handleNextDecade = () => {
    setSelectedYear(prev => Math.min(END_YEAR, prev + 10));
  };

  // Format time for display
  const formatTimeDisplay = (time) => {
    const [hour, minute] = time.split(':').map(Number);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
  };

  // Calculate end time
  const getEndTime = (startTime) => {
    const [hour, minute] = startTime.split(':').map(Number);
    const endHour = hour + 1;
    return `${endHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  };

  // Create Google Calendar event
  const handleCreateEvent = () => {
    if (!meetingTitle.trim() || !attendeeName.trim() || !attendeeEmail.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    const formattedStartTime = formatTimeDisplay(selectedTime);
    const formattedEndTime = formatTimeDisplay(getEndTime(selectedTime));
    
    const startTime = `${selectedDate}T${selectedTime.replace(' ', '')}`;
    const endTime = `${selectedDate}T${getEndTime(selectedTime).replace(' ', '')}`;
    
    const eventDetails = encodeURIComponent(
      `Meeting with: ${attendeeName}\nEmail: ${attendeeEmail}\n\nMeeting Purpose: ${meetingTitle}`
    );
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${startTime}/${endTime}&text=${encodeURIComponent(meetingTitle)}&details=${eventDetails}&location=Online+Meeting&sf=true&output=xml`;
    
    window.open(googleCalendarUrl, '_blank');
    resetBooking();
  };

  // Reset booking state
  const resetBooking = () => {
    setIsOpen(false);
    setStep(1);
    setSelectedYear(new Date().getFullYear());
    setSelectedMonth(new Date().getMonth());
    setSelectedDate('');
    setSelectedTime('');
    setMeetingTitle('');
    setAttendeeName('');
    setAttendeeEmail('');
    setSelectedQuickMonth(null);
    setSelectedQuickYear(null);
  };

  const goBack = () => {
    if (step > 1) setStep(step - 1);
  };

  // Dynamic button text based on selection
  const getButtonText = () => {
    if (selectedDate && selectedTime) {
      const date = new Date(selectedDate);
      return `Book ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at ${formatTimeDisplay(selectedTime)}`;
    }
    return 'Book a Professional Call';
  };

  // Render booking button
  if (!isOpen) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          variant="outline" 
          size="lg" 
          className="text-lg px-8 py-4 rounded-full border-white/20 hover:bg-white/10 transition-all duration-300 group relative overflow-hidden"
          onClick={() => setIsOpen(true)}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-blue-600/0 to-cyan-600/0 group-hover:from-purple-600/20 group-hover:via-blue-600/20 group-hover:to-cyan-600/20 transition-all duration-500" />
          <CalendarIcon className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
          <span className="relative z-10">{getButtonText()}</span>
          <Sparkles className="ml-2 h-4 w-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Button>
      </motion.div>
    );
  }

  // Steps configuration
  const steps = [
    { number: 1, title: 'Quick Select', icon: <Zap className="h-4 w-4" /> },
    { number: 2, title: 'Date', icon: <Calendar className="h-4 w-4" /> },
    { number: 3, title: 'Time', icon: <Clock className="h-4 w-4" /> },
    { number: 4, title: 'Details', icon: <MessageSquare className="h-4 w-4" /> },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-2 md:p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-gray-700 rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl shadow-purple-900/30"
          >
            {/* Header */}
            <div className="border-b border-gray-700 p-4 md:p-6 bg-gradient-to-r from-slate-800/50 to-slate-900/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 md:space-x-3">
                  {step > 1 && (
                    <motion.button 
                      onClick={goBack}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 hover:bg-gray-700 rounded-xl transition-all duration-200"
                    >
                      <ArrowLeft className="h-5 w-5 text-gray-300" />
                    </motion.button>
                  )}
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white">Professional Calendar Booking</h3>
                    <p className="text-gray-400 text-sm">Schedule meetings for any date up to 2050</p>
                  </div>
                </div>
                <motion.button 
                  onClick={resetBooking}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 hover:bg-red-500/20 rounded-xl transition-all duration-200"
                >
                  <X className="h-5 w-5 text-red-400" />
                </motion.button>
              </div>

              {/* Progress Steps */}
              <div className="flex justify-between items-center overflow-x-auto py-2">
                {steps.map((stepItem, index) => (
                  <React.Fragment key={stepItem.number}>
                    <div className="flex items-center flex-shrink-0">
                      <motion.div 
                        animate={step >= stepItem.number ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 0.3 }}
                        className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full transition-all duration-300 ${
                          step >= stepItem.number
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                            : 'bg-gray-700 text-gray-400'
                        }`}
                      >
                        {stepItem.icon}
                      </motion.div>
                      <div className="ml-2 md:ml-3">
                        <div className={`text-xs md:text-sm font-medium ${
                          step >= stepItem.number ? 'text-white' : 'text-gray-500'
                        }`}>
                          {stepItem.title}
                        </div>
                        <div className={`text-xs ${
                          step >= stepItem.number ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          Step {stepItem.number}
                        </div>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-2 md:mx-4 ${
                        step > stepItem.number 
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600' 
                          : 'bg-gray-700'
                      }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-4 md:p-6 max-h-[60vh] overflow-y-auto">
              <AnimatePresence mode="wait">
                {/* Step 1: Quick Selection */}
                {step === 1 && (
                  <motion.div
                    key="quick-select"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Zap className="h-8 w-8 md:h-10 md:w-10 text-white" />
                      </div>
                      <h4 className="text-xl md:text-2xl font-bold text-white mb-2">Quick Selection</h4>
                      <p className="text-gray-400">Select any month and year combination</p>
                    </div>

                    {/* Year Navigation */}
                    <div className="bg-gray-800/50 rounded-2xl p-4 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h5 className="text-lg font-semibold text-white">Select Year</h5>
                        <div className="flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handlePreviousDecade}
                            className="p-2 hover:bg-gray-700 rounded-xl transition-colors"
                          >
                            <ChevronLeft className="h-5 w-5 text-gray-300" />
                            <span className="sr-only">Previous Decade</span>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handlePreviousYear}
                            className="p-2 hover:bg-gray-700 rounded-xl transition-colors"
                          >
                            <ChevronLeft className="h-5 w-5 text-gray-300" />
                            <span className="sr-only">Previous Year</span>
                          </motion.button>
                          <div className="px-4 py-2 bg-gray-700 rounded-lg">
                            <span className="text-xl font-bold text-white">{selectedYear}</span>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleNextYear}
                            className="p-2 hover:bg-gray-700 rounded-xl transition-colors"
                          >
                            <ChevronRight className="h-5 w-5 text-gray-300" />
                            <span className="sr-only">Next Year</span>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleNextDecade}
                            className="p-2 hover:bg-gray-700 rounded-xl transition-colors"
                          >
                            <ChevronRight className="h-5 w-5 text-gray-300" />
                            <span className="sr-only">Next Decade</span>
                          </motion.button>
                        </div>
                      </div>

                      {/* Year Grid */}
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                        {currentDecade.map((year) => (
                          <motion.button
                            key={year}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setSelectedYear(year);
                              setSelectedQuickYear(year);
                              if (selectedQuickMonth !== null) {
                                handleQuickSelect(year, selectedQuickMonth);
                              }
                            }}
                            className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                              year === selectedYear
                                ? 'border-purple-500 bg-purple-500/20 text-white shadow-lg'
                                : year === new Date().getFullYear()
                                ? 'border-blue-500 bg-blue-500/10 text-blue-300'
                                : 'border-gray-700 hover:border-gray-600 hover:bg-gray-700/50 text-gray-300'
                            } ${year < START_YEAR || year > END_YEAR ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={year < START_YEAR || year > END_YEAR}
                          >
                            <div className="text-center">
                              <div className="font-bold text-lg">{year}</div>
                              <div className="text-xs mt-1">
                                {year === new Date().getFullYear() && 'Current'}
                              </div>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Month Selection */}
                    <div className="bg-gray-800/50 rounded-2xl p-4">
                      <h5 className="text-lg font-semibold text-white mb-4">Select Month</h5>
                      
                      {/* View Toggle */}
                      <div className="flex justify-center mb-6">
                        <div className="inline-flex rounded-lg bg-gray-700 p-1">
                          <button
                            onClick={() => setViewMode('calendar')}
                            className={`px-4 py-2 rounded-md transition-all duration-300 ${
                              viewMode === 'calendar' 
                                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                                : 'text-gray-300 hover:text-white'
                            }`}
                          >
                            Calendar View
                          </button>
                          <button
                            onClick={() => setViewMode('list')}
                            className={`px-4 py-2 rounded-md transition-all duration-300 ${
                              viewMode === 'list' 
                                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                                : 'text-gray-300 hover:text-white'
                            }`}
                          >
                            List View
                          </button>
                        </div>
                      </div>

                      {/* Months Grid/List */}
                      {viewMode === 'calendar' ? (
                        <div className="space-y-4">
                          {/* Quarters */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                            {QUARTERS.map((quarter) => (
                              <motion.button
                                key={quarter.name}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                  const firstMonth = quarter.months[0];
                                  handleQuickSelect(selectedYear, firstMonth);
                                }}
                                className={`p-4 rounded-xl bg-gradient-to-r ${quarter.color} text-white text-center`}
                              >
                                <div className="font-bold text-lg">{quarter.name}</div>
                                <div className="text-sm opacity-80">
                                  {quarter.months.map(m => MONTHS[m].short).join(', ')}
                                </div>
                              </motion.button>
                            ))}
                          </div>

                          {/* Individual Months */}
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                            {MONTHS.map((month, index) => (
                              <motion.button
                                key={month.name}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleQuickSelect(selectedYear, index)}
                                onMouseEnter={() => setSelectedQuickMonth(index)}
                                onMouseLeave={() => setSelectedQuickMonth(null)}
                                className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                                  selectedQuickMonth === index && selectedQuickYear === selectedYear
                                    ? `border-white bg-gradient-to-r ${month.color} text-white shadow-xl`
                                    : index === new Date().getMonth() && selectedYear === new Date().getFullYear()
                                    ? 'border-blue-500 bg-blue-500/20 text-blue-300'
                                    : 'border-gray-700 hover:border-gray-600 hover:bg-gray-700/50 text-gray-300'
                                }`}
                              >
                                <div className="font-bold text-lg">{month.short}</div>
                                <div className="text-sm mt-1">{month.name}</div>
                                <div className="text-xs mt-2 opacity-70">
                                  {new Date(selectedYear, index + 1, 0).getDate()} days
                                </div>
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {MONTHS.map((month, index) => (
                            <motion.button
                              key={month.name}
                              whileHover={{ x: 5 }}
                              onClick={() => handleQuickSelect(selectedYear, index)}
                              className={`w-full p-4 rounded-xl text-left transition-all duration-300 flex items-center justify-between ${
                                selectedQuickMonth === index && selectedQuickYear === selectedYear
                                  ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500 text-white'
                                  : 'hover:bg-gray-700/50 text-gray-300'
                              }`}
                            >
                              <div className="flex items-center">
                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${month.color} flex items-center justify-center mr-3`}>
                                  <span className="font-bold text-white">{month.short.charAt(0)}</span>
                                </div>
                                <div>
                                  <div className="font-semibold">{month.name} {selectedYear}</div>
                                  <div className="text-sm text-gray-400">
                                    {new Date(selectedYear, index + 1, 0).getDate()} days
                                  </div>
                                </div>
                              </div>
                              <ChevronRight className="h-5 w-5 text-gray-400" />
                            </motion.button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Date Selection */}
                {step === 2 && (
                  <motion.div
                    key="date"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <div className="flex items-center justify-center space-x-2 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center">
                          <Calendar className="h-6 w-6 text-white" />
                        </div>
                        <div className="text-left">
                          <h4 className="text-xl md:text-2xl font-bold text-white">
                            {MONTHS[selectedMonth].name} {selectedYear}
                          </h4>
                          <p className="text-gray-400">Select a date for your meeting</p>
                        </div>
                      </div>

                      {/* Month Navigation */}
                      <div className="flex items-center justify-between bg-gray-800/50 rounded-2xl p-4 mb-6">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={handlePreviousMonth}
                          className="p-2 hover:bg-gray-700 rounded-xl transition-colors"
                        >
                          <ChevronLeft className="h-5 w-5 text-gray-300" />
                        </motion.button>
                        
                        <div className="flex items-center space-x-4">
                          <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                            className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                          >
                            {MONTHS.map((month, index) => (
                              <option key={index} value={index}>
                                {month.name}
                              </option>
                            ))}
                          </select>
                          
                          <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                            className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                          >
                            {years.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={handleNextMonth}
                          className="p-2 hover:bg-gray-700 rounded-xl transition-colors"
                        >
                          <ChevronRight className="h-5 w-5 text-gray-300" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Calendar Grid */}
                    <div className="bg-gray-800/30 rounded-2xl p-4">
                      {/* Day Headers */}
                      <div className="grid grid-cols-7 gap-2 mb-4">
                        {DAYS.map((day) => (
                          <div key={day} className="text-center font-medium text-gray-400 py-2">
                            {day}
                          </div>
                        ))}
                      </div>

                      {/* Calendar Days */}
                      <div className="grid grid-cols-7 gap-2">
                        {daysInMonth.map((day, index) => (
                          <motion.div
                            key={index}
                            whileHover={day && day.isAvailable ? { scale: 1.05 } : {}}
                            onMouseEnter={() => day && setHoveredDate(day.date)}
                            onMouseLeave={() => setHoveredDate(null)}
                          >
                            <button
                              onClick={() => day && day.isAvailable && handleDateSelect(day.date)}
                              disabled={!day || !day.isAvailable}
                              className={`w-full h-14 rounded-xl flex flex-col items-center justify-center transition-all duration-200 relative overflow-hidden ${
                                !day
                                  ? 'invisible'
                                  : !day.isAvailable
                                  ? 'bg-gray-800/20 text-gray-600 cursor-not-allowed'
                                  : selectedDate === day.date
                                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                                  : day.isToday
                                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                  : hoveredDate === day.date
                                  ? 'bg-gray-700/50 text-white border border-gray-600'
                                  : day.isWeekend
                                  ? 'bg-gray-800/30 text-gray-300'
                                  : 'bg-gray-800/20 text-gray-200'
                              }`}
                            >
                              <div className="text-lg font-bold z-10">{day?.day}</div>
                              {day?.isToday && (
                                <div className="text-xs text-blue-300 z-10">Today</div>
                              )}
                              {day?.isAvailable && selectedDate === day.date && (
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600" />
                              )}
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Time Selection */}
                {step === 3 && (
                  <motion.div
                    key="time"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-cyan-600 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Clock className="h-8 w-8 md:h-10 md:w-10 text-white" />
                      </div>
                      <h4 className="text-xl md:text-2xl font-bold text-white mb-2">Select Time</h4>
                      <div className="bg-gray-800/50 rounded-2xl p-4 inline-block">
                        <p className="text-gray-300 text-lg">
                          {new Date(selectedDate).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric',
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                      {TIME_SLOTS.map((time) => (
                        <motion.button
                          key={time}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleTimeSelect(time)}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                            selectedTime === time
                              ? 'border-green-500 bg-green-500/20 text-white shadow-lg'
                              : 'border-gray-700 hover:border-gray-600 hover:bg-gray-800/50 text-gray-300'
                          }`}
                        >
                          <Clock className="h-5 w-5 mx-auto mb-2" />
                          <div className="font-bold text-lg">{formatTimeDisplay(time)}</div>
                          <div className="text-sm opacity-70">
                            to {formatTimeDisplay(getEndTime(time))}
                          </div>
                        </motion.button>
                      ))}
                    </div>

                    {/* Quick Time Options */}
                    <div className="bg-gray-800/30 rounded-2xl p-4">
                      <h5 className="text-lg font-semibold text-white mb-3">Quick Times</h5>
                      <div className="flex flex-wrap gap-2">
                        {['09:00', '13:00', '15:00'].map((time) => (
                          <motion.button
                            key={time}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleTimeSelect(time)}
                            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 hover:text-white transition-colors"
                          >
                            {formatTimeDisplay(time)}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Meeting Details */}
                {step === 4 && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <MessageSquare className="h-8 w-8 md:h-10 md:w-10 text-white" />
                      </div>
                      <h4 className="text-xl md:text-2xl font-bold text-white mb-2">Meeting Details</h4>
                      <p className="text-gray-400">Finalize your booking details</p>
                    </div>

                    {/* Summary Card */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-2xl p-6"
                    >
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-gray-300 text-sm mb-1 flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            Selected Date
                          </div>
                          <div className="text-white text-lg font-semibold">
                            {new Date(selectedDate).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              month: 'long', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-300 text-sm mb-1 flex items-center">
                            <Clock className="h-4 w-4 mr-2" />
                            Selected Time
                          </div>
                          <div className="text-white text-lg font-semibold">
                            {formatTimeDisplay(selectedTime)} - {formatTimeDisplay(getEndTime(selectedTime))}
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Form */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-300 mb-2 font-medium">
                          Meeting Title *
                          <span className="text-gray-500 text-sm ml-2">(What will we discuss?)</span>
                        </label>
                        <input
                          type="text"
                          value={meetingTitle}
                          onChange={(e) => setMeetingTitle(e.target.value)}
                          placeholder="e.g., AI Strategy Session, Project Kickoff, Consultation..."
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-300 mb-2 font-medium">
                            <User className="inline h-4 w-4 mr-2" />
                            Your Name *
                          </label>
                          <input
                            type="text"
                            value={attendeeName}
                            onChange={(e) => setAttendeeName(e.target.value)}
                            placeholder="Enter your full name"
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 mb-2 font-medium">
                            <MessageSquare className="inline h-4 w-4 mr-2" />
                            Your Email *
                          </label>
                          <input
                            type="email"
                            value={attendeeEmail}
                            onChange={(e) => setAttendeeEmail(e.target.value)}
                            placeholder="Enter your email address"
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1"
                      >
                        <Button
                          onClick={handleCreateEvent}
                          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 rounded-xl text-lg font-semibold shadow-lg shadow-green-500/25"
                        >
                          <Calendar className="mr-2 h-5 w-5" />
                          Schedule on Google Calendar
                        </Button>
                      </motion.div>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={resetBooking}
                        className="px-6 py-4 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 rounded-xl transition-colors"
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CalendarBooking;