/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./css/App.css";
import "./css/index.css";
// import "./css/FontAwesome.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";

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
    const [darkMode, setDarkMode] = useState(false);
    const pathName = usePathname()

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        setDarkMode(savedTheme === "dark");

    }, []);

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            darkMode ? "dark" : "light"
        );
        localStorage.setItem("theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased ${darkMode ? "dark" : ""} flex flex-col justify-center items-center`}
            >
                <AuthProvider>
                    {(pathName != "/" && pathName != "/auth") &&
                        <>
                            <Sidebar
                                isVisible={isSideBarOpen}
                                setIsSideBarOpen={setIsSideBarOpen}
                            />
                            <Header
                                darkMode={darkMode}
                                setDarkMode={setDarkMode}
                                setIsSideBarOpen={setIsSideBarOpen}
                            />
                        </>
                    }
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}
