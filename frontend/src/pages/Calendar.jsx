import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, addMonths, subMonths, isSameMonth, isSameDay, isToday } from 'date-fns';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { tasksData } from '../data/mockData';
import './Calendar.css';

const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const days = eachDayOfInterval({ start: startDate, end: endDate });

    const getTasksForDate = (date) => {
        // Mock logic: assign random tasks to dates for demo
        // In real app, tasks would have dates
        const dayNum = date.getDate();
        return tasksData.filter(task => (task.id + dayNum) % 5 === 0);
    };

    return (
        <div className="calendar-page">
            <div className="calendar-header">
                <h1>Calendar</h1>
                <div className="calendar-nav">
                    <button onClick={prevMonth} className="nav-btn"><FaChevronLeft /></button>
                    <span className="current-month">{format(currentMonth, 'MMMM yyyy')}</span>
                    <button onClick={nextMonth} className="nav-btn"><FaChevronRight /></button>
                </div>
            </div>

            <div className="calendar-grid">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="calendar-day-header">{day}</div>
                ))}
                {days.map(day => {
                    const dayTasks = getTasksForDate(day);
                    return (
                        <div
                            key={day.toString()}
                            className={`calendar-day ${!isSameMonth(day, monthStart) ? 'disabled' : ''} ${isSameDay(day, selectedDate) ? 'selected' : ''} ${isToday(day) ? 'today' : ''}`}
                            onClick={() => setSelectedDate(day)}
                        >
                            <span className="day-number">{format(day, 'd')}</span>
                            <div className="day-tasks">
                                {dayTasks.map(task => (
                                    <div key={task.id} className={`calendar-task ${task.priority.toLowerCase()}`}>
                                        {task.title}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Calendar;
