import type { Metadata } from 'next';
import { Container } from '@/components/Layout/Container';
import { getT } from '@/lib/i18n';

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
    title: t.nav.manifesto,
    description:
      localeKey === 'th'
        ? "แถลงการณ์และปรัชญาของ The Soul's Compass"
        : "The Soul's Compass manifesto and philosophy",
  };
}

export default async function ManifestoPage({ params }: PageProps) {
  const { locale } = await params;
  const localeKey = (locale === 'th' || locale === 'en') ? locale : 'th';

  return (
    <Container className="py-16">
      <article className="max-w-reading-focus mx-auto">
        <h1 className="type-page-title mb-8 text-text">
          {localeKey === 'th' ? 'แถลงการณ์' : 'Manifesto'}
        </h1>

        {localeKey === 'th' ? (
          <div className="prose-reading">
            <p className="type-lead mb-8 font-serif text-text">
              จิตใจมนุษย์ไม่ใช่ป้ายกำกับ ไม่ใช่สี ไม่ใช่ตัวเลข
            </p>

            <p>
              มันเป็น<em className="text-accent not-italic">สนามแห่งภาพลักษณ์</em> แห่ง<em className="text-accent not-italic">ความขัดแย้ง</em> แห่ง<em className="text-accent not-italic">ความปรารถนา</em> และแห่ง<em className="text-accent not-italic">การเปลี่ยนแปลง</em>
            </p>

            <h2>เราต่อต้านการลดทอน</h2>
            <p>
              บุคลิกภาพไม่ใช่สิ่งที่คุณ<em className="text-accent not-italic">เป็น</em> มันคือสิ่งที่คุณ<em className="text-accent not-italic">แสดง</em>
              ใต้บุคลิกภาพคือจิตใจที่ลึกกว่า — เต็มไปด้วยเงา ความฝัน สัญลักษณ์ และพลังที่ยังไม่ถูกรู้จัก
            </p>

            <h2>Jung ไม่ได้สร้าง MBTI</h2>
            <p>
              Carl Jung ศึกษา<em className="text-accent not-italic">พลวัตของจิตใจ</em> — ไม่ใช่เพื่อจัดหมวดหมู่มนุษย์
              แต่เพื่อเข้าใจว่าจิตใจทำงานอย่างไร
              ทฤษฎีของเขาถูกเอาไปทำแบบทดสอบ แต่นั่นไม่ใช่จุดประสงค์ดั้งเดิม
            </p>

            <h2>เราเชื่อในความซับซ้อน</h2>
            <p>
              มนุษย์ไม่ใช่กล่องที่ใส่ป้ายชื่อได้ง่ายๆ เราเต็มไปด้วยความขัดแย้งภายใน
              ความปรารถนาที่ซ่อนอยู่ และศักยภาพที่ยังไม่เกิด
            </p>

            <h2>นี่คือพื้นที่สำหรับคิด ไม่ใช่สำหรับให้คำตอบ</h2>
            <p>
              เราไม่สัญญาว่าจะทำให้คุณ<em className="text-accent not-italic">เข้าใจตัวเอง</em>ในสามนาที
              เราเสนอเครื่องมือ แนวคิด และมุมมองที่จะช่วยให้คุณ<em className="text-accent not-italic">คิด</em>อย่างลึกซึ้งขึ้น
            </p>

            <p className="type-lead mt-12 font-serif text-text">
              จิตใจมนุษย์สมควรได้รับการศึกษาอย่างจริงจัง
            </p>
          </div>
        ) : (
          <div className="prose-reading">
            <p className="type-lead mb-8 font-serif text-text">
              The psyche is not a label. Not a color. Not a number.
            </p>

            <p>
              It’s a field of <em className="text-accent not-italic">image</em>, <em className="text-accent not-italic">conflict</em>, <em className="text-accent not-italic">desire</em>, and <em className="text-accent not-italic">transformation</em>.
            </p>

            <h2>We resist reduction</h2>
            <p>
              Personality is not what you <em className="text-accent not-italic">are</em>. It’s what you <em className="text-accent not-italic">show</em>.
              Beneath it lies a deeper psyche: shadow, dreams, symbols, forces you haven’t met yet.
            </p>

            <h2>Jung did not create MBTI</h2>
            <p>
              Carl Jung studied <em className="text-accent not-italic">how the psyche works</em>. How it compensates. How it balances opposites.
              The test came later, made by people who wanted something you could score.
            </p>

            <h2>We believe in complexity</h2>
            <p>
              You are not a box. You’re full of contradictions, hidden wants, things you haven’t become yet.
            </p>

            <h2>This is a space for thinking</h2>
            <p>
              We don’t promise you’ll <em className="text-accent not-italic">understand yourself</em> in three minutes.
              We offer ways to <em className="text-accent not-italic">think</em> about the psyche that go deeper than personality types.
            </p>

            <p className="type-lead mt-12 font-serif text-text">
              The psyche deserves serious study.
            </p>
          </div>
        )}
      </article>
    </Container>
  );
}
