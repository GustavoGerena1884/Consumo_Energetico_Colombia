// Parámetros base Colombia
const tariff = 850;              // COP/kWh promedio estrato 4
const emissionFactor = 0.164;    // kg CO2 por kWh
const solarPanelCapacity = 0.3 * 5 * 30; // 45 kWh/mes por panel
const windTurbineCapacity = 1 * 24 * 30; // 720 kWh/mes por turbina pequeña
const biomassKwhPerKg = 4;       // 1 kg biomasa ≈ 4 kWh

// Costos aproximados en Colombia
const costPerPanel = 1800000;    // COP por panel solar
const costPerTurbine = 12000000; // COP por aerogenerador pequeño
const costPerKgBiomass = 3400;   // COP por kg biomasa

// Dispositivos y sus consumos
const DEVICES = [
  { id: "smartphone", label: "Smartphone", pow: 5, max: 24, default: 8 },
  { id: "laptop", label: "Laptop", pow: 65, max: 16, default: 6 },
  { id: "gaming", label: "Gaming", pow: 200, max: 12, default: 3 },
  { id: "tv", label: "Smart TV", pow: 150, max: 12, default: 4 },
  { id: "shower", label: "Ducha Eléctrica", pow: 5500, max: 2, default: 0.5 },
  { id: "lighting", label: "Iluminación (LED)", pow: 60, max: 14, default: 6 }
];

let currentConsumption = 2.5; // Consumo actual en kWh/día

// Inicializar la aplicación
function initApp() {
  createDeviceSliders();
  calculateTotalConsumption();
  updateResults(currentConsumption);
}

// Crear sliders para cada dispositivo
function createDeviceSliders() {
  const container = document.getElementById('devicesContainer');
  
  DEVICES.forEach(device => {
    const deviceElement = document.createElement('div');
    deviceElement.className = 'device-item';
    deviceElement.innerHTML = `
      <div class="device-header">
        <div class="device-name">${device.label}</div>
        <div class="device-power">${device.pow}W</div>
      </div>
      <div class="device-controls">
        <input type="range" class="device-slider" id="${device.id}" 
               min="0" max="${device.max}" step="0.5" value="${device.default}"
               oninput="updateDeviceConsumption('${device.id}', ${device.pow}, parseFloat(this.value))">
        <div class="device-value" id="${device.id}-value">${device.default} h/día</div>
      </div>
    `;
    container.appendChild(deviceElement);
  });
}

// Calcular consumo total basado en dispositivos
function calculateTotalConsumption() {
  let totalKwh = 0;
  
  DEVICES.forEach(device => {
    const slider = document.getElementById(device.id);
    const hours = parseFloat(slider.value);
    const consumption = (device.pow * hours) / 1000; // Convertir W a kW y calcular kWh
    totalKwh += consumption;
  });
  
  currentConsumption = totalKwh;
  document.getElementById('totalConsumption').textContent = `${totalKwh.toFixed(1)} kWh/día`;
  
  // Actualizar slider manual
  document.getElementById('consumptionRange').value = totalKwh;
  document.getElementById('consumptionValue').textContent = `${totalKwh.toFixed(1)} kWh/día`;
  
  // Actualizar todos los resultados
  updateResults(totalKwh);
}

// Actualizar consumo de un dispositivo específico
function updateDeviceConsumption(deviceId, power, hours) {
  // Actualizar valor mostrado
  document.getElementById(`${deviceId}-value`).textContent = `${hours.toFixed(1)} h/día`;
  
  // Recalcular consumo total
  calculateTotalConsumption();
}

// Actualizar consumo manual (slider principal)
function updateManualConsumption(kWh) {
  currentConsumption = kWh;
  document.getElementById('consumptionValue').textContent = `${kWh.toFixed(1)} kWh/día`;
  updateResults(kWh);
}

// Actualiza todos los resultados
function updateResults(kWhDay) {
  document.getElementById("consumptionValue").textContent = `${kWhDay.toFixed(1)} kWh/día`;

  const dailyKwh = kWhDay;
  const monthlyKwh = dailyKwh * 30;
  const annualKwh = dailyKwh * 365;

  // Costos
  const monthlyCost = monthlyKwh * tariff;
  const annualCost = annualKwh * tariff;

  // Emisiones
  const annualCO2 = Math.round(annualKwh * emissionFactor);

  // DOM actualización
  document.getElementById("daily-kwh").textContent = dailyKwh.toFixed(1);
  document.getElementById("monthly-cost").textContent = `$${monthlyCost.toLocaleString("es-CO")}`;
  document.getElementById("co2-emissions").textContent = annualCO2;

  document.getElementById("daily-cost").textContent = `$${(dailyKwh * tariff).toLocaleString("es-CO")}`;
  document.getElementById("monthly-cost-detailed").textContent = `$${monthlyCost.toLocaleString("es-CO")}`;
  document.getElementById("annual-cost").textContent = `$${annualCost.toLocaleString("es-CO")}`;

  // Soluciones renovables
  const solarPanels = Math.ceil(monthlyKwh / solarPanelCapacity);
  const windTurbines = Math.ceil(monthlyKwh / windTurbineCapacity);
  const biomassKg = Math.ceil(monthlyKwh / biomassKwhPerKg);

  document.getElementById("solar-panels-needed").textContent = solarPanels;
  document.getElementById("wind-turbines-needed").textContent = windTurbines;
  document.getElementById("biomass-needed").textContent = biomassKg;

  // Impacto ambiental Colombia
  updateColombiaImpact(annualCO2, monthlyKwh);

  // Comparación
  updateComparison(dailyKwh, monthlyCost, annualCO2);

  // Planeta simbólico
  updatePlanet(dailyKwh);
}

function updateColombiaImpact(annualCO2, monthlyKwh) {
  // Cálculos de impacto ambiental para Colombia
  const glacierLoss = (annualCO2 * 0.05).toFixed(0);
  const forestImpact = (annualCO2 * 0.02).toFixed(0);
  const speciesRisk = Math.min((annualCO2 / 1000).toFixed(0), 50);
  const waterImpact = Math.round(monthlyKwh * 2.5); // Litros de agua por generación eléctrica

  // Actualizar sección inferior
  document.getElementById("glacier-loss").textContent = `${glacierLoss} cm²`;
  document.getElementById("forest-impact").textContent = `${forestImpact} m²`;
  document.getElementById("species-risk").textContent = speciesRisk;

  // Actualizar pestaña de impacto
  document.getElementById("glacier-loss-tab").textContent = `${glacierLoss} cm²`;
  document.getElementById("forest-impact-tab").textContent = `${forestImpact} m²`;
  document.getElementById("species-risk-tab").textContent = speciesRisk;
  document.getElementById("water-impact-tab").textContent = `${waterImpact.toLocaleString("es-CO")} L`;
}

function updateComparison(dailyKwh, monthlyCost, annualCO2) {
  // Actualizar datos de comparación
  document.getElementById("comparison-your-consumption").innerHTML = 
    `Actual: <strong>${dailyKwh.toFixed(1)} kWh/día</strong>`;
  document.getElementById("comparison-your-cost").innerHTML = 
    `Costo: <strong>$${monthlyCost.toLocaleString("es-CO")} COP/mes</strong>`;
  document.getElementById("comparison-your-emissions").innerHTML = 
    `CO₂: <strong>${annualCO2} kg/año</strong>`;
}

function updatePlanet(kWhDay) {
  const planet = document.getElementById("planetEarth");
  const planetTemp = document.getElementById("planetTemp");
  const planetStatus = document.getElementById("planetStatus");

  let extraTemp = (kWhDay - 1) * 0.3;
  if (extraTemp < 0) extraTemp = 0;
  if (extraTemp > 4) extraTemp = 4;

  planetTemp.textContent = `+${extraTemp.toFixed(1)}°C`;

  if (extraTemp < 1) {
    planet.style.backgroundColor = "#3b82f6"; // azul
    planetStatus.textContent = "🌍 Planeta Equilibrado";
  } else if (extraTemp < 2.5) {
    planet.style.backgroundColor = "#facc15"; // amarillo
    planetStatus.textContent = "⚠️ En riesgo";
  } else {
    planet.style.backgroundColor = "#dc2626"; // rojo
    planetStatus.textContent = "🔥 Emergencia climática";
  }
}

// Función para alternar pestañas
function switchTab(tabId) {
  document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));

  document.querySelector(`[onclick="switchTab('${tabId}')"]`).classList.add('active');
  document.getElementById(`${tabId}-tab`).classList.add('active');
}

// Inicializar la aplicación cuando se carga la página
window.onload = initApp;