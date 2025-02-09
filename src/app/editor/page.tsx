import { LateralBar } from "@/components/LateralBar";
import { Preview } from "@/components/Preview";
import { LayoutPreview } from "@/components/Preview/PreviewElements";
import { Header } from "@/components/ui/Header";

export default function Editor() {
  return (
    <div className="w-full min-h-screen">
      <Header />
      <main className="w-full h-screen flex items-center justify-left">
        <LateralBar />
        <Preview>
          <LayoutPreview />
        </Preview>
      </main>
    </div>
  );
}
