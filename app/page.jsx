"use client";

import Image from "next/image";
import FormTimer from "./FormTimer";

export default function Home() {
  return (
    <div className="mx-auto bg-cyan-900 min-h-full">
      <FormTimer />
    </div>
  );
}
