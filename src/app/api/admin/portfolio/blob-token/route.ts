import { NextResponse } from 'next/server';

export async function GET() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: 'Blob token not configured' },
      { status: 500 }
    );
  }

  return NextResponse.json({
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
}
