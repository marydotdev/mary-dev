import { SUPABASE_PROJECT_URL } from '$env/static/private';
import { SUPABASE_ANON_KEY } from '$env/static/private';

import { createClient } from '@supabase/supabase-js'

// export const supabase = createClient(process.env.SUPABASE_PROJECT_URL, process.env.SUPABASE_ANON_KEY)
export const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY)
