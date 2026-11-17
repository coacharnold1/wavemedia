import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const vercelToken = process.env.VERCEL_TOKEN;
    if (!vercelToken) {
      return NextResponse.json(
        { error: 'Vercel token not configured' },
        { status: 500 }
      );
    }

    // Trigger a redeploy via Vercel API
    const response = await fetch('https://api.vercel.com/v13/deployments', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${vercelToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'wavemedia',
        project: 'wavemedia',
        gitSource: {
          type: 'github',
          ref: 'main',
          repo: 'coacharnold1/wavemedia',
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Vercel API error:', data);
      return NextResponse.json(
        { error: 'Failed to trigger redeploy' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Redeploy triggered successfully',
      deploymentUrl: data.url,
      deploymentId: data.id,
    });
  } catch (error) {
    console.error('Error triggering redeploy:', error);
    return NextResponse.json(
      { error: 'Failed to trigger redeploy' },
      { status: 500 }
    );
  }
}
