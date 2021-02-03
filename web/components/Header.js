import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleToggleProfile = (e) => {
    setIsOpen(!isOpen);
  };

  const handleToggleMenuItem = (e) => {
    setIsActive(!isActive);
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="max-w-8xl mx-auto px-2 py-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* <!-- Mobile menu button--> */}
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* <!-- Icon when menu is closed. -->
          <!--
            Heroicon name: menu

            Menu open: "hidden", Menu closed: "block"
          --> */}
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* <!-- Icon when menu is open. -->
          <!--
            Heroicon name: x

            Menu open: "block", Menu closed: "hidden"
          --> */}
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-between">
            {/* logo */}
            <div className="flex-shrink-0 flex items-center">
              <div className="block lg:hidden ">
                <Link href="/">
                  <a>
                    <Image
                      src="/logo-light.png"
                      alt="Codame logo"
                      width="60"
                      height="60"
                    />
                  </a>
                </Link>
              </div>
              <div className="hidden lg:block">
                <Link href="/">
                  <a>
                    <Image
                      className="hidden"
                      src="/logo-light.png"
                      alt="Codame logo"
                      width="60"
                      height="60"
                    />
                  </a>
                </Link>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4 items-center">
              <Link href="/">
                <a
                  className="text-gray-200 hover:bg-gray-700 hover:text-white
                  px-3 py-2 rounded-md font-medium"
                >
                  About
                </a>
              </Link>
              <Link href="/">
                <a
                  className="text-gray-200 hover:bg-gray-700 hover:text-white
                  px-3 py-2 rounded-md font-medium"
                >
                  Events
                </a>
              </Link>
              <Link href="/">
                <a
                  className="text-gray-200 hover:bg-gray-700 hover:text-white
                  px-3 py-2 rounded-md font-medium"
                >
                  Artists
                </a>
              </Link>
              <Link href="/">
                <a
                  className="text-gray-200 hover:bg-gray-700 hover:text-white
                  px-3 py-2 rounded-md font-medium"
                >
                  Projects
                </a>
              </Link>
              <Link href="/">
                <a
                  className="text-gray-200 hover:bg-gray-700 hover:text-white
                  px-3 py-2 rounded-md font-medium"
                >
                  Collections
                </a>
              </Link>
              <Link href="/">
                <a
                  className="text-gray-200 hover:bg-gray-700 hover:text-white
                  px-3 py-2 rounded-md font-medium"
                >
                  Editorial
                </a>
              </Link>
              <div className="absolute inset-y-0 left-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="ml-3 relative">
                  <button
                    id="dropdown-menu"
                    aria-haspopup="true"
                    onClick={handleToggleMenuItem}
                    className="text-gray-200 hover:bg-gray-700 hover:text-white
                  px-3 py-2 rounded-md font-medium"
                  >
                    More
                  </button>
                  <div
                    className={
                      isActive
                        ? "origin-top-right absolute right-0 mt-2 w-40 rounded shadow-lg py-1 bg-gray-800 ring-1 ring-black ring-opacity-5"
                        : "hidden"
                    }
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="dropdown-menu"
                  >
                    <a className="block px-4 py-2 text-sm hover:bg-gray-600">
                      Contact
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="ml-3 relative">
                <div>
                  <button
                    onClick={handleToggleProfile}
                    className="text-gray-200 hover:bg-gray-700 hover:text-whiterounded-sm flex px-3 py-2 rounded-md font-medium focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-secondary500"
                    id="user-menu"
                    aria-haspopup="true"
                  >
                    <span className="sr-only">Open user menu</span>
                    Log in
                  </button>
                </div>
                <div
                  className={
                    isOpen
                      ? "origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-800 ring-1 ring-black ring-opacity-5"
                      : "hidden"
                  }
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <a
                    href="/"
                    className="block px-4 py-2 text-sm hover:bg-gray-600"
                    role="menuitem"
                  >
                    Your Profile
                  </a>
                  <a
                    href="/"
                    className="block px-4 py-2 text-sm hover:bg-gray-600"
                    role="menuitem"
                  >
                    Settings
                  </a>
                  <a
                    href="/"
                    className="block px-4 py-2 text-sm  hover:bg-gray-600"
                    role="menuitem"
                  >
                    Sign out
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

{
  /* mobile menu */
}
<div className="hidden sm:hidden">
  <div className="px-2 pt-2 pb-3 space-y-1">
    <a
      href="#"
      className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
    >
      Dashboard
    </a>
    <a
      href="#"
      className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
    >
      Team
    </a>
    <a
      href="#"
      className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
    >
      Projects
    </a>
    <a
      href="#"
      className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
    >
      Calendar
    </a>
  </div>
</div>;
