const Profile = () => {
  const station = {
    name: "Station Redal Harhoura",
    location: "Rabat, Harhoura",
    status: "Active",
    lastUpdated: "2025-06-25",
    wasteTypes: ["Plastique", "Métal", "Organique", "Déchets Médicaux"],
    manager: "Hassan Gonzalez",
    contact: "+212 6 00 00 00 00",
  };

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
    </div>
  );
};

export default Profile;
