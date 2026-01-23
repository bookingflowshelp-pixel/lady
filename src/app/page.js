import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { VideoGrid } from "@/components/VideoGrid";

export default function App() {
  return (
    <div className="min-h-screen bg-[#050914] text-[#f9fafb]">
      <Header />
      <main className="pt-20 pb-28 md:pb-10">
        <VideoGrid />
      </main>
      <Footer />
    </div>
  );
}
