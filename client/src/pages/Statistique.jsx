import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  Legend,
} from "recharts";

const wasteConfig = {
  metal: { dangerous: false, recyclable: true },
  trash: { dangerous: false, recyclable: false },
  plastic: { dangerous: false, recyclable: true },
  organic: { dangerous: false, recyclable: true },
  medical: { dangerous: true, recyclable: false },
  glass: { dangerous: false, recyclable: true },
  "e-waste": { dangerous: true, recyclable: false },
  clothes: { dangerous: false, recyclable: true },
  carton: { dangerous: false, recyclable: true },
  battery: { dangerous: true, recyclable: false },
};

const Statistique = () => {
  const [wasteData, setWasteData] = useState([]);

  useEffect(() => {
    const savedWaste = localStorage.getItem("wasteData");
    if (savedWaste) {
      const rawData = JSON.parse(savedWaste);

      const processed = rawData.map((item) => {
        const config = wasteConfig[item.nom] || {
          dangerous: false,
          recyclable: false,
        };
        return {
          ...item,
          recyclable: config.recyclable,
          dangerous: config.dangerous,
        };
      });

      setWasteData(processed);
    }
  }, []);

  const recyclableCount = wasteData
    .filter((item) => item.recyclable)
    .reduce((sum, item) => sum + item.nombre, 0);

  const nonRecyclableCount = wasteData
    .filter((item) => !item.recyclable)
    .reduce((sum, item) => sum + item.nombre, 0);

  const dangerousCount = wasteData
    .filter((item) => item.dangerous)
    .reduce((sum, item) => sum + item.nombre, 0);

  const safeCount = wasteData
    .filter((item) => !item.dangerous)
    .reduce((sum, item) => sum + item.nombre, 0);

  return (
    <div className="p-1 space-y-4">
      <h1 className="text-2xl font-bold text-center">Statistiques Visuelles</h1>

      {/* Pie Chart */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-900/30 p-6 rounded-xl border border-gray-700">
          <h2 className="text-lg font-semibold mb-4 text-center">Recyclabilité</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: "Recyclable", value: recyclableCount },
                  { name: "Non recyclable", value: nonRecyclableCount },
                ]}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                <Cell fill="#14b8a6" />
                <Cell fill="#64748b" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Radial Chart */}
        <div className="bg-red-900/30 p-6 rounded-xl border border-red-700">
          <h2 className="text-lg font-semibold mb-4 text-center">
            Déchets Dangereux vs Non Dangereux
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="40%"
              outerRadius="100%"
              barSize={20}
              data={[
                { name: "Dangereux", value: dangerousCount, fill: "#dc2626" },
                { name: "Non Dangereux", value: safeCount, fill: "#10b981" },
              ]}
            >
              <RadialBar background clockWise dataKey="value" />
              <Legend
                iconSize={10}
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
              />
              <Tooltip />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-teal-900/30 p-6 rounded-xl border border-teal-700 ">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Quantité par type de déchet
        </h2>
        <ResponsiveContainer width="70%" height={300}>
          <BarChart data={wasteData}>
            <XAxis dataKey="nom" stroke="#0c0b0b" />
            <YAxis stroke="#0c0b0b" />
            <Tooltip />
            <Bar dataKey="nombre" fill="#14b8a6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Statistique;
