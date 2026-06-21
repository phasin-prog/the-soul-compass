import { ImageResponse } from 'next/og';

export const alt = "The Soul's Compass";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#090911',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'serif',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '4px',
            background: '#e5b15b',
            borderRadius: '999px',
            marginBottom: '32px',
          }}
        />
        <div
          style={{
            fontSize: 72,
            fontWeight: 400,
            color: '#ede7db',
            textAlign: 'center',
            maxWidth: '900px',
            lineHeight: 1.2,
          }}
        >
          The Soul’s Compass
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#ada190',
            marginTop: '24px',
            textAlign: 'center',
            maxWidth: '700px',
          }}
        >
          พื้นที่สำหรับอ่านจิตใจมนุษย์อย่างลึกกว่าแบบทดสอบ
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
