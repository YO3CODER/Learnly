import { Sidebar } from "@/components/sidebar";
import { MobileHeader } from "@/components/mobile-header";
import { MobileNavbar } from "@/components/mobile-navbar";
import { getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

type Props = {
  children: React.ReactNode;
};

const MainLayout = async ({ children }: Props) => {
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";

  const userProgress = await getUserProgress();

  if (!userProgress?.activeCourse && !pathname.includes("/courses")) {
    redirect("/courses");
  }

  return (
    <>
      {userProgress?.activeCourse && (
        <MobileHeader
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
      )}
      <Sidebar className="hidden lg:flex" />
      <main className="lg:pl-[256px] h-full pt-[56px] pb-[60px] lg:pt-0 lg:pb-0">
        <div className="max-w-[1056px] mx-auto pt-6 h-full">
          {children}
        </div>
      </main>
      <MobileNavbar />
    </>
  );
};

export default MainLayout;