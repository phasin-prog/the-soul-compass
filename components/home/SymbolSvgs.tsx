'use client';

export function ShadowSymbol() {
  return (
    <svg viewBox="0 0 200 200" fill="none" className="h-48 w-48">
      <defs>
        <linearGradient id="shadow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--soul-ink)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--soul-navy)" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="80" fill="url(#shadow-grad)" />
      <circle cx="100" cy="100" r="60" fill="var(--soul-navy)" fillOpacity="0.5" />
      <path
        d="M100 40 C140 40 160 80 160 100 C160 120 140 160 100 160 C100 160 100 120 100 100 C100 80 100 40 100 40 Z"
        fill="var(--soul-ivory)"
        fillOpacity="0.15"
      />
      <circle cx="100" cy="100" r="3" fill="var(--soul-ivory)" fillOpacity="0.6" />
    </svg>
  );
}

export function PersonaSymbol() {
  return (
    <svg viewBox="0 0 200 200" fill="none" className="h-48 w-48">
      <defs>
        <linearGradient id="persona-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--soul-gold)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="var(--soul-parchment)" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="80" stroke="var(--soul-gold)" strokeWidth="0.5" strokeOpacity="0.4" />
      <path
        d="M60 80 Q100 40 140 80 Q160 120 140 150 Q100 170 60 150 Q40 120 60 80 Z"
        fill="url(#persona-grad)"
        fillOpacity="0.6"
        stroke="var(--soul-gold)"
        strokeWidth="0.5"
        strokeOpacity="0.5"
      />
      <ellipse cx="80" cy="100" rx="8" ry="5" fill="var(--soul-ink)" fillOpacity="0.3" />
      <ellipse cx="120" cy="100" rx="8" ry="5" fill="var(--soul-ink)" fillOpacity="0.3" />
      <path
        d="M85 125 Q100 135 115 125"
        stroke="var(--soul-ink)"
        strokeWidth="0.5"
        strokeOpacity="0.3"
        fill="none"
      />
    </svg>
  );
}

export function SelfSymbol() {
  return (
    <svg viewBox="0 0 200 200" fill="none" className="h-48 w-48">
      <defs>
        <radialGradient id="self-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--soul-gold)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--soul-gold)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="90" fill="url(#self-glow)" />
      <circle cx="100" cy="100" r="70" stroke="var(--soul-gold)" strokeWidth="0.5" strokeOpacity="0.3" />
      <circle cx="100" cy="100" r="50" stroke="var(--soul-gold)" strokeWidth="0.5" strokeOpacity="0.4" />
      <circle cx="100" cy="100" r="30" stroke="var(--soul-gold)" strokeWidth="0.5" strokeOpacity="0.5" />
      <circle cx="100" cy="100" r="10" fill="var(--soul-gold)" fillOpacity="0.6" />
      <circle cx="100" cy="100" r="4" fill="var(--soul-ivory)" fillOpacity="0.9" />
      {[0, 60, 120, 180, 240, 300].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 100 + 30 * Math.cos(rad);
        const y1 = 100 + 30 * Math.sin(rad);
        const x2 = 100 + 70 * Math.cos(rad);
        const y2 = 100 + 70 * Math.sin(rad);
        return (
          <line
            key={angle}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="var(--soul-gold)"
            strokeWidth="0.3"
            strokeOpacity="0.3"
          />
        );
      })}
    </svg>
  );
}

export function AnimaAnimusSymbol() {
  return (
    <svg viewBox="0 0 200 200" fill="none" className="h-48 w-48">
      <defs>
        <linearGradient id="anima-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--soul-rose)" stopOpacity="0.7" />
          <stop offset="100%" stopColor="var(--soul-gold)" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="animus-grad" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--soul-ivory)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--soul-parchment)" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="85" stroke="var(--soul-gold)" strokeWidth="0.3" strokeOpacity="0.2" />
      <path
        d="M100 30 C130 30 160 60 160 100 C160 140 130 170 100 170 C100 170 100 130 100 100 C100 70 100 30 100 30 Z"
        fill="url(#anima-grad)"
        fillOpacity="0.7"
      />
      <path
        d="M100 170 C70 170 40 140 40 100 C40 60 70 30 100 30 C100 30 100 70 100 100 C100 130 100 170 100 170 Z"
        fill="url(#animus-grad)"
        fillOpacity="0.7"
      />
      <circle cx="100" cy="100" r="5" fill="var(--soul-ivory)" fillOpacity="0.8" />
    </svg>
  );
}

export function ArchetypeSymbol() {
  return (
    <svg viewBox="0 0 200 200" fill="none" className="h-48 w-48">
      <circle cx="100" cy="100" r="80" stroke="var(--soul-gold)" strokeWidth="0.5" strokeOpacity="0.3" />
      <polygon
        points="100,20 180,100 100,180 20,100"
        stroke="var(--soul-gold)"
        strokeWidth="0.5"
        strokeOpacity="0.4"
        fill="none"
      />
      <polygon
        points="100,40 160,100 100,160 40,100"
        stroke="var(--soul-parchment)"
        strokeWidth="0.5"
        strokeOpacity="0.3"
        fill="none"
      />
      <polygon
        points="100,60 140,100 100,140 60,100"
        stroke="var(--soul-gold)"
        strokeWidth="0.5"
        strokeOpacity="0.5"
        fill="var(--soul-gold)"
        fillOpacity="0.1"
      />
      <circle cx="100" cy="100" r="8" fill="var(--soul-gold)" fillOpacity="0.4" />
      <circle cx="100" cy="100" r="3" fill="var(--soul-ivory)" fillOpacity="0.8" />
    </svg>
  );
}

export function IndividuationSymbol() {
  return (
    <svg viewBox="0 0 200 200" fill="none" className="h-48 w-48">
      <defs>
        <linearGradient id="individuation-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--soul-gold)" stopOpacity="0.6" />
          <stop offset="50%" stopColor="var(--soul-rose)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--soul-ivory)" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="85" stroke="var(--soul-gold)" strokeWidth="0.3" strokeOpacity="0.2" />
      <path
        d="M100 15 Q150 50 130 100 Q110 150 100 185 Q90 150 70 100 Q50 50 100 15 Z"
        stroke="url(#individuation-grad)"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M100 30 Q135 60 120 100 Q105 140 100 170 Q95 140 80 100 Q65 60 100 30 Z"
        stroke="var(--soul-gold)"
        strokeWidth="0.5"
        strokeOpacity="0.4"
        fill="none"
      />
      <circle cx="100" cy="100" r="20" stroke="var(--soul-gold)" strokeWidth="0.5" strokeOpacity="0.5" fill="none" />
      <circle cx="100" cy="100" r="6" fill="var(--soul-gold)" fillOpacity="0.5" />
      <circle cx="100" cy="100" r="2" fill="var(--soul-ivory)" fillOpacity="0.9" />
    </svg>
  );
}

export const symbolicSections = [
  {
    id: 'shadow',
    name: { th: 'Shadow', en: 'Shadow' },
    description: {
      th: 'ส่วนที่เราซ่อนไว้—ไม่ใช่เพราะมันชั่ว แต่เพราะเราไม่เคยเรียนรู้ที่จะมองมันตรง ๆ Shadow คือเงาที่สะท้อนตัวตนที่เราไม่ยอมรับ',
      en: 'The part we hide—not because it is evil, but because we never learned to look at it directly. Shadow is the reflection of the self we refuse to accept.',
    },
    svg: <ShadowSymbol />,
  },
  {
    id: 'persona',
    name: { th: 'Persona', en: 'Persona' },
    description: {
      th: 'หน้ากากที่เราสวมใส่ในสังคม—ไม่ใช่เรื่องโกหก แต่เป็นส่วนหนึ่งของตัวตนที่เราเลือกแสดงออก Persona คือผิวสำเร็จรูปที่โลกเห็น',
      en: 'The mask we wear in society—not a lie, but a chosen part of ourselves we present. Persona is the finished surface the world sees.',
    },
    svg: <PersonaSymbol />,
  },
  {
    id: 'self',
    name: { th: 'Self', en: 'Self' },
    description: {
      th: 'แก่นแท้ของจิตใจ—จุดศูนย์กลางที่เชื่อมโยงทุกส่วนเข้าด้วยกัน Self ไม่ใช่เป้าหมาย แต่เป็นกระบวนการของการเป็นตัวเองอย่างเต็มที่',
      en: 'The core of the psyche—the center that connects all parts. Self is not a destination but the process of becoming fully oneself.',
    },
    svg: <SelfSymbol />,
  },
  {
    id: 'anima-animus',
    name: { th: 'Anima / Animus', en: 'Anima / Animus' },
    description: {
      th: 'พลังตรงข้ามภายในจิตใจ—ผู้หญิงในผู้ชาย ผู้ชายในผู้หญิง ไม่ใช่เรื่องเพศ แต่เป็นความสมดุลของ polarity ภายใน',
      en: 'The opposing energy within—the feminine in the masculine, the masculine in the feminine. Not about gender, but about inner polarity balance.',
    },
    svg: <AnimaAnimusSymbol />,
  },
  {
    id: 'archetype',
    name: { th: 'Archetype', en: 'Archetype' },
    description: {
      th: 'รูปแบบดึกดำบรรพ์ที่ฝังอยู่ในจิตใต้สำนึก—Hero, Trickster, Wise Old Man ไม่ใช่แค่สัญลักษณ์ แต่เป็นพลังที่ขับเคลื่อนพฤติกรรมของเรา',
      en: 'Primal patterns embedded in the unconscious—Hero, Trickster, Wise Old Man. Not just symbols, but forces driving our behavior.',
    },
    svg: <ArchetypeSymbol />,
  },
  {
    id: 'individuation',
    name: { th: 'Individuation', en: 'Individuation' },
    description: {
      th: 'กระบวนการกลายเป็นตัวเอง—การรวมทุกส่วนของจิตใจเข้าด้วยกัน Individuation ไม่ใช่จุดจบ แต่เป็นเส้นทางที่ไม่มีวันสิ้นสุด',
      en: 'The process of becoming oneself—integrating all parts of the psyche. Individuation is not an end point but a never-ending path.',
    },
    svg: <IndividuationSymbol />,
  },
];
