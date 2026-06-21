import type { Metadata } from 'next';
import { getT } from '@/lib/i18n';
import { siteConfig } from '@/lib/site';

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const localeKey = (locale === 'th' || locale === 'en') ? locale : 'th';
  const t = getT(localeKey);

  return {
    title: t.nav.about,
    description: siteConfig.description[localeKey],
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  const localeKey = (locale === 'th' || locale === 'en') ? locale : 'th';

  return (
    <div className="container mx-auto px-5 py-16 sm:px-8">
      <article className="max-w-3xl mx-auto">
        <h1 className="type-page-title mb-8 text-text">
          {localeKey === 'th' ? 'เกี่ยวกับ' : 'About'}
        </h1>

        {localeKey === 'th' ? (
          <div className="prose-reading">
            <p className="type-lead mb-6 text-text">
              The Soul’s Compass เป็นพื้นที่สำหรับศึกษาจิตใจมนุษย์อย่างจริงจัง
              ผ่านจิตวิทยาเชิงลึก จิตวิทยาวิเคราะห์ จิตวิเคราะห์ และปรัชญา
            </p>

            <h2>เราไม่ใช่แบบทดสอบ</h2>
            <p>
              เราไม่ได้ทำ personality test เราไม่สัญญาว่าจะ unlock your potential
              หรือ transform your life ในสามคลิก
              เราเสนอพื้นที่สำหรับคนที่ต้องการเข้าใจจิตใจมนุษย์อย่างลึกกว่าป้ายกำกับบุคลิกภาพ
            </p>

            <h2>Jung ≠ MBTI</h2>
            <p>
              Carl Jung ไม่ได้สร้าง MBTI และทฤษฎีประเภทบุคลิกภาพของ Jung
              ไม่ใช่แบบทดสอบเพื่อหา 16 types
              แต่เป็นเครื่องมือสำหรับทำความเข้าใจพลวัตของจิตใจที่ซับซ้อนกว่ามาก
            </p>

            <h2>ไม่ใช่คำปรึกษาทางคลินิก</h2>
            <p>
              เว็บไซต์นี้ให้ความรู้เชิงวิชาการเท่านั้น ไม่ใช่การให้คำปรึกษาทางคลินิกหรือการแพทย์
              หากคุณต้องการความช่วยเหลือด้านสุขภาพจิต
              กรุณาปรึกษานักจิตวิทยาคลินิกหรือจิตแพทย์
            </p>

            <h2>ใครอยู่เบื้องหลัง</h2>
            <p>
              โปรเจกต์นี้เริ่มต้นจากความเชื่อว่าจิตใจมนุษย์สมควรได้รับการศึกษาอย่างจริงจัง
              ไม่ใช่การลดทอนให้เหลือเพียงตัวอักษร 4 ตัวหรือสีบุคลิกภาพ
            </p>
          </div>
        ) : (
          <div className="prose-reading">
            <p className="type-lead mb-6 text-text">
              The Soul’s Compass is for people who want to study the psyche without flattening it into personality types.
              Depth psychology, analytical psychology, psychoanalysis, philosophy.
            </p>

            <h2>We are not a personality test</h2>
            <p>
              No tests. No promises about unlocking your potential in three clicks.
              If you’re tired of four-letter codes and want to read about the psyche as something complex, this might be for you.
            </p>

            <h2>Jung ≠ MBTI</h2>
            <p>
              Carl Jung did not create the MBTI. His typology describes how the psyche works, not how to sort people.
              The test came later, by people who simplified his theory into something you could score.
            </p>

            <h2>Not clinical advice</h2>
            <p>
              Educational content only. Not therapy. Not diagnosis. Not medical treatment.
              If you need mental health support, talk to a licensed psychologist or psychiatrist.
            </p>

            <h2>Who runs this</h2>
            <p>
              I started this because I think the psyche deserves better than being flattened into four letters.
            </p>
          </div>
        )}
      </article>
    </div>
  );
}
