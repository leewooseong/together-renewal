'use client';

import {useState} from 'react';
import {useForm} from 'react-hook-form';

import {zodResolver} from '@hookform/resolvers/zod';
import clsx from 'clsx';
import {Eye, EyeOff} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {z} from 'zod';

import {login} from '@/app/apis/user/userApi';
import useClearAuth from '@/app/hooks/useAuth';
import {useDebounce} from '@/app/hooks/useForm';
import {TLoginInputs} from '@/app/types/auth.types';
import {LoginSchema} from '@/app/utils/schema';

export default function LoginPage() {
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
  const {debounceEmailValidate} = useDebounce();
  const router = useRouter();

  // Event handlers
  // Form Event
  // Todo: api 처리 로직에 에러 처리 적용하기
  const onSubmit = async (data: TLoginInputs) => {
    try {
      await login(data.email, data.password);
      setServerErrorMessage({email: '', password: ''});
      router.push('/');
    } catch (error) {
      useClearAuth();
      alert('로그인 과정에 문제가 발생했습니다.');
    }
  };

  // Change Event
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name} = e.target;
    if (name !== 'email' && name !== 'password') {
      return;
    }
    debounceEmailValidate(name, trigger);
  };

  // Render
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
