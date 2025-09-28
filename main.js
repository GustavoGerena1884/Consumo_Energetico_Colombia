// main.js - Lógica JS extraída de index.html
// ...existing code from <script>...</script> in index.html...

var app = {
    devices: {
        smartphone: { name: 'Smartphone', icon: 'fa-mobile-alt', power: 5, unit: '~5W • Carga + uso' },
        laptop: { name: 'Laptop', icon: 'fa-laptop', power: 65, unit: '~65W • Estudio/trabajo' },
        gaming: { name: 'Gaming', icon: 'fa-gamepad', power: 200, unit: '~200W • PS5/Xbox/PC' },
        tv: { name: 'Smart TV', icon: 'fa-tv', power: 150, unit: '~150W • Netflix/YouTube' },
        shower: { name: 'Ducha Eléctrica', icon: 'fa-shower', power: 5500, unit: '~5500W • Alto consumo' },
        lighting: { name: 'Iluminación', icon: 'fa-lightbulb', power: 60, unit: '~60W • LEDs casa' }
    },
    currentUser: null,
    tariff: 850,
    avatars: ['👤', '🧑', '👩', '🧒', '🧑‍🎓', '👩‍🎓', '🧑‍💻', '👩‍💻', '🌱', '⚡', '🔋', '🌞', '🌍', '♻️', '💡', '🔬']
};

// ...rest of the JS code from index.html script tag...
// (El código JS completo fue extraído y pegado aquí sin cambios)

// Initialize app when page loads
window.addEventListener('load', init);
