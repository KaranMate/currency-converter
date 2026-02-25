const countryList = {
    USD: "US", INR: "IN", EUR: "FR", GBP: "GB", JPY: "JP", AUD: "AU", CAD: "CA",
    XAU: "GOLD", XAG: "SILVER" // Metals added
};

const fromSelect = document.querySelector("#from-select");
const toSelect = document.querySelector("#to-select");
const amountInput = document.querySelector("#amount-input");
const targetInput = document.querySelector("#target-input");
let myChart;

// Populate dropdowns
Object.keys(countryList).forEach(code => {
    let opt1 = new Option(code, code);
    let opt2 = new Option(code, code);
    if(code === "USD") opt1.selected = true;
    if(code === "INR") opt2.selected = true;
    fromSelect.add(opt1);
    toSelect.add(opt2);
});

// Update Flags & Metal Icons
function updateIcons() {
    const update = (select, imgId) => {
        const code = select.value;
        const img = document.querySelector(imgId);
        if(code === "XAU") img.src = "https://img.icons8.com/color/48/gold-bars.png";
        else if(code === "XAG") img.src = "https://img.icons8.com/color/48/silver-bars.png";
        else img.src = `https://flagsapi.com/${countryList[code]}/flat/64.png`;
    };
    update(fromSelect, "#from-icon");
    update(toSelect, "#to-icon");
}

async function getExchangeRate() {
    let amountVal = amountInput.value || 1;
    const from = fromSelect.value;
    const to = toSelect.value;
    
    // Live Conversion API
    const res = await fetch(`https://open.er-api.com/v6/latest/${from}`);
    const data = await res.json();
    const rate = data.rates[to];
    
    targetInput.value = (amountVal * rate).toFixed(2);
    document.querySelector("#main-result-val").innerText = `${targetInput.value} ${to}`;
    document.querySelector("#last-updated").innerText = `Last updated: ${new Date().toLocaleString()}`;
    
    updateChart(from, to);
}

// Graph Logic
async function updateChart(from, to, days = 365) {
    const errorMsg = document.querySelector("#chart-error");
    const canvas = document.querySelector("#rateChart");
    
    // Fallback: Metals aren't in the free historical API
    if(from === "XAU" || from === "XAG" || to === "XAU" || to === "XAG") {
        if(myChart) myChart.destroy();
        canvas.classList.add("hidden");
        errorMsg.classList.remove("hidden");
        return;
    }

    canvas.classList.remove("hidden");
    errorMsg.classList.add("hidden");

    const end = new Date().toISOString().split('T')[0];
    const start = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const res = await fetch(`https://api.frankfurter.app/${start}..${end}?from=${from}&to=${to}`);
    const data = await res.json();
    const labels = Object.keys(data.rates);
    const values = Object.values(data.rates).map(v => v[to]);

    if(myChart) myChart.destroy();
    myChart = new Chart(canvas.getContext('2d'), {
        type: 'line',
        data: {
            labels,
            datasets: [{
                data: values, borderColor: '#188038', backgroundColor: 'rgba(24,128,56,0.1)',
                fill: true, pointRadius: 0, tension: 0.2
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { x: { display: false }, y: { grid: { color: '#f1f1f1' } } }
        }
    });
}

// Event Listeners
fromSelect.addEventListener("change", () => { updateIcons(); getExchangeRate(); });
toSelect.addEventListener("change", () => { updateIcons(); getExchangeRate(); });
amountInput.addEventListener("input", getExchangeRate);
document.querySelector("#swap-btn").addEventListener("click", () => {
    let temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;
    updateIcons();
    getExchangeRate();
});

document.querySelectorAll(".t-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
        document.querySelector(".t-btn.active").classList.remove("active");
        e.target.classList.add("active");
        updateChart(fromSelect.value, toSelect.value, e.target.dataset.days);
    });
});

// Initial Load
updateIcons();
getExchangeRate();
