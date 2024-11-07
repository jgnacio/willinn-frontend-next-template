"use client";
import Image from "next/image";
import Link from "next/link";
import { HomeCustomIcon, UserCustomIcon } from "@/Icons/";

export default function Sidebar() {
  return (
    <div className="w-[227px] h-screen bg-white ">
      <div className="flex justify-center ml-9">
        <Image
          src="/Willinn Logo White.svg"
          alt="Willinn Logo white"
          width={180}
          height={37}
          priority
          className="mt-16"
        />
      </div>
      <div className="py-4 px-8 mt-4">
        <ul className="space-y-8">
          <li>
            <Link href="/">
              <div className="flex space-x-4">
                <HomeCustomIcon />
                <span className="text-gray-400">Inicio</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/">
              <div className="flex space-x-4">
                <UserCustomIcon />{" "}
                <span className="text-primary">Usuarios</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
