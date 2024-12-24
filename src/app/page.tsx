import { Editor } from "@/components/Editor";
import { Header } from "@/components/ui/Header";

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <Header />
      <Editor />
    </div>
  );
}
