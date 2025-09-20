"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { 
  ChevronRight, 
  ChevronDown, 
  Command, 
  Search,
  Settings,
  HelpCircle,
  Bell,
  User,
  LogOut
} from "lucide-react";

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
  SidebarInput,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { APP_CONFIG } from "@/config/app-config";
import { rootUser } from "@/data/users";
import { sidebarItems, type NavGroup, type NavMainItem, type NavSubItem } from "@/navigation/sidebar/sidebar-items";

interface AdvancedSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onSearch?: (query: string) => void;
}

const IsComingSoon = () => (
  <span className="ml-auto rounded-md bg-orange-100 text-orange-800 px-2 py-1 text-xs font-medium">
    Soon
  </span>
);

const IsNew = () => (
  <span className="ml-auto rounded-md bg-blue-100 text-blue-800 px-2 py-1 text-xs font-medium">
    New
  </span>
);

interface MenuItemProps {
  item: NavMainItem;
  isActive: (url: string, subItems?: NavSubItem[]) => boolean;
  onToggleSubmenu: (itemTitle: string) => void;
  openSubmenus: Set<string>;
  level?: number;
}

const MenuItem = ({ item, isActive, onToggleSubmenu, openSubmenus, level = 0 }: MenuItemProps) => {
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
            className="cursor-pointer group"
          >
            {item.icon && <item.icon className="group-hover:scale-110 transition-transform" />}
            <span className="font-medium">{item.title}</span>
            {item.comingSoon && <IsComingSoon />}
            {item.isNew && <IsNew />}
            {isOpen ? (
              <ChevronDown className="ml-auto h-4 w-4 transition-transform duration-200" />
            ) : (
              <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200" />
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
                    className="group cursor-pointer"
                  >
                    <Link href={subItem.url} target={subItem.newTab ? "_blank" : undefined} className="cursor-pointer">
                      {subItem.icon && <subItem.icon className="group-hover:scale-110 transition-transform" />}
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
          className="group cursor-pointer"
        >
          <Link href={item.url} target={item.newTab ? "_blank" : undefined} className="cursor-pointer">
            {item.icon && <item.icon className="group-hover:scale-110 transition-transform" />}
            <span className="font-medium">{item.title}</span>
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
  onToggleSubmenu: (itemTitle: string) => void;
  openSubmenus: Set<string>;
}

const NavGroupComponent = ({ group, isActive, onToggleSubmenu, openSubmenus }: NavGroupProps) => {
  return (
    <SidebarGroup key={group.id}>
      {group.label && (
        <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {group.label}
        </SidebarGroupLabel>
      )}
      <SidebarGroupContent>
        <SidebarMenu>
          {group.items.map((item) => (
            <MenuItem
              key={item.title}
              item={item}
              isActive={isActive}
              onToggleSubmenu={onToggleSubmenu}
              openSubmenus={openSubmenus}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

const QuickActions = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Quick Actions
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="cursor-pointer">
              <Link href="/dashboard/notifications" className="cursor-pointer">
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">3</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="cursor-pointer">
              <Link href="/dashboard/settings" className="cursor-pointer">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="cursor-pointer">
              <Link href="/dashboard/help" className="cursor-pointer">
                <HelpCircle className="h-4 w-4" />
                <span>Help & Support</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

const UserProfile = () => {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-3 p-2 rounded-md hover:bg-accent transition-colors cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{rootUser.name}</p>
                <p className="text-xs text-muted-foreground truncate">{rootUser.email}</p>
              </div>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="cursor-pointer">
              <Link href="/dashboard/profile" className="cursor-pointer">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="cursor-pointer">
              <Link href="/logout" className="cursor-pointer">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export function AdvancedSidebar({ onSearch, ...props }: AdvancedSidebarProps) {
  const pathname = usePathname();
  const { state } = useSidebar();
  const [openSubmenus, setOpenSubmenus] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  // Initialize open submenus based on current path
  useEffect(() => {
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
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5 cursor-pointer">
              <a href="#" className="flex items-center gap-2 cursor-pointer">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Command className="h-4 w-4 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-bold">{APP_CONFIG.name}</span>
                  <span className="text-xs text-muted-foreground">Admin Panel</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="px-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-8 text-sm"
            />
          </div>
        </form>
      </SidebarHeader>
      
      <SidebarContent className="space-y-2">
        {/* Quick Actions */}
        <QuickActions />
        
        <SidebarSeparator />
        
        {/* Main Navigation */}
        {sidebarItems.map((group) => (
          <NavGroupComponent
            key={group.id}
            group={group}
            isActive={isItemActive}
            onToggleSubmenu={handleToggleSubmenu}
            openSubmenus={openSubmenus}
          />
        ))}
      </SidebarContent>
      
      <SidebarFooter>
        <UserProfile />
      </SidebarFooter>
    </Sidebar>
  );
}
