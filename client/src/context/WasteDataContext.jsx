import React, { createContext, useState, useEffect } from "react";

export const WasteDataContext = createContext();

export const WasteDataProvider = ({ children }) => {
  const [wasteData, setWasteData] = useState(() => {
    const saved = localStorage.getItem("wasteData");
    return saved ? JSON.parse(saved) : [];
  });
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem("stats");
    return saved ? JSON.parse(saved) : {
      totalDetected: 0,
      totalDangerous: 0,
      totalRecyclable: 0,
    };
  });
  const [annotatedVideo, setAnnotatedVideo] = useState(() => {
    return localStorage.getItem("annotatedVideo") || "";
  });

  // Sauvegarder dans localStorage à chaque update
  useEffect(() => {
    localStorage.setItem("wasteData", JSON.stringify(wasteData));
  }, [wasteData]);

  useEffect(() => {
    localStorage.setItem("stats", JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem("annotatedVideo", annotatedVideo);
  }, [annotatedVideo]);

  return (
    <WasteDataContext.Provider
      value={{
        wasteData,
        setWasteData,
        stats,
        setStats,
        annotatedVideo,
        setAnnotatedVideo,
      }}
    >
      {children}
    </WasteDataContext.Provider>
  );
};
