import axios from "axios";
import { API_KEY } from "../config";

export const fetchCoordinates = async (city) => {
    const q = city?.trim();
    if (!q) {
        throw new Error("도시명을 입력하세요.");
    }
    try {
        const res = await axios.get("https://api.openweathermap.org/geo/1.0/direct", {
            params: {
                q: q,
                limit: 1,
                appid: API_KEY
            },
            timeout: 8000
        });

        if (!Array.isArray(res.data) || res.data.length === 0) {
            throw new Error("도시를 찾을 수 없습니다.");
        }

        const { lat, lon, name, country } = res.data[0];

        return { lat, lon, name, country };
    } catch (error) {
        console.error("좌표를 가져오는 중 오류 발생:", error);
        throw error;
    }
};