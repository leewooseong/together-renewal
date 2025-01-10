function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-100 xl:flex-row xl:gap-24">
      <section className="flex h-full w-full flex-1 justify-end bg-gray-500">
        {/* 로그인 그림 들어가는 부분 */}
      </section>
      <section className="flex w-full flex-1 justify-center xl:justify-start">{children}</section>
    </div>
  );
}

export default AuthLayout;
