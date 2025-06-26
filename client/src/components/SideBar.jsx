import { Link, useLocation } from "react-router-dom";
import { navBarItems } from "../assets/navBarItems";
import { ChevronDown } from "lucide-react";

const SideBar = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-72 bg-gradient-to-b from-teal-600 to-teal-700 text-white flex flex-col shadow-xl">
        {/* Logo Section */}
        <div className="p-6 border-b border-teal-500/30">
          <div className="flex items-center space-x-3">
            <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm">
              <div className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">WasteTector</h1>
              <p className="text-teal-200 text-sm">Your Smart Waste Detector</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navBarItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                  isActive ? "bg-white/20" : "hover:bg-white/10"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Info */}
        <Link to={"/profile"}>
          <div className="p-4 border-t border-teal-500/30">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/10">
              <div className="bg-white/20 p-2 rounded-full w-10 h-10" />
              <div className="flex-1">
                <p className="text-sm font-medium">Station Redal</p>
                <p className="text-xs text-teal-200">station redal sale</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
