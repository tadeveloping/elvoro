"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { initEffects } from "./effects";

export function Effects() {
  useEffect(() => {
    initEffects(gsap);
  }, []);
  return null;
}
