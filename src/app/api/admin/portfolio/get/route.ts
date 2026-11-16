import { portfolioItems } from '@/lib/portfolio';

export async function GET() {
  try {
    return Response.json({ success: true, items: portfolioItems });
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return Response.json(
      { error: 'Failed to fetch portfolio' },
      { status: 500 }
    );
  }
}
