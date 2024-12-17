import { Header } from "@/components/Header";
import { Preview } from "@/components/Preview";
import { Section } from "@/components/Sections";

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <Header/>
      <main className="w-full h-screen flex items-center justify-center gap-8">
        <Section />
        <Preview />
      </main>
    </div>
  );
}
