// import { supabase } from '$lib/supabaseClient';

// export async function load() {
//   const { data } = await supabase.from("thoughts").select().neq('hidden', true).order('id', { ascending: false }).limit(6);

//   return {
//     thoughts: data ?? [],
//   };
// }
