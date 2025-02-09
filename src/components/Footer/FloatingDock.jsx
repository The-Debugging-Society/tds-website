import React from "react";
import { FloatingDock } from "../ui/floatingDock"; // Adjust the import path for your FloatingDock component
import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandWhatsapp,
} from "@tabler/icons-react"; 
export function FloatingDockDemo() {
  const links = [
    {
      title: "Instagram",
      icon: (
        <IconBrandInstagram className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.instagram.com/thedebuggingsocietynsut?utm_source=ig_web_button_share_sheet&igsh=ODdmZWVhMTFiMw==", 
    },
    {
      title: "LinkedIn",
      icon: (
        <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.linkedin.com/company/thedebuggingsocietynsut/mycompany/",
    },
    {
      title: "Freshers Group",
      icon: (
        <IconBrandWhatsapp className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://chat.whatsapp.com/GQThHbXdSpT68iHm2nT8Dx",
    },
  ];

  return (
    <div className="w-auto m-auto mt-1">
        <FloatingDock
          items={links}
          desktopClassName="gap-4"
          mobileClassName="h-10 gap-4 rounded-full px-4 pb-3"
        />
    </div>
  );
}

