import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, X, ArrowLeft } from 'lucide-react';

/**
 * CalendarBooking Component - Interactive booking modal with Google Calendar integration
 * Features 3-step booking flow: Date → Time → Confirmation
 * Responsive design with smooth animations and professional styling
 */
const CalendarBooking = () => {
  // State management for booking flow
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Configuration constants
  const TIME_SLOTS = [
    '09:00 AM', '10:00 AM', '11:00 AM', 
    '12:00 PM', '01:00 PM', '02:00 PM', 
    '03:00 PM', '04:00 PM'
  ];

  const TIME_DURATION_MAP = {
    '09:00 AM': '10:00AM', '10:00 AM': '11:00AM',
    '11:00 AM': '12:00PM', '12:00 PM': '01:00PM',
    '01:00 PM': '02:00PM', '02:00 PM': '03:00PM',
    '03:00 PM': '04:00PM', '04:00 PM': '05:00PM',
  };

  /**
   * Generates available dates for the next 30 business days
   * @returns {Array} Array of date objects with formatted display
   */
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayOfWeek = date.getDay();
      
      // Skip weekends (0 = Sunday, 6 = Saturday)
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        dates.push({
          date: date.toISOString().split('T')[0],
          display: date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
          })
        });
      }
    }
    return dates;
  };

  const availableDates = generateDates();

  /**
   * Handles date selection and progresses to time selection
   */
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setStep(2);
  };

  /**
   * Handles time selection and progresses to confirmation
   */
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setStep(3);
  };

  /**
   * Creates Google Calendar URL and opens booking in new tab
   */
  const handleBookCall = () => {
    const startTime = `${selectedDate}T${selectedTime.replace(' ', '')}`;
    const endTime = `${selectedDate}T${TIME_DURATION_MAP[selectedTime] || '05:00PM'}`;
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${startTime}/${endTime}&text=Meeting+with+AI+WaveAgency&details=Discussion+about+AI+automation+services&location=Online+Call&sf=true&output=xml`;
    
    window.open(calendarUrl, '_blank');
    resetBooking();
  };

  /**
   * Resets all booking state and closes modal
   */
  const resetBooking = () => {
    setIsOpen(false);
    setStep(1);
    setSelectedDate('');
    setSelectedTime('');
  };

  /**
   * Navigates back to previous step in booking flow
   */
  const goBack = () => {
    if (step > 1) setStep(step - 1);
  };

  // Render booking button when modal is closed
  if (!isOpen) {
    return (
      <Button 
        variant="outline" 
        size="lg" 
        className="text-lg px-8 py-4 rounded-full border-white/20 hover:bg-white/10 transition-all duration-300 hover:scale-105"
        onClick={() => setIsOpen(true)}
      >
        Book a call
      </Button>
    );
  }

  // Render booking modal
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-slate-900/95 border border-purple-500/30 rounded-2xl max-w-md w-full shadow-2xl shadow-purple-500/20 backdrop-blur-sm"
      >
        {/* Modal Header */}
        <div className="border-b border-purple-500/20 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {step > 1 && (
                <button 
                  onClick={goBack}
                  className="p-2 hover:bg-purple-500/20 rounded-xl transition-all duration-200"
                  aria-label="Go back"
                >
                  <ArrowLeft className="h-5 w-5 text-purple-400" />
                </button>
              )}
              <div>
                <h3 className="text-xl font-bold text-white">Schedule a Call</h3>
                <p className="text-gray-400 text-sm">Book directly to calendar</p>
              </div>
            </div>
            <button 
              onClick={resetBooking}
              className="p-2 hover:bg-red-500/20 rounded-xl transition-all duration-200"
              aria-label="Close booking modal"
            >
              <X className="h-5 w-5 text-red-400" />
            </button>
          </div>
          
          {/* Progress Indicator */}
          <div className="flex justify-center mt-4 space-x-2">
            {[1, 2, 3].map((stepNum) => (
              <div
                key={stepNum}
                className={`w-8 h-1 rounded-full transition-all duration-300 ${
                  step >= stepNum 
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500' 
                    : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {/* Step 1: Date Selection */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Choose a Date</h4>
                <p className="text-gray-400 text-sm">Select your preferred meeting day</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {availableDates.map((dateObj) => (
                  <motion.button
                    key={dateObj.date}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDateSelect(dateObj.date)}
                    className="p-3 rounded-xl bg-slate-800 border border-slate-700 hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-200 text-left group"
                  >
                    <div className="text-white font-semibold text-sm group-hover:text-purple-300">
                      {dateObj.display.split(',')[0]}
                    </div>
                    <div className="text-gray-400 text-xs group-hover:text-purple-200">
                      {dateObj.display.split(',')[1]}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Time Selection */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Pick a Time</h4>
                <p className="text-gray-400 text-sm bg-slate-800 rounded-lg py-2 px-3">
                  {new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {TIME_SLOTS.map((time) => (
                  <motion.button
                    key={time}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleTimeSelect(time)}
                    className="p-3 rounded-xl bg-slate-800 border border-slate-700 hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-200 text-center group"
                  >
                    <Clock className="h-4 w-4 mx-auto mb-1 text-gray-400 group-hover:text-blue-300" />
                    <div className="text-white font-medium text-sm group-hover:text-blue-300">{time}</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Confirm Booking</h4>
                <p className="text-gray-400 text-sm">
                  Ready to add this meeting to your calendar?
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-xl p-4">
                <div className="text-white font-bold text-lg">
                  {new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="text-cyan-300 text-xl font-semibold mt-1">{selectedTime}</div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleBookCall}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-xl font-semibold shadow-lg shadow-green-500/25"
                >
                  Add to Google Calendar
                </Button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CalendarBooking;