import * as React from "react";
import Image from "next/image";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";

export function AppBar() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex flex-row flex-none sm:flex-1">
          <Link href="/dashbroad" className="flex flex-row items-center">
            <Image alt="" src="/logo.svg" width={32} height={32} />
            <h1 className="text-xl font-bold ml-2">Watchify</h1>
          </Link>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
