"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppSidebar } from "./app-sidebar";
import { EnhancedSidebar } from "./enhanced-sidebar";
import { AdvancedSidebar } from "./advanced-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export function SidebarDemo() {
  const [activeTab, setActiveTab] = useState("advanced");

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="flex">
        {/* Sidebar */}
        <SidebarProvider>
          {activeTab === "original" && <AppSidebar />}
          {activeTab === "enhanced" && <EnhancedSidebar />}
          {activeTab === "advanced" && <AdvancedSidebar onSearch={handleSearch} />}
        </SidebarProvider>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8">
              <h1 className="mb-2 text-3xl font-bold">Sidebar Component Demo</h1>
              <p className="text-muted-foreground">
                Explore different variations of the sidebar component with menu and submenu functionality.
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="original" className="cursor-pointer">
                  Original
                </TabsTrigger>
                <TabsTrigger value="enhanced" className="cursor-pointer">
                  Enhanced
                </TabsTrigger>
                <TabsTrigger value="advanced" className="cursor-pointer">
                  Advanced
                </TabsTrigger>
              </TabsList>

              <TabsContent value="original" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Original Sidebar</CardTitle>
                    <CardDescription>The original sidebar implementation with basic menu structure.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p>• Basic menu items</p>
                      <p>• Simple navigation</p>
                      <p>• Collapsible functionality</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="enhanced" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Enhanced Sidebar</CardTitle>
                    <CardDescription>Enhanced version with improved menu and submenu functionality.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p>• Organized menu groups</p>
                      <p>• Expandable submenus</p>
                      <p>• Better visual hierarchy</p>
                      <p>• Active state management</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Advanced Sidebar</CardTitle>
                    <CardDescription>Advanced sidebar with search, quick actions, and enhanced UX.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p>• Built-in search functionality</p>
                      <p>• Quick action buttons</p>
                      <p>• User profile section</p>
                      <p>• Notification badges</p>
                      <p>• Smooth animations</p>
                      <p>• Responsive design</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Collapsible menu items</li>
                    <li>• Multi-level navigation</li>
                    <li>• Active state indicators</li>
                    <li>• Responsive design</li>
                    <li>• Keyboard navigation</li>
                    <li>• Accessibility support</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Customization</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Custom icons</li>
                    <li>• Theme support</li>
                    <li>• Flexible layouts</li>
                    <li>• Badge indicators</li>
                    <li>• Coming soon labels</li>
                    <li>• New item markers</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Optimized rendering</li>
                    <li>• State management</li>
                    <li>• Memory efficient</li>
                    <li>• Fast navigation</li>
                    <li>• Smooth animations</li>
                    <li>• Mobile optimized</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
