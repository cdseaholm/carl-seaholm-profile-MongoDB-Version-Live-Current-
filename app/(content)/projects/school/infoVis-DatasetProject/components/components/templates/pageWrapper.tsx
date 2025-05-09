"use client";

import { useEffect, useState } from "react";
import LoadingSpinner from "../misc/loadingSpinner";

export default function PageWrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="flex h-screen flex-col items-center justify-center w-screen overflow-hidden bg-linear-to-b from-slate-900/90 to-slate-400/30"><LoadingSpinner /></div>;
  }

  return <div className="flex h-screen flex-col items-center justify-start w-screen overflow-hidden bg-linear-to-b from-slate-900/90 to-slate-400/30">{children}</div>;
}
