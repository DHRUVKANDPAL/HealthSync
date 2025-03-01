"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Building2,
  Calendar,
  Command,
  FileText,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings,
  Settings2,
  SquareTerminal,
  User,
  Monitor,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function DoctorSidebar({ ...props }: any) {
  const { id } = props;
  const { handleLogout } = props;
  const { userData } = props;
  const data = {
    user: {
      name: userData?.name || "Mashoor Gulati",
      email: userData?.email || "mashooor@gulati.com",
      avatar: userData?.imgUrl || "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Profile",
        url: `/doctor-dash/${id}/profile`,
        icon: User,
        isActive: true,
      },
      {
        title: "Dashboard",
        url: `/doctor-dash/${id}`,
        icon: Monitor,
        isActive: true,
      },
      {
        title: "Documents",
        url: `/doctor-dash/${id}/documents`,
        icon: FileText,
      },
      {
        title: "Appointments",
        url: `/doctor-dash/${id}/appointments`,
        icon: Calendar,
      },
      {
        title: "Settings",
        url: `/doctor-dash/${id}/settings`,
        icon: Settings,
        items: [
          {
            title: "General",
            url: "#",
          },
          {
            title: "Team",
            url: "#",
          },
          {
            title: "Billing",
            url: "#",
          },
          {
            title: "Limits",
            url: "#",
          },
        ],
      },
    ],
    navSecondary: [
      {
        title: "Support",
        url: "#",
        icon: LifeBuoy,
      },
      {
        title: "Feedback",
        url: "#",
        icon: Send,
      },
    ],
  };
  return (
    <Sidebar
      variant="inset"
      {...props}
      collapsible="icon"
      className="dark:bg-slate-950"
    >
      <SidebarHeader className="dark:bg-slate-950">
        <SidebarMenu className="dark:bg-slate-950">
          <SidebarMenuItem className="dark:bg-slate-950">
            <SidebarMenuButton
              size="lg"
              asChild
              className="dark:hover:bg-slate-800"
            >
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-slate-700 text-teal-50">
                  <Building2 className="size-6" />
                </div>
                <div className="grid flex-1 text-left text-2xl leading-tight">
                  <span className="truncate font-semibold text-teal-500">
                    Health
                    <span className="text-teal-700 font-extrabold">Sync</span>
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="dark:bg-slate-950">
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="dark:bg-slate-950">
        <NavUser user={data.user} handlelogout={handleLogout} />
      </SidebarFooter>
    </Sidebar>
  );
}
