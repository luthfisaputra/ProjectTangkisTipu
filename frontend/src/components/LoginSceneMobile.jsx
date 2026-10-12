export default function LoginSceneMobile({ isDay = false, onToggle = () => {} }) {
  const handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onToggle()
    }
  }

  return (
    <section
      className="md:hidden w-full aspect-[390/375] shrink-0 relative overflow-hidden bg-[#0A1128] select-none"
      data-purpose="night-illustration-header"
    >
      <svg
        className="absolute inset-0 w-full h-full"
        data-purpose="night-scenery-svg"
        fill="none"
        preserveAspectRatio="xMidYMax slice"
        viewBox="0 0 390 375"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="m-skyGradNight" x1="195" x2="195" y1="0" y2="375">
            <stop offset="0%" stopColor="#070C1E" />
            <stop offset="60%" stopColor="#0E1E47" />
            <stop offset="100%" stopColor="#1B326B" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="m-skyGradDay" x1="195" x2="195" y1="0" y2="375">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="55%" stopColor="#7DD3FC" />
            <stop offset="100%" stopColor="#BAE6FD" />
          </linearGradient>
          <radialGradient
            cx="0"
            cy="0"
            gradientTransform="translate(325 72) rotate(90) scale(48)"
            gradientUnits="userSpaceOnUse"
            id="m-moonGlow"
            r="1"
          >
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="35%" stopColor="#CFE5FF" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#80AFFF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0F2459" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            cx="0"
            cy="0"
            gradientTransform="translate(325 72) rotate(90) scale(62)"
            gradientUnits="userSpaceOnUse"
            id="m-sunGlow"
            r="1"
          >
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="1" />
            <stop offset="35%" stopColor="#FDE047" stopOpacity="0.8" />
            <stop offset="65%" stopColor="#F59E0B" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="m-doorLight" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF5D1" />
            <stop offset="45%" stopColor="#FDBA74" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>
        </defs>

        {/* Lapisan langit (malam & siang) */}
        <rect
          className="sky-transition"
          fill="url(#m-skyGradNight)"
          height="375"
          id="m-skyBgNight"
          style={{ opacity: isDay ? 0 : 1 }}
          width="390"
        />
        <rect
          className="sky-transition"
          fill="url(#m-skyGradDay)"
          height="375"
          id="m-skyBgDay"
          style={{ opacity: isDay ? 1 : 0 }}
          width="390"
        />

        {/* Bintang berkedip (animasi sama seperti versi desktop) */}
        <g
          className="star-group"
          fill="#FFFFFF"
          id="m-starsGroup"
          style={{ opacity: isDay ? 0 : 0.6, transform: isDay ? 'translateY(-8px)' : 'translateY(0px)' }}
        >
          <circle className="star-twinkle-1" cx="45" cy="48" r="1" />
          <circle className="star-twinkle-2" cx="110" cy="85" r="1.2" />
          <circle className="star-twinkle-3" cx="165" cy="38" r="1" />
          <circle className="star-twinkle-1" cx="218" cy="62" r="1.4" />
          <circle className="star-twinkle-2" cx="260" cy="98" r="0.9" />
          <circle className="star-twinkle-3" cx="85" cy="120" r="1" />
          <circle className="star-twinkle-1" cx="360" cy="140" r="1.1" />
          <circle className="star-twinkle-2" cx="180" cy="130" r="1" />
        </g>

        {/* Awan lembut (hanya siang) */}
        <g
          className="cloud-group cloud-drift pointer-events-none"
          id="m-cloudsGroup"
          style={{ opacity: isDay ? 0.95 : 0, transform: isDay ? 'translateY(0px)' : 'translateY(12px)' }}
        >
          <g fill="#FFFFFF" opacity="0.75">
            <circle cx="70" cy="85" r="18" />
            <circle cx="92" cy="78" r="22" />
            <circle cx="116" cy="84" r="17" />
            <rect height="20" rx="10" width="60" x="65" y="78" />
          </g>
          <g fill="#FFFFFF" opacity="0.65">
            <circle cx="190" cy="115" r="14" />
            <circle cx="208" cy="108" r="18" />
            <circle cx="228" cy="114" r="13" />
            <rect height="16" rx="8" width="48" x="186" y="108" />
          </g>
        </g>

        {/* Pegunungan jauh */}
        <path
          className="landscape-layer"
          d="M-20 270L105 135L225 270H-20Z"
          fill={isDay ? '#4F8775' : '#142147'}
          id="m-mountainBack"
          opacity={isDay ? 0.85 : 0.75}
        />
        <path
          className="landscape-layer"
          d="M120 270L245 110L365 270H120Z"
          fill={isDay ? '#3B725F' : '#121D40'}
          id="m-mountainMid"
          opacity={isDay ? 0.9 : 0.85}
        />
        <path
          className="landscape-layer"
          d="M220 270L330 145L420 270H220Z"
          fill={isDay ? '#5D9A85' : '#1A2A57'}
          id="m-mountainRight"
          opacity={isDay ? 0.75 : 0.65}
        />

        {/* Matahari (mode siang) */}
        <g
          aria-label="Matahari (Klik untuk ganti ke Malam)"
          className="sun-body outline-none"
          id="m-sunElement"
          onClick={onToggle}
          onKeyDown={handleKey}
          onMouseDown={(e) => e.preventDefault()}
          role="button"
          style={{
            opacity: isDay ? 1 : 0,
            transform: isDay ? 'translate(0px, 0px) scale(1)' : 'translate(-48px, 64px) scale(0.75)',
            pointerEvents: isDay ? 'auto' : 'none',
          }}
          tabIndex={0}
        >
          <title>Klik Matahari untuk beralih ke Malam</title>
          <circle cx="325" cy="72" fill="url(#m-sunGlow)" r="56" />
          <g className="sun-rays-m" opacity="0.55" stroke="#FBBF24" strokeLinecap="round" strokeWidth="2.5">
            <line x1="325" x2="325" y1="42" y2="34" />
            <line x1="325" x2="325" y1="102" y2="110" />
            <line x1="295" x2="287" y1="72" y2="72" />
            <line x1="355" x2="363" y1="72" y2="72" />
            <line x1="304" x2="298" y1="51" y2="45" />
            <line x1="346" x2="352" y1="93" y2="99" />
            <line x1="304" x2="298" y1="93" y2="99" />
            <line x1="346" x2="352" y1="51" y2="45" />
          </g>
          <circle cx="325" cy="72" fill="#F59E0B" filter="drop-shadow(0 0 10px #FBBF24)" r="18" />
          <circle cx="325" cy="72" fill="#FDE047" r="16" />
          <circle cx="321" cy="68" fill="#FFFBEB" opacity="0.8" r="6" />
        </g>

        {/* Bulan (mode malam) */}
        <g
          aria-label="Bulan (Klik untuk ganti ke Siang)"
          className="moon-body outline-none"
          id="m-moonElement"
          onClick={onToggle}
          onKeyDown={handleKey}
          onMouseDown={(e) => e.preventDefault()}
          role="button"
          style={{
            opacity: isDay ? 0 : 1,
            transform: isDay ? 'translate(60px, 80px) scale(0.65)' : 'translate(0px, 0px) scale(1)',
            pointerEvents: isDay ? 'none' : 'auto',
          }}
          tabIndex={0}
        >
          <title>Klik Bulan untuk beralih ke Siang</title>
          <circle cx="325" cy="72" fill="url(#m-moonGlow)" r="44" />
          <circle
            cx="325"
            cy="72"
            fill="#FFFFFF"
            filter="drop-shadow(0 0 14px rgba(255, 255, 255, 0.95))"
            r="15"
          />
          <circle cx="321" cy="69" fill="#E2E8F0" opacity="0.55" r="3" />
          <circle cx="328" cy="75" fill="#E2E8F0" opacity="0.45" r="2.2" />
          <circle cx="323" cy="77" fill="#E2E8F0" opacity="0.35" r="1.6" />
        </g>

        {/* Siluet pohon pinus */}
        <g className="landscape-layer" fill={isDay ? '#225944' : '#0B1530'} id="m-treesGroup" opacity={isDay ? 0.98 : 0.95}>
          <polygon points="38,270 56,190 74,270" />
          <polygon points="68,275 88,170 108,275" />
          <polygon points="98,270 114,200 130,270" />
          <polygon points="125,270 142,185 159,270" />
        </g>
        <g
          className="landscape-layer"
          fill={isDay ? '#1C4D3A' : '#0C1733'}
          id="m-treesRightGroup"
          opacity={isDay ? 0.95 : 0.9}
        >
          <polygon points="320,260 345,160 370,260" />
          <polygon points="348,260 368,180 388,260" />
        </g>

        {/* Rumah modern */}
        <rect
          className="landscape-layer"
          fill={isDay ? '#1B3554' : '#0C1B3E'}
          height="90"
          id="m-houseMain"
          rx="3"
          width="145"
          x="228"
          y="180"
        />
        <rect
          className="landscape-layer"
          fill={isDay ? '#24466C' : '#0E214A'}
          height="35"
          id="m-houseTop"
          rx="2"
          width="85"
          x="290"
          y="148"
        />
        {/* Jendela menyala */}
        <g fill="#FBBF24" opacity="0.92">
          <rect height="12" rx="1.5" width="13" x="298" y="192" />
          <rect height="12" rx="1.5" width="13" x="314" y="192" />
          <rect height="12" rx="1.5" width="13" x="330" y="192" />
          <rect height="12" rx="1.5" width="13" x="346" y="192" />
          <rect height="12" rx="1.5" width="13" x="298" y="208" />
          <rect height="12" rx="1.5" width="13" x="314" y="208" />
          <rect height="12" rx="1.5" width="13" x="330" y="208" />
          <rect height="12" rx="1.5" width="13" x="346" y="208" />
          <rect height="9" rx="1" width="8" x="318" y="238" />
          <rect height="9" rx="1" width="8" x="332" y="238" />
          <rect height="9" rx="1" width="8" x="346" y="238" />
        </g>
        {/* Tangga */}
        <rect fill="#132B5B" height="7" width="60" x="175" y="258" />
        <rect fill="#18366F" height="6" width="53" x="182" y="252" />
        <rect fill="#1E4285" height="6" width="45" x="190" y="246" />

        {/* Pintu portal bercahaya */}
        <rect fill="#0F2454" height="84" rx="2" width="38" x="200" y="162" />
        <g className="door-glow">
          <rect fill="url(#m-doorLight)" height="81" width="32" x="203" y="165" />
          <line stroke="#EA580C" strokeOpacity="0.4" strokeWidth="1.5" x1="210" x2="210" y1="172" y2="242" />
          <line stroke="#EA580C" strokeOpacity="0.4" strokeWidth="1.5" x1="218" x2="218" y1="170" y2="244" />
          <line stroke="#EA580C" strokeOpacity="0.4" strokeWidth="1.5" x1="226" x2="226" y1="172" y2="242" />
        </g>
        <polygon fill="#20407E" points="235,152 265,160 265,248 235,246" />
        <polygon fill="#2E5AA8" points="237,155 263,162 263,246 237,244" />
        <circle cx="260" cy="204" fill="#FBBF24" filter="drop-shadow(0 0 3px #F59E0B)" r="3.2" />

        {/* Cahaya jalan setapak */}
        <g className="landscape-layer" id="m-pathwayLight" style={{ opacity: isDay ? 0.15 : 1 }}>
          <polygon fill="#3B82F6" opacity="0.3" points="203,246 235,246 250,305 170,305" />
          <line opacity="0.6" stroke="#60A5FA" strokeLinecap="round" strokeWidth="2.5" x1="184" x2="236" y1="272" y2="272" />
          <line opacity="0.5" stroke="#60A5FA" strokeLinecap="round" strokeWidth="2.5" x1="178" x2="242" y1="288" y2="288" />
          <line opacity="0.4" stroke="#60A5FA" strokeLinecap="round" strokeWidth="3" x1="170" x2="250" y1="304" y2="304" />
        </g>

        {/* Semak depan */}
        <g id="m-foregroundBushes">
          <path
            className="landscape-layer"
            d="M125 295C125 268 152 258 174 270C190 262 210 274 210 295Z"
            fill={isDay ? '#27654D' : '#102552'}
          />
          <path
            className="landscape-layer"
            d="M140 295C140 276 160 268 175 278C185 270 200 280 200 295Z"
            fill={isDay ? '#347E61' : '#193B7D'}
            opacity={isDay ? 0.85 : 0.7}
          />
        </g>
      </svg>

      {/* Lengkungan pembatas putih antara gambar rumah dan form login (persis seperti referensi) */}
      <svg
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-full h-[22.05vw] z-10 pointer-events-none"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 290 390 86"
      >
        <path d="M0 320C75 348 140 358 205 328C275 295 335 320 390 315V376H0V320Z" fill="#FFFFFF" />
      </svg>

    </section>
  )
}
