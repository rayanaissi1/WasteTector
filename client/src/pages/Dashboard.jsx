import { useState, useEffect } from "react";
import axios from "axios";
import { AlertTriangle } from "lucide-react";
import allWasteTypes from "../assets/wasteTypes";

const Dashboard = () => {
  const [video, setVideo] = useState(null);
  const [filename, setFilename] = useState("");
  const [wasteData, setWasteData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [annotatedVideo, setAnnotatedVideo] = useState("");
  const [stats, setStats] = useState({
    totalDetected: 0,
    totalDangerous: 0,
    totalRecyclable: 0,
  });

  useEffect(() => {
    const savedFilename = localStorage.getItem("filename");
    const savedAnnotatedVideo = localStorage.getItem("annotatedVideo");
    const savedWasteData = localStorage.getItem("wasteData");
    const savedStats = localStorage.getItem("stats");

    if (savedFilename) setFilename(savedFilename);
    if (savedAnnotatedVideo) setAnnotatedVideo(savedAnnotatedVideo);
    if (savedWasteData) setWasteData(JSON.parse(savedWasteData));
    if (savedStats) setStats(JSON.parse(savedStats));
  }, []);

  useEffect(() => {
    if (filename) {
      localStorage.setItem("filename", filename);
    }
  }, [filename]);

  useEffect(() => {
    if (annotatedVideo) {
      localStorage.setItem("annotatedVideo", annotatedVideo);
    }
  }, [annotatedVideo]);

  useEffect(() => {
    if (wasteData.length > 0) {
      localStorage.setItem("wasteData", JSON.stringify(wasteData));
    }
  }, [wasteData]);

  useEffect(() => {
    if (
      stats.totalDetected !== 0 ||
      stats.totalDangerous !== 0 ||
      stats.totalRecyclable !== 0
    ) {
      localStorage.setItem("stats", JSON.stringify(stats));
    }
  }, [stats]);

  const handleReset = () => {
    setVideo(null);
    setFilename("");
    setWasteData([]);
    setStats({
      totalDetected: 0,
      totalDangerous: 0,
      totalRecyclable: 0,
    });
    setAnnotatedVideo("");

    localStorage.removeItem("filename");
    localStorage.removeItem("wasteData");
    localStorage.removeItem("stats");
    localStorage.removeItem("annotatedVideo");
  };

  const handleUpload = async () => {
    if (!video) return;
    const formData = new FormData();
    formData.append("video", video);

    try {
      const res = await axios.post("http://localhost:5000/upload", formData);
      setFilename(res.data.filename);
    } catch (err) {
      console.error("Erreur upload :", err);
    }
  };

  const handleDetect = async () => {
    if (!filename) return;
    setLoading(true);

    try {
      const detectRes = await axios.post("http://localhost:5000/detect", {
        filename,
      });
      const resultFile = detectRes.data.result;
      const annotatedFile = detectRes.data.annotated_video;

      setAnnotatedVideo(annotatedFile);

      const resultRes = await axios.get(
        `http://localhost:5000/results/${resultFile}`
      );

      const processedData = resultRes.data.map((item) => ({
        nom: item.nom,
        type: item.type,
        recyclable: item.recyclable,
        nombre: item.nombre,
        societe: item.societe,
      }));

      const mergedWasteData = allWasteTypes.map((waste) => {
        const detected = processedData.find((item) => item.nom === waste.nom);
        if (detected) {
          return detected;
        } else {
          return {
            nom: waste.nom,
            type: "===",
            recyclable: "===",
            nombre: 0,
            societe: "===",
          };
        }
      });

      setWasteData(mergedWasteData);

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
    } catch (err) {
      console.error("Erreur détection :", err);
    } finally {
      setLoading(false);
    }
  };

  const getWasteDisplayName = (nom) => {
    const names = {
      plastic: "Bouteille en plastique",
      metal: "Boite en métal",
      medical: "Déchet medical",
      clothes: "Vêtement",
      dangereux: "battery - e-waste- medical",
      glass: "Verre",
      organic: "Organique",
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
        <span className="px-3 py-1 bg-teal-600 text-xs rounded-full font-medium">
          Oui
        </span>
      );
    }
    if (type === "===") {
      return (
        <span className="px-3 py-1 bg-gray-400 text-xs rounded-full font-medium">
          ===
        </span>
      );
    }
    return (
      <span className="px-3 py-1 bg-gray-600 text-xs rounded-full font-medium">
        Non
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-red-700">
        Détection de déchets
      </h1>
      <div className="flex justify-around gap-4 ">
        <div className="flex  items-center gap-10 ">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-64 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                MP4, MOV, AVI or GIF (video files only)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              accept="video/*"
              onChange={(e) =>
                setVideo(e.target.files ? e.target.files[0] : null)
              }
              className="hidden"
            />
          </label>

          <div className="flex flex-col space-y-2">
            <button
              onClick={handleUpload}
              className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded"
            >
              Uploader
            </button>

            {filename && (
              <button
                onClick={handleDetect}
                disabled={loading}
                className={`text-white px-4 py-2 rounded ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {loading ? "Analyse en cours..." : " Détecter"}
              </button>
            )}

            <button
              onClick={handleReset}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Réinitialiser
            </button>
          </div>
        </div>
        {/* <div>
          {annotatedVideo && (
            <div className="my-6 w-full">
              <h2 className="text-xl font-semibold text-center mb-2  ">
                Vidéo annotée
              </h2>
              <video
                controls
                className="mx-auto"
                style={{ width: "600px", height: "auto" }}
              >
                <source
                  src={`http://localhost:5000/annotated/${annotatedVideo}`}
                  type="video/mp4"
                />
              </video>
            </div>
          )}
        </div> */}
      </div>

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
          <p className=" text-sm font-medium mb-1">Recyclable</p>
          <p className="text-2xl font-bold ">
            {stats.totalRecyclable.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-teal-900/40 backdrop-blur-sm rounded-xl border border-teal-600/30 overflow-hidden my-7">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-teal-900/60">
              <tr className="text-left">
                <th className="px-4 py-3  font-medium text-sm">
                  Nom du déchet
                </th>
                <th className="px-4 py-3 font-medium text-sm">
                  Type de déchet
                </th>
                <th className="px-4 py-3 font-medium text-sm text-center">
                  Nombre détecté
                </th>
                <th className="px-4 py-3 font-medium text-sm">
                  Recyclable ou non
                </th>
                <th className="px-4 py-3 font-medium text-sm">
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
                    <span className="font-medium text-sm">
                      {getWasteDisplayName(item.nom)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    {getTypeChip(item.type, item.recyclable)}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="font-semibold text-lg">{item.nombre}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className=" text-sm">{item.recyclable}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className=" text-sm">{item.societe}</span>
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
