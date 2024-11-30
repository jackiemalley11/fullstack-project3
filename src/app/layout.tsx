import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tech Roster Admin",
  description: "The Tech Roster Admin demo for PROG3017",
};

export default function RootLayout({ children }:Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="en">
      <body>
        <main className="overflow-y-auto min-h-screen p-5 bg-white">
            <div className="font-bold text-xl pb-2.5">_Technology Roster: Course Admin</div>

            {children}

            <div className="mt-10 mb-2.5">Web App powered  by<a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline"> Next JS</a> | <a href="https://www.mongodb.com/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">MongoDB</a></div>
        </main>
      </body>
    </html>
  );
}
