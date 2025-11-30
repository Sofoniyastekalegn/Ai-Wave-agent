import React from 'react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";


import { Calendar, Clock, X, ArrowLeft } from 'lucide-react';

const CalenderBooking = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState("");

    const [selectedItem, setSelectedItem] = useState("");


    // genreate next 30 days (weekdays only) 

    const generateDates = () => {
        const dates = []; 

        const [step, setStep] = useState(false);
        const [selectedDate, setSelectedDate] = useState("");

        const [selectedItem, setSelectedItem] = useState("");

        // genrate next 30 days (weekdays only)


        const generateTimes = () => {
            const dates = [];

            const today = new Date();

            for (let i = 0; i <= 30; i++) {
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


  // avaible tie slots 
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