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

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

    console.log('Upload URL endpoint:');
    console.log('- supabaseUrl:', supabaseUrl);
    console.log('- supabaseAnonKey exists:', !!supabaseAnonKey);

    if (!supabaseUrl) {
      console.error('ERROR: SUPABASE_URL is not set!');
      return NextResponse.json(
        { error: 'Supabase not fully configured (missing SUPABASE_URL)' },
        { status: 500 }
      );
    }

    if (!supabaseAnonKey) {
      console.error('ERROR: SUPABASE_ANON_KEY is not set!');
      return NextResponse.json(
        { error: 'Supabase not fully configured (missing SUPABASE_ANON_KEY)' },
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
