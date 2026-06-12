import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import type { SpotboardPhoto } from '../types';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const useSpotboardPhotos = () => {
  const [photos, setPhotos] = useState<SpotboardPhoto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('spotboard_photos')
        .select('*, photo:photos(image_url, caption)')
        .order('created_at', { ascending: false })
        .limit(50);

      if (fetchError) throw fetchError;

      const mapped = (data || []).map((item: Record<string, unknown>) => ({
        id: item.id as string,
        photo_id: item.photo_id as string,
        user_id: item.user_id as string,
        location: item.location as string | undefined,
        camera_make: item.camera_make as string | undefined,
        camera_model: item.camera_model as string | undefined,
        likes_count: item.likes_count as number,
        created_at: item.created_at as string,
        url: (item.photo as Record<string, unknown> | null)?.image_url as string | undefined,
        caption: (item.photo as Record<string, unknown> | null)?.caption as string | undefined,
      }));

      setPhotos(mapped);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch photos';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const uploadPhoto = async (userId: string, photoData: { url: string; caption?: string; location?: string; travelId?: string }) => {
    try {
      setError('');

      // First insert the photo record
      const { data: photoRow, error: photoError } = await supabase
        .from('photos')
        .insert([{
          travel_id: photoData.travelId || crypto.randomUUID(),
          user_id: userId,
          image_url: photoData.url,
          caption: photoData.caption,
        }])
        .select()
        .single();

      if (photoError) throw photoError;

      // Then insert the spotboard_photos record
      const { data, error: insertError } = await supabase
        .from('spotboard_photos')
        .insert([{
          photo_id: photoRow.id,
          user_id: userId,
          location: photoData.location,
          likes_count: 0,
        }])
        .select()
        .single();

      if (insertError) throw insertError;
      await fetchPhotos();
      return { success: true, data };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to upload photo';
      setError(message);
      return { success: false, error: message };
    }
  };

  const deletePhoto = async (photoId: string) => {
    try {
      const { error: deleteError } = await supabase.from('spotboard_photos').delete().eq('id', photoId);
      if (deleteError) throw deleteError;
      await fetchPhotos();
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete photo';
      setError(message);
      return { success: false, error: message };
    }
  };

  return { photos, fetchPhotos, uploadPhoto, deletePhoto, loading, error };
};
