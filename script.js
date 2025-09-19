// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Sample properties data
const propertiesData = [
    {
        id: 1,
        type: 'bar',
        title: 'Bar moderne en centre-ville',
        location: 'Paris 11ème',
        surface: 85,
        rooms: 2,
        price: 3200,
        image: 'bar1.jpg',
        description: 'Local parfait pour un bar moderne avec terrasse de 20m²'
    },
    {
        id: 2,
        type: 'restaurant',
        title: 'Restaurant avec cuisine équipée',
        location: 'Lyon 2ème',
        surface: 120,
        rooms: 3,
        price: 4500,
        image: 'restaurant1.jpg',
        description: 'Espace idéal pour restaurant avec cuisine professionnelle'
    },
    {
        id: 3,
        type: 'tabac',
        title: 'Bureau de tabac stratégique',
        location: 'Marseille 1er',
        surface: 45,
        rooms: 1,
        price: 1800,
        image: 'tabac1.jpg',
        description: 'Emplacement de choix pour bureau de tabac'
    },
    {
        id: 4,
        type: 'bar',
        title: 'Bar à cocktails trendy',
        location: 'Toulouse Centre',
        surface: 95,
        rooms: 2,
        price: 2800,
        image: 'bar2.jpg',
        description: 'Local parfait pour bar à cocktails avec ambiance moderne'
    },
    {
        id: 5,
        type: 'restaurant',
        title: 'Fast-food en zone commerciale',
        location: 'Nantes Est',
        surface: 75,
        rooms: 2,
        price: 2200,
        image: 'restaurant2.jpg',
        description: 'Local idéal pour fast-food avec forte fréquentation'
    },
    {
        id: 6,
        type: 'tabac',
        title: 'Tabac presse en quartier résidentiel',
        location: 'Bordeaux Centre',
        surface: 60,
        rooms: 1,
        price: 1950,
        image: 'tabac2.jpg',
        description: 'Bureau de tabac avec presse en zone résidentielle'
    }
];

// Property type icons
const propertyIcons = {
    bar: 'fas fa-wine-glass-alt',
    restaurant: 'fas fa-utensils',
    tabac: 'fas fa-smoking'
};

// Property type labels
const propertyLabels = {
    bar: 'Bar',
    restaurant: 'Restaurant',
    tabac: 'Tabac'
};

// Render properties
function renderProperties(properties = propertiesData) {
    const propertiesGrid = document.getElementById('properties-grid');
    
    if (properties.length === 0) {
        propertiesGrid.innerHTML = `
            <div class="text-center" style="grid-column: 1 / -1; padding: 3rem;">
                <i class="fas fa-search" style="font-size: 3rem; color: var(--text-light); margin-bottom: 1rem;"></i>
                <h3>Aucun local trouvé</h3>
                <p>Essayez de modifier vos critères de recherche</p>
            </div>
        `;
        return;
    }

    propertiesGrid.innerHTML = properties.map(property => `
        <div class="property-card" data-property-id="${property.id}">
            <div class="property-image">
                <i class="${propertyIcons[property.type]}"></i>
            </div>
            <div class="property-content">
                <span class="property-type">${propertyLabels[property.type]}</span>
                <h3 class="property-title">${property.title}</h3>
                <p class="property-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${property.location}
                </p>
                <div class="property-details">
                    <div class="property-detail">
                        <span class="property-detail-label">Surface</span>
                        <span class="property-detail-value">${property.surface} m²</span>
                    </div>
                    <div class="property-detail">
                        <span class="property-detail-label">Pièces</span>
                        <span class="property-detail-value">${property.rooms}</span>
                    </div>
                </div>
                <div class="property-price">${property.price.toLocaleString()} €/mois</div>
                <button class="property-btn" onclick="contactProperty(${property.id})">
                    <i class="fas fa-phone"></i>
                    Contacter
                </button>
            </div>
        </div>
    `).join('');
}

// Filter properties
function filterProperties() {
    const locationFilter = document.querySelector('input[placeholder="Ville, code postal..."]').value.toLowerCase();
    const typeFilter = document.querySelector('.filter-select').value;
    const surfaceMin = document.querySelector('input[placeholder="Min"]').value;
    const surfaceMax = document.querySelector('input[placeholder="Max"]').value;
    const priceMin = document.querySelectorAll('input[type="number"]')[2].value;
    const priceMax = document.querySelectorAll('input[type="number"]')[3].value;

    let filteredProperties = propertiesData.filter(property => {
        const matchesLocation = !locationFilter || 
            property.location.toLowerCase().includes(locationFilter);
        const matchesType = !typeFilter || property.type === typeFilter;
        const matchesSurfaceMin = !surfaceMin || property.surface >= parseInt(surfaceMin);
        const matchesSurfaceMax = !surfaceMax || property.surface <= parseInt(surfaceMax);
        const matchesPriceMin = !priceMin || property.price >= parseInt(priceMin);
        const matchesPriceMax = !priceMax || property.price <= parseInt(priceMax);

        return matchesLocation && matchesType && matchesSurfaceMin && 
               matchesSurfaceMax && matchesPriceMin && matchesPriceMax;
    });

    renderProperties(filteredProperties);
}

// Search functionality
function performSearch() {
    const locationSearch = document.querySelector('.search-input').value.toLowerCase();
    const typeSearch = document.querySelector('.search-select').value;

    let filteredProperties = propertiesData.filter(property => {
        const matchesLocation = !locationSearch || 
            property.location.toLowerCase().includes(locationSearch);
        const matchesType = !typeSearch || property.type === typeSearch;

        return matchesLocation && matchesType;
    });

    renderProperties(filteredProperties);
    
    // Scroll to properties section
    document.querySelector('.properties').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Category filter
function filterByCategory(category) {
    const filteredProperties = propertiesData.filter(property => 
        property.type === category
    );
    renderProperties(filteredProperties);
    
    // Scroll to properties section
    document.querySelector('.properties').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// View toggle (grid/list)
function toggleView(view) {
    const propertiesGrid = document.getElementById('properties-grid');
    const viewButtons = document.querySelectorAll('.view-btn');
    
    viewButtons.forEach(btn => btn.classList.remove('active'));
    event.target.closest('.view-btn').classList.add('active');
    
    if (view === 'list') {
        propertiesGrid.style.gridTemplateColumns = '1fr';
        propertiesGrid.classList.add('list-view');
    } else {
        propertiesGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(350px, 1fr))';
        propertiesGrid.classList.remove('list-view');
    }
}

// Contact property
function contactProperty(propertyId) {
    const property = propertiesData.find(p => p.id === propertyId);
    if (property) {
        // Scroll to contact form
        document.querySelector('.contact').scrollIntoView({ 
            behavior: 'smooth' 
        });
        
        // Pre-fill the form
        const typeSelect = document.querySelector('.form-select');
        typeSelect.value = property.type;
        
        // Show success message
        showNotification(`Intérêt enregistré pour "${property.title}"`, 'success');
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--primary-color)' : 'var(--gray-700)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    showNotification('Message envoyé avec succès ! Nous vous recontacterons rapidement.', 'success');
    
    // Reset form
    event.target.reset();
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = 'var(--shadow-md)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Render initial properties
    renderProperties();
    
    // Add event listeners
    document.querySelector('.search-btn').addEventListener('click', performSearch);
    document.querySelector('.filter-btn').addEventListener('click', filterProperties);
    document.querySelector('.contact-form').addEventListener('submit', handleFormSubmit);
    
    // Category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            filterByCategory(category);
        });
    });
    
    // View toggle buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            toggleView(view);
        });
    });
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .list-view .property-card {
            display: flex;
            flex-direction: row;
        }
        
        .list-view .property-image {
            width: 200px;
            height: auto;
            flex-shrink: 0;
        }
        
        .list-view .property-content {
            flex: 1;
        }
        
        @media (max-width: 768px) {
            .list-view .property-card {
                flex-direction: column;
            }
            
            .list-view .property-image {
                width: 100%;
                height: 200px;
            }
        }
    `;
    document.head.appendChild(style);
});

// Add loading states
function showLoading(element) {
    element.classList.add('loading');
}

function hideLoading(element) {
    element.classList.remove('loading');
}

// Search input enter key
document.querySelector('.search-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Filter inputs enter key
document.querySelectorAll('.filter-input').forEach(input => {
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            filterProperties();
        }
    });
});
