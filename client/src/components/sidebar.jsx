import React, { forwardRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
    LayoutDashboard, 
    Package, 
    Plus, 
    Bell, 
    DollarSign, 
    HelpCircle, 
    Settings, 
    LogOut 
} from "lucide-react";
import {useAuthStore} from "../store/authStore";
import { cn } from "@/utils/cn";

// Simplified menu items - only the 8 you requested
const menuItems = [
  {
    id: 'overview',
    label: 'Overview',
    icon: LayoutDashboard,
    path: '/dashboard',
    section: 'main'
  },
  {
    id: 'my-products',
    label: 'My Products',
    icon: Package,
    path: '/products',
    section: 'main'
  },
  {
    id: 'add-products',
    label: 'Add Products',
    icon: Plus,
    path: '/products/add',
    section: 'main'
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: Bell,
    path: '/notifications',
    section: 'main'
  },
  {
    id: 'earnings',
    label: 'Earnings',
    icon: DollarSign,
    path: '/earnings',
    section: 'main'
  },
  {
    id: 'help',
    label: 'Help',
    icon: HelpCircle,
    path: '/help',
    section: 'account'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    path: '/settings',
    section: 'account'
  },
  {
    id: 'logout',
    label: 'Logout',
    icon: LogOut,
    action: 'logout',
    section: 'account'
  }
];

export const Sidebar = forwardRef(({ collapsed }, ref) => {
    const navigate = useNavigate();
    const location = useLocation();
    const{user,logout}=useAuthStore();

    const handleNavigation = (item) => {
        if (item.action === 'logout') {
            handleLogout();
        } else {
            navigate(item.path);
        }
    };

    const handleLogout = () => {
        logout();
    };

    const isActive = (path) => {
        if (path === '/dashboard') {
            return location.pathname === '/' || location.pathname === '/dashboard';
        }
        return location.pathname.startsWith(path);
    };

    const mainItems = menuItems.filter(item => item.section === 'main');
    const accountItems = menuItems.filter(item => item.section === 'account');

    return (
        <aside
            ref={ref}
            className={cn(
                "fixed left-0 top-0 z-40 h-screen bg-white shadow-lg transition-all duration-300 border-r border-slate-200 dark:bg-slate-900 dark:border-slate-700",
                collapsed ? "w-[70px]" : "w-[240px]"
            )}
        >
            {/* Logo Section */}
            <div className="flex h-[60px] items-center justify-center border-b border-slate-200 dark:border-slate-700 px-4">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm">
                        R
                    </div>
                    {!collapsed && (
                        <span className="text-xl font-bold text-slate-900 dark:text-white">
                            RentHub
                        </span>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4">
                <div className="space-y-2">
                    {/* Main Items */}
                    {mainItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);
                        
                        return (
                            <button
                                key={item.id}
                                onClick={() => handleNavigation(item)}
                                className={cn(
                                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-800",
                                    active
                                        ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                                        : "text-slate-700 dark:text-slate-300"
                                )}
                                title={collapsed ? item.label : undefined}
                            >
                                <Icon 
                                    size={20} 
                                    className={cn(
                                        "shrink-0",
                                        active 
                                            ? "text-blue-700 dark:text-blue-300" 
                                            : "text-slate-500 dark:text-slate-400"
                                    )} 
                                />
                                {!collapsed && (
                                    <span className="truncate">{item.label}</span>
                                )}
                                {active && !collapsed && (
                                    <div className="ml-auto h-2 w-2 rounded-full bg-blue-600" />
                                )}
                            </button>
                        );
                    })}

                    {/* Separator */}
                    <div className="my-6 border-t border-slate-200 dark:border-slate-700" />

                    {/* Account Items */}
                    {accountItems.map((item) => {
                        const Icon = item.icon;
                        const active = item.path && isActive(item.path);
                        const isLogout = item.action === 'logout';
                        
                        return (
                            <button
                                key={item.id}
                                onClick={() => handleNavigation(item)}
                                className={cn(
                                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-800",
                                    isLogout
                                        ? "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                                        : active
                                        ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                                        : "text-slate-700 dark:text-slate-300"
                                )}
                                title={collapsed ? item.label : undefined}
                            >
                                <Icon 
                                    size={20} 
                                    className={cn(
                                        "shrink-0",
                                        isLogout
                                            ? "text-red-600 dark:text-red-400"
                                            : active 
                                            ? "text-blue-700 dark:text-blue-300" 
                                            : "text-slate-500 dark:text-slate-400"
                                    )} 
                                />
                                {!collapsed && (
                                    <span className="truncate">{item.label}</span>
                                )}
                                {active && !collapsed && !isLogout && (
                                    <div className="ml-auto h-2 w-2 rounded-full bg-blue-600" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </nav>

            {/* User Info (Optional - shown at bottom when not collapsed) */}
            {!collapsed && (
                <div className="border-t border-slate-200 dark:border-slate-700 p-4">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                            U
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                                {user.name}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                {user.email}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </aside>
    );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;