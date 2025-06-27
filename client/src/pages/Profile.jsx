import { useEffect, useState } from "react";

const Profile = () => {
  const station = {
    name: "Station Redal Harhoura",
    location: "Rabat, Harhoura",
    status: "Active",
    lastUpdated: "2025-06-25",
    wasteTypes: ["Plastique", "Métal", "Organique", "Déchets Médicaux"],
    manager: "Hassan ....",
    contact: "+212 6 00 00 00 00",
  };

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
 
  
  

 
  return (
    <div className="p-6space-y-8">
      <h1 className="text-2xl font-bold">Profil de la Station</h1>

      <div className="bg-gray-100 p-6 rounded-xl border border-teal-700 space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Informations Générales</h2>
          <p>
            <span className="font-medium">Nom:</span> {station.name}
          </p>
          <p>
            <span className="font-medium">Localisation:</span>{" "}
            {station.location}
          </p>
          <p>
            <span className="font-medium">Responsable:</span> {station.manager}
          </p>
          <p>
            <span className="font-medium">Contact:</span> {station.contact}
          </p>
          <p>
            <span className="font-medium">Statut:</span>{" "}
            <span
              className={`font-semibold ${
                station.status === "Active" ? "text-green-400" : "text-red-400"
              }`}
            >
              {station.status}
            </span>
          </p>
          <p>
            <span className="font-medium">Dernière mise à jour:</span>{" "}
            {station.lastUpdated}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            Types de déchets traités
          </h2>
          <ul className="list-disc list-inside text-sm ">
            {station.wasteTypes.map((type, index) => (
              <li key={index}>{type}</li>
            ))}
          </ul>
        </div>
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
              <span className="text-red-600 font-bold">VEOLIA</span>
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

export default Profile;
