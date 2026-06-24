'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { localeConfig } from '@/lib/locale';
import { siteConfig } from '@/lib/site';

interface SiteMapItem {
  id: string;
  title: string;
  titleTh: string;
  description: string;
  descriptionTh: string;
  icon: string;
  delay: number;
  angle: number;
  distance: number;
  href: string;
}

const siteMapItems: SiteMapItem[] = [
  {
    id: 'home',
    title: 'Home',
    titleTh: 'หน้าแรก',
    description: 'Main landing page',
    descriptionTh: 'หน้าแรกของเว็บไซต์',
    icon: '🏠',
    delay: 0,
    angle: 0,
    distance: 120,
    href: '/',
  },
  {
    id: 'about',
    title: 'About',
    titleTh: 'เกี่ยวกับ',
    description: 'Learn about us',
    descriptionTh: 'เรียนรู้เกี่ยวกับเรา',
    icon: 'ℹ️',
    delay: 0.1,
    angle: 60,
    distance: 120,
    href: '/about',
  },
  {
    id: 'articles',
    title: 'Articles',
    titleTh: 'บทความ',
    description: 'Read our articles',
    descriptionTh: 'อ่านบทความของเรา',
    icon: '📝',
    delay: 0.2,
    angle: 120,
    distance: 120,
    href: '/articles',
  },
  {
    id: 'concepts',
    title: 'Concepts',
    titleTh: 'แนวคิด',
    description: 'Explore concepts',
    descriptionTh: 'สำรวจแนวคิด',
    icon: '💡',
    delay: 0.3,
    angle: 180,
    distance: 120,
    href: '/concepts',
  },
  {
    id: 'series',
    title: 'Series',
    titleTh: 'ซีรี่ส์',
    description: 'Read our series',
    descriptionTh: 'อ่านซีรี่ส์ของเรา',
    icon: '📚',
    delay: 0.4,
    angle: 240,
    distance: 120,
    href: '/series',
  },
  {
    id: 'resources',
    title: 'Resources',
    titleTh: 'ทรัพยากร',
    description: 'Useful resources',
    descriptionTh: 'ทรัพยากรที่มีประโยชน์',
    icon: '📚',
    delay: 0.5,
    angle: 300,
    distance: 120,
    href: '/resources',
  },
  {
    id: 'psychology',
    title: 'Psychology',
    titleTh: 'จิตวิทยา',
    description: 'Analytical psychology',
    descriptionTh: 'จิตวิทยาวิเคราะห์',
    icon: '🧠',
    delay: 0.6,
    angle: 30,
    distance: 200,
    href: '/analytical-psychology',
  },
  {
    id: 'philosophy',
    title: 'Philosophy',
    titleTh: 'ปรัชญา',
    description: 'Philosophical insights',
    descriptionTh: 'ข้อมูลเชิงปรัชญา',
    icon: '🤔',
    delay: 0.7,
    angle: 90,
    distance: 200,
    href: '/philosophy',
  },
  {
    id: 'typology',
    title: 'Typology',
    titleTh: 'ประเภท',
    description: 'Personality types',
    descriptionTh: 'ประเภทบุคลิกภาพ',
    icon: '🎭',
    delay: 0.8,
    angle: 150,
    distance: 200,
    href: '/typology',
  },
  {
    id: 'manifesto',
    title: 'Manifesto',
    titleTh: 'ประกาศ',
    description: 'Our manifesto',
    descriptionTh: 'ประกาศของเรา',
    icon: '📜',
    delay: 0.9,
    angle: 210,
    distance: 200,
    href: '/manifesto',
  },
  {
    id: 'support',
    title: 'Support',
    titleTh: 'ช่วยเหลือ',
    description: 'Get support',
    descriptionTh: 'รับการช่วยเหลือ',
    icon: '🤝',
    delay: 1.0,
    angle: 270,
    distance: 200,
    href: '/support',
  },
  {
    id: 'external',
    title: 'External Links',
    titleTh: 'ลิงก์ภายนอก',
    description: 'External resources',
    descriptionTh: 'ทรัพยากรภายนอก',
    icon: '🔗',
    delay: 1.1,
    angle: 330,
    distance: 200,
    href: '/external-links',
  },
];

export default function SitemapPage() {
  const params = useParams();
  const locale = (params.locale as string) || 'th';
  const isThaiLocale = locale === 'th';
  
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Determine text based on locale
  const getText = (en: string, th: string) => (isThaiLocale ? th : en);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const element = containerRef.current;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      const scrollStart = windowHeight;
      const scrollEnd = -elementHeight;
      const progress = Math.max(
        0,
        Math.min(1, (scrollStart - elementTop) / (scrollStart - scrollEnd))
      );

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useGSAP(() => {
    // Animate central singularity point
    gsap.to('.singularity-point', {
      scale: 1.2,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // Animate concentric circles
    gsap.to('.concentric-circle', {
      opacity: [0.3, 0.6, 0.3],
      duration: 4,
      repeat: -1,
      stagger: 0.2,
      ease: 'sine.inOut',
    });

    // Animate items on scroll
    itemsRef.current.forEach((item, index) => {
      if (!item) return;
      
      const itemProgress = Math.max(0, scrollProgress - siteMapItems[index].delay);
      const opacity = Math.min(1, itemProgress / 0.15);
      const scale = 0.8 + (itemProgress / 0.15) * 0.2;
      const blur = Math.max(0, 10 - (itemProgress / 0.15) * 10);

      gsap.to(item, {
        opacity,
        scale: Math.min(1, scale),
        filter: `blur(${blur}px)`,
        duration: 0.1,
        overwrite: 'auto',
      });
    });
  }, [scrollProgress]);

  return (
    <div className="min-h-screen bg-background text-text overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative">
        <div className="text-center space-y-6 px-4">
          <h1 className="text-display font-serif text-accent">
            {getText('Explore the Singularity', 'สำรวจ Singularity')}
          </h1>
          <p className="text-lead text-text-soft max-w-2xl mx-auto">
            {getText(
              'Where information converges into infinite possibilities',
              'ที่ข้อมูลบรรจบกันเป็นความเป็นไปได้ที่ไม่มีที่สิ้นสุด'
            )}
          </p>

          {/* Scroll Indicator */}
          <div className="pt-8 animate-bounce">
            <div className="text-accent/60 text-sm">{getText('Scroll to reveal', 'เลื่อนเพื่อเปิดเผย')}</div>
            <div className="text-2xl">↓</div>
          </div>
        </div>
      </section>

      {/* Site Map Container */}
      <section
        ref={containerRef}
        className="relative min-h-screen flex items-center justify-center py-20"
      >
        <div className="relative w-full h-[600px] flex items-center justify-center">
          {/* Central Singularity Point */}
          <div
            className="singularity-point absolute w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent/70 shadow-lg"
            style={{
              boxShadow: '0 0 40px rgba(185, 149, 85, 0.8)',
            }}
          />

          {/* Concentric Circles */}
          {[1, 2, 3].map((ring) => (
            <div
              key={`ring-${ring}`}
              className="concentric-circle absolute rounded-full border border-accent/30"
              style={{
                width: ring * 120,
                height: ring * 120,
              }}
            />
          ))}

          {/* Site Map Items */}
          {siteMapItems.map((item, index) => {
            const radians = (item.angle * Math.PI) / 180;
            const x = Math.cos(radians) * item.distance;
            const y = Math.sin(radians) * item.distance;

            return (
              <div
                key={item.id}
                ref={(el) => {
                  if (el) itemsRef.current[index] = el;
                }}
                className="absolute"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                  opacity: 0,
                  scale: 0.8,
                }}
              >
                <a
                  href={`/${locale}${item.href}`}
                  className="relative w-24 h-24 rounded-lg bg-surface-raised border border-accent/30 flex flex-col items-center justify-center cursor-pointer group hover:border-accent/60 transition-all duration-300 hover:shadow-lg"
                  style={{
                    boxShadow: 'inset 0 0 0 1px rgba(185, 149, 85, 0.1)',
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      scale: 1.15,
                      boxShadow: '0 0 40px rgba(185, 149, 85, 0.6)',
                      duration: 0.3,
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      scale: 1,
                      boxShadow: 'inset 0 0 0 1px rgba(185, 149, 85, 0.1)',
                      duration: 0.3,
                    });
                  }}
                >
                  {/* Glow effect overlay */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/20 group-hover:to-accent/10 transition-all duration-300" />

                  <div className="relative z-10 text-center space-y-1">
                    <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <h3 className="text-xs font-semibold text-accent group-hover:text-accent-strong transition-colors duration-300">
                      {getText(item.title, item.titleTh)}
                    </h3>
                    <p className="text-[10px] text-text-muted hidden group-hover:block group-hover:text-text-soft transition-colors duration-300">
                      {getText(item.description, item.descriptionTh)}
                    </p>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* Info Section */}
      <section className="relative min-h-screen flex items-center justify-center py-20">
        <div className="container max-w-3xl space-y-8 px-4">
          <div className="space-y-4">
            <h2 className="text-section-title font-serif text-accent">
              {getText('Navigate the Cosmos', 'นำทางจักรวาล')}
            </h2>
            <p className="text-lead text-text-soft">
              {getText(
                'This interactive site map visualizes the structure of our digital universe. Each element represents a different section of our platform, organized in a cosmic hierarchy that reveals itself as you explore.',
                'แผนที่ไซต์แบบโต้ตอบนี้แสดงภาพโครงสร้างของจักรวาลดิจิทัลของเรา แต่ละองค์ประกอบแสดงถึงส่วนต่างๆ ของแพลตฟอร์มของเรา จัดเรียงในลำดับชั้นจักรวาลที่เปิดเผยตัวเองเมื่อคุณสำรวจ'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                titleEn: 'Progressive Revelation',
                titleTh: 'การเปิดเผยแบบค่อยเป็นค่อยไป',
                descEn: 'Content unfolds gradually as you scroll, revealing the structure layer by layer.',
                descTh: 'เนื้อหาเปิดเผยแบบค่อยเป็นค่อยไปเมื่อคุณเลื่อน เปิดเผยโครงสร้างทีละชั้น',
              },
              {
                titleEn: 'Cosmic Design',
                titleTh: 'ดีไซน์จักรวาล',
                descEn: 'Inspired by the mysteries of the universe, our design creates an immersive experience.',
                descTh: 'ได้รับแรงบันดาลใจจากความลึกลับของจักรวาล ดีไซน์ของเราสร้างประสบการณ์ที่ดื่มด่ำ',
              },
              {
                titleEn: 'Interactive Elements',
                titleTh: 'องค์ประกอบแบบโต้ตอบ',
                descEn: 'Hover over each section to discover more details and navigate deeper into the structure.',
                descTh: 'วางเมาส์เหนือแต่ละส่วนเพื่อค้นหารายละเอียดเพิ่มเติมและนำทางลึกเข้าไปในโครงสร้าง',
              },
              {
                titleEn: 'Infinite Possibilities',
                titleTh: 'ความเป็นไปได้ที่ไม่มีที่สิ้นสุด',
                descEn: 'The singularity represents the convergence of all information and infinite potential.',
                descTh: 'Singularity แสดงถึงการบรรจบกันของข้อมูลทั้งหมดและศักยภาพที่ไม่มีที่สิ้นสุด',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg bg-surface-raised border border-accent/20 hover:border-accent/50 transition-colors"
              >
                <h3 className="text-card-title font-serif text-accent mb-2">
                  {getText(feature.titleEn, feature.titleTh)}
                </h3>
                <p className="text-text-soft">{getText(feature.descEn, feature.descTh)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative min-h-screen flex items-center justify-center py-20">
        <div className="container max-w-2xl text-center space-y-8 px-4">
          <div className="space-y-4">
            <h2 className="text-section-title font-serif text-accent">
              {getText('Dive Deeper', 'ลงลึกลงไป')}
            </h2>
            <p className="text-lead text-text-soft">
              {getText(
                'Ready to explore the full potential of our platform? Start your journey through the singularity today.',
                'พร้อมที่จะสำรวจศักยภาพเต็มที่ของแพลตฟอร์มของเรา? เริ่มการเดินทางของคุณผ่าน singularity วันนี้'
              )}
            </p>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href={`/${locale}/articles`}
              className="px-8 py-3 rounded-lg bg-accent text-accent-ink font-semibold hover:bg-accent-strong transition-colors"
            >
              {getText('Explore Articles', 'สำรวจบทความ')}
            </a>
            <a
              href={`/${locale}/about`}
              className="px-8 py-3 rounded-lg border border-accent/50 text-accent hover:bg-accent/10 transition-colors"
            >
              {getText('Learn More', 'เรียนรู้เพิ่มเติม')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
