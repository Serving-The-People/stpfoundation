"use client";

import Logo from "@/tempname/portal/logo/Logo";
import nav from "@/tempname/portal/nav/Nav.json";
import ChevronDown from "@/images/icons/chevronDown";
import ChevronUp from "@/images/icons/chevronUp";
import LinkIcon from "@/images/icons/linkIcon";
import { Disclosure, Menu } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface MenuItem {
  href: string;
  name: string;
  children?: MenuItem[];
}

function multiLink(item: MenuItem, index: number) {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <Menu as="div" key={item.href} className="relative inline-block self-start">
      {({ open }) => (
        <>
          <Menu.Button
            className={`${
              isActive ? "bg-neutral-900" : "hover:bg-neutral-900"
            }  flex flex-row-reverse rounded-md px-4 uppercase tracking-wide text-white md:flex-row`}
          >
            {item.name}
            <span
              className={`mr-1 translate-x-[-0.15rem] md:ml-1 md:mr-0 md:translate-x-0 ${
                open ? "hidden" : "block"
              }`}
            >
              <ChevronDown />
            </span>
            <span
              className={`mr-1 mt-[0.2rem] translate-x-[-0.5rem] rotate-[270deg] md:ml-1 md:mr-0 md:mt-0 md:translate-x-0 md:rotate-0 ${
                open ? "block" : "hidden"
              }`}
            >
              <ChevronUp />
            </span>
          </Menu.Button>
          {open && (
            <Menu.Items
              static
              className={`absolute top-0 flex w-[100%] flex-col items-end md:right-0 ${
                index === 2 ? "right-[10.2rem]" : "right-[9.4rem]"
              } flex-end mt-[-.5rem] flex w-max flex-col rounded-md bg-neutral-950 p-2 text-white shadow-lg ring-1 ring-black ring-opacity-5 md:left-0 md:ml-[-.5rem] md:mt-8 md:items-start md:bg-[#000000e3]`}
            >
              {item.children?.map((child) => (
                <Menu.Item key={child.href} as="div">
                  <Link
                    href={child.href}
                    className={`flex flex-row rounded-md px-4 py-[.4rem] text-sm ${
                      isActive ? "hover:bg-neutral-900" : "hover:bg-neutral-900"
                    }`}
                    target={child.href.startsWith("https://") ? "_blank" : ""}
                  >
                    {child.name}
                    {child.href.startsWith("https://") ? <LinkIcon /> : ""}
                  </Link>
                </Menu.Item>
              ))}
            </Menu.Items>
          )}
        </>
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
      className={`w-[100%] self-end rounded-md px-4 text-white ${
        isActive ? "bg-neutral-900" : "hover:bg-neutral-900"
      }`}
    >
      {item.name}
    </Link>
  );
}

function Header() {
  return (
    <>
      <Disclosure
        as="nav"
        style={{
          position: "sticky",
          top: "25px",
          width: "100%",
          padding: "4px",
        }}
        className="z-50"
      >
        {({ open }) => (
          <>
            <div className="relative flex items-center justify-between md:hidden">
              <div className="absolute inset-y-0 right-1 flex items-center">
                <Disclosure.Button
                  color="black"
                  className={`z-50 inline-flex h-auto rounded-md   p-2 text-white  hover:bg-neutral-900 focus:outline-none ${
                    open ? "bg-neutral-900" : "bg-[#000000e3]"
                  }`}
                >
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
            <Disclosure.Panel className="absolute right-2 z-50 mt-8 rounded-md bg-neutral-950 p-2 font-sans text-sm/8 uppercase tracking-wide md:hidden">
              <div className="z-50 flex flex-col space-y-4">
                {nav.items.map((item, index) => {
                  return item.children && item.children.length
                    ? multiLink(item, index)
                    : singleLink(item);
                })}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <div className="mb-20 flex w-full justify-center md:mb-0 md:w-min md:flex-col">
        <div className="mb-4 hidden font-sans text-sm/8 uppercase tracking-wide md:flex">
          <div className="flex h-full flex-row space-x-5">
            {nav.items.map((item, index) => {
              return item.children && item.children.length
                ? multiLink(item, index)
                : singleLink(item);
            })}
          </div>
        </div>
        <div className="absolute top-0 mb-5 flex place-content-center self-center pt-4 md:static md:pt-0">
          <Link href="/" className="">
            <Logo width={70} className="shadow-xl shadow-white/10" />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Header;
