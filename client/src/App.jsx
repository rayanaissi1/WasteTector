import { BrowserRouter, Route, Routes } from "react-router-dom";
import SideBar from "./components/SideBar";
import Dashboard from "./pages/Dashboard";
import Statistique from "./pages/Statistique";
import Rapport from "./pages/Rapport";
import Profile from "./pages/Profile";
import { WasteDataProvider } from "./context/WasteDataContext";

const App = () => {
  return (
    <>
      <WasteDataProvider>
        <BrowserRouter>
          <div className="flex h-screen">
            <SideBar />
            <div className="flex-1 p-6 overflow-y-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/statistique" element={<Statistique />} />
                <Route path="/rapport" element={<Rapport />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </WasteDataProvider>
    </>
  );
};

export default App;
