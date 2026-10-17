'use client'
import {  Menu, X } from "lucide-react";
import { useState } from "react";
import SideBar from "./SideBar";

function HeaderAtMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div onClick={handleClick} className="p-4 cursor-pointer">
          {isOpen  && <SideBar />}
        <div className="md:hidden flex">
          {isOpen ? <X />:<Menu/>}
        </div>
    </div>
  )
}

export default HeaderAtMobile
