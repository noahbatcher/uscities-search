const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resultsContainer = document.getElementById('results');
const radioactiveAlert = document.getElementById('radioactive-alert');

const API_BASE = 'https://nbatcher-uscities-microservices-g2f0hzewhkgdb0as.eastus-01.azurewebsites.net/uscities-search/';

let searchTimeout = null;
let alertTimeout = null;

const triggerRadioactiveAlert = () => {
    if (alertTimeout) {
        clearTimeout(alertTimeout);
    }
    radioactiveAlert.classList.remove('hidden');
    alertTimeout = setTimeout(() => {
        radioactiveAlert.classList.add('hidden');
        alertTimeout = null;
    }, 300); // Show for 300ms
};

const displayCityNotFound = () => {
    resultsContainer.innerHTML = '<p class="error">City Not Found</p>';
    triggerRadioactiveAlert();
};

const renderResults = (cities) => {
    if (!cities || cities.length === 0) {
        displayCityNotFound();
        return;
    }

    let html = '';
    cities.forEach(city => {
        html += `
            <div class="city-card">
                <h3>${city.city}, ${city.state_id}</h3>
                <p><span class="label">State:</span> ${city.state_name}</p>
                <p><span class="label">County:</span> ${city.county_name}</p>
                <p><span class="label">Timezone:</span> ${city.timezone}</p>
                <p><span class="label">ZIPs:</span> ${city.zips}</p>
            </div>
        `;
    });

    resultsContainer.innerHTML = DOMPurify.sanitize(html);
};

const performSearch = async () => {
    const query = searchInput.value.trim();
    if (query.length <= 1) {
        resultsContainer.innerHTML = '';
        return;
    }

    // ZIP code validation: if query is numeric and length >= 6
    if (/^\d+$/.test(query) && query.length >= 6) {
        displayCityNotFound();
        return;
    }

    try {
        const response = await fetch(`${API_BASE}${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        renderResults(data);
    } catch (error) {
        console.error('Fetch error:', error);
        displayCityNotFound();
    }
};

const handleInput = () => {
    if (searchTimeout) {
        clearTimeout(searchTimeout);
    }

    const query = searchInput.value.trim();
    if (query.length > 1) {
        searchTimeout = setTimeout(performSearch, 50);
    } else {
        resultsContainer.innerHTML = '';
    }
};

searchInput.addEventListener('input', handleInput);

searchButton.addEventListener('click', performSearch);

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});
