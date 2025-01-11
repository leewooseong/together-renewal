function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex w-full items-center bg-gray-100 h-screen xl:flex-row flex-col justify-center  xl:gap-24">
      <section className="flex-1 w-full h-full bg-gray-500 flex justify-end">
        {/* 로그인 그림 들어가는 부분 */}
      </section>
      <section className="flex-1 w-full flex justify-center xl:justify-start">{children}</section>
    </main>
  );
}

export default AuthLayout;
