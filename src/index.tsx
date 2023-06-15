import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { App } from "./App";
import { getFirebaseApp } from "./bootstrap/firebase";
import { FirebaseProvider } from "./hooks/firebase";

const element = document.getElementById("app");

if (!element) {
  console.error("Nothing is going to work now.");
}

const app = getFirebaseApp();

const renderApp = () => {
  if (!element) {
    return;
  }

  const root = createRoot(element);

  root.render(
    <BrowserRouter>
      <FirebaseProvider value={app}>
        <App name="Minecraft Coordinate Keeper" />
      </FirebaseProvider>
    </BrowserRouter>,
  );
};

renderApp();
