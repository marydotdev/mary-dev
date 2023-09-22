import { supabase } from '$lib/supabaseClient';

export async function load({ params }) {
  const { data, error } = await supabase
    .from("thoughts")
    .select("*")
    .eq('id', params.id)
    .single(); // Use .single() to get a single record

  if (error) {
    console.error("Error fetching thought:", error);
    return {
      thought: null,
    };
  }

  return {
    thought: data,
  };
}
