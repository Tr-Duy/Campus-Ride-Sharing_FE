export default function MapSVG() {
  return (
    <svg
      style={{ width: '100%', height: 'auto' }}
      viewBox="0 0 500 270"
      role="img"
      aria-label="Minh hoạ tuyến đường nối hai điểm"
    >
      <path
        d="M36 212 Q112 246 153 134 T310 103 Q372 8 465 53"
        fill="none"
        stroke="#cfb8a2"
        strokeWidth="22"
        strokeLinecap="round"
      />
      <path
        className="map-path"
        d="M36 212 Q112 246 153 134 T310 103 Q372 8 465 53"
        fill="none"
        stroke="#93320D"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="36" cy="212" r="11" fill="#93320D" />
      <circle cx="465" cy="53" r="11" fill="#2F6B4F" />
      <circle className="car-dot" cx="245" cy="112" r="12" fill="#2B2A27" />
      <text x="32" y="255" fontSize="18" fill="#2B2A27">Điểm đón</text>
      <text x="366" y="32" fontSize="18" fill="#2B2A27">Điểm trả</text>
    </svg>
  );
}
