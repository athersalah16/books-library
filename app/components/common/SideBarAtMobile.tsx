"use client";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import SideBar from "./SideBar";
import {  useUser } from "@clerk/nextjs";

function HeaderAtMobile() {
  const [isOpen, setIsOpen] = useState(false);
      const { isSignedIn } = useUser();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <button
        type="button"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}  
        onClick={handleClick}
        className="fixed right-4 top-4 z-60 flex cursor-pointer items-center justify-center rounded-md bg-background p-2 text-foreground md:hidden"
      >
        {isOpen ? <X /> : <Menu />}
      </button>
      {isOpen && (
        <div className="md:hidden">
          <SideBar />
        </div>
      )}
    </>
  );
}

export default HeaderAtMobile;
