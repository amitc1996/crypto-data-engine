
"use client";

import { Bell, ChevronDown, DatabaseZap } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-6">

      {/* Left: Application identity */}
      <div className="flex items-center gap-3">
        <DatabaseZap className="text-violet-400" size={22} />

        <span className="text-base font-semibold text-white">
          Crypto Data Engine
        </span>
      </div>

      {/* Right: Notifications + Profile */}
      <div className="flex items-center gap-5">

        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            aria-label="Notifications"
            aria-expanded={notificationsOpen}
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setUserMenuOpen(false);
            }}
            className="relative rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <Bell size={20} />

            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 top-12 z-50 w-72 rounded-xl border border-slate-700 bg-slate-800 p-4 shadow-xl">
              <h3 className="font-semibold text-white">
                Notifications
              </h3>

              <p className="mt-3 text-sm text-slate-400">
                No new notifications
              </p>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            type="button"
            aria-label="User menu"
            aria-expanded={userMenuOpen}
            onClick={() => {
              setUserMenuOpen(!userMenuOpen);
              setNotificationsOpen(false);
            }}
            className="flex items-center gap-3 rounded-lg p-1 hover:bg-slate-800"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-600 text-sm font-semibold text-white">
              AD
            </div>

            <div className="hidden text-left md:block">
              <p className="text-sm font-medium text-white">
                Admin User
              </p>

              <p className="text-xs text-slate-400">
                Administrator
              </p>
            </div>

            <ChevronDown
              size={16}
              className="hidden text-slate-400 md:block"
            />
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 top-12 z-50 w-48 rounded-xl border border-slate-700 bg-slate-800 py-2 shadow-xl">
              <button
                type="button"
                className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700"
              >
                My Profile
              </button>

              <button
                type="button"
                className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700"
              >
                Settings
              </button>

              <div className="my-2 border-t border-slate-700" />

              <button
                type="button"
                className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-slate-700"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
