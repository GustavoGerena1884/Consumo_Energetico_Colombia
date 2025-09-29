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

  document.getElementById("solar-panels-needed").textContent =
    `${solarPanels} (${(solarPanels * costPerPanel / 1e6).toFixed(1)} M COP)`;
  document.getElementById("wind-turbines-needed").textContent =
    `${windTurbines} (${(windTurbines * costPerTurbine / 1e6).toFixed(1)} M COP)`;
  document.getElementById("biomass-needed").textContent =
    `${biomassKg} (${(biomassKg * costPerKgBiomass / 1e6).toFixed(2)} M COP)`;

  // Impacto ambiental Colombia (simplificado simbólico)
  document.getElementById("glacier-loss").textContent = `${(annualCO2 * 0.05).toFixed(0)} cm²`;
  document.getElementById("forest-impact").textContent = `${(annualCO2 * 0.02).toFixed(0)} m²`;
  document.getElementById("species-risk").textContent = `${Math.min((annualCO2 / 1000).toFixed(0), 50)}`;

  // Planeta simbólico
  updatePlanet(dailyKwh);
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

// Inicializa en 2.5 kWh/día
updateResults(2.5);
