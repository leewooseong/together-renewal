// zod schema

import {z} from 'zod';

// - zod를 이용해 form의 validation schema 정의
export const LoginSchema = z.object({
  email: z.string().trim().min(1, '이메일을 입력해주세요').email({
    message: '유효한 이메일 주소를 입력하세요',
  }),
  password: z.string().trim().min(1, '비밀번호를 입력해주세요').min(8, {
    message: '비밀번호는 8자 이상이어야 합니다',
  }),
});
