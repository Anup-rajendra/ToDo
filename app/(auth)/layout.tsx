import Image from "next/image";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <div className="flex min-h-screen w-1/2 bg-primary">
        <div className="mt-3 ml-3">
          <Image
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4ffbb1187b51362029c6d520249942c486e46b5825aee24906a38db8a2516e08?apiKey=add3d8add84f43c59b7ec705c3b68ad6&"
            alt="Logo"
            width={178}
            height={50}
          />
        </div>
      </div>
      <div className="min-h-screen flex items-center justify-center w-1/2 ">
        {children}
      </div>
    </div>
  );
}
