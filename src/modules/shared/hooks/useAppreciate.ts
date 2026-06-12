import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const useAppreciate = () => {
  const toggleAppreciation = async (travelId: string, userId: string) => {
    try {
      const { data: existing } = await supabase
        .from('appreciations')
        .select('id')
        .eq('travel_id', travelId)
        .eq('user_id', userId)
        .maybeSingle();

      if (existing) {
        await supabase.from('appreciations').delete().eq('id', existing.id);
      } else {
        await supabase.from('appreciations').insert([
          { travel_id: travelId, user_id: userId, rating: 5 },
        ]);
      }
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false };
    }
  };

  return { toggleAppreciation };
};
