"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthWrapper({
  children,
  setIsAuthPage,
}: {
  children: React.ReactNode;
  setIsAuthPage: (isAuth: boolean) => void;
}) {
  //   const initialAuthState = useMemo(() => !!localStorage.getItem("token"), []);
  const pathname = usePathname() || "";
  const router = useRouter();
  const isAuthPage = pathname.startsWith("/auth");

  console.log(pathname);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    setIsAuthPage(isAuthPage); // Kirim status halaman auth ke layout

    if (!token && !isAuthPage) {
      router.push("/auth/login");
    }
  }, [pathname, router, isAuthPage, setIsAuthPage]);

  if (isAuthenticated === false) {
    return null;
  }

  if (isAuthenticated || isAuthPage) {
    return <>{children}</>;
  }

  return null;
}
