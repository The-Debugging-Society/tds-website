import React from "react";
import { FloatingDock } from "./ui/floatingDock"; // Adjust the import path for your FloatingDock component
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandGithub,
} from "@tabler/icons-react"; 
export function FloatingDockDemo() {
  const links = [
    {
      title: "Facebook",
      icon: (
        <IconBrandFacebook className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.facebook.com", 
    },
    {
      title: "Instagram",
      icon: (
        <IconBrandInstagram className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.instagram.com", 
    },
    {
      title: "X (Twitter)",
      icon: (
        <IconBrandTwitter className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.twitter.com", 
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.github.com", 
    },
  ];

  return (
    <div className="w-auto m-auto mt-1">
        <FloatingDock
          items={links}
          desktopClassName="h-16 gap-4 rounded-full px-4 pb-3"
          mobileClassName="h-10 gap-4 rounded-full px-4 pb-3"
        />
    </div>
  );
}

