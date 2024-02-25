// Necessary imports
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import '../css/style.css';
import L from 'leaflet';
import { fetchScooterData, ScooterData, ScooterFeature } from './scooterService';
import { initializeNavbarToggler } from './navbarToggler';
import markerIcon from '../assets/marker-icon.png';
import markerIcon2x from '../assets/marker-icon-2x.png';
import markerShadow from '../assets/marker-shadow.png';

// Leaflet icon configuration
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Navbar Toggler initializer
initializeNavbarToggler();

// Map initialization
const map = L.map('mapid').setView([48.2082, 16.3738], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Function to add scooter markers to the map
const addScooterMarkers = (data: ScooterData): void => {
  data.features.forEach((feature: ScooterFeature) => {
    L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]]).addTo(map)
      .bindPopup(`${feature.properties.ADRESSE}<br>Scooters available: ${feature.properties.ANZ_SCOOTER ?? 'Not available'}`);
  });
};

// Calling the function to fetch and display the data
fetchScooterData().then(addScooterMarkers).catch(error => console.error('Error fetching scooter data: ', error));
