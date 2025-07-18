import { sendPasswordResetEmail as firebaseSendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/firebase";

export const sendPasswordResetEmail = async (email: string) => {
  try {
    await firebaseSendPasswordResetEmail(auth, email);
    return {
      success: true,
      message: "Password reset email sent! Check your inbox.",
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
