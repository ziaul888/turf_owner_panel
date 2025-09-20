import { ReactNode } from "react";

import { cookies } from "next/headers";

import { AppSidebar } from "@/app/(main)/dashboard/_components/sidebar/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { users } from "@/data/users";
import { cn } from "@/lib/utils";
import { getPreference } from "@/server/server-actions";
import {
  SIDEBAR_VARIANT_VALUES,
  SIDEBAR_COLLAPSIBLE_VALUES,
  CONTENT_LAYOUT_VALUES,
  type SidebarVariant,
  type SidebarCollapsible,
  type ContentLayout,
} from "@/types/preferences/layout";

import { AccountSwitcher } from "./_components/sidebar/account-switcher";
import { LayoutControls } from "./_components/sidebar/layout-controls";
import { SearchDialog } from "./_components/sidebar/search-dialog";
import { ThemeSwitcher } from "./_components/sidebar/theme-switcher";

export default async function Layout({ children }: Readonly<{ children: ReactNode }>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  const [sidebarVariant, sidebarCollapsible, contentLayout] = await Promise.all([
    getPreference<SidebarVariant>("sidebar_variant", SIDEBAR_VARIANT_VALUES, "inset"),
    getPreference<SidebarCollapsible>("sidebar_collapsible", SIDEBAR_COLLAPSIBLE_VALUES, "icon"),
    getPreference<ContentLayout>("content_layout", CONTENT_LAYOUT_VALUES, "centered"),
  ]);

  const layoutPreferences = {
    contentLayout,
    variant: sidebarVariant,
    collapsible: sidebarCollapsible,
  };

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar variant={sidebarVariant} collapsible={sidebarCollapsible} />
      <SidebarInset
        data-content-layout={contentLayout}
        className={cn(
          "data-[content-layout=centered]:!mx-auto data-[content-layout=centered]:max-w-screen-2xl",
          // Adds right margin for inset sidebar in centered layout up to 113rem.
          // On wider screens with collapsed sidebar, removes margin and sets margin auto for alignment.
          "max-[113rem]:peer-data-[variant=inset]:!mr-2 min-[101rem]:peer-data-[variant=inset]:peer-data-[state=collapsed]:!mr-auto",
        )}
      >
        <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-16">
          <div className="flex w-full items-center justify-between px-4 lg:px-6">
            <div className="flex items-center gap-1 lg:gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
              <SearchDialog />
            </div>
            <div className="flex items-center gap-2">
              <LayoutControls {...layoutPreferences} />
              <ThemeSwitcher />
              <AccountSwitcher users={users} />
            </div>
          </div>
        </header>
        <div className="h-full p-4 md:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
