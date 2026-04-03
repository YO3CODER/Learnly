import { MobileSidebar } from "./mobile-sidebar";

export const MobileHeader = () => {
  return (
    <nav className="lg:hidden px-5 h-[56px] flex items-center fixed top-0 w-full z-50
      bg-gradient-to-r from-indigo-500 to-violet-500
      shadow-lg shadow-indigo-200/50
      border-b border-white/10"
    >
      <MobileSidebar />

      <span className="ml-3 text-white font-extrabold text-lg tracking-tight">
        Learnly
      </span>
    </nav>
  );
};