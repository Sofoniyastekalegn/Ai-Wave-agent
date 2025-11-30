import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, X, ArrowLeft } from 'lucide-react';

const CalendarBooking = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Generate next 30 days (weekdays only)
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayOfWeek = date.getDay();
      
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Skip weekends
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

  // Available time slots
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', 
    '12:00 PM', '01:00 PM', '02:00 PM', 
    '03:00 PM', '04:00 PM'
  ];

  const dates = generateDates();

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setStep(2);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setStep(3);
  };

  const handleBookCall = () => {
    // Create Google Calendar URL
    const startTime = `${selectedDate}T${selectedTime.replace(' ', '')}`;
    const endTime = `${selectedDate}T${getEndTime(selectedTime)}`;
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${startTime}/${endTime}&text=Meeting+with+AI+WaveAgency&details=Discussion+about+AI+automation+services&location=Online+Call&sf=true&output=xml`;
    
    window.open(googleCalendarUrl, '_blank');
    resetBooking();
  };

  const getEndTime = (startTime) => {
    const timeMap = {
      '09:00 AM': '10:00AM', '10:00 AM': '11:00AM',
      '11:00 AM': '12:00PM', '12:00 PM': '01:00PM',
      '01:00 PM': '02:00PM', '02:00 PM': '03:00PM',
      '03:00 PM': '04:00PM', '04:00 PM': '05:00PM',
    };
    return timeMap[startTime] || '05:00PM';
  };

  const resetBooking = () => {
    setIsOpen(false);
    setStep(1);
    setSelectedDate('');
    setSelectedTime('');
  };

  const goBack = () => {
    if (step > 1) setStep(step - 1);
  };

  if (!isOpen) {
    return (
      <Button 
        variant="outline" 
        size="lg" 
        className="text-lg px-8 py-4 rounded-full border-white/20 hover:bg-white/10"
        onClick={() => setIsOpen(true)}
      >
        Book a call
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-900 border border-gray-700 rounded-2xl max-w-md w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="border-b border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {step > 1 && (
                <button 
                  onClick={goBack}
                  className="p-1 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
              )}
              <div>
                <h3 className="text-xl font-bold text-white">Book a Call</h3>
                <p className="text-gray-400 text-sm">Schedule directly to Google Calendar</p>
              </div>
            </div>
            <button 
              onClick={resetBooking}
              className="p-1 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Progress Steps */}
          <div className="flex justify-center mt-4">
            <div className="flex items-center space-x-2">
              {[1, 2, 3].map((stepNum) => (
                <div
                  key={stepNum}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    step >= stepNum ? 'bg-blue-500' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Date Selection */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold text-white text-center mb-4">
                Select a Date
              </h4>
              <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                {dates.map((dateObj) => (
                  <button
                    key={dateObj.date}
                    onClick={() => handleDateSelect(dateObj.date)}
                    className="p-3 rounded-lg border border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 transition-colors text-left"
                  >
                    <div className="text-white font-semibold text-sm">
                      {dateObj.display.split(',')[0]}
                    </div>
                    <div className="text-gray-400 text-xs">
                      {dateObj.display.split(',')[1]}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Time Selection */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold text-white text-center mb-4">
                Select Time
              </h4>
              <p className="text-gray-400 text-center text-sm mb-4">
                {new Date(selectedDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => handleTimeSelect(time)}
                    className="p-3 rounded-lg border border-gray-600 hover:border-blue-500 hover:bg-blue-500/10 transition-colors text-center"
                  >
                    <Clock className="h-4 w-4 mx-auto mb-1" />
                    <div className="text-white font-medium text-sm">{time}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6 text-center"
            >
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                <Calendar className="h-8 w-8 text-green-400" />
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  Confirm Your Booking
                </h4>
                <p className="text-gray-400 text-sm">
                  This will open Google Calendar to add the event
                </p>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="text-white font-semibold">
                  {new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="text-gray-300 text-sm">{selectedTime}</div>
              </div>

              <Button
                onClick={handleBookCall}
                className="w-full gradient-bg hover:opacity-90 py-3 rounded-lg"
              >
                Add to Google Calendar
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CalendarBooking;