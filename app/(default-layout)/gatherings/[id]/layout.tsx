import BottomBar from '../../../components/gatherings/bottomBar';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
      <BottomBar isOwner={false} />
    </div>
  );
}
