import Link from "next/link";


export default function Header() {
  return (
    <header className="bg-[#121212] text-white p-2 flex items-center">
      <span className="flex-1 text-center">Simulador de disco</span>
      <Link href={"/"} className="flex-2 absolute ml-4 text-stone-300 hover:border-b-2 hover:border-white duration-200">Home</Link>
      <Link href={"/sobre"} className="flex-4 absolute ml-[6rem] text-stone-300 hover:border-b-2 hover:border-white duration-200">Sobre o projeto</Link>
    </header>
  );
}
