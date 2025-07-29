'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
  XMarkIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { mainMenuItems } from '@/data/menuData';
import { useCart } from '@/contexts/CartContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="bg-white shadow-lg">
      {/* Top Bar */}
      <div className="bg-hideki-red-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex space-x-6">
              <span>📞 Hubungi Kami: +62 812-3456-7890</span>
              <span>📧 info@hideki.id</span>
            </div>
            <div className="flex space-x-4">
              <Link href="/track-order" className="hover:text-hideki-red-200">
                Lacak Pesanan
              </Link>
              <Link href="/help" className="hover:text-hideki-red-200">
                Bantuan
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-hideki-red-600 text-white px-4 py-2 rounded-lg font-bold text-xl">
                HIDEKI
              </div>
              <div className="text-hideki-black-800 text-sm">
                <div className="font-semibold">Premium Helmets</div>
                <div className="text-xs text-hideki-black-600">& Accessories</div>
              </div>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari helm, aksesoris, apparel..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hideki-red-500 focus:border-transparent"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <Link href="/account" className="p-2 text-hideki-black-700 hover:text-hideki-red-600">
              <UserIcon className="h-6 w-6" />
            </Link>
            <Link href="/cart" className="p-2 text-hideki-black-700 hover:text-hideki-red-600 relative">
              <ShoppingBagIcon className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-hideki-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="p-2 text-hideki-black-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-hideki-black-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden md:flex space-x-8 py-4">
            {mainMenuItems.map((item) => (
              <Popover key={item.name} className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button className="flex items-center space-x-1 text-white hover:text-hideki-red-400 focus:outline-none">
                      <span className="font-medium">{item.name}</span>
                      {item.hasSubmenu && (
                        <ChevronDownIcon
                          className={`h-4 w-4 transition-transform ${
                            open ? 'transform rotate-180' : ''
                          }`}
                        />
                      )}
                    </Popover.Button>

                    {item.hasSubmenu && (
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute z-10 left-0 mt-3 w-screen max-w-md bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="p-4">
                            {item.submenu?.map((category) => (
                              <div key={category.category} className="mb-4">
                                <h3 className="text-sm font-semibold text-hideki-black-800 mb-2">
                                  {category.category}
                                </h3>
                                <div className="grid grid-cols-2 gap-2">
                                  {category.items.map((subItem) => (
                                    <Link
                                      key={subItem.name}
                                      href={subItem.href}
                                      className="text-sm text-hideki-black-600 hover:text-hideki-red-600 py-1"
                                    >
                                      {subItem.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </Popover.Panel>
                      </Transition>
                    )}
                  </>
                )}
              </Popover>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <Transition show={mobileMenuOpen} as={Fragment}>
        <div className="fixed inset-0 z-50 md:hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold text-hideki-black-800">Menu</h2>
                <button
                  type="button"
                  className="p-2 text-hideki-black-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="p-4 space-y-4">
                {mainMenuItems.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className="block text-lg font-medium text-hideki-black-800 hover:text-hideki-red-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Transition>
    </header>
  );
}