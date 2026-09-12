import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WBLW Community Radio Archive | Signal 13",
  description: "Recovered tapes from a station that should no longer be broadcasting.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}
