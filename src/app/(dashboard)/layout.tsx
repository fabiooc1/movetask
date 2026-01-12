import { Header } from "@/components/header";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/authentication");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={session.user} />

      <main className="py-14 px-12">{children}</main>
    </div>
  );
}
