export const getFirebaseErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
        // Firebase Auth Errors
        case "auth/invalid-email":
            return "The email address you entered is invalid.";
        case "auth/user-not-found":
            return "No user found with this email. Please sign up first.";
        case "auth/wrong-password":
            return "The password you entered is incorrect.";
        case "auth/popup-closed-by-user":
            return "The sign-in popup was closed before completing the process.";
        case "auth/cancelled-popup-request":
            return "The sign-in popup was closed before completing the process.";
        case "auth/email-already-in-use":
            return "This email is already registered. Please use another one or sign in.";
        case "auth/network-request-failed":
            return "Network error. Please check your internet connection.";
        case "auth/too-many-requests":
            return "Too many attempts. Please try again later.";
        case "auth/weak-password":
            return "The password is too weak. Please choose a stronger password.";
        case "auth/requires-recent-login":
            return "This operation is sensitive and requires recent authentication. Please sign in again.";
        case "auth/user-disabled":
            return "This user account has been disabled.";
        case "auth/operation-not-allowed":
            return "This operation is not allowed. Please contact support.";
        case "auth/invalid-credential":
            return "The credential provided is invalid.";

        // Firestore Errors
        case "firestore/not-found":
            return "The requested document was not found.";
        case "firestore/permission-denied":
            return "You do not have permission to access this resource.";
        case "firestore/unavailable":
            return "The service is currently unavailable. Please try again later.";
        case "firestore/deadline-exceeded":
            return "The operation took too long to complete. Please try again.";
        case "firestore/cancelled":
            return "The operation was cancelled.";
        case "firestore/unknown":
            return "An unknown error occurred with the database.";
        case "firestore/invalid-argument":
            return "An invalid argument was provided to a database method.";
        case "firestore/unauthenticated":
            return "You must be authenticated to perform this action.";
        case "firestore/already-exists":
            return "The document you are trying to create already exists.";
        case "firestore/aborted":
            return "The operation was aborted, typically due to a concurrency issue.";

        default:
            return "Something went wrong. Please try again.";
    }
};