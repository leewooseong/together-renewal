// app/login/page.tsx
'use client';

import {login} from '@/app/apis/user/userApi';
import clsx from 'clsx';
import {Eye, EyeOff} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {useState} from 'react';

export default function LoginPage() {
  // state & store definition
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  // hooks definition
  const router = useRouter();

  // event handlers
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginRes = await login(formData.email, formData.password);
    if (loginRes === undefined) {
      alert('로그인 과정에 문제가 발생했습니다.');
      return;
    }

    if ('token' in loginRes) {
      alert('로그인 성공');
      setErrorMessage({email: '', password: ''});

      // router.push('/');
    } else if (loginRes.code === 'USER_NOT_FOUND' || loginRes.code === 'VALIDATION_ERROR') {
      setErrorMessage(prev => ({
        email: loginRes.message,
        password: '',
      }));
    } else if (loginRes.code === 'INVALID_CREDENTIALS') {
      setErrorMessage(prev => ({
        email: '',
        password: loginRes.message,
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // render
  return (
    <div className="max-w-[340px] sm:max-w-[600px] xl:max-w-[510px] px-4 py-8 sm:px-14 sm:py-8 flex items-center justify-center flex-col bg-white rounded-3xl w-full">
      <h1 className="text-2xl font-bold text-center mb-8">로그인</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold">
            아이디
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            // value={''}
            defaultValue={''}
            onChange={handleChange}
            className={clsx(
              'w-full px-4 py-2  border border-transparent rounded-lg  bg-gray-50 text-base font-medium placeholder-gray-400',
              {'border border-red-600': errorMessage.email},
            )}
            placeholder="이메일을 입력해주세요"
          />
          {errorMessage.email && (
            <p className="text-sm font-semibold text-red-600">{errorMessage.email}</p>
          )}
        </div>

        <div className="space-y-2 ">
          <label htmlFor="password" className="text-sm font-semibold ">
            비밀번호
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              // value={formData.password}
              defaultValue={''}
              onChange={handleChange}
              className={clsx(
                'w-full px-4 py-2  rounded-lg border border-transparent bg-gray-50 text-base font-medium placeholder-gray-400',
                {'border border-red-600': errorMessage.password},
              )}
              placeholder="비밀번호를 입력해주세요"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-900 h-5 w-5"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errorMessage.password && (
            <p className="  text-sm font-semibold text-red-600">{errorMessage.password}</p>
          )}
        </div>

        <button
          type="submit"
          className={
            'w-full py-[10px] bg-gray-400 hover:bg-gray-600 text-white font-semibold rounded-lg transition duration-200 text-base'
          }
        >
          로그인
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-800">
        길이 달램이 처음이신가요?{' '}
        <button
          onClick={() => router.push('/signup')}
          className="text-orange-600 border-b border-transparent hover:border-orange-600 box-border  hover:border-b font-medium transition duration-200"
        >
          회원가입
        </button>
      </p>
    </div>
  );
}
