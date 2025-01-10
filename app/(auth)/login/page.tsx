/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/button-has-type */
// app/login/page.tsx

'use client';

import {useState} from 'react';

import {Eye, EyeOff} from 'lucide-react';
import {useRouter} from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <div className="flex w-full max-w-[340px] flex-col items-center justify-center rounded-3xl bg-white px-4 py-8 sm:max-w-[600px] sm:px-14 sm:py-8 xl:max-w-[510px]">
      <h1 className="mb-8 text-center text-2xl font-bold">로그인</h1>

      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6">
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
            defaultValue=""
            onChange={handleChange}
            className="w-full rounded-lg bg-gray-50 px-4 py-2 text-base font-medium placeholder-gray-400"
            placeholder="이메일을 입력해주세요"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-semibold">
            비밀번호
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              // value={formData.password}
              defaultValue=""
              onChange={handleChange}
              className="w-full rounded-lg bg-gray-50 px-4 py-2 text-base font-medium placeholder-gray-400"
              placeholder="비밀번호를 입력해주세요"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-900"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-gray-400 py-[10px] text-base font-semibold text-white transition duration-200 hover:bg-gray-600"
        >
          로그인
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-800">
        길이 달램이 처음이신가요?{' '}
        <button
          onClick={() => router.push('/signup')}
          className="box-border border-b border-transparent font-medium text-orange-600 transition duration-200 hover:border-b hover:border-orange-600"
        >
          회원가입
        </button>
      </p>
    </div>
  );
}
