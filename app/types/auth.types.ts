import {z} from 'zod';

import {LoginSchema} from '../utils/validation';

// login types
export type LoginInputsType = z.infer<typeof LoginSchema>;
