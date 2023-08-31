import { SUPABASE_PROJECT_URL } from '$env/static/private';
import { SUPABASE_ANON_KEY } from '$env/static/private';

import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY)
