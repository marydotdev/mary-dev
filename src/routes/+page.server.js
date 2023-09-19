import { supabase } from '$lib/supabaseClient';

export async function load() {
  const { data } = await supabase.from("thoughts").select().order('id', { ascending: false }).limit(5);
  return {
    thoughts: data ?? [],
  };
}
