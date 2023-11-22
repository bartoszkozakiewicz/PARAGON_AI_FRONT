"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/authContext";

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();
  const { push } = useRouter();
  const pathname = usePathname();
  // console.log("jestem", isAuthenticated);
  useEffect(() => {
    if (isAuthenticated && (pathname === "/login" || pathname === "/register")) {
      push("/");
    }
    if (!isAuthenticated && pathname !== "/login" && pathname !== "/register") {
      push("/login");
    }
  }, [isAuthenticated, pathname]);

  return <div>{children}</div>;
}
