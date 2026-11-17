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

    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      return NextResponse.json(
        { error: 'Supabase not fully configured' },
        { status: 500 }
      );
    }

    // Create Supabase client with SERVICE_ROLE_KEY (bypasses RLS and storage permissions)
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    const filename = `${Date.now()}-${file.name.replace(/[^a-z0-9.-]/gi, '_')}`;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Supabase Storage with service role (no permission checks)
    const { error } = await supabase.storage
      .from('wavemedianj')
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

    // Get public URL using ANON_KEY client
    const anonSupabase = createClient(supabaseUrl, process.env.SUPABASE_ANON_KEY!);
    const { data: publicData } = anonSupabase.storage
      .from('wavemedianj')
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
