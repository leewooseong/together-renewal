function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full items-center bg-gray-100 h-screen">
      <section className="flex-1">{/* 로그인 그림 들어가는 부분 */}</section>
      <section className="flex-1">{children}</section>
    </div>
  );
}

export default AuthLayout;
