function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen overflow-y-auto bg-gray-50 px-4 pt-8 tablet:px-6 desktop:px-24">
      <div className="mx-auto max-w-screen-desktop">{children}</div>
    </div>
  );
}

export default DefaultLayout;
