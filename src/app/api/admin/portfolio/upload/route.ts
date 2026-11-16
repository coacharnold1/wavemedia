import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file is an image
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    // Check file size (100MB limit for Supabase)
    if (file.size > 100 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large (max 100MB)' },
        { status: 413 }
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
    // DATABASE_URL format: postgres://user:pass@host/db
    // We need: https://[project-id].supabase.co
    const dbUrl = new URL(`postgresql://${DATABASE_URL.split('://')[1]}`);
    const host = dbUrl.hostname || ''; // e.g., "aws-1-us-east-1.pooler.supabase.com"
    const hostParts = host.split('.');
    const projectId = hostParts[0]?.split('-').pop(); // Extract project ID from first part
    
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

    // Create Supabase client for storage
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const filename = `${Date.now()}-${file.name.replace(/[^a-z0-9.-]/gi, '_')}`;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Supabase Storage
    const { error } = await supabase.storage
      .from('portfolio')
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return NextResponse.json(
        { error: 'Failed to upload to storage' },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: publicData } = supabase.storage
      .from('portfolio')
      .getPublicUrl(filename);

    return NextResponse.json({
      success: true,
      filename,
      path: publicData?.publicUrl || '',
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

