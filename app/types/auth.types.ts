import {z} from 'zod';

import {LoginSchema} from '../utils/schema';

// login types
export type LoginInputsType = z.infer<typeof LoginSchema>;
