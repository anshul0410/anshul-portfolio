import { ImageResponse } from "next/og";
import { MonogramTile } from "@/lib/brand";

// Home-screen icon for iOS. Square corners: iOS applies its own rounding.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(<MonogramTile size={180} radius={0} />, size);
}
