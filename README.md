![Uploading image.png…]()
💹 Google-Style Currency Converter
A sleek, responsive currency converter inspired by Google's search results. This tool provides real-time exchange rates and interactive historical price graphs using Chart.js.

## 🚀 Features
Live Conversions: Get real-time exchange rates for over 30+ global currencies.
Interactive Graphs: Visualise currency trends over time (1D, 5D, 1M, 1Y, 5Y).
Dynamic Flags: Automatically updates country flags based on selection.
Google UI/UX: A clean, minimalist interface with a focus on usability.
Responsive Design: Works perfectly on desktops, tablets, and mobile phones.


🛠️ Tech Stack
HTML5 & CSS3: For the structured layout and modern "card" styling.
JavaScript (ES6+): Logic for conversions and DOM manipulation.
Chart.js: Powers the historical data visualization.

APIs Used:
ExchangeRate-API - For live conversion rates.
Frankfurter API - For historical time-series data (Graph).
FlagsAPI - For high-quality flat flag icons.

.

📦 Installation & Setup
Clone the repository:
Bash
git clone https://github.com/your-username/currency-converter.git

Navigate to the folder:
Bash
cd currency-converter

Open the project:
Simply open index.html in your favorite browser.

📈 How It Works
1. Live Rate Fetching
The app sends an asynchronous request to the ExchangeRate-API to fetch the latest conversion pairs whenever a user changes the input or currency selection.
2. The Graph Feature
The graph fetches historical data points from the Frankfurter API. It maps the currency values over the selected time range (e.g., 365 days for the 1Y view) and renders them using a customized Line Chart.
📝 License
This project is open-source and available under the MIT License.


🤝 Contributing
Feel free to fork this project, report bugs, or submit pull requests to help improve the UI or add more currency support!
Note: Make sure to replace the placeholder image link with an actual screenshot of your project to make the README pop!
