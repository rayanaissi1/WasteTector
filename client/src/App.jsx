import { BrowserRouter, Route, Routes } from "react-router-dom";
import SideBar from "./components/SideBar";
import Dashboard from "./pages/Dashboard";
import Statistique from "./pages/Statistique";
import Rapport from "./pages/Rapport";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="flex h-screen">
          {" "}
          {/* flex container for sidebar + content */}
          <SideBar />
          <div className="flex-1 p-6 overflow-y-auto">
            {" "}
            {/* page content area */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/statistique" element={<Statistique />} />
              <Route path="/rapport" element={<Rapport />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
