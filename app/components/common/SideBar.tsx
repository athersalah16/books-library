"use client";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, LayoutGridCircles, Trash2 } from "lucide-react";
import type { NavigationType } from "@/app/types/NavigationType";
import { usePathname } from "next/navigation";
import { SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const navigation: NavigationType[] = [
  { href: "/", label: "Dashboard", icon: LayoutGridCircles },
  { href: "/books", label: "All books", icon: BookOpen },
  { href: "/trash", label: "Trash", icon: Trash2 },
];
function SideBar() {
  const { isSignedIn } = useUser();

  const pathname = usePathname();
  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex h-dvh w-full flex-col border-r  border-sidebar-border bg-sidebar text-sidebar-foreground sm:w-64">
      <div className="flex justify-between lg:py-1 py-10">
        <div className="flex flex-row gap-2 p-4">
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="size-10 shrink-0 rounded-lg object-cover"
            priority
          />
          <span className="py-2 text-lg font-semibold tracking-tight">
            Maktabty
          </span>
        </div>
        <div className="md:hidden flex px-3">
          {isSignedIn ? <UserButton showName /> : <SignUpButton mode='modal'>
            <Button className={'w-30  text-xl cursor-pointer h-12 mt-4'} variant={'default'} >Sign Up</Button>
          </SignUpButton>}
        </div>
      </div>

      <ul className="flex flex-col gap-1 px-4 py-5 justify-start ">
        {navigation.map(({ href, label, icon: Icon }, index) => (

          <Link
            key={index + 1}
            href={href}
            aria-label={label}
            className={`flex h-11 items-center justify-center gap-3 rounded-lg px-3 
                  ${pathname === href ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold text-xl" : " text-md  font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"}
                   sm:justify-start`}
          >
            <Icon aria-hidden="true" className="size-5 shrink-0" />
            <span>{label}</span>
          </Link>
        ))}

      </ul>
    </aside>
  );
}

export default SideBar;
