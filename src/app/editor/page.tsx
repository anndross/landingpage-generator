import { LateralBar } from "@/modules/Editor/LateralBar";
import { Preview } from "@/modules/Editor/Preview";
import { Layout } from "@/modules/Editor/Preview/Layout";
import { Header } from "@/components/ui/Header";

export default async function Editor() {
  return (
    <div className="w-full min-h-screen">
      <Header />
      <main className="w-full h-screen flex items-center justify-left">
        <LateralBar />
        <Preview>
          <Layout />
        </Preview>
      </main>
    </div>
  );
}
