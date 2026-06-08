import type { Metadata } from "next";
import { DeckClient } from "./DeckClient";

export const metadata: Metadata = {
  title: "Portfolio Deck — Dheeraj Kashyap",
  description: "Interactive portfolio presentation — BI & Analytics Engineer with 7+ years building data platforms, Power BI dashboards, and enterprise analytics.",
};

export default function DeckPage() {
  return <DeckClient />;
}
