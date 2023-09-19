import { supabase } from '$lib/supabaseClient';

export async function load() {
  const { data } = await supabase.from("thoughts").select().order('id', { ascending: false });
  return {
    thoughts: data ?? [],
  };
}
