import { Button } from "@/components/ui/button";
import React from "react";

interface Event {
  id: number;
  name: string;
  description: string;
}

interface DownloadProps {
  events: Record<string, Event[]>;
  currentDate: Date;
}

const DownloadComponent: React.FC<DownloadProps> = ({ events, currentDate }) => {
  const exportEvents = (formatType: "json") => {
    
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    
    const filteredEvents = Object.entries(events).filter(([date]) => {
      const eventDate = new Date(date);
      return eventDate.getMonth() === month && eventDate.getFullYear() === year;
    });

    if (filteredEvents.length === 0) {
      alert("No events to export for this month.");
      return;
    }

    if (formatType === "json") {
      const jsonData = JSON.stringify(
        Object.fromEntries(filteredEvents),
        null,
        2
      );
      const blob = new Blob([jsonData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `events_${year}_${month + 1}.json`;
      a.click();
    } 
  };

  return (
    <div className="download">
      <Button onClick={() => exportEvents("json")}>Export as JSON</Button>
      
    </div>
  );
};

export default DownloadComponent;
