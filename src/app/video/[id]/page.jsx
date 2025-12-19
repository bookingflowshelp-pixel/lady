import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import VideoPlayer from "@/components/VideoPlayer";

export default function Page({ params }) {

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F2F2F2]">
      <Header />

      <div className="pt-[70px] bg-[#0B0B0B]">
        <VideoPlayer slug={params?.id} />
      </div>

      <Footer />
    </div>
  );
}
