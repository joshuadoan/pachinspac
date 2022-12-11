import React from "react";
import ReactDOM from "react-dom/client";
import { FpsView } from "react-fps";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import App from "./App";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/:id" element={<App />} />
      <Route path="*" element={<App />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <FpsView left={"80%"} bottom={"10%"} />
    <RouterProvider router={router} />
  </React.StrictMode>
);
