// client/src/utils/weatherColor.js
export const getColorByWeatherId = (weatherId) => {
    if (weatherId === 800) return '#FCD34D'; // 맑음

    const group = Math.floor(weatherId / 100);
    switch (group) {
        case 2: return 'linear-gradient(135deg, #1c375dff 0%, #5953cdff 100%)'; // 뇌우
        case 3: return 'linear-gradient(135deg, #CFFAFE 0%, #93C5FD 100%)';     // 이슬비
        case 5: return 'linear-gradient(135deg, #98b8ffff 0%, #60A5FA 100%)';   // 비
        case 6: return 'linear-gradient(135deg, #FFFFFF 0%, #fafee0ff 100%)';   // 눈
        case 7: return 'linear-gradient(135deg, #CBD5E1 0%, #cce1fdff 100%)';   // 안개
        case 8: return 'linear-gradient(135deg, #f5f9ffff 0%, #c3c3c3ff 100%)'; // 구름
        default: return 'linear-gradient(135deg, #CBD5E1 0%, #64748B 100%)';
    }
};