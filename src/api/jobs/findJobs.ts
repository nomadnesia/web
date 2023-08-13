import type { PostgrestSingleResponse } from '@supabase/supabase-js';

import supabase from '@/lib/supabase';
import type { Job } from '@/types';

type Params = {
  name?: string;
  company?: string;
  category?: string;
  /**@default 0 */
  from?: number;
  /**@default 10 */
  to?: number;
};

const findJobs = async (params: Params): Promise<PostgrestSingleResponse<Job[]>> => {
  const res = await supabase
    .from('jobs')
    .select(
      `
   *,
   company:company_id (*),
   category:category_id (*)
  `,
    )
    .like('name', `%${params.name}%`)
    .like('company.name', `%${params.name}%`)
    .filter('category.name', 'eq', params.category)
    .range(params.from ?? 0, params.to ?? 10);

  return res;
};

export default findJobs;
