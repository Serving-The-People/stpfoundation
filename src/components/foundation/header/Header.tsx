"use client";

import Logo from "@/components/portal/logo/Logo";
import ChevronDown from "@/images/icons/chevronDown";
import ChevronUp from "@/images/icons/chevronUp";
import LinkIcon from "@/images/icons/linkIcon";
import { Disclosure, Menu } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import nav from "./Nav.json";

interface HeaderProps {
  showLogo?: boolean;
}

interface MenuItem {
  href: string;
  name: string;
  children?: MenuItem[];
}

function RecursiveLink({
  item,
  index,
  level = 0,
}: {
  item: MenuItem;
  index: number;
  level?: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isActive = pathname.startsWith(item.href);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Menu as="div" key={item.href} className="relative inline-block self-start">
      <Menu.Button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`${
          isActive
            ? "bg-[#e5e6e6] text-[#4a4d50]"
            : `hover:bg-[#e5e6e6] hover:text-[#4a4d50]  ${
                index > 0 ? "" : "foundationNavX:hover:bg-[#eff0f0]"
              }`
        } ${isOpen ? "bg-[#eff0f0]" : ""} ${
          level > 0 ? "w-[8.2rem]" : "w-[6.1rem]"
        } z-50 flex flex-row-reverse rounded-md px-4 uppercase tracking-wide text-[#4a4d50] foundationNavX:flex-row`}
      >
        {item.name}
        <span
          className={`mr-1 translate-x-[-0.15rem] foundationNavX:ml-1 foundationNavX:mr-0 foundationNavX:translate-x-0 ${
            isOpen ? "hidden" : "block"
          }`}
        >
          <ChevronDown />
        </span>
        <span
          className={`mt-[0.2rem] translate-x-[-0.5rem] foundationNavX:ml-1 foundationNavX:mr-0 foundationNavX:translate-x-0 ${
            isOpen ? "block" : "hidden"
          } ${
            level > 0
              ? "mt-[0rem] sm:mt-[0.2rem] sm:rotate-[270deg] foundationNavX:rotate-90"
              : "rotate-[270deg] foundationNavX:mt-0  foundationNavX:rotate-0"
          }`}
        >
          <ChevronUp />
        </span>
      </Menu.Button>
      {isOpen && (
        <div>
          <Menu.Items
            static
            className={`flex-end absolute top-0 z-40 flex w-max translate-y-[-0.45rem] flex-col items-end rounded-md bg-[#eff0f0] p-2 text-[#4a4d50]  foundationNavX:left-0 foundationNavX:right-0 foundationNavX:items-start ${
              level > 0
                ? "right-[-0.46rem] translate-y-[85px] sm:right-[9.15rem] sm:translate-y-[-0.45em] foundationNavX:left-[9.2rem]"
                : "right-[7rem] foundationNavX:mt-12"
            }`}
          >
            {item.children?.map((child, childIndex) => (
              <Menu.Item key={child.href} as="div">
                {child.children && child.children.length ? (
                  <RecursiveLink
                    item={child}
                    index={childIndex}
                    level={level + 1}
                  />
                ) : (
                  <Link
                    href={child.href}
                    className={`flex flex-row rounded-md px-4 py-[.4rem] text-sm ${
                      isActive
                        ? "bg-slate-100 text-[#4a4d50]"
                        : "hover:bg-[#e5e6e6]"
                    }`}
                    target={child.href.startsWith("https://") ? "_blank" : ""}
                  >
                    {child.name}
                    {child.href.startsWith("https://") ? (
                      <LinkIcon fill="#475569" />
                    ) : (
                      ""
                    )}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </div>
      )}
    </Menu>
  );
}

function singleLink(item: MenuItem) {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <Link
      key={item.href}
      href={item.href}
      className={`w-auto self-end rounded-md px-4 text-[#4a4d50] ${
        isActive
          ? "bg-[#e5e6e6] text-[#4a4d50] foundationNavX:bg-[#eff0f0]"
          : "hover:bg-[#e5e6e6] hover:text-[#4a4d50] foundationNavX:hover:bg-[#eff0f0]"
      }`}
    >
      {item.name}
    </Link>
  );
}

function Header({ showLogo }: HeaderProps) {
  const user = useUser();
  const pathname = usePathname();

  if (pathname === "/login") {
    showLogo = true;
  }

  return (
    <>
      {user.isSignedIn && (
        <div className="absolute left-4 top-4 z-50 foundationNavX:left-auto foundationNavX:right-4 foundationNavX:top-2">
          <UserButton afterSignOutUrl="/login" />
        </div>
      )}
      <div className="mt-2 hidden content-center justify-between font-sans text-sm/8 uppercase tracking-wide foundationNavX:flex">
        <div className="flex flex-row space-x-5">
          {nav.items.map((item, index) => {
            return item.children && item.children.length
              ? RecursiveLink({ item, index })
              : singleLink(item);
          })}
          {!user.isSignedIn && singleLink({ href: "/login", name: "Login" })}
        </div>
      </div>
      <Disclosure
        as="nav"
        style={{
          width: "100%",
          padding: "4px",
        }}
        className={`foundationNavX:hidden ${
          pathname.startsWith("/chan") ? "absolute right-4" : "sticky"
        } top-[25px] z-50`}
      >
        {({ open }) => (
          <>
            <div className="relative flex items-center justify-between foundationNavX:hidden">
              <div className="absolute inset-y-0 -right-3 flex items-center">
                <Disclosure.Button
                  className={`${
                    open ? "bg-[#eff0f0]" : "bg-[#f4f4fecb]"
                  } z-50 inline-flex h-auto rounded-md p-2 text-[#4a4d50] hover:bg-[#eff0f0] hover:text-[#4a4d50] focus:outline-none`}
                >
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
            <Disclosure.Panel className="absolute -right-2 z-50 mt-8 rounded-md bg-[#eff0f0] px-2 py-2 font-sans text-sm/8 uppercase tracking-wide foundationNavX:hidden">
              <div className="flex flex-col space-y-4 text-left">
                {nav.items.map((item, index) => {
                  return item.children && item.children.length
                    ? RecursiveLink({ item, index })
                    : singleLink(item);
                })}
                {!user.isSignedIn &&
                  singleLink({ href: "/login", name: "Login" })}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      {showLogo && (
        <>
          <div className="absolute top-0 z-0 mt-4 flex  place-content-center self-center foundationNavX:static foundationNavX:mb-0 foundationNavX:translate-x-0">
            <Link href="/" className="z-50">
              <Logo width={70} className="shadow-xl shadow-black/10" />
            </Link>
          </div>
          <div className="mb-20 foundationNavX:hidden" />
        </>
      )}
    </>
  );
}

export default Header;
