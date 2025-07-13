"use client"

import { Calculator } from "@/components/custom/calculator";
import Display from "@/components/custom/display";
import { useState } from "react";
import { toast, Toaster } from "sonner";

export default function Home() {
  const [total, setTotal] = useState(0);
  const [monthly, setMonthly] = useState(0);
  const [interestMonthly, setInterest] = useState(0);
  const [interestTotal, setInterestTotal] = useState(0);
  const handleDisplay = (data) => {
    setTotal(data.total);
    setMonthly(data.monthly);
    setInterest(data.interestMonthly);
    setInterestTotal(data.interestTotal);
    toast("Calculation complete");
  } 

  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex p-1.5 border rounded-xl bg-neutral-900 border-neutral-800">
        <div className="p-5">
          <Calculator onCalculate={handleDisplay}/>
        </div>
        <div className="bg-neutral-950 border border-neutral-800 p-5 rounded-lg">
          <Display total={total} monthly={monthly} interestMonthly={interestMonthly} interestTotal={interestTotal}/>
        </div>
      </div>
      <Toaster closeButton theme="dark"/>
    </div>
  );
}
