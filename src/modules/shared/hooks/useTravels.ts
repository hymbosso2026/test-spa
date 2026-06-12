import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import type { Travel } from '../types';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const useTravels = () => {
  const [travels, setTravels] = useState<Travel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTravels = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('travels')
        .select('*, user_profile:user_profiles(full_name)')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setTravels(data || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch travels';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const publishTravel = async (userId: string, title: string, description: string) => {
    try {
      setError('');
      const { error: publishError } = await supabase.from('travels').insert([
        { title, description, user_id: userId },
      ]);

      if (publishError) throw publishError;
      await fetchTravels();
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to publish travel';
      setError(message);
      return { success: false, error: message };
    }
  };

  const deleteTravel = async (travelId: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('travels')
        .delete()
        .eq('id', travelId);

      if (deleteError) throw deleteError;
      await fetchTravels();
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete travel';
      setError(message);
      return { success: false, error: message };
    }
  };

  return { travels, fetchTravels, publishTravel, deleteTravel, loading, error };
};
