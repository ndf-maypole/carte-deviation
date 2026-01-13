// 1. Initialize the Map
// Coordinates: [Latitude, Longitude], Zoom Level
const map = L.map('map').setView([50.712, 5.658], 13); 

// 2. Define the OpenStreetMap Layer
const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    minZoom: 12,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// 3. Define the Google Hybrid Layer
// 'hybrid' includes satellite imagery with roads and labels
const sat = L.tileLayer('https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}&scale=2&hl=fr', {
    maxZoom: 19,
    minZoom: 12,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: '&copy; Google'
});

// 4. Set the Default Layer
// We add OSM to the map immediately so it's what users see first
osm.addTo(map);

// 5. Create the Layer Switcher Control
const baseMaps = {
    "Carte": osm,
    "Satellite": sat
};


L.marker([50.729237, 5.642472]).addTo(map)
    .bindPopup('Apparence')

const fermeesUrl = 'https://raw.githubusercontent.com/ndf-maypole/carte-deviation/refs/heads/main/geojson/fermees.geojson';
const affUrl = 'https://raw.githubusercontent.com/ndf-maypole/carte-deviation/refs/heads/main/geojson/affluence.geojson';
const devUrl = 'https://raw.githubusercontent.com/ndf-maypole/carte-deviation/refs/heads/main/geojson/deviations.geojson';
const devHPUrl = 'https://raw.githubusercontent.com/ndf-maypole/carte-deviation/refs/heads/main/geojson/deviationsHP.geojson';

const fermeesLayer = L.layerGroup().addTo(map);
const devLayer = L.layerGroup().addTo(map);
const devHPLayer = L.layerGroup();
const affLayer = L.layerGroup().addTo(map);

fetch(fermeesUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Create the GeoJSON layer with custom styling
        const nLayer = L.geoJSON(data, {
            style: function (feature) {
                return {
                    color: "red",    // Line color
                    weight: 6,        // Thickness
                    opacity: 1     // Transparency
                };
            },
            onEachFeature: function (feature, layer) {
                // Extract properties
                const title = feature.properties.titre;
                const description = feature.properties.desc;

                // Construct HTML for the popup
                const popupContent = `
                    <div style="font-family: sans-serif; min-width: 150px;">
                        <h4 style="margin: 0 0 5px 0; color: #333;">${title}</h4>
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 5px 0;">
                        <p style="margin: 0; font-size: 13px; color: #666;">${description}</p>
                    </div>
                `;

                // Bind the formatted popup
                layer.bindPopup(popupContent);

                // OPTIONAL: Highlight line on hover
                layer.on('mouseover', function () {
                    this.setStyle({ weight: 10, opacity: 1});
                });
                layer.on('mouseout', function () {
                    nLayer.resetStyle(this);
                });
            }
        }).addTo(fermeesLayer);
    })
    .catch(error => {
        console.error('Error loading the GeoJSON:', error);
    });

fetch(devUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Create the GeoJSON layer with custom styling
        const nLayer = L.geoJSON(data, {
            style: function (feature) {
                return {
                    color: "blue",    // Line color
                    weight: 6,        // Thickness
                    opacity: 0.75     // Transparency
                };
            },
            onEachFeature: function (feature, layer) {
                // Extract properties
                const title = feature.properties.titre;
                const description = feature.properties.desc;
                const link = feature.properties.gmaps;

                // Construct HTML for the popup
                const popupContent = `
                    <div style="font-family: sans-serif; min-width: 150px;">
                        <h4 style="margin: 0 0 5px 0; color: #333;">${title}</h4>
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 5px 0;">
                        <p style="margin: 0; font-size: 13px; color: #666;">${description}</p>
                        <a href=https://maps.app.goo.gl/${link} target="_blank" style="font-size: 13px; color: #1a73e8; text-decoration: none;">Voir sur Google Maps</a>
                    </div>
                `;

                // Bind the formatted popup
                layer.bindPopup(popupContent);

                // OPTIONAL: Highlight line on hover
                layer.on('mouseover', function () {
                    this.setStyle({ weight: 10, opacity: 1});
                });
                layer.on('mouseout', function () {
                    nLayer.resetStyle(this);
                });
            }
        }).addTo(devLayer);
    })
    .catch(error => {
        console.error('Error loading the GeoJSON:', error);
    });

fetch(devHPUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Create the GeoJSON layer with custom styling
        const nLayer = L.geoJSON(data, {
            style: function (feature) {
                return {
                    color: "green",    // Line color
                    weight: 6,        // Thickness
                    opacity: 0.75     // Transparency
                };
            },
            onEachFeature: function (feature, layer) {
                // Extract properties
                const title = feature.properties.titre;
                const description = feature.properties.desc;
                const link = feature.properties.gmaps;

                // Construct HTML for the popup
                const popupContent = `
                    <div style="font-family: sans-serif; min-width: 150px;">
                        <h4 style="margin: 0 0 5px 0; color: #333;">${title}</h4>
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 5px 0;">
                        <p style="margin: 0; font-size: 13px; color: #666;">${description}</p>
                        <a href=https://maps.app.goo.gl/${link} target="_blank" style="font-size: 13px; color: #1a73e8; text-decoration: none;">Voir sur Google Maps</a>
                    </div>
                `;

                // Bind the formatted popup
                layer.bindPopup(popupContent);

                // OPTIONAL: Highlight line on hover
                layer.on('mouseover', function () {
                    this.setStyle({ weight: 10, opacity: 1});
                });
                layer.on('mouseout', function () {
                    nLayer.resetStyle(this);
                });
            }
        }).addTo(devHPLayer);
    })
    .catch(error => {
        console.error('Error loading the GeoJSON:', error);
    });
    
fetch(affUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Create the GeoJSON layer with custom styling
        const nLayer = L.geoJSON(data, {
            style: function (feature) {
                return {
                    color: "orange",    // Line color
                    weight: 6,        // Thickness
                    opacity: 0.55     // Transparency
                };
            },
            onEachFeature: function (feature, layer) {
                // Extract properties
                const title = feature.properties.titre;
                const description = feature.properties.desc;

                // Construct HTML for the popup
                const popupContent = `
                    <div style="font-family: sans-serif; min-width: 150px;">
                        <h4 style="margin: 0 0 5px 0; color: #333;">${title}</h4>
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 5px 0;">
                        <p style="margin: 0; font-size: 13px; color: #666;">${description}</p>
                    </div>
                `;

                // Bind the formatted popup
                layer.bindPopup(popupContent);

                // OPTIONAL: Highlight line on hover
                layer.on('mouseover', function () {
                    this.setStyle({ weight: 10, opacity: 1});
                });
                layer.on('mouseout', function () {
                    nLayer.resetStyle(this);
                });
            }
        }).addTo(affLayer);
    })
    .catch(error => {
        console.error('Error loading the GeoJSON:', error);
    });



    
const geoLayers = {
    "Fermetures": fermeesLayer,
    "Perturbations": affLayer,
    "Déviations": devLayer,
    "Déviations\n(heures de pointe)": devHPLayer
};

// Add the control UI to the top-right of the map
L.control.layers(baseMaps, geoLayers, { collapsed: false }).addTo(map);
