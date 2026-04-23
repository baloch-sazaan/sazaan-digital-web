import React from "react";
import { HeroParallax } from "./ui/hero-parallax";
import { SectionLabel } from "./Primitives";

// Import local Aceternity Demo assets exclusively
import moonbeamImg from '@/assets/img/moonbeam.webp';
import cursorImg from '@/assets/img/cursor.webp';
import rogueImg from '@/assets/img/rogue.webp';
import editoriallyImg from '@/assets/img/editorially.webp';
import editrixImg from '@/assets/img/editrix.webp';
import pixelperfectImg from '@/assets/img/pixelperfect.webp';
import algochurnImg from '@/assets/img/algochurn.webp';
import aceternityuiImg from '@/assets/img/aceternityui.webp';
import tailwindmasterkitImg from '@/assets/img/tailwindmasterkit.webp';
import smartbridgeImg from '@/assets/img/smartbridge.webp';
import renderworkImg from '@/assets/img/renderwork.webp';
import cremedigitalImg from '@/assets/img/cremedigital.webp';
import goldenbellsacademyImg from '@/assets/img/goldenbellsacademy.webp';
import invokerImg from '@/assets/img/invoker.webp';
import efreeinvoiceImg from '@/assets/img/efreeinvoice.webp';

export function HeroParallaxDemo() {
  return <HeroParallax products={products} />;
}

export const products = [
  {
    title: "Moonbeam Agency",
    link: "https://gomoonbeam.com",
    thumbnail: moonbeamImg,
  },
  {
    title: "Cursor AI",
    link: "https://cursor.so",
    thumbnail: cursorImg,
  },
  {
    title: "Rogue Studio",
    link: "https://userogue.com",
    thumbnail: rogueImg,
  },
  {
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail: editoriallyImg,
  },
  {
    title: "Editrix UI",
    link: "https://editrix.ai",
    thumbnail: editrixImg,
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail: pixelperfectImg,
  },
];
