import { Calculator } from "@/components/custom/calculator";
import { Button } from "@/components/ui/button";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex p-1.5 border rounded-xl bg-neutral-900 border-neutral-800">
        <div className="p-5">
          <Calculator></Calculator>
        </div>
        <div className="bg-neutral-950 border border-neutral-800 p-10 rounded-lg">
          {/* <Button variant={"outline"}>Olá como estás?</Button> */}
        </div>
      </div>
      <Toaster closeButton theme="dark"/>
    </div>
  );
}
