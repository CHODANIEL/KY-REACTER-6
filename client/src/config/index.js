// src/config/index.js
export const API_KEY = import.meta.env.VITE_API_KEY; // Vercel에 VITE_API_KEY 등록한 값
export const GEO_BASE = "https://api.openweathermap.org/geo/1.0";
export const WEATHER_BASE = "https://api.openweathermap.org/data/2.5";
export const DEFAULT_UNITS = "metric"; // 섭씨
export const DEFAULT_LANG = "kr";      // 한국어