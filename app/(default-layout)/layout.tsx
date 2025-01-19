function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="h-full bg-gray-50 px-4 pt-8 tablet:px-6 desktop:px-24">{children}</div>;
}

export default DefaultLayout;
