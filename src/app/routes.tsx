import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Dashboard } from "./components/Dashboard";
import { CriteriaManagement } from "./components/CriteriaManagement";
import { BestPractices } from "./components/BestPractices";
import { Diagnostics } from "./components/Diagnostics";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Dashboard },
      { path: "gestao", Component: CriteriaManagement },
      { path: "boas-praticas", Component: BestPractices },
      { path: "diagnostico", Component: Diagnostics },
    ],
  },
]);
