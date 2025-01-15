function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="tablet:px-6 h-full bg-gray-50 px-4 pt-8 desktop:px-24">{children}</div>;
}

export default DefaultLayout;
