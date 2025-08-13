// src/api/weather.js
import axios from "axios";
import { API_KEY, WEATHER_BASE, DEFAULT_LANG, DEFAULT_UNITS } from "../config";
import { fetchCoordinates } from "./geo";

/** 좌표로 현재 날씨 */
export const fetchWeatherByCoords = async (lat, lon) => {
    if (typeof lat !== "number" || typeof lon !== "number") {
        throw new Error("좌표(lat, lon)가 올바르지 않습니다.");
    }
    const res = await axios.get(`${WEATHER_BASE}/weather`, {
        params: {
            lat,
            lon,
            appid: API_KEY,
            units: DEFAULT_UNITS,
            lang: DEFAULT_LANG,
        },
        timeout: 8000,
    });
    return res.data;
};

/** 도시명으로 현재 날씨 */
export const fetchWeatherByCity = async (city) => {
    const { lat, lon, name, country } = await fetchCoordinates(city);
    const data = await fetchWeatherByCoords(lat, lon);
    // 호출한 도시 표기 보정해서 함께 반환(카드에서 사용 편의)
    return { ...data, __resolvedLocation: { name, country, lat, lon } };
};