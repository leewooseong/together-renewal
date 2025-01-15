"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import {z} from 'zod';
import { SubmitHandler, useForm } from "react-hook-form";
import { SignupSchema } from "../../utils/schema";
import InputField from "../../components/InputField";
import React from "react";
import { signupUser } from "../../apis/user/signupApi";

type SignupInputs = z.infer<typeof SignupSchema>;

export default function SignupForm() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      alert("회원가입 성공");
      router.push("/login");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "회원가입 중 문제가 발생했습니다.";
      alert(message);
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInputs>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      companyName: "",
      password: "",
      passwordCheck: "",
    },
  });

  const onSubmit: SubmitHandler<SignupInputs> = (data) => {
    const { passwordCheck, ...signupData } = data;
    mutation.mutate(signupData);
  };

  return (
    <div className="max-w-[340px] sm:max-w-[600px] xl:max-w-[510px] px-4 py-8 sm:px-14 sm:py-8 flex items-center justify-center flex-col bg-white rounded-3xl w-full">
      <h1 className="text-2xl font-bold text-center mb-8">회원가입</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
        <InputField
          label="이름"
          name="name"
          placeholder="이름을 입력해주세요"
          control={control}
          errorMessage={errors.name?.message}
        />
        <InputField
          label="아이디"
          name="email"
          placeholder="이메일을 입력해주세요"
          control={control}
          errorMessage={errors.email?.message}
        />
        <InputField
          label="회사명"
          name="companyName"
          placeholder="회사명을 입력해주세요"
          control={control}
          errorMessage={errors.companyName?.message}
        />
        <InputField
          label="비밀번호"
          name="password"
          isPassword
          placeholder="비밀번호를 입력해주세요"
          control={control}
          errorMessage={errors.password?.message}
        />
        <InputField
          label="비밀번호 확인"
          name="passwordCheck"
          isPassword
          placeholder="비밀번호를 다시 한 번 입력해주세요"
          control={control}
          errorMessage={errors.passwordCheck?.message}
        />
        <button
          type="submit"
          className="w-full py-[10px] bg-gray-400 hover:bg-gray-600 text-white font-semibold rounded-lg transition duration-200 text-base"
        >
          확인
        </button>
      </form>
    </div>
  );
}
