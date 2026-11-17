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
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      return NextResponse.json(
        { error: 'Supabase not fully configured' },
        { status: 500 }
      );
    }

    // Create Supabase client with SERVICE_ROLE_KEY
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    // Generate a signed URL that allows uploading for 1 hour
    const { data, error } = await supabase.storage
      .from('wavemedianj')
      .createSignedUploadUrl(filename, {
        upsert: false,
      });

    if (error) {
      console.error('Error creating signed URL:', error);
      return NextResponse.json(
        { error: 'Failed to create signed upload URL' },
        { status: 500 }
      );
    }

    // Also get the public URL that will work after upload
    const { data: publicData } = supabase.storage
      .from('wavemedianj')
      .getPublicUrl(filename);

    return NextResponse.json({
      success: true,
      signedUrl: data?.signedUrl,
      publicUrl: publicData?.publicUrl || '',
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to get signed URL' },
      { status: 500 }
    );
  }
}
