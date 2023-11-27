"use client"
import { List } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useState } from "react";


export default function Header() {
  const [ControlMenu,setControlMenu]:any = useState("hidden")
  
  const openMenu = () => {
    setControlMenu("")
  }

  return (
    <header className="bg-[#121212] text-white p-2 flex items-center">
      
      <span className="flex-1 text-center">Simulador de disco</span>

      <Link href={"/"} className="flex-2 max-md:hidden absolute ml-4 max text-stone-300 hover:border-b-2 hover:border-white duration-200">Home</Link>
      <Link href={"/sobre"} className="flex-4 absolute max-md:hidden ml-[6rem] text-stone-300 hover:border-b-2 hover:border-white duration-200">Sobre o projeto</Link>
      <Link href={"/sobre"} className="flex-4 absolute md:hidden ml-[1rem] text-stone-300 hover:border-b-2 hover:border-white duration-200">Sobre</Link>
    </header>
  );
}
