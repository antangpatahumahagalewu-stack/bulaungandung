"use client";

import dynamic from "next/dynamic";

const Studio = dynamic(() => import("./StudioClient"), { ssr: false });

export default function StudioPage() {
  return <Studio />;
}
