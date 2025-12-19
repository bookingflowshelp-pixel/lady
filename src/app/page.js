import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { VideoGrid } from "@/components/VideoGrid";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F2F2F2]">
      <Header />
      <main className="pt-20 pb-28 md:pb-10">
        <VideoGrid />
      </main>
      <Footer />
     
    </div>
  );
}
