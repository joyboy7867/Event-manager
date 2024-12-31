"use client";
import React, { useEffect, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
} from "date-fns";
import { Button } from "@/components/ui/button";
import DownloadComponent from "../components/Download";
export function ButtonDemo() {
  return <Button>Button</Button>;
}

interface Event {
  id: number;
  name: string;
  description: string;
  startTime: string; // New
  endTime: string;
}
const CalendarGrid: React.FC = () => {
  const [events, setEvents] = useState<Record<string, Event[]>>({});
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  // Load events from localStorage on mount
  useEffect(() => {
    const storedEvents = localStorage.getItem("calendar-events");
    if (storedEvents) {
      console.log("Loaded events from localStorage:", storedEvents);
      setEvents(JSON.parse(storedEvents));
    }
    setIsInitialized(true);
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    if (isInitialized) {
      console.log("Saving events to localStorage:", events);
      localStorage.setItem("calendar-events", JSON.stringify(events));
    }
  }, [events, isInitialized]);

  const generateGrid = () => {
    const start = startOfWeek(startOfMonth(currentDate));

    const end = endOfWeek(endOfMonth(currentDate));

    const days = [];
    let day = start;

    while (day <= end) {
      days.push(day);
      day = addDays(day, 1);
    }

    return days;
  };
  const changeMonth = (direction: number) => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + direction, 1)
    );
  };

  const checkOverlap = (date: string, newEvent: Event) => {
    const existingEvents = events[date] || [];

    for (const event of existingEvents) {
      const existingStart = new Date(`${date} ${event.startTime}`);
      const existingEnd = new Date(`${date} ${event.endTime}`);
      const newStart = new Date(`${date} ${newEvent.startTime}`);
      const newEnd = new Date(`${date} ${newEvent.endTime}`);

      if (
        (newStart >= existingStart && newStart < existingEnd) ||
        (newEnd > existingStart && newEnd <= existingEnd)
      ) {
        return true;
      }
    }

    return false;
  };
  const handleDeleteEvent = (date: string, eventId: number) => {
    setEvents((prev) => ({
      ...prev,
      [date]: prev[date]?.filter((event) => event.id !== eventId) || [],
    }));
  };
  const handleUpdateEvent = (date: string, eventId: number) => {
    const updatedName = prompt("Enter the new event name:");
    const updateddesc = prompt("Enter the new description:");
    const updatedstarttime = prompt("Enter the new Start Time:");
    const updatedendtime = prompt("Enter the new End Time:");
    if (!updatedName) return;
    if (!updateddesc) return;
    if (!updatedstarttime) return;
    if (!updatedendtime) return;

    setEvents((prev) => ({
      ...prev,
      [date]:
        prev[date]?.map((event) =>
          event.id === eventId
            ? {
                ...event,
                name: updatedName,
                description: updateddesc,
                startTime: updatedstarttime,
                endTime: updatedendtime,
              }
            : event
        ) || [],
    }));
  };

  const handleAddEvent = (date: string) => {
    const eventName = prompt("Enter event name:");
    if (!eventName) return;
    const eventdesc = prompt("Enter the event description:");
    if (!eventdesc) return;
    const startTime = prompt("Enter the start time (e.g., 10:00 AM):");
    if (!startTime) return;
    const endTime = prompt("Enter the end time (e.g., 11:00 AM):");
    if (!endTime) return;

    if (!eventdesc) return;
    const newEvent: Event = {
      id: Date.now(),
      name: eventName,
      description: eventdesc,
      startTime,
      endTime,
    };
    if (checkOverlap(date, newEvent)) {
      alert(
        "Event overlaps with an existing event. Please choose a different time."
      );
      return; // Prevent adding the overlapping event
    }

    setEvents((prev) => ({
      ...prev,
      [date]: [...(prev[date] || []), newEvent],
    }));
  };

  const days = generateGrid();
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <div>
      {/* Month Navigation */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <button className="move" onClick={() => changeMonth(-1)}>
          ← Previous
        </button>
        <h2 className="month">{format(currentDate, "MMMM yyyy")}</h2>
        <button className="move" onClick={() => changeMonth(1)}>
          Next →
        </button>
      </header>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "10px",
          marginBottom: "10px",
        }}
      >
        {dayNames.map((dayName, index) => (
          <div
            key={index}
            style={{
              textAlign: "center",
              fontWeight: "bold",
              background: "lightgray",
              padding: "5px",
            }}
          >
            {dayName}
          </div>
        ))}
      </div>
      {/* Calendar Grid */}
      <div
        className="Calendar"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "10px",
        }}
      >
        {days.map((day, index) => {
          const dateKey = format(day, "yyyy-MM-dd");
          const isWeekend = index % 7 === 0 || index % 7 === 6;

          return (
            <div
              key={index}
              onClick={() => handleAddEvent(dateKey)}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                textAlign: "center",
                background:
                  format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")
                    ? "lightblue"
                    : isWeekend
                    ? "lightgreen" // Highlight weekends with a different color
                    : "white",
                color:
                  day.getMonth() === currentDate.getMonth() ? "black" : "gray",
                cursor: "pointer",
              }}
            >
              <div>{format(day, "d")}</div>
              {/* Render Events */}
              <div>
                {events[dateKey]?.map((event) => (
                  <div
                    key={event.id}
                    style={{
                      marginTop: "5px",
                      fontSize: "0.8em",
                      background: "lightgray",
                      borderRadius: "4px",
                      padding: "6px",
                    }}
                  >
                    <h2 className="Heading ">Name: {event.name}</h2>
                    <h4 className="Descp">Description: {event.description}</h4>
                    <h6>
                      {event.startTime}---{event.endTime}
                    </h6>
                    <div>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpdateEvent(dateKey, event.id);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        className="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteEvent(dateKey, event.id);
                        }}
                      >
                        X
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <DownloadComponent events={events} currentDate={currentDate} />
    </div>
  );
};

export default CalendarGrid;
