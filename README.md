# Truth Guard

This is the front-end for Truth Guard, a fake news detection system. This application is built with React, Vite, and Tailwind CSS, and it uses Firebase for authentication. It includes user authentication, a search history feature, and a settings page, providing a comprehensive user interface for interacting with the fake news detection system.

## Getting Started

To get started, you'll need to have Node.js and npm installed.

1. Clone the repository:
2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up your Firebase configuration. Create a `.env` file in the root of the project and add the following environment variables:

   ```.env
   VITE_API_KEY=your_api_key
   VITE_AUTH_DOMAIN=your_auth_domain
   VITE_PROJECT_ID=your_project_id
   VITE_STORAGE_BUCKET=your_storage_bucket
   VITE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_APP_ID=your_app_id
   VITE_MEASUREMENT_ID=your_measurement_id
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

## Folder Structure

The folder structure is as follows:

```
.
├── public
│   └── vite.svg
├── src
│   ├── assets
│   │   └── react.svg
│   ├── components
│   │   ├── Error.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── HeadlineInput.tsx
│   │   ├── MetricsExplanation.tsx
│   │   ├── Results.tsx
│   │   └── Sidebar.tsx
│   ├── config
│   │   └── firebase.ts
│   ├── contexts
│   │   └── AuthContext.tsx
│   ├── css
│   │   ├── App.css
│   │   ├── AuthStyles.css
│   │   ├── FontAwesome.css
│   │   ├── index.css
│   │   ├── LoadingPage.css
│   │   ├── SearchHistoryStyles.css
│   │   └── SettingsStyles.css
│   ├── data
│   │   └── mockServerResponse.ts
│   ├── lib
│   │   ├── headlineValidation.ts
│   │   └── utils.ts
│   ├── pages
│   │   ├── AuthPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── LoadingPage.tsx
│   │   ├── SearchHistoryPage.tsx
│   │   └── SettingsPage.tsx
│   ├── types
│   │   └── index.ts
│   ├── App.tsx
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js
```
