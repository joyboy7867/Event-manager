
import Footer from "@/src/components/Footer";
import CalendarGrid from "../src/components/Calendar"
export default function Home() {
  return (
    <div>
      <div className="flex justify-center text-4xl font-extrabold pb-10 font-serif">
        <h1>Event Manager</h1>
      </div>
      <CalendarGrid/>
      <Footer/>
    </div>
    
        
      
  );
}
