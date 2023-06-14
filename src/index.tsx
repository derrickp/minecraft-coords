import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { App } from "./App";

const element = document.getElementById("app");

if (!element) {
  console.error("Nothing is going to work now.");
}

function renderApp() {
  if (!element) {
    return;
  }

  const root = createRoot(element);

  root.render(
    <BrowserRouter>
      <App name="Minecraft Coordinate Keeper" />
    </BrowserRouter>
  );
}

renderApp();
