
// app/twitter-image.tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Dishcovery - AI-Powered Recipe Discovery'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(to bottom right, #4CAF50, #45a049)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '40px',
                }}
            >
                <div
                    style={{
                        fontSize: 60,
                        fontWeight: 'bold',
                        color: 'white',
                        marginBottom: 20,
                    }}
                >
                    Dishcovery
                </div>
                <div
                    style={{
                        fontSize: 36,
                        color: 'white',
                        textAlign: 'center',
                    }}
                >
                    AI-Powered Recipe Discovery
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}