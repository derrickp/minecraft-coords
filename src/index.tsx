import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "./App";
import { getFirebaseApp } from "./bootstrap/firebase";
import { FirebaseProvider } from "./hooks/firebase";

const element = document.getElementById("app");

if (!element) {
  console.error("Nothing is going to work now.");
}

const app = getFirebaseApp();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: Infinity,
    },
  },
});

const renderApp = () => {
  if (!element) {
    return;
  }

  const root = createRoot(element);

  root.render(
    <BrowserRouter>
      <FirebaseProvider value={app}>
        <QueryClientProvider client={queryClient}>
          <App name="Minecraft Coordinate Keeper" />
        </QueryClientProvider>
      </FirebaseProvider>
    </BrowserRouter>,
  );
};

renderApp();
