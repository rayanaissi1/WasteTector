import os
import uuid
import json
import cv2
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from ultralytics import YOLO
from pymongo import MongoClient
from collections import defaultdict
import csv
from fpdf import FPDF

from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

MONGO_URI=os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["wasteTector_db"]
collection = db["detections"]


# Limite taille upload à 500MB (optionnel)
app.config['MAX_CONTENT_LENGTH'] = 500 * 1024 * 1024

model = YOLO("model/best.pt")

# Folders
os.makedirs("temp", exist_ok=True)
os.makedirs("results", exist_ok=True)

# Déchets infos
info_dechets = {
    'plastic': {'dangerous': False, 'recyclable': True, 'societe': 'OT Plastique, SMRR S.A., Sumilon, Altecplast'},
    'metal': {'dangerous': False, 'recyclable': True, 'societe': 'RS Metal, Metalimpex Maroc, Stainless Trading Maroc'},
    'medical': {'dangerous': True, 'recyclable': False, 'societe': 'VEOS, MedWaste, CER Maroc'},
    'carton': {'dangerous': False, 'recyclable': True, 'societe': 'Kouji Tex, Karama Recyclage, Ramou Recyclage'},
    'trash': {'dangerous': False, 'recyclable': False, 'societe': 'CER Maroc, VEOS, MedWaste, ATHISA MAROC, CHIMIREC MAROC'},
    'clothes': {'dangerous': False, 'recyclable': True, 'societe': 'Kouji Tex, Karama Recyclage, Ramou Recyclage'}
}

@app.route("/upload", methods=["POST"])
def upload_video():
    if "video" not in request.files:
        return jsonify({"error": "No video uploaded"}), 400

    video = request.files["video"]
    if not video.filename.lower().endswith((".mp4", ".avi", ".mov", ".mkv")):
        return jsonify({"error": "Unsupported video format"}), 400

    video_id = str(uuid.uuid4())
    video_path = f"temp/{video_id}.mp4"
    video.save(video_path)

    return jsonify({"message": "Video uploaded", "filename": f"{video_id}.mp4"}), 200

@app.route("/detect", methods=["POST"])
def detect():
    data = request.get_json()
    if not data or "filename" not in data:
        return jsonify({"error": "No filename provided"}), 400

    filename = data["filename"]
    video_path = os.path.join("temp", filename)
    if not os.path.exists(video_path):
        return jsonify({"error": "File not found"}), 404

    counts = defaultdict(int)
    cap = cv2.VideoCapture(video_path)

    fourcc = cv2.VideoWriter_fourcc(*"mp4v")
    annotated_filename = f"{uuid.uuid4()}.mp4"
    annotated_path = os.path.join("results", annotated_filename)
    out = None

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        results = model(frame)
        annotated_frame = results[0].plot()

        if out is None:
            height, width, _ = annotated_frame.shape
            out = cv2.VideoWriter(annotated_path, fourcc, 20.0, (width, height))

        out.write(annotated_frame)

        for r in results:
            for c in r.boxes.cls:
                cls_name = model.names[int(c)]
                counts[cls_name] += 1

    cap.release()
    if out:
        out.release()
    os.remove(video_path)

    output = []
    for cls, count in counts.items():
        info = info_dechets.get(cls, {"dangerous": False, "recyclable": False, "societe": "Inconnue"})
        output.append({
            "nom": cls,
            "type": "Dangereux" if info["dangerous"] else "Non",
            "recyclable": "Oui" if info["recyclable"] else "Non",
            "nombre": count,
            "societe": info["societe"]
        })

    result_filename = f"{uuid.uuid4()}.json"
    result_path = os.path.join("results", result_filename)
    with open(result_path, "w") as f:
        json.dump(output, f, indent=4)

    # Stocker dans MongoDB
    collection.insert_one({
        "filename": filename,
        "results": output,
        "json_file": result_filename,
        "annotated_video": annotated_filename
    })

    return jsonify({
        "message": "Detection complete",
        "result": result_filename,
        "annotated_video": annotated_filename
    }), 200

@app.route("/results/<path:filename>", methods=["GET"])
def get_results(filename):
    return send_from_directory("results", filename)

@app.route("/annotated/<path:filename>", methods=["GET"])
def get_annotated_video(filename):
    return send_from_directory("results", filename)

@app.route("/history", methods=["GET"])
def get_history():
    all_data = list(collection.find({}, {"_id": 0}))
    return jsonify(all_data)

@app.route("/export/csv/<filename>", methods=["GET"])
def export_csv(filename):
    result_path = os.path.join("results", filename)
    if not os.path.exists(result_path):
        return jsonify({"error": "File not found"}), 404

    csv_filename = filename.replace(".json", ".csv")
    csv_path = os.path.join("results", csv_filename)

    with open(result_path) as f:
        data = json.load(f)

    with open(csv_path, mode='w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=data[0].keys())
        writer.writeheader()
        writer.writerows(data)

    return send_from_directory("results", csv_filename, as_attachment=True)

@app.route("/export/pdf/<filename>", methods=["GET"])
def export_pdf(filename):
    result_path = os.path.join("results", filename)
    if not os.path.exists(result_path):
        return jsonify({"error": "File not found"}), 404

    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)

    with open(result_path) as f:
        data = json.load(f)

    pdf.cell(200, 10, txt="Rapport de détection de déchets", ln=True, align='C')
    pdf.ln(10)

    for item in data:
        pdf.cell(200, 10, txt=json.dumps(item), ln=True)

    pdf_filename = filename.replace(".json", ".pdf")
    pdf.output(os.path.join("results", pdf_filename))

    return send_from_directory("results", pdf_filename, as_attachment=True)

if __name__ == "__main__":
    app.run(debug=True)