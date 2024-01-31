import { authOptions } from "@/lib/auth";
import { FC, ReactNode } from "react";
import { getServerSession } from "next-auth/next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Icon, Icons } from "@/components/Icons";
import { UserPlus } from "lucide-react";

interface layoutProps {
  children: ReactNode;
}

interface SidebarOption {
  id: number;
  name: string;
  href: string;
  Icon: Icon;
}

const sidebarOptions: SidebarOption[] = [
  {
    id: 1,
    name: "Add Friend",
    href: "/dashboard/add",
    Icon: "UserPlus",
  },
];

const layout = async ({ children }: layoutProps) => {
  const session = getServerSession(authOptions);
  if (!session) notFound();
  return (
    <div className="w-full flex h-screen">
      <div className="hidden md:flex h-full w-full max-w-xs grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6'">
        <Link href="/dashboard" className="flex h-16 shrink-0 items-center">
          <Icons.Logo className="h-8 w-auto text-indigo-600" />
        </Link>
        <div className="text-xs font-semibold leading-6 text-gray-400">
          Your chats
        </div>

        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>Chats this user has</li>
            <li>
              <div className="text-xs font-semibold leading-6 text-gray-400">
                Overview
              </div>
              <ul role="list" className="-mx-2 mt-2 space-y-1">
                {sidebarOptions.map((option) => {
                  const Icon = Icons[option.Icon];
                  return(
                    
                  )
                })}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
      {children}
    </div>
  );
};

export default layout;
