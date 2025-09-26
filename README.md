# 🌍 Earthquake Visualizer

A React-based web application that visualizes live earthquake data on an interactive map using **Leaflet** and **Chakra UI**.  
The app fetches real-time earthquake data from the [USGS Earthquake API](https://earthquake.usgs.gov) and displays them with custom markers scaled and colored by magnitude.

---

## ✨ Features

- ✅ Live earthquake data from USGS (auto-updated daily).  
- ✅ Interactive **Leaflet Map** with zoom and pan.  
- ✅ Earthquake markers:  
  - **Color-coded by magnitude**  
    - Green → Minor (< 3)  
    - Orange → Moderate (3–5)  
    - Red → Strong (> 5)  
  - **Size scaled** with magnitude.  
- ✅ Popups on markers showing:  
  - Magnitude  
  - Location  
  - Time & Date  
  - Link to USGS event page  
- ✅ Map click feature → get coordinates of any point.  
- ✅ **Refresh Button** to reload data.  
- ✅ Smooth, responsive UI with Chakra UI.  

---

## 🛠️ Tech Stack

- **React.js** – Frontend framework  
- **Chakra UI** – Styling and UI components  
- **React-Leaflet + Leaflet** – Map visualization  
- **USGS Earthquake GeoJSON API** – Data source  

---

## 📂 Project Structure

src/
├── App.js # Root component
├── EarthquakeVisualizer.js # Fetch & display earthquakes
├── components/
│ └── LocationMarker.js # Handles map click events
├── index.js # React entry point
└── styles/ # (optional) custom styles


---

## 🧩 Approach & Problem-Solving Process

### Problem
We needed to build a **real-time earthquake monitoring app** that:  
- Fetches global earthquake data.  
- Displays them on an interactive map.  
- Uses magnitude for **visual severity representation**.  

### Approach

1. **Data Source**  
   - Used [USGS Earthquake API](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php).  
   - Format: GeoJSON with coordinates, magnitude, and metadata.  

2. **Map Rendering**  
   - Integrated **React-Leaflet** for maps.  
   - Default center set to India (`[20.5937, 78.9629]`), zoom = `3`.  

3. **Marker Visualization**  
   - Created **custom circle markers** with:  
     - Color coding by magnitude.  
     - Size scaled dynamically with magnitude.  

4. **User Interactivity**  
   - Popups show event details.  
   - Click anywhere on map → see selected coordinates.  

5. **Error & Loading Handling**  
   - `Spinner` for loading state.  
   - `Alert` for API errors.  
   - `Refresh` button for re-fetching.  

6. **UI/UX**  
   - Chakra UI for responsive layout.  
   - Map styled with shadows & rounded corners.  

---

## ⚙️ Installation

Make sure you have **Node.js (>=16)** and **npm** installed.  

1. Clone the repo:  

```bash
git clone https://github.com/your-username/earthquake-visualizer.git
cd earthquake-visualizer

Install dependencies:
npm install

▶️ Execution Steps

Start the development server
npm start


The app will run locally on:
http://localhost:3000
