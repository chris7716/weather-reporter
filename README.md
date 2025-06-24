# 🌤️ Weather Reporter

**Weather Reporter** is a modern Angular application that allows users to search for a city and view the current weather and 3-day forecast using the [WeatherAPI](https://www.weatherapi.com/). It features a responsive UI with search suggestions and modular components.

---

## 🚀 Features

- 🔍 Search bar with real-time city suggestions
- 🌡️ Displays current temperature, humidity, wind speed, and UV index
- 📅 Shows 3-day weather forecast
- 🧩 Modular component-based design
- ✅ Unit tests with Karma and Jasmine

---

## 🛠️ Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)
- A valid API key from [weatherapi.com](https://www.weatherapi.com/)

---

## 📦 Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/weather-reporter.git
   cd weather-reporter
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Add your Weather API key**

   Create a file at `src/environments/environment.ts` with the following content:

   ```ts
   export const environment = {
     production: false,
     weatherApiKey: 'YOUR_API_KEY_HERE'
   };
   ```

---

## ▶️ Running the App Locally

```bash
npm start
```

This will run the app at `http://localhost:4200/`.

---

## 🧪 Running Tests

```bash
npm test
```

Runs all unit tests in **headless Chrome** using **Karma** and **Jasmine**.

You can also customize test behavior via `karma.conf.js`.

---

## 🚀 CI/CD (GitHub Actions)

- ✅ Tests run on **every branch**
- 🚀 App auto-deploys to **Vercel** only when changes are pushed to `master`
- Secrets required:
  - `WEATHER_API_KEY`
  - `VERCEL_TOKEN`

---

## 📁 Project Structure

```
src/
├── app/
│   ├── weather.component.ts
│   ├── forecast-row/
│   └── search-header/
├── environments/
│   └── environment.ts
├── assets/
├── index.html
└── styles.css
```
