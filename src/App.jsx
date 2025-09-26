import React, { useState, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  Heading,
  Text,
  Spinner,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// --- Map Styling ---
const mapContainerStyle = {
  width: "100%",
  height: "600px",
  borderRadius: "md", // Match Chakra UI style
};

// Default center of the map
const center = [20.5937, 78.9629]; // Default: India [lat, lng]

// --- Color coding by magnitude ---
function magnitudeColor(mag) {
  if (mag < 3) return "#48BB78"; // green
  if (mag < 5) return "#ED8936"; // orange
  return "#E53E3E"; // red
}

// --- Create Custom Leaflet Icons ---
function createMagnitudeIcon(mag) {
  const size = Math.max(mag * 5, 8); // Scale size with magnitude
  const color = magnitudeColor(mag);

  return L.divIcon({
    html: `<div style="background-color: ${color}; width: ${size}px; height: ${size}px; border-radius: 50%; border: 1px solid white; opacity: 0.8;"></div>`,
    className: "", // important to clear default styling
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

// --- Component to handle map clicks for manual location selection ---
function LocationMarker() {
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom()); // Pan to the clicked location
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>
        <Box>
          <Text fontWeight="bold">Custom Selected Location</Text>
          <Text>Lat: {position.lat.toFixed(4)}</Text>
          <Text>Lng: {position.lng.toFixed(4)}</Text>
        </Box>
      </Popup>
    </Marker>
  );
}

function EarthquakeVisualizer() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Fetch Earthquake Data ---
  const fetchEarthquakes = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setEarthquakes(data.features || []);
    } catch (err) {
      console.error("Error fetching earthquake data:", err);
      setError("Failed to fetch earthquake data. Please try again later.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEarthquakes();
  }, []);

  return (
    <Box p={{ base: 2, md: 6 }}>
      <Heading mb={4}>🌍 Earthquake Visualizer</Heading>
      <Text mb={4}>
        Live earthquake data from the{" "}
        <a
          href="https://earthquake.usgs.gov"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#3182CE", textDecoration: "underline" }}
        >
          USGS
        </a>
        . Click on a circle for details or anywhere on the map to get coordinates.
      </Text>

      <Button
        onClick={fetchEarthquakes}
        mb={4}
        colorScheme="teal"
        isLoading={loading}
        loadingText="Refreshing..."
      >
        Refresh Data
      </Button>

      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      
      {loading && earthquakes.length === 0 ? (
        <Spinner size="xl" />
      ) : (
        <Box boxShadow="xl" borderRadius="md">
          <MapContainer
            center={center}
            zoom={3}
            style={mapContainerStyle}
          >
            {/* Base map layer */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Earthquake markers */}
            {earthquakes.map((quake) => {
              const [lng, lat] = quake.geometry.coordinates;
              const mag = quake.properties.mag;
              return (
                <Marker
                  key={quake.id}
                  position={[lat, lng]}
                  icon={createMagnitudeIcon(mag)}
                >
                  <Popup>
                    <Box>
                      <Heading size="sm">
                        M {quake.properties.mag} Earthquake
                      </Heading>
                      <Text>{quake.properties.place}</Text>
                      <Text fontSize="xs" color="gray.500" mt={1}>
                        {new Date(quake.properties.time).toLocaleString()}
                      </Text>
                      <a
                        href={quake.properties.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#3182CE", textDecoration: "underline" }}
                      >
                        More Info on USGS
                      </a>
                    </Box>
                  </Popup>
                </Marker>
              );
            })}
            
            {/* Component to handle map clicks */}
            <LocationMarker />
          </MapContainer>
        </Box>
      )}
    </Box>
  );
}

export default function App() {
  return (
    <ChakraProvider>
      <EarthquakeVisualizer />
    </ChakraProvider>
  );
}