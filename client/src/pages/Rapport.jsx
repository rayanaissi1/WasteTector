import React, { useEffect, useState } from "react";
import axios from "axios";

const Rapport = () => {
  const [history, setHistory] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/history");
      setHistory(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error("Erreur chargement historique:", err);
    }
  };

  const handleFilter = () => {
    let result = [...history];
    if (filterType !== "all") {
      result = result.filter((entry) =>
        entry.results.some((r) => r.type === filterType)
      );
    }
    if (filterDate) {
      result = result.filter((entry) => {
        const date = new Date(entry.date || entry._id?.timestamp);
        return date.toISOString().slice(0, 10) === filterDate;
      });
    }
    setFiltered(result);
  };

  const downloadReport = (jsonFile, type = "csv") => {
    const link = document.createElement("a");
    link.href = `http://localhost:5000/export/${type}/${jsonFile}`;
    link.download = `${jsonFile}.${type}`;
    link.click();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-teal-700">
        Historique des vidéos analysées
      </h1>

      <div className="flex items-center gap-4 mb-6">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="all">Tous</option>
          <option value="Dangereux">Dangereux</option>
          <option value="Non">Non Dangereux</option>
        </select>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <button
          onClick={handleFilter}
          className="bg-teal-600 text-white px-4 py-2 rounded"
        >
          Filtrer
        </button>
      </div>

      <div className="space-y-4">
        {filtered.map((item, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded shadow border border-gray-200"
          >
            <h3 className="text-lg font-semibold mb-2 text-teal-700">
              Vidéo : {item.filename}
            </h3>
            <p className="text-sm mb-2">
              Annotée : <code>{item.annotated_video}</code>
            </p>
            <p className="text-sm mb-2">
              Fichier JSON : <code>{item.json_file}</code>
            </p>
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => downloadReport(item.json_file, "pdf")}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
              >
                Télécharger PDF
              </button>
              <button
                onClick={() => downloadReport(item.json_file, "csv")}
                className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded"
              >
                Télécharger CSV
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rapport;
