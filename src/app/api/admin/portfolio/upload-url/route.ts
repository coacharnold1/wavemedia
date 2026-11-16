import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { filename } = body;

    if (!filename) {
      return NextResponse.json(
        { error: 'No filename provided' },
        { status: 400 }
      );
    }

    const DATABASE_URL = process.env.DATABASE_URL;
    if (!DATABASE_URL) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    // Extract Supabase project URL from DATABASE_URL
    const dbUrl = new URL(`postgresql://${DATABASE_URL.split('://')[1]}`);
    const host = dbUrl.hostname || '';
    const hostParts = host.split('.');
    const projectId = hostParts[0]?.split('-').pop();
    
    if (!projectId) {
      return NextResponse.json(
        { error: 'Could not extract Supabase project ID' },
        { status: 500 }
      );
    }
    
    const supabaseUrl = `https://${projectId}.supabase.co`;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseAnonKey) {
      return NextResponse.json(
        { error: 'Supabase not fully configured' },
        { status: 500 }
      );
    }

    // Create Supabase client and get public URL
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data: publicData } = supabase.storage
      .from('portfolio')
      .getPublicUrl(filename);

    return NextResponse.json({
      success: true,
      supabaseUrl,
      anonKey: supabaseAnonKey,
      filename,
      path: publicData?.publicUrl || '',
    });
  } catch (error) {
    console.error('Error getting upload URL:', error);
    return NextResponse.json(
      { error: 'Failed to get upload URL' },
      { status: 500 }
    );
  }
}
