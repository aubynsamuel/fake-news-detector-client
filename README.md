# Truth Guard

Truth Guard is a modern, full-featured web application designed to help users detect fake news and misinformation. Built with Next.js and TypeScript, it provides a seamless and responsive user experience for analyzing news headlines with an AI-powered backend. The application includes secure user authentication, a persistent search history, and customizable user settings.

## ✨ Features

- **🚀 AI-Powered Headline Analysis**: Submit any news headline and receive a detailed analysis from our AI model.
- **📊 Comprehensive Results**: Get a clear verdict (e.g., "Likely True," "Misleading"), a confidence score, and a breakdown of metrics:
  - **Claim Verification**: How well the claim is backed by credible sources.
  - **Source Credibility**: The trustworthiness of the news sources.
  - **Clickbait Detection**: Whether the headline uses sensational language.
  - **Network Propagation**: How widely the news is being shared.
- **🔐 Secure User Authentication**: Sign up, sign in, and password reset functionality powered by Firebase Authentication.
- **📖 Search History**: Authenticated users can access a history of their past analyses.
- **⚙️ User Settings**: Users can update their profile information and manage their account.
- **🌓 Light & Dark Mode**: A sleek theme switcher for a comfortable viewing experience.
- **📱 Responsive Design**: A mobile-first design that looks great on all devices.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Authentication**: [Firebase Authentication](https://firebase.google.com/docs/auth)
- **Database**: [Firestore](https://firebase.google.com/docs/firestore) for user data and search history.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Custom CSS Modules.
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **AI Backend**: The frontend communicates with a [Gradio](https://www.gradio.app/) ML model for analysis.
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/).

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js and npm (or yarn/pnpm) installed on your machine.

- Node.js (v18.x or later recommended)
- npm

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/aubynsamuel/fake-news-detector-client.git
   cd truth-guard
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root of the project and add your Firebase project configuration. You can find these keys in your Firebase project console.

   ```.env.local
   NEXT_PUBLIC_API_KEY=your_api_key
   NEXT_PUBLIC_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_PROJECT_ID=your_project_id
   NEXT_PUBLIC_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_APP_ID=your_app_id
   NEXT_PUBLIC_MEASUREMENT_ID=your_measurement_id
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Backend

The AI-powered analysis is handled by a separate backend repository. You can find the source code and more details here:

- **Backend Repository**: [fake-news-detector](https://github.com/aubynsamuel/fake-news-detector)
