"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { ChevronRight, ChevronDown, Command } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { APP_CONFIG } from "@/config/app-config";
import { rootUser } from "@/data/users";
import { sidebarItems, type NavGroup, type NavMainItem, type NavSubItem } from "@/navigation/sidebar/sidebar-items";
import { NavUser } from "./nav-user";

interface EnhancedSidebarProps extends React.ComponentProps<typeof Sidebar> {}

const IsComingSoon = () => (
  <span className="ml-auto rounded-md bg-gray-200 px-2 py-1 text-xs dark:text-gray-800">Soon</span>
);

const IsNew = () => <span className="ml-auto rounded-md bg-blue-500 px-2 py-1 text-xs text-white">New</span>;

interface MenuItemProps {
  item: NavMainItem;
  isActive: (url: string, subItems?: NavSubItem[]) => boolean;
  isSubmenuOpen: (subItems?: NavSubItem[]) => boolean;
  onToggleSubmenu: (itemTitle: string) => void;
  openSubmenus: Set<string>;
}

const MenuItem = ({ item, isActive, isSubmenuOpen, onToggleSubmenu, openSubmenus }: MenuItemProps) => {
  const hasSubItems = item.subItems && item.subItems.length > 0;
  const isOpen = openSubmenus.has(item.title);
  const isItemActive = isActive(item.url, item.subItems);

  const handleClick = () => {
    if (hasSubItems) {
      onToggleSubmenu(item.title);
    }
  };

  return (
    <SidebarMenuItem>
      {hasSubItems ? (
        <>
          <SidebarMenuButton
            onClick={handleClick}
            isActive={isItemActive}
            tooltip={item.title}
            className="cursor-pointer"
          >
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            {item.comingSoon && <IsComingSoon />}
            {item.isNew && <IsNew />}
            {isOpen ? (
              <ChevronDown className="ml-auto h-4 w-4 transition-transform" />
            ) : (
              <ChevronRight className="ml-auto h-4 w-4 transition-transform" />
            )}
          </SidebarMenuButton>

          {isOpen && (
            <SidebarMenuSub>
              {item.subItems?.map((subItem) => (
                <SidebarMenuSubItem key={subItem.title}>
                  <SidebarMenuSubButton
                    asChild
                    isActive={isActive(subItem.url)}
                    aria-disabled={subItem.comingSoon}
                    className="cursor-pointer"
                  >
                    <Link href={subItem.url} target={subItem.newTab ? "_blank" : undefined} className="cursor-pointer">
                      {subItem.icon && <subItem.icon />}
                      <span>{subItem.title}</span>
                      {subItem.comingSoon && <IsComingSoon />}
                      {subItem.isNew && <IsNew />}
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          )}
        </>
      ) : (
        <SidebarMenuButton
          asChild
          isActive={isItemActive}
          tooltip={item.title}
          aria-disabled={item.comingSoon}
          className="cursor-pointer"
        >
          <Link href={item.url} target={item.newTab ? "_blank" : undefined} className="cursor-pointer">
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            {item.comingSoon && <IsComingSoon />}
            {item.isNew && <IsNew />}
          </Link>
        </SidebarMenuButton>
      )}
    </SidebarMenuItem>
  );
};

interface NavGroupProps {
  group: NavGroup;
  isActive: (url: string, subItems?: NavSubItem[]) => boolean;
  isSubmenuOpen: (subItems?: NavSubItem[]) => boolean;
  onToggleSubmenu: (itemTitle: string) => void;
  openSubmenus: Set<string>;
}

const NavGroupComponent = ({ group, isActive, isSubmenuOpen, onToggleSubmenu, openSubmenus }: NavGroupProps) => {
  return (
    <SidebarGroup key={group.id}>
      {group.label && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu>
          {group.items.map((item) => (
            <MenuItem
              key={item.title}
              item={item}
              isActive={isActive}
              isSubmenuOpen={isSubmenuOpen}
              onToggleSubmenu={onToggleSubmenu}
              openSubmenus={openSubmenus}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export function EnhancedSidebar({ ...props }: EnhancedSidebarProps) {
  const pathname = usePathname();
  const { state } = useSidebar();
  const [openSubmenus, setOpenSubmenus] = useState<Set<string>>(new Set());

  const isItemActive = (url: string, subItems?: NavSubItem[]) => {
    if (subItems?.length) {
      return subItems.some((sub) => pathname.startsWith(sub.url));
    }
    return pathname === url;
  };

  const isSubmenuOpen = (subItems?: NavSubItem[]) => {
    return subItems?.some((sub) => pathname.startsWith(sub.url)) ?? false;
  };

  const handleToggleSubmenu = (itemTitle: string) => {
    setOpenSubmenus((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemTitle)) {
        newSet.delete(itemTitle);
      } else {
        newSet.add(itemTitle);
      }
      return newSet;
    });
  };

  // Initialize open submenus based on current path
  React.useEffect(() => {
    const initialOpenSubmenus = new Set<string>();

    sidebarItems.forEach((group) => {
      group.items.forEach((item) => {
        if (item.subItems && isSubmenuOpen(item.subItems)) {
          initialOpenSubmenus.add(item.title);
        }
      });
    });

    setOpenSubmenus(initialOpenSubmenus);
  }, [pathname]);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="cursor-pointer data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="#" className="cursor-pointer">
                <Command />
                <span className="text-base font-semibold">{APP_CONFIG.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {sidebarItems.map((group) => (
          <NavGroupComponent
            key={group.id}
            group={group}
            isActive={isItemActive}
            isSubmenuOpen={isSubmenuOpen}
            onToggleSubmenu={handleToggleSubmenu}
            openSubmenus={openSubmenus}
          />
        ))}
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={rootUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
