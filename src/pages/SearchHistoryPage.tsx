import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../config/firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  doc,
} from "firebase/firestore";
import { FakeNewsAnalysis } from "../types";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Results from "../components/Results";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import "../css/SearchHistoryStyles.css";

interface SearchHistoryEntry {
  id: string;
  headline: string;
  results: FakeNewsAnalysis;
  timestamp: any; // Firebase Timestamp
}

const SearchHistoryPage: React.FC = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState<SearchHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedResult, setSelectedResult] = useState<FakeNewsAnalysis | null>(
    null
  );
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) {
        setLoading(false);
        setError("User not logged in.");
        return;
      }

      try {
        const q = query(
          collection(doc(db, "users", user.uid), "search_history"),
          orderBy("timestamp", "desc"),
          limit(10)
        );
        const querySnapshot = await getDocs(q);
        const fetchedHistory: SearchHistoryEntry[] = [];
        querySnapshot.forEach((doc) => {
          fetchedHistory.push({
            id: doc.id,
            ...doc.data(),
          } as SearchHistoryEntry);
        });
        setHistory(fetchedHistory);
      } catch (err: any) {
        console.error("Error fetching search history:", err);
        setError("Failed to load search history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user]);

  const handleViewDetails = (result: FakeNewsAnalysis) => {
    try {
      if (result && Object.keys(result).length > 0) {
        setSelectedResult(result);
        setError(null);
      } else {
        setError("Selected history item has no data to display.");
      }
    } catch (err) {
      console.error("Error viewing details:", err);
      setError("Failed to load details for the selected history item.");
    }
  };

  const handleBackToList = () => {
    setSelectedResult(null);
    setError(null);
  };

  return (
    <div className="container-fluid">
      <Sidebar
        isVisible={isSideBarOpen}
        toggleSideBar={() => setIsSideBarOpen(false)}
      />
      <Header
        darkMode={
          document.documentElement.getAttribute("data-theme") === "dark"
        }
        setDarkMode={() => {
          const newTheme =
            document.documentElement.getAttribute("data-theme") === "dark"
              ? "light"
              : "dark";
          document.documentElement.setAttribute("data-theme", newTheme);
          localStorage.setItem("theme", newTheme);
        }}
        toggleSideBar={() => setIsSideBarOpen(true)}
      />

      <main className="main-content search-history-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="search-history-container"
        >
          <h1 className="search-history-title">Search History</h1>

          {loading && <p className="text-center">Loading history...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          {!loading && !error && history.length === 0 && (
            <p className="text-center text-gray-500">
              No search history found.
            </p>
          )}

          {!selectedResult ? (
            <div className="history-list">
              {history.map((entry) => (
                <div
                  key={entry.id}
                  className="history-item hover:cursor-pointer"
                  onClick={() => handleViewDetails(entry.results)}
                >
                  <div className="history-item-content truncate ">
                    <p className="history-headline truncate">
                      {entry.headline || "Headline not available"}
                    </p>

                    <span className="history-date truncate">
                      {entry.timestamp?.toDate
                        ? new Date(entry.timestamp.toDate()).toLocaleString()
                        : "Date not available"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="selected-result-view">
              <div onClick={handleBackToList} className="back-button">
                <ChevronLeft size={20} /> Back to History
              </div>
              <Results results={selectedResult} />
            </div>
          )}
        </motion.div>
      </main>
      {history.length > 0 && <Footer />}
    </div>
  );
};

export default SearchHistoryPage;
