import db from '@/lib/db';
import postgres from 'postgres';

type Sql = ReturnType<typeof postgres>;

export async function POST() {
  try {
    console.log('[update-vimeo-thumbnails] Starting...');
    
    if (!db) {
      console.log('[update-vimeo-thumbnails] Database not available');
      return Response.json(
        { success: false, error: 'Database not available' },
        { status: 500 }
      );
    }

    // Find all Vimeo videos without images
    console.log('[update-vimeo-thumbnails] Querying Vimeo videos...');
    const videos = await (db as Sql)`
      SELECT id, slug, title, video_url, image
      FROM portfolio
      WHERE type = 'video'
        AND video_url IS NOT NULL
        AND video_url LIKE '%vimeo.com%'
        AND (image IS NULL OR image = '')
    `;
    
    console.log('[update-vimeo-thumbnails] Found videos:', videos?.length);

    if (!videos || videos.length === 0) {
      return Response.json({
        success: true,
        message: 'No Vimeo videos without thumbnails found',
        updated: 0,
        videos: [],
      });
    }

    const updatedVideos = [];

    // Update each video with its thumbnail
    for (const video of videos) {
      let videoId: string | undefined;

      // Extract Vimeo video ID
      if (video.video_url.includes('vimeo.com/')) {
        const match = video.video_url.match(/vimeo\.com\/(\d+)/);
        videoId = match ? match[1] : undefined;
      } else if (video.video_url.includes('player.vimeo.com')) {
        const match = video.video_url.match(/video\/(\d+)/);
        videoId = match ? match[1] : undefined;
      }

      if (videoId) {
        const thumbnailUrl = `https://i.vimeocdn.com/video/${videoId}.jpg`;

        await (db as Sql)`
          UPDATE portfolio
          SET image = ${thumbnailUrl}
          WHERE id = ${video.id}
        `;

        updatedVideos.push({
          id: video.id,
          slug: video.slug,
          title: video.title,
          videoUrl: video.video_url,
          thumbnailUrl,
        });
      }
    }

    return Response.json({
      success: true,
      message: `Updated ${updatedVideos.length} Vimeo video${updatedVideos.length !== 1 ? 's' : ''} with thumbnails`,
      updated: updatedVideos.length,
      videos: updatedVideos,
    });
  } catch (error) {
    console.error('[update-vimeo-thumbnails] Error:', error);
    return Response.json(
      { success: false, error: 'Failed to update thumbnails', details: String(error) },
      { status: 500 }
    );
  }
}
