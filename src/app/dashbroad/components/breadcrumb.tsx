"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { data } from "./app-sidebar"; // Import menu data

export function BreadcrumbApp() {
  const pathname = usePathname();
  const pathSegments = pathname?.split("/").filter(Boolean) || [];

  const findBreadcrumbTitle = (url: string): string | undefined => {
    for (const group of data.navMain) {
      for (const item of group.items) {
        if (item.url === url) {
          return item.title;
        }
      }
    }
    return undefined;
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const title = findBreadcrumbTitle(href);
          const isLast = index === pathSegments.length - 1;

          return (
            <React.Fragment key={href}>
              <BreadcrumbItem>
                {isLast ? (
                  <span className="text-gray-500">{title || segment}</span>
                ) : (
                  <BreadcrumbLink href={href}>
                    {title || segment}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
