"use client";
import { useEffect, useState } from "react";

function parts(ms: number) {
  const s =Math.max(0, Math.floor(ms /1000));
  return {
     days: Math.floor(s /86400),
     hours: Math.floor((s % 86400) / 3600),
     minutes: Math.floor((s %3600) / 60),
     seconds: s % 60,
   };
}

export default function Countdown({ target }: { target: string }) {
 const end = new Date(target).getTime();
 const [left,setLeft] = useState<number | null>(null);

 useEffect(() => {
   const tick =() => setLeft(end - Date.now());
   tick();
   const id = setInterval(tick, 1000);
   return () => clearInterval(id);
 }, [end]);

 if (left ===null || Number.isNaN(end))

 if (left <= 0) {
    return <p className="text-lg font-semibold">It&apos;s happening now! </p>
 }

 const t = parts(left);
 const items = [
    ["Days", t.days],
    ["Hours", t.hours],
    ["Minutes", t.minutes],
    ["Seconds", t.seconds],
 ] as const;
 
 return (
    <div className="grid grid-cols-4 gap-3text-center" aria-live="off">
     {items.map(([label, value]) => (
      <div key={label} className="rounded-lg border px-2 py-4">
       <div className="text-3xl font-serif tabular-nums">
	 {String(value).padStart(2,  "0")}
       </div>	
       <div className="mt-1 text-xs uppercase tracking-widest opacity-70">
	 {label}
       </div>
     </div>
    ))}
  </div>
 );
}
