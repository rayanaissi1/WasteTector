import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Download,
  FileText,
  Database,
  Recycle,
  Trash2,
  Shield,
  Menu,
  BarChart3,
} from "lucide-react";

const Dashboard = () => {
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
    // { nom: "e-waste", nombre: 220 },
    { nom: "clothes", nombre: 305 },
    { nom: "glass", nombre: 150 },
    { nom: "organic", nombre: 180 },
    // { nom: "battery", nombre: 45 },
    { nom: "trash", nombre: 250 },
    { nom: "dangereux", nombre: 456 },
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

//   const exportToPDF = () => {
//     const content = `
// RAPPORT SMARTWASTE - REDAL AI
// ============================

// STATISTIQUES GÉNÉRALES:
// - Total détecté: ${stats.totalDetected}
// - Total dangereux: ${stats.totalDangerous}
// - Total recyclable: ${stats.totalRecyclable}

// DÉTAIL DES DÉCHETS:
// ${wasteData
//   .map(
//     (item) =>
//       `- ${item.nom}: ${item.nombre} unités (${item.type}, ${
//         item.recyclable === "Oui" ? "Recyclable" : "Non recyclable"
//       }, Société: ${item.societe})`
//   )
//   .join("\n")}
//     `;

//     const blob = new Blob([content], { type: "text/plain" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "rapport_smartwaste.pdf";
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   const exportToCSV = () => {
//     const headers = [
//       "Nom du déchet",
//       "Type de déchet",
//       "Nombre détecté",
//       "Recyclable ou non",
//       "Société associée",
//     ];
//     const csvContent = [
//       headers.join(","),
//       ...wasteData.map((item) =>
//         [item.nom, item.type, item.nombre, item.societe].join(",")
//       ),
//     ].join("\n");

//     const blob = new Blob([csvContent], { type: "text/csv" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "donnees_smartwaste.csv";
//     a.click();
//     URL.revokeObjectURL(url);
//   };

  const getWasteDisplayName = (nom) => {
    const names = {
      plastic: "Bouteille en plastique",
      metal: "Boite en métal",
      medical: "Déchet medical",
    //   carton: "Papier/carton",
    //   "e-waste": "Déchet électronique",
      clothes: "Vêtement",
      dangereux: "battery - e-waste- medical",
      glass: "Verre",
      organic: "Organique",
    //   battery: "Batterie",
      trash: "Déchets généraux",
    };
    return names[nom] || nom;
  };

  const getTypeChip = (type, recyclable) => {
    if (type === "Dangereux") {
      return (
        <span className="px-3 py-1 bg-red-600 text-xs rounded-full font-medium">
          Dangereux
        </span>
      );
    }
    if (recyclable === "Oui") {
      return (
        <span className="px-3 py-1 bg-teal-600  text-xs rounded-full font-medium">
          Oui
        </span>
      );
    }
    return (
      <span className="px-3 py-1 bg-gray-600  text-xs rounded-full font-medium">
        Non
      </span>
    );
  };

  return (
    <div className="">
      {/* Alerte pour déchets dangereux */}
      {stats.totalDangerous > 50 && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 flex items-center space-x-3 my-6">
          <AlertTriangle className="h-6 w-6 text-black flex-shrink-0" />
          <div>
            <h3 className="text-black font-semibold">
              Alerte: Niveau élevé de déchets dangereux!
            </h3>
            <p className="text-black text-sm">
              {stats.totalDangerous} déchets dangereux détectés. Intervention
              urgente recommandée.
            </p>
          </div>
        </div>
      )}

      {/* Statistiques Cards */}
      <div className="grid grid-cols-3 gap-4 my-5">
        <div className="bg-teal-800/40 backdrop-blur-sm rounded-xl p-4 border border-teal-600/30 text-center">
          <p className="text-black text-sm font-medium mb-1">Total Détecté</p>
          <p className="text-2xl font-bold ">
            {stats.totalDetected.toLocaleString()}
          </p>
        </div>

        <div className="bg-red-500/20 backdrop-blur-sm rounded-xl p-4 border border-red-500/30 text-center">
          <p className="text-black text-sm font-medium mb-1">Dangereux</p>
          <p className="text-2xl font-bold text-black">
            {stats.totalDangerous}
          </p>
        </div>

        <div className="bg-teal-600/30 backdrop-blur-sm rounded-xl p-4 border border-teal-500/30 text-center">
          <p className="text-teal-200 text-sm font-medium mb-1">Recyclable</p>
          <p className="text-2xl font-bold ">
            {stats.totalRecyclable.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Actions d'export */}
      {/* <div className="flex space-x-3">
        <button
          onClick={exportToPDF}
          className="flex items-center space-x-2 bg-red-600 hover:bg-red-700  px-4 py-2 rounded-lg transition-colors text-sm"
        >
          <FileText className="h-4 w-4" />
          <span>PDF</span>
        </button>
        <button
          onClick={exportToCSV}
          className="flex items-center space-x-2 bg-teal-600 hover:bg-teal-700  px-4 py-2 rounded-lg transition-colors text-sm"
        >
          <Download className="h-4 w-4" />
          <span>CSV</span>
        </button>
      </div> */}

      {/* Tableau des déchets */}
      <div className="bg-teal-900/40 backdrop-blur-sm rounded-xl border border-teal-600/30 overflow-hidden my-7">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-teal-900/60">
              <tr className="text-left">
                <th className="px-4 py-3 text-teal-200 font-medium text-sm">
                  Nom du déchet
                </th>
                <th className="px-4 py-3 text-teal-200 font-medium text-sm">
                  Type de déchet
                </th>
                <th className="px-4 py-3 text-teal-200 font-medium text-sm text-center">
                  Nombre détecté
                </th>
                <th className="px-4 py-3 text-teal-200 font-medium text-sm">
                  Recyclable ou non{" "}
                </th>
                <th className="px-4 py-3 text-teal-200 font-medium text-sm">
                  Société associée
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-teal-700/50">
              {wasteData.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-teal-800/30 transition-colors"
                >
                  <td className="px-4 py-4">
                    <span className=" font-medium text-sm">
                      {getWasteDisplayName(item.nom)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    {getTypeChip(item.type, item.recyclable)}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className=" font-semibold text-lg">
                      {item.nombre}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-teal-200 text-sm">
                      
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-teal-200 text-sm">
                      {item.societe}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
