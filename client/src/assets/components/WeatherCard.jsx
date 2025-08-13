import React from 'react';
import './WeatherCard.css';
import { getColorByWeatherId } from "../../utils/weatherColor";

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  const name = weather?.name ?? '';
  const country = weather?.sys?.country ?? '';
  const { temp, humidity } = weather?.main ?? {};
  const w0 = weather?.weather?.[0] ?? {};
  const weatherId = w0?.id;
  const bg = getColorByWeatherId(weatherId);
  const description = w0?.description ?? '';
  const icon = w0?.icon;
  const iconUrl = icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : null;

  return (
    <div className="card" style={{ background: bg }}>
      <h2>{name}{country ? `, ${country}` : ''}</h2>
      <div className="img-wrap">
        {iconUrl && <img src={iconUrl} alt={description || 'weather icon'} />}
      </div>
      {description && <p>{description}</p>}
      <p>🌡️ {Number.isFinite(temp) ? `${Math.round(temp)}℃` : '온도 정보 없음'}</p>
      {typeof humidity === 'number' && <p>💧 {humidity}%</p>}
    </div>
  );
};

export default WeatherCard;