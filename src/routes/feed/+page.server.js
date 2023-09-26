import { supabase } from '$lib/supabaseClient';

export async function load() {
  const { data } = await supabase.from("thoughts").select().neq('hidden', true).order('id', { ascending: false });
  return {
    thoughts: data ?? [],
  };
}
