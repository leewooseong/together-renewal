function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center bg-gray-100 desktop:flex-row desktop:gap-24">
      <section className="flex size-full flex-1 justify-end bg-gray-500">
        {/* 로그인 그림 들어가는 부분 */}
      </section>
      <section className="flex w-full flex-1 justify-center desktop:justify-start">
        {children}
      </section>
    </main>
  );
}

export default AuthLayout;
