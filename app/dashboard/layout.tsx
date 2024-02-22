import SideBar from "@/components/Sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row">
      <div className="flex w-1/4 flex-col gap-2 bg-primary-foreground min-h-screen">
        <SideBar />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
