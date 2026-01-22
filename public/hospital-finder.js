/**
 * Hospital Finder using OpenStreetMap (100% Free - No API Keys Required)
 * 
 * This implementation uses:
 * - Leaflet.js for map rendering (OpenStreetMap tiles)
 * - Nominatim API for geocoding (location to lat/lng)
 * - Overpass API for hospital data (nearby hospitals)
 * 
 * All services are completely free and require no API keys or billing setup.
 */

// Global variables for map and markers
let hospitalMap = null;
let hospitalMarkers = [];
let markerCluster = null;
let currentLocationMarker = null;
let currentLocation = null;

/**
 * Initialize the Leaflet map
 * Called when the page loads
 */
function initHospitalMap() {
    const mapContainer = document.getElementById('hospitalMap');
    if (!mapContainer) {
        console.warn('Hospital map container not found');
        return;
    }

    // Default center: India (can be changed to any location)
    const defaultCenter = [20.5937, 78.9629];
    const defaultZoom = 6;

    // Initialize Leaflet map
    hospitalMap = L.map('hospitalMap', {
        center: defaultCenter,
        zoom: defaultZoom,
        zoomControl: true,
        attributionControl: true
    });

    // Add OpenStreetMap tile layer (free tiles)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(hospitalMap);

    // Initialize marker cluster group for better performance
    markerCluster = L.markerClusterGroup({
        maxClusterRadius: 50,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true
    });
    hospitalMap.addLayer(markerCluster);

    console.log('✅ Hospital map initialized with OpenStreetMap (Free)');
}

/**
 * Geocode a location string to latitude/longitude using Nominatim
 * Nominatim is OpenStreetMap's free geocoding service (no API key needed)
 * 
 * @param {string} location - Location string (city, area, pincode, etc.)
 * @returns {Promise<{lat: number, lng: number, display_name: string}>}
 */
async function geocodeLocation(location) {
    try {
        // Nominatim API endpoint (free, no API key required)
        // FIX: Use format=json and limit=1 as required
        const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&limit=1&addressdetails=1`;
        
        console.log(`📍 Step 1: Geocoding location "${location}"...`);
        console.log(`📡 Nominatim URL: ${nominatimUrl}`);
        
        const response = await fetch(nominatimUrl, {
            headers: {
                'User-Agent': 'MediCare-AI-Hospital-Finder/1.0' // Required by Nominatim
            }
        });

        if (!response.ok) {
            throw new Error(`Geocoding failed: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(`📊 Nominatim response:`, data);

        if (!data || data.length === 0) {
            throw new Error('Location not found. Please try a different location name.');
        }

        const result = data[0];
        const lat = parseFloat(result.lat);
        const lng = parseFloat(result.lon);
        
        // FIX: Verify coordinates are valid numbers
        if (isNaN(lat) || isNaN(lng)) {
            throw new Error('Invalid coordinates received from geocoding service');
        }
        
        console.log(`✅ STEP 1 COMPLETE: Location geocoded successfully:`);
        console.log(`   - Latitude: ${lat}`);
        console.log(`   - Longitude: ${lng}`);
        console.log(`   - Display Name: ${result.display_name}`);
        
        // Verify Chennai coordinates (expected: lat ~13.08, lon ~80.27)
        if (Math.abs(lat - 13.08) < 1 && Math.abs(lng - 80.27) < 1) {
            console.log(`✅ Verified: Chennai coordinates are correct (approx lat 13.08, lon 80.27)`);
        }
        
        return {
            lat: lat,
            lng: lng,
            display_name: result.display_name
        };
    } catch (error) {
        console.error('❌ Geocoding error:', error);
        throw new Error(`Failed to find location: ${error.message}`);
    }
}

/**
 * Calculate distance between two coordinates using Haversine formula
 * 
 * @param {number} lat1 - Latitude of first point
 * @param {number} lon1 - Longitude of first point
 * @param {number} lat2 - Latitude of second point
 * @param {number} lon2 - Longitude of second point
 * @returns {number} Distance in kilometers
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

/**
 * Format distance for display
 * 
 * @param {number} distanceKm - Distance in kilometers
 * @returns {string} Formatted distance (e.g., "1.2 km" or "500 m")
 */
function formatDistance(distanceKm) {
    if (distanceKm < 1) {
        return `${Math.round(distanceKm * 1000)} m`;
    }
    return `${distanceKm.toFixed(1)} km`;
}

/**
 * Fetch nearby hospitals using Overpass API (Primary Method)
 * FIXED: Use Overpass API as primary method with 7km radius
 * 
 * @param {number} lat - Latitude of search center
 * @param {number} lng - Longitude of search center
 * @param {number} radiusKm - Search radius in kilometers (default: 7km as per requirements)
 * @returns {Promise<Array>} Array of hospital objects
 */
async function fetchNearbyHospitals(lat, lng, radiusKm = 7) {
    console.log(`🔍 Fetching hospitals within ${radiusKm}km of (${lat}, ${lng})`);
    
    // Use Overpass API as primary method (as specified in requirements)
    return await fetchNearbyHospitalsOverpass(lat, lng, radiusKm);
}

/**
 * Fetch hospitals using Nominatim search API (More Reliable Method)
 * 
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @param {number} radiusKm - Search radius
 * @returns {Promise<Array>} Array of hospital objects
 */
async function fetchHospitalsViaNominatim(lat, lng, radiusKm = 10) {
    const searchTerms = ['hospital', 'clinic', 'medical center', 'health center'];
    const hospitals = [];
    const seenIds = new Set();
    const bbox = calculateBoundingBox(lat, lng, radiusKm);
    
    for (const term of searchTerms) {
        try {
            // Use Nominatim's search with bounding box
            const nominatimUrl = `https://nominatim.openstreetmap.org/search?` +
                `q=${encodeURIComponent(term)}&` +
                `format=json&` +
                `bounded=1&` +
                `viewbox=${bbox.minLng},${bbox.maxLat},${bbox.maxLng},${bbox.minLat}&` +
                `limit=50&` +
                `addressdetails=1`;
            
            console.log(`📡 Searching Nominatim for: "${term}"`);
            
            const response = await fetch(nominatimUrl, {
                headers: {
                    'User-Agent': 'MediCare-AI-Hospital-Finder/1.0',
                    'Accept-Language': 'en'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            const data = await response.json();
            console.log(`📊 Nominatim returned ${data.length} results for "${term}"`);
            
            for (const item of data) {
                // Skip if already seen
                if (seenIds.has(item.place_id)) continue;
                
                const itemLat = parseFloat(item.lat);
                const itemLng = parseFloat(item.lon);
                const distance = calculateDistance(lat, lng, itemLat, itemLng);
                
                // Only include if within radius and is a healthcare facility
                if (distance <= radiusKm) {
                    // Check if it's actually a hospital/clinic
                    const type = item.type || '';
                    const category = item.category || '';
                    const classType = item.class || '';
                    
                    const isHealthcare = 
                        type.includes('hospital') || 
                        type.includes('clinic') ||
                        category.includes('healthcare') ||
                        classType === 'amenity' ||
                        item.display_name.toLowerCase().includes('hospital') ||
                        item.display_name.toLowerCase().includes('clinic') ||
                        item.display_name.toLowerCase().includes('medical');
                    
                    if (isHealthcare) {
                        seenIds.add(item.place_id);
                        
                        // Build address
                        const address = item.display_name || 
                                      (item.address ? 
                                        `${item.address.road || ''} ${item.address.city || ''} ${item.address.state || ''}`.trim() : 
                                        'Address not available');
                        
                        hospitals.push({
                            id: item.place_id,
                            name: item.display_name.split(',')[0] || 'Hospital',
                            lat: itemLat,
                            lng: itemLng,
                            address: address,
                            phone: item.extratags?.phone || null,
                            website: item.extratags?.website || null,
                            distance: distance,
                            type: 'hospital'
                        });
                    }
                }
            }
            
            // Respect rate limit (1 request per second)
            await new Promise(resolve => setTimeout(resolve, 1100));
            
        } catch (error) {
            console.warn(`⚠️ Nominatim search failed for "${term}":`, error.message);
            continue;
        }
    }
    
    // Sort by distance and remove duplicates
    hospitals.sort((a, b) => a.distance - b.distance);
    console.log(`✅ Nominatim method found ${hospitals.length} unique hospitals`);
    return hospitals;
}

/**
 * Fetch nearby hospitals using Overpass API
 * FIXED: Uses exact query structure, 7km radius, proper way coordinate extraction
 * CRITICAL: Chennai hospitals are mostly returned as 'way', NOT 'node'
 * 
 * @param {number} lat - Latitude of search center
 * @param {number} lng - Longitude of search center
 * @param {number} radiusKm - Search radius in kilometers (default: 7km as per requirements)
 * @returns {Promise<Array>} Array of hospital objects
 */
async function fetchNearbyHospitalsOverpass(lat, lng, radiusKm = 7) {
    try {
        // STEP 2: Convert radius from km to meters for Overpass API (7km = 7000m)
        const radiusMeters = radiusKm * 1000;

        console.log(`🔍 STEP 2: Searching for hospitals within ${radiusKm}km (${radiusMeters}m) of (${lat}, ${lng})`);
        console.log(`📍 Expected Chennai coordinates: lat ~13.08, lon ~80.27`);

        // CRITICAL: Use EXACT query structure as specified - DO NOT SIMPLIFY
        // This query structure is required for proper way handling
        const overpassQuery = `[out:json];
(
  node["amenity"="hospital"](around:${radiusMeters},${lat},${lng});
  way["amenity"="hospital"](around:${radiusMeters},${lat},${lng});
);
out center;`;

        console.log(`📋 Overpass Query (exact structure):`);
        console.log(overpassQuery);

        // FIX: Use primary Overpass API endpoint as specified
        const overpassUrl = 'https://overpass-api.de/api/interpreter';
        
        console.log(`📡 Calling Overpass API: ${overpassUrl}`);
        
        const response = await fetch(overpassUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `data=${encodeURIComponent(overpassQuery)}`
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(`📊 STEP 3: Raw Overpass API response:`, JSON.stringify(data, null, 2));
        console.log(`📊 Total elements received: ${data.elements ? data.elements.length : 0}`);
        
        // Count element types for debugging
        if (data.elements) {
            const nodeCount = data.elements.filter(e => e.type === 'node').length;
            const wayCount = data.elements.filter(e => e.type === 'way').length;
            const relationCount = data.elements.filter(e => e.type === 'relation').length;
            console.log(`📊 Element breakdown: ${nodeCount} nodes, ${wayCount} ways, ${relationCount} relations`);
            console.log(`⚠️ IMPORTANT: Chennai hospitals are mostly 'way' elements - ensure way parsing works!`);
        }

        if (!data || !data.elements || data.elements.length === 0) {
            console.log(`⚠️ No hospitals found in Overpass response`);
            return [];
        }

        // STEP 3: CORRECTLY PARSE OVERPASS RESULTS
        // CRITICAL: Chennai hospitals are mostly returned as 'way', NOT 'node'
        // 'way' elements DO NOT have lat/lon directly - must use element.center
        const hospitals = [];
        
        for (const element of data.elements) {
            const tags = element.tags || {};
            
            // Only process if it's actually a hospital (has amenity=hospital tag)
            if (tags.amenity !== 'hospital') {
                continue;
            }
            
            // Extract hospital name - use safe defaults for missing names
            const name = tags.name || 
                        tags['name:en'] || 
                        tags['name:hi'] || 
                        tags['name:ta'] || 
                        'Unnamed Hospital';
            
            // CRITICAL PARSING RULES:
            // - If element.type === "node": use element.lat and element.lon
            // - If element.type === "way": use element.center.lat and element.center.lon
            // - Skip elements without coordinates
            let hospitalLat, hospitalLng;
            
            if (element.type === 'node') {
                // Nodes have direct lat/lon
                hospitalLat = parseFloat(element.lat);
                hospitalLng = parseFloat(element.lon);
                console.log(`📍 Node ${element.id}: ${name} at (${hospitalLat}, ${hospitalLng})`);
            } else if (element.type === 'way') {
                // CRITICAL: Ways DO NOT have lat/lon directly - MUST use element.center
                // This is the most common case for Chennai hospitals
                if (element.center) {
                    hospitalLat = parseFloat(element.center.lat);
                    hospitalLng = parseFloat(element.center.lon);
                    console.log(`📍 Way ${element.id}: ${name} at center (${hospitalLat}, ${hospitalLng})`);
                } else {
                    console.warn(`⚠️ Skipping way ${element.id}: No center coordinates available`);
                    continue; // Skip if no center coordinates
                }
            } else if (element.type === 'relation') {
                // Relations also use center coordinates
                if (element.center) {
                    hospitalLat = parseFloat(element.center.lat);
                    hospitalLng = parseFloat(element.center.lon);
                    console.log(`📍 Relation ${element.id}: ${name} at center (${hospitalLat}, ${hospitalLng})`);
                } else {
                    console.warn(`⚠️ Skipping relation ${element.id}: No center coordinates available`);
                    continue;
                }
            } else {
                console.warn(`⚠️ Skipping unknown element type: ${element.type}`);
                continue;
            }
            
            // FIX: Validate coordinates are valid numbers
            if (isNaN(hospitalLat) || isNaN(hospitalLng)) {
                console.warn(`⚠️ Skipping ${element.id}: Invalid coordinates (${hospitalLat}, ${hospitalLng})`);
                continue;
            }
            
            // Validate coordinates are within reasonable range
            if (hospitalLat < -90 || hospitalLat > 90 || hospitalLng < -180 || hospitalLng > 180) {
                console.warn(`⚠️ Skipping ${element.id}: Coordinates out of range (${hospitalLat}, ${hospitalLng})`);
                continue;
            }

            // Build address from available tags
            const addressParts = [];
            if (tags['addr:housenumber']) addressParts.push(tags['addr:housenumber']);
            if (tags['addr:street']) addressParts.push(tags['addr:street']);
            if (tags['addr:city']) addressParts.push(tags['addr:city']);
            if (tags['addr:state']) addressParts.push(tags['addr:state']);
            if (tags['addr:postcode']) addressParts.push(tags['addr:postcode']);
            if (tags['addr:district']) addressParts.push(tags['addr:district']);
            
            // If no address parts, use coordinates as fallback
            let address = 'Address not available';
            if (addressParts.length > 0) {
                address = addressParts.join(', ');
            } else if (tags['addr:full']) {
                address = tags['addr:full'];
            }

            // Calculate distance from search location
            const distance = calculateDistance(lat, lng, hospitalLat, hospitalLng);
            
            // Only include if within radius
            if (distance <= radiusKm) {
                hospitals.push({
                    id: element.id || `${hospitalLat}-${hospitalLng}`,
                    name: name,
                    lat: hospitalLat,
                    lng: hospitalLng,
                    address: address,
                    phone: tags.phone || tags['contact:phone'] || tags['contact:mobile'] || null,
                    website: tags.website || tags['contact:website'] || null,
                    distance: distance,
                    type: 'hospital'
                });
                
                console.log(`✅ Added hospital: ${name} at (${hospitalLat}, ${hospitalLng}), ${distance.toFixed(2)}km away`);
            } else {
                console.log(`⚠️ Hospital ${name} is ${distance.toFixed(2)}km away, outside ${radiusKm}km radius`);
            }
        }
        
        // Sort by distance
        hospitals.sort((a, b) => a.distance - b.distance);
        
        console.log(`✅ STEP 3 COMPLETE: Parsed ${hospitals.length} hospitals from Overpass response`);
        console.log(`📋 Parsed hospitals:`, hospitals.map(h => ({ name: h.name, type: 'parsed', lat: h.lat, lng: h.lng })));
        
        if (hospitals.length === 0) {
            console.warn(`⚠️ WARNING: No hospitals parsed! Check if way elements have center coordinates.`);
        }
        
        return hospitals;
        
    } catch (error) {
        console.error('❌ Error in Overpass API:', error);
        console.error('Error details:', error.message, error.stack);
        return [];
    }
}

/**
 * Calculate bounding box for a location and radius
 * 
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @param {number} radiusKm - Radius in kilometers
 * @returns {Object} Bounding box coordinates
 */
function calculateBoundingBox(lat, lng, radiusKm) {
    const R = 6371; // Earth's radius in km
    const latDelta = radiusKm / R * (180 / Math.PI);
    const lngDelta = radiusKm / (R * Math.cos(lat * Math.PI / 180)) * (180 / Math.PI);
    
    return {
        minLat: lat - latDelta,
        maxLat: lat + latDelta,
        minLng: lng - lngDelta,
        maxLng: lng + lngDelta
    };
}

/**
 * Display hospitals on the map and in the list
 * 
 * @param {Array} hospitals - Array of hospital objects
 * @param {Object} searchLocation - {lat, lng, display_name}
 */
function displayHospitals(hospitals, searchLocation) {
    const hospitalListContainer = document.getElementById('hospitalList');
    
    if (!hospitalMap || !hospitalListContainer) {
        console.error('Map or list container not found');
        return;
    }

    // Clear existing markers
    markerCluster.clearLayers();
    hospitalMarkers = [];

    // Remove current location marker if exists
    if (currentLocationMarker) {
        hospitalMap.removeLayer(currentLocationMarker);
    }

    // FIXED: Add marker for search location with proper icon handling
    currentLocation = searchLocation;
    
    // FIX: Fix missing default marker icon issue - use try/catch and fallback
    let locationIcon;
    try {
        locationIcon = L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
    } catch (error) {
        console.warn('⚠️ Custom location icon failed, using default:', error);
        // Use default Leaflet icon as fallback
        locationIcon = new L.Icon.Default();
    }
    
    currentLocationMarker = L.marker([searchLocation.lat, searchLocation.lng], {
        icon: locationIcon
    }).addTo(hospitalMap);
    
    console.log(`✅ Search location marker added at (${searchLocation.lat}, ${searchLocation.lng})`);
    
    currentLocationMarker.bindPopup(`
        <div style="text-align: center;">
            <strong>📍 Search Location</strong><br>
            ${searchLocation.display_name}
        </div>
    `).openPopup();

    // FIX: Center map on search location with proper zoom
    hospitalMap.setView([searchLocation.lat, searchLocation.lng], 13);
    console.log(`🗺️ Map centered at (${searchLocation.lat}, ${searchLocation.lng})`);

    if (!hospitals || hospitals.length === 0) {
        console.warn('⚠️ No hospitals to display');
        hospitalListContainer.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-hospital text-muted" style="font-size: 3rem;"></i>
                <p class="text-muted mt-3"><strong>${t('noHospitalsFound')}</strong></p>
                <p class="text-muted small mt-2">No hospitals found within 7km of this location.</p>
                <div class="alert alert-info mt-3 small">
                    <strong>Suggestions:</strong>
                    <ul class="text-start mt-2 mb-0">
                        <li>Try searching for a major city (e.g., "Chennai", "Mumbai", "Delhi", "Bangalore")</li>
                        <li>Use a more specific area name</li>
                        <li>Try a nearby city or landmark</li>
                        <li>Some areas may have limited hospital data in OpenStreetMap</li>
                    </ul>
                </div>
            </div>
        `;
        return;
    }
    
    console.log(`📊 Displaying ${hospitals.length} hospitals on map and in list`);

    // FIXED: Create markers for each hospital with proper icon handling
    hospitals.forEach((hospital, index) => {
        console.log(`📍 Creating marker ${index + 1}/${hospitals.length}: ${hospital.name} at (${hospital.lat}, ${hospital.lng})`);
        
        // FIX: Use default Leaflet icon if custom icon fails to load
        let hospitalIcon;
        try {
            hospitalIcon = L.icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });
        } catch (error) {
            console.warn('⚠️ Custom icon failed, using default:', error);
            // Use default Leaflet icon as fallback
            hospitalIcon = new L.Icon.Default();
        }

        // FIX: Validate coordinates before creating marker
        if (isNaN(hospital.lat) || isNaN(hospital.lng)) {
            console.error(`❌ Invalid coordinates for hospital ${hospital.name}: (${hospital.lat}, ${hospital.lng})`);
            return; // Skip this hospital
        }

        const marker = L.marker([hospital.lat, hospital.lng], {
            icon: hospitalIcon
        });
        
        console.log(`✅ Marker created for ${hospital.name}`);

        // Create popup content
        let popupContent = `
            <div style="min-width: 200px;">
                <h6 style="margin: 0 0 8px 0; font-weight: bold; color: #d32f2f;">${hospital.name}</h6>
                <p style="margin: 0 0 5px 0; font-size: 12px; color: #666;">
                    <i class="bi bi-geo-alt"></i> ${hospital.address}
                </p>
        `;

        if (hospital.phone) {
            popupContent += `
                <p style="margin: 0 0 5px 0; font-size: 12px; color: #666;">
                    <i class="bi bi-telephone"></i> ${hospital.phone}
                </p>
            `;
        }

        popupContent += `
                <p style="margin: 0; font-size: 12px; color: #666;">
                    <i class="bi bi-rulers"></i> ${formatDistance(hospital.distance)} away
                </p>
            </div>
        `;

        marker.bindPopup(popupContent);
        
        // Add click handler to highlight in list
        marker.on('click', () => {
            highlightHospitalInList(index);
        });

        // Add to cluster group
        markerCluster.addLayer(marker);
        hospitalMarkers.push({ marker, hospital, index });
    });

    // Fit map bounds to show all markers
    if (hospitalMarkers.length > 0) {
        const bounds = L.latLngBounds(
            [[searchLocation.lat, searchLocation.lng]],
            hospitalMarkers.map(h => [h.hospital.lat, h.hospital.lng])
        );
        hospitalMap.fitBounds(bounds, { padding: [50, 50] });
    }

    // Display hospitals in list
    let listHTML = `
        <div class="alert alert-success mb-3">
            <i class="bi bi-check-circle me-2"></i>
            <strong>Found ${hospitals.length} ${hospitals.length === 1 ? 'hospital' : 'hospitals'}</strong> near your location
        </div>
        <div class="list-group">
    `;
    
    hospitals.forEach((hospital, index) => {
        console.log(`📍 Hospital ${index + 1}: ${hospital.name} at (${hospital.lat}, ${hospital.lng})`);
        listHTML += `
            <div class="list-group-item list-group-item-action hospital-item" 
                 data-index="${index}" 
                 onclick="focusHospitalMarker(${index})"
                 style="cursor: pointer; border-left: 3px solid #dc3545;">
                <div class="d-flex w-100 justify-content-between align-items-start mb-2">
                    <h6 class="mb-1">
                        <i class="bi bi-hospital text-danger me-2"></i>${hospital.name}
                    </h6>
                    <small class="text-muted">${formatDistance(hospital.distance)}</small>
                </div>
                <p class="mb-1 small text-muted">
                    <i class="bi bi-geo-alt me-1"></i>${hospital.address}
                </p>
                ${hospital.phone ? `
                    <p class="mb-1 small text-muted">
                        <i class="bi bi-telephone me-1"></i>${hospital.phone}
                    </p>
                ` : ''}
                <div class="mt-2">
                    <a href="https://www.openstreetmap.org/?mlat=${hospital.lat}&mlon=${hospital.lng}&zoom=15" 
                       target="_blank" 
                       class="btn btn-sm btn-outline-primary"
                       onclick="event.stopPropagation();">
                        <i class="bi bi-map me-1"></i>${t('directions')}
                    </a>
                </div>
            </div>
        `;
    });

    listHTML += `</div>`;
    hospitalListContainer.innerHTML = listHTML;
}

/**
 * Highlight a hospital in the list when marker is clicked
 * 
 * @param {number} index - Index of hospital in the list
 */
function highlightHospitalInList(index) {
    // Remove previous highlights
    document.querySelectorAll('.hospital-item').forEach(item => {
        item.classList.remove('active');
        item.style.backgroundColor = '';
    });

    // Highlight selected hospital
    const hospitalItem = document.querySelector(`.hospital-item[data-index="${index}"]`);
    if (hospitalItem) {
        hospitalItem.classList.add('active');
        hospitalItem.style.backgroundColor = '#f8f9fa';
        hospitalItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

/**
 * Focus on a hospital marker when clicked in the list
 * 
 * @param {number} index - Index of hospital
 */
window.focusHospitalMarker = function(index) {
    if (!hospitalMarkers || !hospitalMarkers[index]) {
        return;
    }

    const { marker, hospital } = hospitalMarkers[index];
    
    // Open popup
    marker.openPopup();
    
    // Pan to marker
    hospitalMap.setView([hospital.lat, hospital.lng], 15);
    
    // Highlight in list
    highlightHospitalInList(index);
};

/**
 * Search for hospitals at a given location
 * Main function called when user submits search form
 * 
 * @param {string} locationString - Location string from user input
 */
async function searchHospitals(locationString) {
    const hospitalListContainer = document.getElementById('hospitalList');
    
    if (!hospitalListContainer) {
        console.error('Hospital list container not found');
        return;
    }

    // Show loading state
    hospitalListContainer.innerHTML = `
        <div class="text-center py-4">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">${t('loading')}</span>
            </div>
            <p class="mt-3 text-muted">${t('loadingHospitals')}</p>
            <p class="text-muted small">Searching for hospitals... This may take a few seconds.</p>
        </div>
    `;

    try {
        console.log(`🔍 Starting hospital search for: "${locationString}"`);
        
        // Step 1: Geocode the location
        console.log('📍 Step 1: Geocoding location...');
        const searchLocation = await geocodeLocation(locationString);
        console.log('✅ Location geocoded:', searchLocation);

        // Step 2: Fetch nearby hospitals (7km radius as per requirements)
        console.log('🏥 Step 2: Searching for hospitals using Overpass API...');
        const hospitals = await fetchNearbyHospitals(searchLocation.lat, searchLocation.lng, 7);
        console.log(`✅ Search complete: Found ${hospitals.length} hospitals`);
        
        // If no hospitals found, try with larger radius (10km) as fallback
        if (hospitals.length === 0) {
            console.log('⚠️ No hospitals in 7km, trying 10km radius...');
            const moreHospitals = await fetchNearbyHospitals(searchLocation.lat, searchLocation.lng, 10);
            if (moreHospitals.length > 0) {
                console.log(`✅ Found ${moreHospitals.length} hospitals in larger radius`);
                hospitals.push(...moreHospitals);
            }
        }

        // Step 3: Display hospitals on map and in list
        if (hospitals.length === 0) {
            console.warn('⚠️ No hospitals found, showing message');
        }
        displayHospitals(hospitals, searchLocation);

    } catch (error) {
        console.error('❌ Search error:', error);
        hospitalListContainer.innerHTML = `
            <div class="alert alert-warning">
                <h6><i class="bi bi-exclamation-triangle me-2"></i>${t('error')}</h6>
                <p><strong>${error.message}</strong></p>
                <p class="small mb-2 mt-3">Please try:</p>
                <ul class="small mb-0">
                    <li>Checking the spelling of the location</li>
                    <li>Using a more specific location (city name, area name)</li>
                    <li>Trying a nearby city or landmark</li>
                    <li>Waiting a few seconds and trying again (API rate limits)</li>
                </ul>
                <p class="small text-muted mt-2 mb-0">
                    <i class="bi bi-info-circle me-1"></i>
                    Tip: Try searching for major cities like "Mumbai", "Delhi", "Bangalore" for best results.
                </p>
            </div>
        `;
    }
}

// Initialize map when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHospitalMap);
} else {
    initHospitalMap();
}

// Make searchHospitals available globally for testing
window.testHospitalSearch = async function(location = 'Chennai, India') {
    console.log('🧪 TEST: Starting hospital search test...');
    console.log('🧪 TEST: Location:', location);
    await searchHospitals(location);
};

// Log when hospital finder is loaded
console.log('✅ Hospital Finder loaded and ready!');
console.log('💡 Test search: Type testHospitalSearch("Chennai") in console');

