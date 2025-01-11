import {z} from 'zod';

import {LoginSchema} from '../utils/schema';

// login types
export type TLoginInputs = z.infer<typeof LoginSchema>;
