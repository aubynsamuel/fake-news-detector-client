import { useAuth } from "../contexts/AuthContext";
import AuthToggle from "./AuthPage";
import HomeScreen from "./HomePage";
import "../css/LoadingPage.css";

const LoadingSpinner = () => (
  <div className="flex items-center justify-center gap-2">
    <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
    <div
      className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"
      style={{ animationDelay: "0.3s" }}
    ></div>
    <div
      className="w-4 h-4 bg-blue-700 rounded-full animate-pulse"
      style={{ animationDelay: "0.6s" }}
    ></div>
  </div>
);

const LoadingPage = () => {
  const { loading, user } = useAuth();

  if (loading) {
    return (
      <div className="w-[100dvw] h-[100dvh] bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
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
  }

  return user ? <HomeScreen /> : <AuthToggle />;
};

export default LoadingPage;
