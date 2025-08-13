import './App.css'
import WeatherCard from "./assets/components/WeatherCard.jsx";
import { getColorByWeatherId } from "./utils/weatherColor";
import { useState, useRef, useEffect } from 'react'
import { fetchCoordinates } from './api/geo.js';
import { fetchWeatherByCoords } from './api/weather.js';
function App() {

  const [city, setCity] = useState('seoul')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')
  const inputRef = useRef(null)


  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    // 초기 렌더 시 기본 도시 검색 (예: 'seoul')
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async () => {
    const q = city.trim();

    if (loading) return;

    if (!q) return;

    try {
      setLoading(true);
      setErr('');

      const { lat, lon, name, country } = await fetchCoordinates(q);
      console.log(lat, lon, name, country);

      const data = await fetchWeatherByCoords(lat, lon);
      const withLocation = {
        ...data,
        __resolvedLocation: { name, country, lat, lon }
      };
      setWeather(withLocation);
      setCity('')

    } catch (error) {
      const apiMsg = error?.response?.data?.message;
      setErr(apiMsg ? `오류: ${apiMsg}` : (error?.message || '알 수 없는 오류가 발생했습니다.'));
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onChangeInput = (e) => setCity(e.target.value);
  const onKeyup = (e) => {
    if (e.key === 'Enter') handleSearch();
  };
  const appBg = weather ? getColorByWeatherId(weather?.weather?.[0]?.id) : undefined;

  return (
    <section style={{ background: appBg || undefined, minHeight: '100vh', transition: 'background 220ms ease' }}>
      <div className='app'>
        <h1>다니엘의 날씨앱</h1>
        {/* 이하 동일 */}
        <div className="input-wrap">
          <input /* ... */ />
          <button /* ... */>검색</button>
        </div>
        {err && <p className='error'>{err}</p>}
        {loading && <p className='loading'>불러오는중...</p>}
        {weather && <WeatherCard weather={weather} />}
      </div>
    </section>
  );
}

export default App
