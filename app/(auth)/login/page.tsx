/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/button-has-type */
// app/login/page.tsx

'use client';

import {useCallback, useLayoutEffect, useState} from 'react';
import {useForm} from 'react-hook-form';

import {zodResolver} from '@hookform/resolvers/zod';
import clsx from 'clsx';
import {useAtom} from 'jotai';
import _ from 'lodash';
import {Eye, EyeOff} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {z} from 'zod';

import {login, setCookie} from '@/app/apis/user/userApi';
import useClearAuth from '@/app/hooks/useAuth';
import {tokenWithStorageAtom} from '@/app/store/atoms/userAtoms';

// zod schema
// - zod를 이용해 form의 validation schema 정의
const LoginSchema = z.object({
  email: z.string().trim().min(1, '이메일을 입력해주세요').email({
    message: '유효한 이메일 주소를 입력하세요',
  }),
  password: z.string().trim().min(1, '비밀번호를 입력해주세요').min(8, {
    message: '비밀번호는 8자 이상이어야 합니다',
  }),
});

type TLoginInputs = z.infer<typeof LoginSchema>;

// Login Page Component
export default function LoginPage() {
  // with auth
  // - 페이지 들어올 때 관련 기능을 초기화
  const [, setToken] = useAtom(tokenWithStorageAtom);
  const {clearAuth} = useClearAuth();
  useLayoutEffect(() => {
    clearAuth(); // cookie check를 못하기 때문에 무조건 실행
  }, []);

  // with form
  // - form state 관리 + validation 시점을 정의 + zod schema를 통한 validation
  const {
    register,
    trigger,
    handleSubmit,
    formState: {errors},
  } = useForm<z.infer<typeof LoginSchema>>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(LoginSchema),
  });
  const [serverErrorMessage, setServerErrorMessage] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  // with navigation
  const router = useRouter();

  // Event handlers
  // Form Event
  // Todo: api 처리 로직에 에러 처리 적용하기
  const onSubmit = async (data: TLoginInputs) => {
    const loginRes = await login(data.email, data.password);
    if (loginRes === undefined) {
      alert('로그인 과정에 문제가 발생했습니다.');
      return;
    }

    // 로그인 성공
    // - 1. 토큰 셋팅
    // - 2. cookie 셋팅
    // - 3. 메세지 초기화
    // - 4. router push
    if ('token' in loginRes) {
      setToken(loginRes.token); // jotai + sessionStorage에 token 저장
      const cookieRes = await setCookie();
      if (cookieRes.status === 200) {
        setServerErrorMessage({email: '', password: ''});
        router.push('/');
      } else {
        clearAuth();
        alert('로그인 과정에 문제가 발생했습니다.');
      }
    }
    // 로그인 실패
    // - 서버에서 보내준 에러를 표시
    else if (loginRes.code === 'USER_NOT_FOUND' || loginRes.code === 'VALIDATION_ERROR') {
      setServerErrorMessage({
        email: loginRes.message,
        password: '',
      });
    } else if (loginRes.code === 'INVALID_CREDENTIALS') {
      setServerErrorMessage({
        email: '',
        password: loginRes.message,
      });
    }
  };

  // Change Event
  const debounceEmailValidate = useCallback(
    _.debounce(async (field: keyof TLoginInputs) => {
      await trigger(field);
    }, 1000),
    [],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name} = e.target;
    if (name !== 'email' && name !== 'password') {
      return;
    }
    debounceEmailValidate(name as keyof TLoginInputs);
  };

  // render
  return (
    <div className="max-w-[340px] sm:max-w-[600px] xl:max-w-[510px] px-4 py-8 sm:px-14 sm:py-8 flex items-center justify-center flex-col bg-white rounded-3xl w-full">
      <h1 className="text-2xl font-bold text-center mb-8">로그인</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold">
            아이디
          </label>
          <input
            id="email"
            {...register('email', {
              onChange: handleChange,
            })}
            placeholder="이메일을 입력해주세요"
            className={clsx(
              'w-full px-4 py-2  border border-transparent rounded-lg  bg-gray-50 text-base font-medium placeholder-gray-400',
              {'border border-red-600': serverErrorMessage.email || errors.email?.message},
            )}
          />
          {errors.email?.message ? (
            <p className="text-sm font-semibold text-red-600">{errors.email.message}</p>
          ) : (
            serverErrorMessage.email && (
              <p className="text-sm font-semibold text-red-600">{serverErrorMessage.email}</p>
            )
          )}
        </div>

        <div className="space-y-2 ">
          <label htmlFor="password" className="text-sm font-semibold ">
            비밀번호
          </label>
          <div className="relative">
            <input
              id="password"
              {...register('password', {
                onChange: handleChange,
              })}
              type={showPassword ? 'text' : 'password'}
              placeholder="비밀번호를 입력해주세요"
              className={clsx(
                'w-full px-4 py-2  rounded-lg border border-transparent bg-gray-50 text-base font-medium placeholder-gray-400',
                {
                  'border border-red-600': serverErrorMessage.password || errors.password?.message,
                },
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-900 h-5 w-5"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password?.message ? (
            <p className="  text-sm font-semibold text-red-600">{errors.password.message}</p>
          ) : (
            serverErrorMessage.password && (
              <p className="  text-sm font-semibold text-red-600">{serverErrorMessage.password}</p>
            )
          )}
        </div>

        <button
          type="submit"
          className="w-full py-[10px] bg-gray-400 hover:bg-gray-600 text-white font-semibold rounded-lg transition duration-200 text-base"
        >
          로그인
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-800">
        길이 달램이 처음이신가요?{' '}
        <button
          type="submit"
          onClick={() => router.push('/signup')}
          className="text-orange-600 border-b border-transparent hover:border-orange-600 box-border  hover:border-b font-medium transition duration-200"
        >
          회원가입
        </button>
      </p>
    </div>
  );
}
