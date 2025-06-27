import { LayoutDashboard, FileText, BarChart } from "lucide-react";

export const navBarItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },

  {
    id: "statistique",
    label: "Statistique",
    path: "/statistique",
    icon: BarChart,
  },

  {
    id: "rapport",
    label: "Rapport",
    path: "/rapport",
    icon: FileText,
  },
];
