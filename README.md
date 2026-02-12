# ♻️ WasteTector

> **Système intelligent de détection et de classification des déchets en temps réel.** > *Projet réalisé dans le cadre du Hackathon GreenUP.*

![Python](https://img.shields.io/badge/Python-3.10%2B-blue?style=for-the-badge&logo=python&logoColor=white)
![YOLOv8](https://img.shields.io/badge/YOLOv8-Computer_Vision-orange?style=for-the-badge&logo=ultralytics&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-Backend-black?style=for-the-badge&logo=flask&logoColor=white)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 📖 À propos du projet

**WasteTector** est une solution innovante visant à améliorer le processus de tri des déchets grâce à l'intelligence artificielle. Développé lors du **Hackathon GreenUP**, ce projet combine la puissance de la vision par ordinateur avec une interface web moderne pour fournir une analyse en temps réel.

L'objectif est d'automatiser l'identification des déchets (plastique, métal, verre, organique, etc.) pour optimiser les chaînes de recyclage.

---

## ✨ Fonctionnalités Clés

* 🤖 **Détection Temps Réel** : Utilisation du modèle **YOLOv8** (You Only Look Once) pour une détection d'objets ultra-rapide et précise via flux vidéo.
* 📊 **Dashboard Analytique** : Visualisation des statistiques de détection (types de déchets, confiance du modèle) via une interface web interactive.
* 🌐 **Architecture Hybride** : Backend robuste en **Flask** communiquant avec un Frontend dynamique en **React**.
* 📈 **Reporting** : Suivi des catégories de déchets détectés pour l'analyse d'impact environnemental.

---

## 🛠️ Stack Technique

| Domaine | Technologies |
| :--- | :--- |
| **IA & Vision** | YOLOv8 (Ultralytics), OpenCV, PyTorch |
| **Backend** | Python, Flask, Flask-CORS |
| **Frontend** | React.js, Tailwind CSS (ou CSS pur), Chart.js |
| **Déploiement** | Docker (Optionnel), Git |

---

## 📸 Aperçu (Screenshots)

| Interface de Détection | Dashboard Analytique |
| :---: | :---: |
| *[Insérer image ici]* | *[Insérer image ici]* |

---

## 🚀 Installation et Démarrage

Suivez ces étapes pour lancer le projet localement.

### Pré-requis
* Python 3.8+
* Node.js & npm
* Git

### 1. Cloner le dépôt
```bash
git clone [https://github.com/rayanaissi1/wastetector.git](https://github.com/rayanaissi1/wastetector.git)
cd wastetector
```
### 2. Backend (Flask + YOLO)
```Bash
cd backend
# Créer un environnement virtuel
python -m venv venv
source venv/bin/activate  # Sur Windows : venv\Scripts\activate

# Installer les dépendances
pip install -r requirements.txt

# Lancer le serveur
python app.py
```

### 3. Frontend (React)
```Bash
cd ../frontend
# Installer les dépendances
npm install

# Lancer l'application
npm start
```
L'application sera accessible à l'adresse : http://localhost:3000

🤝 L'équipe
Ce projet a été réalisé en collaboration lors du Hackathon GreenUP.

Rayan Aissi - Data Scientist & AI Engineer - GitHub | LinkedIn

Mohammed Amine Moumen -  Data Scientist & AI Engineer - GitHub
