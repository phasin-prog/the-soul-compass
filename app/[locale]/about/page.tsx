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
              ผ่านจิตวิทยาหลายสำนัก ประสาทวิทยาศาสตร์ จิตวิทยาสังคม
              ปรัชญา และกรอบทฤษฎีที่กำลังพัฒนา
            </p>

            <h2>ไม่ยึดสำนักเดียวเป็นคำตอบทั้งหมด</h2>
            <p>
              จิตวิเคราะห์และจิตวิทยาเชิงลึกเป็นส่วนสำคัญของพื้นที่นี้
              แต่ไม่ใช่ขอบเขตทั้งหมด เราสนใจทั้งงานทดลอง กลไกสมอง
              บริบททางสังคม ประสบการณ์บุคคลที่หนึ่ง และข้อถกเถียงเชิงปรัชญา
              แต่ละสำนักตอบคำถามคนละแบบ และต้องถูกอ่านด้วยมาตรฐานของมันเอง
            </p>

            <h2>เราไม่ใช่แบบทดสอบบุคลิกภาพ</h2>
            <p>
              เราไม่ลดมนุษย์ให้เหลือตัวอักษร สี หรือคะแนนเดียว
              Typology เป็นเพียงหนึ่งกรอบสำหรับตั้งคำถาม
              ไม่ใช่คำอธิบายแทนพัฒนาการ สมอง ความสัมพันธ์ วัฒนธรรม
              และประวัติชีวิตทั้งหมด
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
              The Soul’s Compass is a serious space for studying mind across
              psychology, neuroscience, social psychology, philosophy, and
              developing theoretical frameworks.
            </p>

            <h2>No single tradition explains everything</h2>
            <p>
              Depth psychology and psychoanalysis matter here, but they are not
              the boundary of the project. Experimental evidence, brain
              mechanisms, social context, first-person experience, and
              philosophical argument each answer different kinds of questions.
            </p>

            <h2>We are not a personality test</h2>
            <p>
              Typology is one lens, not a substitute for development, brain,
              relationships, culture, or personal history. Human beings do not
              collapse into four letters, one color, or one score.
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
