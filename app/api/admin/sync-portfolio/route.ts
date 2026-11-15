import { existsSync } from 'fs';
import { join } from 'path';
import { readdirSync } from 'fs';

export async function POST(request: Request) {
  try {
    const portfolioPath = join(process.cwd(), 'public/portfolio');
    
    // Read portfolio.ts to get all items
    const portfolioModule = await import('@/lib/portfolio');
    const allPhotos = portfolioModule.portfolioItems.filter((item: any) => item.type === 'photo' || !item.type);

    const publicPath = join(process.cwd(), 'public');
    
    const results = {
      missing: [] as any[],
      new: [] as any[],
      valid: 0,
    };

    // Check for missing files
    for (const photo of allPhotos) {
      if (photo.image) {
        const filePath = join(publicPath, photo.image);
        if (!existsSync(filePath)) {
          results.missing.push({
            id: photo.slug,
            slug: photo.slug,
            title: photo.title,
            image: photo.image,
            category: photo.category,
          });
        } else {
          results.valid++;
        }
      }
    }

    // Scan for new files
    const categories = ["Sports", "Portraits", "Events", "Corporate", "Lifestyle"];
    const existingPaths = new Set(allPhotos.map((item: any) => item.image).filter(Boolean));
    
    // Get max numeric ID from existing photos
    const maxId = Math.max(
      ...allPhotos
        .map((item: any) => {
          const match = item.id?.match(/\d+/);
          return match ? parseInt(match[0]) : 0;
        }),
      0
    );
    let nextId = maxId + 1;

    for (const category of categories) {
      const categoryPath = join(portfolioPath, category.toLowerCase());
      try {
        const files = readdirSync(categoryPath);
        
        for (const file of files) {
          if (/\.(jpg|jpeg|png|webp)$/i.test(file)) {
            const imagePath = `/portfolio/${category.toLowerCase()}/${file}`;
            
            if (!existingPaths.has(imagePath)) {
              const slug = file
                .replace(/\.[^/.]+$/, '')
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');

              results.new.push({
                id: String(nextId),
                slug,
                title: 'Untitled Photo',
                description: '',
                date: new Date().toISOString().split('T')[0],
                image: imagePath,
                category,
                featured: false,
              });
              nextId++;
            }
          }
        }
      } catch (error) {
        // Category folder might not exist, skip
      }
    }

    return Response.json({ 
      success: true,
      valid: results.valid,
      missing: results.missing,
      missingCount: results.missing.length,
      new: results.new,
      newCount: results.new.length,
    });
  } catch (error) {
    console.error('Error syncing portfolio:', error);
    return Response.json(
      { error: 'Failed to sync portfolio' },
      { status: 500 }
    );
  }
}
