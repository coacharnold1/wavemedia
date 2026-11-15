import { readdirSync } from 'fs';
import { join } from 'path';

export async function POST() {
  try {
    const portfolioPath = join(process.cwd(), 'public/portfolio');
    
    // Scan /public/portfolio/ for all JPG files (not organized by category yet)
    let nextId = 1;
    const newPhotos: any[] = [];

    try {
      const files = readdirSync(portfolioPath);
      
      for (const file of files) {
        if (/\.(jpg|jpeg|png|webp)$/i.test(file)) {
          const imagePath = `/portfolio/${file}`;
          
          const slug = file
            .replace(/\.[^/.]+$/, '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');

          newPhotos.push({
            id: String(nextId),
            slug,
            title: 'Untitled Photo',
            description: '',
            date: new Date().toISOString().split('T')[0],
            image: imagePath,
            category: 'Events', // Default category
            featured: false,
          });
          nextId++;
        }
      }
    } catch (error) {
      console.error('Error reading portfolio folder:', error);
    }

    return Response.json({ 
      success: true,
      new: newPhotos,
      newCount: newPhotos.length,
      missing: [],
      missingCount: 0,
    });
  } catch (error) {
    console.error('Error syncing portfolio:', error);
    return Response.json(
      { error: 'Failed to sync portfolio' },
      { status: 500 }
    );
  }
}
