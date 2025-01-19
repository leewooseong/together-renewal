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

export const SignupSchema = z
  .object({
    name: z.string().trim().min(1, '이름을 입력해주세요.'),
    email: z.string().trim().min(1, '이메일을 입력해주세요').email({
      message: '유효한 이메일 주소를 입력하세요',
    }),
    companyName: z.string().trim().min(1, '회사명을 입력해주세요.'),
    password: z
      .string()
      .trim()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .regex(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
        '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.',
      ),
    passwordCheck: z.string().trim().min(1, '비밀번호 확인란을 입력해주세요.'),
  })
  .refine(data => data.password === data.passwordCheck, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordCheck'],
  });
