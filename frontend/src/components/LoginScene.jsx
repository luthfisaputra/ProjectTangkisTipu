export default function LoginScene({ isDay = false, onToggle = () => {} }) {
  return (
    <section
      className="hidden md:block w-full md:w-[54%] lg:w-[56%] xl:w-[58%] md:h-full relative overflow-hidden bg-[#091b3e] min-h-[380px] flex-1 select-none"
      data-purpose="scenic-illustration"
      id="illustration-container"
    >
      {/* Organic S-Curve Left Mask overlay (Seamless wave divider stretching full height 100%) */}
      <svg
        className="absolute inset-y-0 -left-1 h-full w-28 sm:w-36 md:w-44 lg:w-56 z-20 text-white fill-current pointer-events-none hidden md:block"
        preserveAspectRatio="none"
        viewBox="0 0 140 600"
      >
        <path d="M 0,0 C 35,80 140,110 140,240 C 140,360 85,420 50,470 C 15,520 0,550 0,600 Z" />
      </svg>
      {/* Pure Vector Scenic Art */}
      <svg
        className="w-full h-full object-cover select-none relative z-10"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 700 600"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0%" x2="40%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#071b3d" />
            <stop offset="45%" stopColor="#143468" />
            <stop offset="85%" stopColor="#245196" />
            <stop offset="100%" stopColor="#3c79c8" />
          </linearGradient>
          <linearGradient id="skyGradDay" x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#1d72b8" />
            <stop offset="40%" stopColor="#38a9f8" />
            <stop offset="75%" stopColor="#7dd3fc" />
            <stop offset="100%" stopColor="#bae6fd" />
          </linearGradient>
          <radialGradient cx="50%" cy="50%" id="moonGlow" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#eaf3ff" />
            <stop offset="70%" stopColor="#7eb7f8" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#143468" stopOpacity="0" />
          </radialGradient>
          <radialGradient cx="50%" cy="50%" id="sunGlow" r="50%">
            <stop offset="0%" stopColor="#fff8db" />
            <stop offset="30%" stopColor="#fde047" stopOpacity="0.9" />
            <stop offset="65%" stopColor="#fb923c" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="interiorDoorLight" x1="0%" x2="100%" y1="0%" y2="80%">
            <stop offset="0%" stopColor="#fff8db" />
            <stop offset="25%" stopColor="#fed678" />
            <stop offset="70%" stopColor="#fca840" />
            <stop offset="100%" stopColor="#f2782b" />
          </linearGradient>
          <linearGradient id="pathGlow" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#70ddfa" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#2b84c6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#123d6a" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="pathGlowDay" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="groundGrad" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#22629b" />
            <stop offset="40%" stopColor="#4198cc" />
            <stop offset="75%" stopColor="#6fc4df" />
            <stop offset="100%" stopColor="#4ca7d6" />
          </linearGradient>
          <linearGradient id="groundGradDay" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="40%" stopColor="#10b981" />
            <stop offset="75%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#6ee7b7" />
          </linearGradient>
          <linearGradient id="windowLight" x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#fff2aa" />
            <stop offset="100%" stopColor="#f5a438" />
          </linearGradient>
          <linearGradient id="mountainFar" x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#1b457e" />
            <stop offset="100%" stopColor="#0c234b" />
          </linearGradient>
          <linearGradient id="mountainFarDay" x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#0d9488" />
            <stop offset="100%" stopColor="#044e54" />
          </linearGradient>
        </defs>
        {/* Sky layers */}
        <rect className="sky-transition" fill="url(#skyGrad)" height="600" id="sky-night" style={{ opacity: isDay ? 0 : 1 }} width="700" x="0" y="0" />
        <rect className="sky-transition" fill="url(#skyGradDay)" height="600" id="sky-day" style={{ opacity: isDay ? 1 : 0 }} width="700" x="0" y="0" />
        {/* Soft Day Clouds Group */}
        <g
          className="cloud-group pointer-events-none"
          id="day-clouds"
          style={{ opacity: isDay ? 0.88 : 0, transform: isDay ? 'translateY(0px)' : 'translateY(-20px)' }}
        >
          <g fill="#ffffff" filter="drop-shadow(0 4px 12px rgba(2, 132, 199, 0.15))" opacity="0.82">
            <ellipse cx="230" cy="110" rx="45" ry="22" />
            <ellipse cx="260" cy="98" rx="32" ry="25" />
            <ellipse cx="295" cy="112" rx="38" ry="20" />
          </g>
          <g fill="#ffffff" opacity="0.65">
            <ellipse cx="430" cy="80" rx="35" ry="16" />
            <ellipse cx="455" cy="72" rx="24" ry="18" />
            <ellipse cx="478" cy="82" rx="28" ry="15" />
          </g>
          <g fill="#ffffff" opacity="0.5">
            <ellipse cx="140" cy="165" rx="30" ry="14" />
            <ellipse cx="160" cy="158" rx="20" ry="15" />
            <ellipse cx="180" cy="166" rx="24" ry="12" />
          </g>
        </g>
        {/* Star Field (Night Mode) */}
        <g className="star-group" fill="#ffffff" id="night-stars" style={{ opacity: isDay ? 0 : 1 }}>
          <circle className="star-twinkle-1" cx="210" cy="80" r="1.3" />
          <circle className="star-twinkle-2" cx="260" cy="130" opacity="0.6" r="1" />
          <circle className="star-twinkle-3" cx="310" cy="65" r="1.5" />
          <circle className="star-twinkle-1" cx="380" cy="110" r="1" />
          <circle className="star-twinkle-2" cx="430" cy="70" opacity="0.8" r="1.2" />
          <circle className="star-twinkle-3" cx="480" cy="140" r="0.9" />
          <circle className="star-twinkle-1" cx="530" cy="95" r="1.4" />
          <circle className="star-twinkle-2" cx="640" cy="160" r="1.2" />
          <circle className="star-twinkle-3" cx="350" cy="170" opacity="0.5" r="0.8" />
          <circle className="star-twinkle-1" cx="280" cy="190" r="1" />
          <circle className="star-twinkle-2" cx="590" cy="110" r="1.6" />
        </g>
        {/* Interactive Moon Body */}
        <g
          aria-label="Bulan (Klik untuk ganti ke Siang)"
          className="moon-body cursor-pointer transition-all duration-700 hover:scale-105 outline-none"
          id="celestial-moon"
          onClick={onToggle}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle() } }}
          onMouseDown={(e) => e.preventDefault()}
          role="button"
          style={{
            transform: isDay ? 'translate(-60px, 160px) scale(0.75)' : 'translate(0px, 0px) scale(1)',
            opacity: isDay ? 0 : 1,
            pointerEvents: isDay ? 'none' : 'auto',
          }}
          tabIndex={0}
        >
          <title>Klik Bulan untuk beralih ke Siang</title>
          <circle cx="610" cy="100" fill="url(#moonGlow)" r="65" />
          <circle cx="610" cy="100" fill="#ffffff" filter="drop-shadow(0 0 12px rgba(255, 255, 255, 0.95))" r="24" />
          <circle cx="604" cy="94" fill="#e2e8f0" opacity="0.7" r="3.5" />
          <circle cx="616" cy="106" fill="#cbd5e1" opacity="0.6" r="4.5" />
          <circle cx="602" cy="105" fill="#cbd5e1" opacity="0.5" r="2.5" />
        </g>
        {/* Interactive Sun Body */}
        <g
          aria-label="Matahari (Klik untuk ganti ke Malam)"
          className="sun-body cursor-pointer transition-all duration-700 hover:scale-105 outline-none"
          id="celestial-sun"
          onClick={onToggle}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle() } }}
          onMouseDown={(e) => e.preventDefault()}
          role="button"
          style={{
            transform: isDay ? 'translate(0px, 0px) scale(1)' : 'translate(40px, 140px) scale(0.7)',
            opacity: isDay ? 1 : 0,
            pointerEvents: isDay ? 'auto' : 'none',
          }}
          tabIndex={0}
        >
          <title>Klik Matahari untuk beralih ke Malam</title>
          <circle cx="610" cy="105" fill="url(#sunGlow)" r="75" />
          <g className="sun-rays" opacity="0.65" stroke="#fde047" strokeLinecap="round" strokeWidth="2">
            <line x1="610" x2="610" y1="65" y2="55" />
            <line x1="610" x2="610" y1="145" y2="155" />
            <line x1="570" x2="560" y1="105" y2="105" />
            <line x1="650" x2="660" y1="105" y2="105" />
            <line x1="582" x2="574" y1="77" y2="69" />
            <line x1="638" x2="646" y1="133" y2="141" />
            <line x1="582" x2="574" y1="133" y2="141" />
            <line x1="638" x2="646" y1="77" y2="69" />
          </g>
          <circle cx="610" cy="105" fill="#fef08a" filter="drop-shadow(0 0 16px rgba(253, 224, 71, 0.95))" r="26" />
          <circle cx="610" cy="105" fill="#ffffff" opacity="0.9" r="18" />
        </g>
        {/* Distant Layered Mountains */}
        <polygon
          className="landscape-layer"
          fill={isDay ? 'url(#mountainFarDay)' : 'url(#mountainFar)'}
          id="mount-1"
          opacity={isDay ? 0.7 : 0.55}
          points="120,380 270,160 410,380"
        />
        <polygon
          className="landscape-layer"
          fill={isDay ? 'url(#mountainFarDay)' : 'url(#mountainFar)'}
          id="mount-2"
          opacity={isDay ? 0.85 : 0.7}
          points="340,380 500,120 660,380"
        />
        <polygon
          className="landscape-layer"
          fill={isDay ? '#065f46' : '#103160'}
          id="mount-3"
          opacity={isDay ? 0.75 : 0.65}
          points="480,380 590,190 700,380"
        />
        {/* Forest Silhouettes (Pine Trees) */}
        <g className="landscape-layer" fill={isDay ? '#064e3b' : '#0b244d'} id="pine-trees">
          <polygon points="170,390 185,250 200,390" />
          <polygon points="190,390 205,270 220,390" />
          <polygon points="215,390 232,230 250,390" />
          <polygon points="245,390 260,260 275,390" />
          <polygon points="270,390 285,240 300,390" />
          <polygon points="295,390 315,220 335,390" />
          <polygon points="420,380 435,220 450,380" />
          <polygon points="445,380 460,200 475,380" />
          <polygon points="470,380 488,230 505,380" />
          <polygon points="500,380 518,190 535,380" />
          <polygon points="530,380 545,210 560,380" />
          <polygon points="555,380 575,230 595,380" />
          <polygon points="590,380 610,180 630,380" />
          <polygon points="625,380 645,215 665,380" />
        </g>
        {/* Modern Architectural House (Right Side) */}
        <g id="modern-house">
          <rect
            className="landscape-layer"
            fill={isDay ? '#164e63' : '#0d2954'}
            height="120"
            id="house-base-top"
            rx="4"
            width="180"
            x="500"
            y="270"
          />
          <rect
            className="landscape-layer"
            fill={isDay ? '#0e3a4b' : '#091d3e'}
            height="150"
            id="house-base-mid"
            width="180"
            x="500"
            y="310"
          />
          <polygon
            className="landscape-layer"
            fill={isDay ? '#0284c7' : '#1b4a85'}
            id="house-roof"
            points="480,290 690,290 670,270 495,270"
          />
          <rect fill="url(#windowLight)" height="42" opacity="0.9" rx="2" width="105" x="505" y="300" />
          <g opacity="0.8" stroke="#2c5c99" strokeWidth="2">
            <line x1="505" x2="610" y1="312" y2="312" />
            <line x1="505" x2="610" y1="324" y2="324" />
            <line x1="520" x2="520" y1="300" y2="342" />
            <line x1="540" x2="540" y1="300" y2="342" />
            <line x1="560" x2="560" y1="300" y2="342" />
            <line x1="580" x2="580" y1="300" y2="342" />
            <line x1="600" x2="600" y1="300" y2="342" />
          </g>
          <rect fill="url(#windowLight)" height="26" opacity="0.85" rx="2" width="18" x="625" y="340" />
          <rect fill="url(#windowLight)" height="26" opacity="0.85" rx="2" width="18" x="655" y="340" />
          <rect
            className="landscape-layer"
            fill={isDay ? '#0f3849' : '#0c234a'}
            height="90"
            id="house-ground"
            width="200"
            x="490"
            y="380"
          />
          <path d="M 525,470 L 525,415 A 18 18 0 0 1 561,415 L 561,470 Z" fill="url(#windowLight)" opacity="0.85" />
          <rect fill="url(#windowLight)" height="18" opacity="0.75" rx="1" width="10" x="575" y="420" />
          <rect fill="url(#windowLight)" height="18" opacity="0.75" rx="1" width="10" x="595" y="420" />
          <rect fill="url(#windowLight)" height="18" opacity="0.75" rx="1" width="10" x="615" y="420" />
          <rect fill="url(#windowLight)" height="18" opacity="0.75" rx="1" width="10" x="635" y="420" />
        </g>
        {/* Glowing Portal Doorway */}
        <g className="door-glow" id="luminous-open-door">
          <rect fill="#082046" height="195" rx="3" stroke="#16437d" strokeWidth="4" width="100" x="365" y="235" />
          <rect fill="url(#interiorDoorLight)" height="180" width="80" x="375" y="245" />
          <polygon fill="#fca132" opacity="0.45" points="375,245 400,280 400,425 375,425" />
          <g opacity="0.7" stroke="#ffea9f" strokeWidth="2">
            <line x1="395" x2="395" y1="285" y2="425" />
            <line x1="410" x2="410" y1="285" y2="425" />
            <line x1="425" x2="425" y1="285" y2="425" />
            <line x1="440" x2="440" y1="285" y2="425" />
          </g>
          <polygon fill="#1b4582" points="465,215 528,245 528,455 465,425" stroke="#2a68be" strokeWidth="2" />
          <circle cx="516" cy="345" fill="#fdd475" filter="drop-shadow(0 0 4px rgba(253, 212, 117, 0.8))" r="7" />
          <circle cx="516" cy="345" fill="#ffffff" r="3.5" />
        </g>
        {/* Portal Terrace Steps */}
        <g fill="#1f4c88" id="portal-steps" stroke="#102f5a" strokeWidth="1.5">
          <polygon fill="#24589d" points="340,430 465,430 465,445 340,445" />
          <polygon fill="#1c4883" points="325,445 465,445 465,460 325,460" />
          <polygon fill="#163c6e" points="310,460 465,460 465,475 310,475" />
        </g>
        {/* Stylized Garden Plants */}
        <g className="landscape-layer" id="stylized-garden-plants">
          <ellipse
            className="landscape-layer"
            cx="230"
            cy="460"
            fill={isDay ? '#047857' : '#0d2f5e'}
            id="leaf-1"
            rx="40"
            ry="60"
            transform="rotate(-25 230 460)"
          />
          <ellipse
            className="landscape-layer"
            cx="270"
            cy="455"
            fill={isDay ? '#059669' : '#16437c'}
            id="leaf-2"
            rx="35"
            ry="55"
            transform="rotate(-10 270 455)"
          />
          <ellipse
            className="landscape-layer"
            cx="295"
            cy="470"
            fill={isDay ? '#10b981' : '#20599a'}
            id="leaf-3"
            rx="30"
            ry="50"
            transform="rotate(15 295 470)"
          />
          <g id="leaf-veins" opacity="0.6" stroke={isDay ? '#a7f3d0' : '#4fa9df'} strokeWidth="1.5">
            <line x1="260" x2="280" y1="460" y2="420" />
            <line x1="270" x2="295" y1="460" y2="430" />
            <line x1="275" x2="310" y1="470" y2="450" />
          </g>
          <ellipse className="landscape-layer" cx="220" cy="490" fill={isDay ? '#065f46' : '#103b70'} id="leaf-4" rx="45" ry="30" />
          <ellipse className="landscape-layer" cx="250" cy="505" fill={isDay ? '#047857' : '#184b8a'} id="leaf-5" rx="35" ry="25" />
        </g>
        {/* Foreground Terrace, Wave Dunes and Illuminated Path */}
        <g id="foreground-landscape">
          <path
            className="landscape-layer"
            d="M 0,530 Q 220,430 490,460 T 700,470 L 700,600 L 0,600 Z"
            fill={isDay ? 'url(#groundGradDay)' : 'url(#groundGrad)'}
            id="ground-base"
            opacity="0.78"
          />
          <path
            className="landscape-layer"
            d="M 0,505 C 160,490 240,545 400,580 L 0,600 Z"
            fill={isDay ? '#059669' : '#22629b'}
            id="ground-ridge-1"
            opacity="0.75"
          />
          <path
            className="landscape-layer"
            d="M 80,600 Q 280,475 520,565 T 700,550 L 700,600 Z"
            fill={isDay ? '#34d399' : '#62bcd3'}
            id="ground-ridge-2"
            opacity="0.55"
          />
          <path
            className="landscape-layer"
            d="M 465,475 L 565,475 L 500,605 L 360,605 Z"
            fill={isDay ? 'url(#pathGlowDay)' : 'url(#pathGlow)'}
            id="path-glow-rect"
          />
          <g id="path-stripes" opacity="0.9" stroke="#caf5ff" strokeLinecap="round">
            <line strokeWidth="3" x1="455" x2="550" y1="495" y2="495" />
            <line strokeWidth="3.5" x1="438" x2="542" y1="520" y2="520" />
            <line strokeWidth="4" x1="418" x2="530" y1="550" y2="550" />
            <line strokeWidth="4.5" x1="395" x2="518" y1="580" y2="580" />
            <line strokeWidth="5" x1="375" x2="505" y1="602" y2="602" />
          </g>
        </g>
      </svg>
      {/* Breakout glow overlay */}
      <div className="absolute inset-0 pointer-events-none z-30 hidden md:block">
        <svg className="w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 700 600">
          <defs>
            <linearGradient id="breakoutGlow2" x1="50%" x2="30%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#70ddfa" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#3497d9" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1d609c" stopOpacity="0.65" />
            </linearGradient>
          </defs>
          <polygon fill="url(#breakoutGlow2)" opacity="0.85" points="418,550 530,550 495,602 365,602" />
          <line stroke="#d8f8ff" strokeLinecap="round" strokeWidth="4" x1="418" x2="530" y1="550" y2="550" />
          <line stroke="#d8f8ff" strokeLinecap="round" strokeWidth="4.5" x1="395" x2="518" y1="580" y2="580" />
          <line stroke="#d8f8ff" strokeLinecap="round" strokeWidth="5" x1="370" x2="502" y1="602" y2="602" />
        </svg>
      </div>
    </section>
  )
}
