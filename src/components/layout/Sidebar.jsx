'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Headphones,
  Pen,
  BookOpen,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';

const practiceItems = [
  { href: '/listening', label: 'Listening', icon: Headphones },
  { href: '/writing', label: 'Writing', icon: Pen },
];

const moduleItems = [
  { href: '/module1', label: 'Modulo1', icon: BookOpen },
  { href: '/module2', label: 'Modulo2', icon: BookOpen },
];

const isPracticeRoute = (path) => path === '/listening' || path === '/writing';

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [practiceOpen, setPracticeOpen] = useState(isPracticeRoute(pathname));
  const [modulesOpen, setModulesOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);
  const isActive = (href) => pathname === href;

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden rounded-xl bg-zinc-900 p-2.5 border border-zinc-800 shadow-lg hover:bg-zinc-800 transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          flex flex-col bg-zinc-900/95 backdrop-blur-xl border-r border-zinc-800
          transition-all duration-300 ease-in-out
          ${collapsed ? 'w-[72px]' : 'w-64'}
          ${mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex items-center h-16 px-4 border-b border-zinc-800/50 shrink-0">
          {collapsed ? (
            <Link href="/" className="mx-auto text-xl font-bold text-indigo-400">
              EA
            </Link>
          ) : (
            <>
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-sm font-bold text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                  EA
                </div>
                <span className="text-base font-bold tracking-tight">English AI</span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="ml-auto lg:hidden p-1.5 rounded-lg hover:bg-zinc-800 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-zinc-800">
          {collapsed ? (
            <div className="flex flex-col items-center gap-1">
              {practiceItems.map((item) => (
                <IconNavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  active={isActive(item.href)}
                  onClick={closeMobile}
                />
              ))}
              <div className="w-6 h-px bg-zinc-800 my-1" />
              <IconNavLink
                href="/dashboard"
                label="Dashboard"
                icon={LayoutDashboard}
                active={isActive('/dashboard')}
                onClick={closeMobile}
              />
            </div>
          ) : (
            <>
              <div>
                <button
                  onClick={() => setPracticeOpen(!practiceOpen)}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  <ChevronDown
                    className={`
                      w-3.5 h-3.5 transition-transform duration-200
                      ${practiceOpen ? '' : '-rotate-90'}
                    `}
                  />
                  Practice
                </button>

                <div
                  className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${practiceOpen ? 'max-h-40 opacity-100 mt-0.5' : 'max-h-0 opacity-0'}
                  `}
                >
                  <div className="ml-1 space-y-0.5 border-l border-zinc-800 pl-3">
                    {practiceItems.map((item) => (
                      <TextNavLink
                        key={item.href}
                        href={item.href}
                        label={item.label}
                        icon={item.icon}
                        active={isActive(item.href)}
                        onClick={closeMobile}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div>
  <button
    onClick={() => setModulesOpen(!modulesOpen)}
    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-zinc-300 transition-colors"
  >
    <ChevronDown
      className={`w-3.5 h-3.5 transition-transform duration-200 ${
        modulesOpen ? '' : '-rotate-90'
      }`}
    />
    Modulos
  </button>

  <div
    className={`
      overflow-hidden transition-all duration-300 ease-in-out
      ${modulesOpen ? 'max-h-40 opacity-100 mt-0.5' : 'max-h-0 opacity-0'}
    `}
  >
    <div className="ml-1 space-y-0.5 border-l border-zinc-800 pl-3">
      {moduleItems.map((item) => (
        <TextNavLink
          key={item.href}
          href={item.href}
          label={item.label}
          icon={item.icon}
          active={isActive(item.href)}
          onClick={closeMobile}
        />
      ))}
    </div>
  </div>
</div>

              <TextNavLink
                href="/dashboard"
                label="Dashboard"
                icon={LayoutDashboard}
                active={isActive('/dashboard')}
                onClick={closeMobile}
              />
            </>
          )}
        </nav>

        <div className="border-t border-zinc-800/50 p-3 shrink-0">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center justify-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}

function TextNavLink({ href, label, icon: Icon, active, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
        transition-all duration-200
        ${active
          ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
          : 'text-zinc-400 hover:text-white hover:bg-zinc-800 border border-transparent'
        }
      `}
    >
      <Icon className="w-4 h-4 shrink-0" />
      <span>{label}</span>
    </Link>
  );
}

function IconNavLink({ href, label, icon: Icon, active, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        flex items-center justify-center w-11 h-11 rounded-xl text-sm font-medium
        transition-all duration-200
        ${active
          ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
          : 'text-zinc-400 hover:text-white hover:bg-zinc-800 border border-transparent'
        }
      `}
      title={label}
    >
      <Icon className="w-5 h-5" />
    </Link>
  );
}
