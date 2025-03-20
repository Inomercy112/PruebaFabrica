"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      router.replace("/DashBoard");
    } else {
      router.replace("/sobreNosotros");
    }
  }, [router]);

  return null;
}
