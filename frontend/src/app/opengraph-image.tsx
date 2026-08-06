import { ImageResponse } from 'next/og';

export const alt = 'Glenn Claes — Developer Portfolio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1d4ed8 0%, #0f172a 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          fontFamily: 'Arial, Helvetica, sans-serif',
          color: 'white',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '64px',
            fontWeight: '700',
            background: 'rgba(255,255,255,0.18)',
            borderRadius: '18px',
            padding: '10px 22px',
            marginBottom: '24px',
          }}
        >
          GC
        </div>
        <div style={{ display: 'flex', fontSize: '52px', fontWeight: '700', lineHeight: '1.1' }}>
          Glenn Claes
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: '24px',
            opacity: 0.85,
            marginTop: '14px',
          }}
        >
          Developer Portfolio
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: '18px',
            opacity: 0.7,
            marginTop: '18px',
          }}
        >
          Next.js · React · TypeScript · Python · AI
        </div>
      </div>
    ),
    size,
  );
}
