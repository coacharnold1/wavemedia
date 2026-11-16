import { writeFileSync } from 'fs';
import { join } from 'path';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return Response.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file is an image
    if (!file.type.startsWith('image/')) {
      return Response.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    // Check file size (50MB limit)
    if (file.size > 50 * 1024 * 1024) {
      return Response.json(
        { error: 'File too large (max 50MB)' },
        { status: 413 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to public/portfolio/
    const filename = `${Date.now()}-${file.name.replace(/[^a-z0-9.-]/gi, '_')}`;
    const filepath = join(process.cwd(), 'public/portfolio', filename);

    writeFileSync(filepath, buffer);

    return Response.json({
      success: true,
      filename,
      path: `/portfolio/${filename}`,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return Response.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
