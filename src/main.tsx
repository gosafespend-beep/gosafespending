import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { captureFirstTouch } from "./lib/appLink";

// Record acquisition context before anything can navigate away from it.
captureFirstTouch();

const container = document.getElementById("root")!;

// Prerendered routes ship with markup already inside #root. Hydrating keeps it;
// createRoot would discard and re-render it, losing the benefit and flashing.
if (container.hasChildNodes()) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
