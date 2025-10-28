export const LoadingSpinner = () => (
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