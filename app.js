// Initialize map with Calgary coordinates
var map = L.map('map').setView([51.0447, -114.0719], 12);

// Define Mapbox style layer
var mapboxStyle = L.tileLayer('https://api.mapbox.com/styles/v1/selenahn/cltnrariy01a901oi6f5l21q5/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2VsZW5haG4iLCJhIjoiY2x0bm9hdWZ4MDhsZDJrcGQwaGt6djRydyJ9.9Dkmn1TuKzaNiP9zZ4BMLw', {
    attribution: 'Map data &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18
});

// Define Calgary map layer
var calgaryMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Add the Calgary map layer to the map initially
calgaryMap.addTo(map);

// Define layer variables
var roadsLayer = L.layerGroup();
var landuseLayer = L.layerGroup();
var buildingsLayer = L.layerGroup();
var waterLayer = L.layerGroup();
var trafficLayer = L.layerGroup();

// Add layers to the map initially
roadsLayer.addTo(map);
landuseLayer.addTo(map);
buildingsLayer.addTo(map);
waterLayer.addTo(map);
trafficLayer.addTo(map);

// Function to toggle visibility of layers
var layersAdded = true; // Flag to track if layers are added
function toggleLayers() {
    if (layersAdded) {
        map.removeLayer(mapboxStyle);
        layersAdded = false; // Update flag
    } else {
        map.addLayer(mapboxStyle);
        layersAdded = true; // Update flag
    }
}

// Event listener for toggle button
document.getElementById('toggle-layers').addEventListener('click', toggleLayers);

// Generate Legend
function generateLegend() {
    var legendContent = ''; // Initialize legend content
    // Define legend items
    var legendItems = [
        { id: "road", color: "rgb(91, 72, 0)", shape: "line", label: "Roads" },
        { id: "landuse-overlay", color: "rgb(0, 208, 0)", shape: "trapezoid", label: "Landuse" },
        { id: "building", color: "rgb(211, 197, 151)", shape: "trapezoid", label: "Buildings" },
        { id: "water", color: "rgb(0, 206, 255)", shape: "trapezoid", label: "Water" },
        { id: "traffic-incidents-archive-201-7iz7ux", color: "rgb(244, 95, 148)", shape: "circle", label: "Traffic Incidents" }
    ];

    // Add legend items
    legendItems.forEach(item => {
        if (item.shape === 'line') {
            legendContent += `<div class="legend-item">
                                <svg height="20" width="50">
                                    <line x1="0" y1="10" x2="50" y2="10" style="stroke:${item.color};stroke-width:1" />
                                </svg>
                                <span class="legend-text">${item.label}</span>
                              </div>`;
        } else if (item.shape === 'circle') {
            legendContent += `<div class="legend-item">
                                <span class="legend-circle" style="background-color: ${item.color}; border-radius: 50%;"></span>
                                <span class="legend-text">${item.label}</span>
                              </div>`;
        } else if (item.shape === 'trapezoid') {
            legendContent += `<div class="legend-item">
                                <svg height="20" width="50">
                                    <rect x="0" y="0" width="20" height="20" style="fill:${item.color}" />
                                </svg>
                                <span class="legend-text">${item.label}</span>
                              </div>`;
        }
    });

    document.getElementById('legend').innerHTML = legendContent; // Update legend content
}

// Call the function to generate legend
generateLegend();
