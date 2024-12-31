"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Bell, CircleUser } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Category, Country } from "@/lib/api/movie";

export type NavbarProps = {
  categories: Category[];
  countries: Country[];
};

const Navbar = (props: NavbarProps) => {
  const pathname = usePathname();
  const { categories, countries } = props;

  const navItems = [
    { label: "Trang chủ", path: "/" },
    { label: "Phim", path: "/movie" },
    { label: "Video ngắn", path: "/short-video" },
    { label: "Truyện", path: "/manga" },
  ];

  return (
    <nav className="flex justify-center py-7 relative  sm:absolute z-10 w-full">
      <div className="container flex flex-row items-center">
        <div className="flex flex-row flex-none sm:flex-1">
          <Link href="/" className="flex flex-row items-center">
            <Image alt="" src="/logo.svg" width={32} height={32} />
            <h1 className="text-xl font-bold ml-2">Watchify</h1>
          </Link>
          <Menubar className="sm:flex ml-4 hidden border-none">
            {navItems.map((item) => {
              return (
                <MenubarMenu key={item.label}>
                  <MenubarTrigger
                    onBlur={(e) => {
                      const target = e.currentTarget;
                      target.dataset.state = "close";
                    }}
                    className={`${
                      pathname === item.path
                        ? "text-foreground"
                        : "text-primary-text"
                    }`}
                  >
                    {item.label}
                    {item.path === "/movie" && (
                      <MenubarContent>
                        <Link href="/phim-moi">
                          <MenubarItem>Phim mới</MenubarItem>
                        </Link>
                        <MenubarSeparator />
                        <Link href="/phim-le">
                          <MenubarItem>Phim lẻ</MenubarItem>
                        </Link>
                        <MenubarSeparator />
                        <Link href="/phim-bo">
                          <MenubarItem>Phim bộ</MenubarItem>
                        </Link>
                        <MenubarSeparator />
                        <Link href="/phim-chieu-rap">
                          <MenubarItem>Phim chiếu rạp</MenubarItem>
                        </Link>
                        <MenubarSeparator />
                        <MenubarSub>
                          <MenubarSubTrigger>Thể loại</MenubarSubTrigger>
                          {categories?.length > 0 && (
                            <MenubarSubContent className="grid grid-cols-4">
                              {categories?.map((e) => {
                                return (
                                  <Link
                                    key={e.slug + e.name}
                                    href={`/${e.slug}`}
                                  >
                                    <MenubarItem>{e.name}</MenubarItem>
                                    <MenubarSeparator />
                                  </Link>
                                );
                              })}
                            </MenubarSubContent>
                          )}
                        </MenubarSub>
                        <MenubarSeparator />
                        <MenubarSub>
                          <MenubarSubTrigger>Quốc gia</MenubarSubTrigger>
                          {countries?.length > 0 && (
                            <MenubarSubContent className="grid grid-cols-4">
                              {countries?.map((e) => {
                                return (
                                  <Link
                                    key={e.slug + e.name}
                                    href={`/${e.slug}`}
                                  >
                                    <MenubarItem>{e.name}</MenubarItem>
                                    <MenubarSeparator />
                                  </Link>
                                );
                              })}
                            </MenubarSubContent>
                          )}
                        </MenubarSub>
                      </MenubarContent>
                    )}
                  </MenubarTrigger>
                </MenubarMenu>
              );
            })}
            {/* <MenubarContent>
                <MenubarItem>
                  New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>New Window</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Share</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Print</MenubarItem>
              </MenubarContent> */}
          </Menubar>
          {/* <ul className="sm:flex flex-row items-center ml-8 gap-7 hidden">
            {navItems.map((item) => (
              <li
                key={item.path}
                className={`text-base font-bold ${
                  pathname === item.path
                    ? "text-foreground"
                    : "text-primary-text"
                }`}
              >
                <Link href={item.path} className="hover:text-gray-400">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul> */}
        </div>
        <div className="flex flex-row flex-1  items-center gap-3 justify-end">
          <div className="flex flex-row  item-center  py-2 px-4 bg-primary-bg/25 rounded-xl  ml-4 sm:ml-0">
            <Search className="w-6 h-6 mr-2 text-muted-foreground" />
            <input
              className="focus:outline-none bg-transparent hover:bg-transparent text-foreground placeholder-muted-foreground text-xl sm:text-base  font-normal"
              placeholder="Nhập văn bản"
            />
          </div>
          <button>
            <Bell className="w-6 h-6 mr-2 text-muted-foreground" />
          </button>
          <button>
            <CircleUser className="w-6 h-6 mr-2 text-muted-foreground" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
