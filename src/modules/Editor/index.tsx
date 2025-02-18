import { LateralBar } from "./Manager";
import { Preview } from "./Preview";
import { Layout } from "./Preview/Layout";

export function Editor() {
  return (
    <main className="w-full h-screen flex items-center justify-left">
      <LateralBar />
      <Preview>
        <Layout />
      </Preview>
    </main>
  );
}
