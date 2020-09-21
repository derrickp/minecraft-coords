import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { App } from "./App";

const element = document.getElementById("app");

if (!element) {
  console.error("Nothing is going to work now.");
}

function renderApp() {
  render(
    <BrowserRouter>
      <App name="Minecraft Coordinate Keeper" />
    </BrowserRouter>,
    element
  );
}

renderApp();
