import React, { useEffect, useState } from "react";

const Rapport = () => {

    const [wasteData, setWasteData] = useState([]);

     const [stats, setStats] = useState({
    totalDetected: 0,
    totalDangerous: 0,
    totalRecyclable: 0,
  });

  // Configuration des déchets avec leurs propriétés
  const wasteConfig = {
    metal: { dangerous: false, recyclable: true, company: "Technoplast SA" },
    trash: { dangerous: false, recyclable: false, company: "Veolia" },
    plastic: { dangerous: false, recyclable: true, company: "Ab Genera" },
    organic: { dangerous: false, recyclable: true, company: "Veolia" },
    medical: { dangerous: true, recyclable: false, company: "Avira SA" },
    glass: { dangerous: false, recyclable: true, company: "Redal" },
    "e-waste": { dangerous: true, recyclable: false, company: "Stoturary" },
    clothes: { dangerous: false, recyclable: true, company: "Technoplast SA" },
    carton: { dangerous: false, recyclable: true, company: "Bankfagem" },
    battery: { dangerous: true, recyclable: false, company: "EcoBat" },
    "sludge 30%": { dangerous: true, recyclable: false, company: "Stoturary" },
    "sludge 70%": { dangerous: true, recyclable: false, company: "Stoturary" },
  };

  // Données basées sur l'image
  const simulatedData = [
    { nom: "plastic", nombre: 420 },
    { nom: "metal", nombre: 100 },
    { nom: "medical", nombre: 200 },
    { nom: "carton", nombre: 80 },
    { nom: "e-waste", nombre: 220 },
    { nom: "clothes", nombre: 305 },
    { nom: "glass", nombre: 150 },
    { nom: "organic", nombre: 180 },
    { nom: "battery", nombre: 45 },
    { nom: "trash", nombre: 250 },
  ];


    useEffect(() => {
        // Traitement des données
        const processedData = simulatedData.map((item) => {
          const config = wasteConfig[item.nom] || {
            dangerous: false,
            recyclable: false,
            company: "Inconnue",
          };
          return {
            nom: item.nom,
            type: config.dangerous ? "Dangereux" : "Non",
            recyclable: config.recyclable ? "Oui" : "Non",
            nombre: item.nombre,
            societe: config.company,
          };
        });
    
        setWasteData(processedData);
         // Calcul des statistiques
    const totalDetected = processedData.reduce(
      (sum, item) => sum + item.nombre,
      0
    );
    const totalDangerous = processedData
      .filter((item) => item.type === "Dangereux")
      .reduce((sum, item) => sum + item.nombre, 0);
    const totalRecyclable = processedData
      .filter((item) => item.recyclable === "Oui")
      .reduce((sum, item) => sum + item.nombre, 0);

    setStats({
      totalDetected,
      totalDangerous,
      totalRecyclable,
    });
  }, []);
  const getWasteDisplayName = (nom) => {
    const names = {
      plastic: "Bouteille en plastique",
      metal: "Boite en métal",
      medical: "Déchet medical",
      carton: "Papier/carton",
      "e-waste": "Déchet électronique",
      clothes: "Vêtement",
      glass: "Verre",
      organic: "Organique",
      battery: "Batterie",
      trash: "Déchets généraux",
    };
    return names[nom] || nom;
  };

  const getTypeChip = (type, recyclable) => {
    if (type === "Dangereux") {
      return (
        <span className="px-3 py-1 bg-red-600 text-white text-xs rounded-full font-medium">
          Dangereux
        </span>
      );
    }
    if (recyclable === "Oui") {
      return (
        <span className="px-3 py-1 bg-teal-600 text-white text-xs rounded-full font-medium">
          Oui
        </span>
      );
    }
    return (
      <span className="px-3 py-1 bg-gray-600 text-white text-xs rounded-full font-medium">
        Non
      </span>
    );
  };

    

  // Simulated report content for demo — replace with your real data fetching/generation
  const generateReportContent = (period) => {
    return `
RAPPORT SMARTWASTE - ${period.toUpperCase()}
============================

Statistiques du rapport ${period}.

Exemple de données...
    `;
  };

  // Download helper function
  const downloadFile = (content, filename, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Handlers for each report & format
  const downloadAnnualPDF = () => {
    const content = generateReportContent("annuel");
    downloadFile(content, "rapport_annuel.pdf", "application/pdf");
  };

  const downloadAnnualCSV = () => {
    // Example CSV content, replace with your real data CSV
    const content = "Type,Quantité\nPlastique,420\nMetal,100";
    downloadFile(content, "rapport_annuel.csv", "text/csv");
  };

  const downloadSemiAnnualPDF = () => {
    const content = generateReportContent("semi-annuel");
    downloadFile(content, "rapport_semi_annuel.pdf", "application/pdf");
  };

  const downloadSemiAnnualCSV = () => {
    // Example CSV content, replace with your real data CSV
    const content = "Type,Quantité\nPlastique,210\nMetal,50";
    downloadFile(content, "rapport_semi_annuel.csv", "text/csv");
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold mb-6">Téléchargement des Rapports</h1>
 <div className=" flex justify-around">
      <section className="space-y-3 border border-black p-16">
        <h2 className="text-xl font-semibold">Rapport Annuel</h2>
        <div className="flex space-x-4">
          <button
            onClick={downloadAnnualPDF}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded  flex items-center space-x-2"
          >
            <span>PDF</span>
          </button>
          <button
            onClick={downloadAnnualCSV}
            className="bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded  flex items-center space-x-2"
          >
            <span>CSV</span>
          </button>
        </div>
      </section>

      <section className="space-y-3 border border-black p-16 ">
        <h2 className="text-xl font-semibold">Rapport Semi-Annuel</h2>
        <div className="flex space-x-4">
          <button
            onClick={downloadSemiAnnualPDF}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded  flex items-center space-x-2"
          >
            <span>PDF</span>
          </button>
          <button
            onClick={downloadSemiAnnualCSV}
            className="bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded flex items-center space-x-2"
          >
            <span>CSV</span>
          </button>
        </div>
      </section>

 </div>
       {/* Section des partenaires */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 backdrop-blur-sm rounded-xl p-6 border border-red-500/20">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-white rounded px-3 py-2">
              <span className="text-red-600 font-bold">ريضال</span>
              <br />
              <span className="text-gray-700 font-bold text-sm">Redal</span>
            </div>
            <h3 className="text-lg font-semibold text-black">
              Partenaires Redal
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              ...new Set(
                wasteData
                  .filter((item) =>
                    ["Redal", "Technoplast SA", "Bankfagem"].includes(
                      item.societe
                    )
                  )
                  .map((item) => item.societe)
              ),
            ].map((company) => (
              <div
                key={company}
                className="flex items-center space-x-2 bg-red-500/10 rounded-lg p-2"
              >
                <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></div>
                <span className="text-black text-xs">{company}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-600/10 to-red-700/10 backdrop-blur-sm rounded-xl p-6 border border-red-600/20">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-white rounded px-3 py-2">
              <span className="text-black font-bold">VEOLIA</span>
            </div>
            <h3 className="text-lg font-semibold text-black">
              Partenaires Veolia
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              ...new Set(
                wasteData
                  .filter((item) =>
                    [
                      "Veolia",
                      "Avira SA",
                      "Stoturary",
                      "EcoBat",
                      "Ab Genera",
                    ].includes(item.societe)
                  )
                  .map((item) => item.societe)
              ),
            ].map((company) => (
              <div
                key={company}
                className="flex items-center space-x-2 bg-red-600/10 rounded-lg p-2"
              >
                <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                <span className="text-black text-xs">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rapport;
