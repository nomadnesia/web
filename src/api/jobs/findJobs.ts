import type { PostgrestSingleResponse } from '@supabase/supabase-js';

import supabase from '@/lib/supabase';
import type { Job } from '@/types';

const findJobs = async (): Promise<PostgrestSingleResponse<Job[]>> => {
  const res = await supabase.from('jobs').select(`
   *,
   company:company_id (*),
   category:category_id (*)
  `);
  return res;
};

export default findJobs;
