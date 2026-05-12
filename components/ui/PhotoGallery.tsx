"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PhotoGalleryProps {
  photos: string[];
  alt?: string;
  className?: string;
}

export function PhotoGallery({ photos, alt = "", className }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!photos.length) return null;

  function goNext() {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % photos.length);
  }

  function goPrev() {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length);
  }

  return (
    <>
      <div className={`grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 ${className || ""}`}>
        {photos.map((photo, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted group cursor-pointer"
          >
            <Image
              src={photo}
              alt={`${alt} ${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 text-white hover:bg-white/20"
            onClick={() => setSelectedIndex(null)}
          >
            <X className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 text-white hover:bg-white/20"
            onClick={goPrev}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <div className="relative max-h-[80vh] max-w-[90vw] aspect-[4/3]">
            <Image
              src={photos[selectedIndex]}
              alt={`${alt} ${selectedIndex + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-16 text-white hover:bg-white/20"
            onClick={goNext}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
          <div className="absolute bottom-6 text-center text-sm text-white">
            {selectedIndex + 1} / {photos.length}
          </div>
        </div>
      )}
    </>
  );
}
