"use client"

import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import "./css/LoadingPage.css";

const LoadingPage = () => {
    const { loading, user } = useAuth();
    const router = useRouter()

    useEffect(() => {
        if (!loading) {
            if (user) {
                router.push("/home")
            } else {
                router.push("/auth")
            }
        }
    }, [loading, router, user])

    return (
        <div className="w-screen h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
            <div className="text-center">
                <div className="mb-6">
                    <LoadingSpinner />
                </div>
                <p className="text-slate-600 text-lg font-medium">
                    Loading...
                </p>
                <p className="text-slate-400 text-sm mt-2">
                    Please wait while we verify your session
                </p>
            </div>
        </div>
    );
};

export default LoadingPage;
