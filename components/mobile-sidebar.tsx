import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import { Sidebar } from "@/components/sidebar";

export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/15 hover:bg-white/25 transition-colors duration-200 backdrop-blur-sm">
          <Menu className="text-white w-5 h-5" />
        </button>
      </SheetTrigger>
      <SheetContent
        className="p-0 z-[100] w-[256px] border-r-0 shadow-2xl"
        side="left"
      >
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};