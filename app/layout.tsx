"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./css/App.css";
import "./css/index.css";
// import "./css/FontAwesome.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false)
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <AuthProvider>
                    <Sidebar
                        isVisible={isSideBarOpen}
                        toggleSideBar={() => setIsSideBarOpen(false)}
                    />
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}
