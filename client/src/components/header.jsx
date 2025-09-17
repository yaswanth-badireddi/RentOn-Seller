import React, { useState, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { useTheme } from "@/contexts/theme-context";
import { useClickOutside } from "@/hooks/use-click-outside";

import { 
    Bell, 
    ChevronsLeft, 
    Moon, 
    Search, 
    Sun, 
    User, 
    Settings, 
    LogOut, 
    ChevronDown 
} from "lucide-react";

// Mock notifications data - replace with actual data source
const notifications = [
    {
        id: 1,
        title: "New rental request",
        message: "John Doe wants to rent your camera equipment",
        time: "2 minutes ago",
        read: false
    },
    {
        id: 2,
        title: "Payment received",
        message: "You received $250 from rental #1234",
        time: "1 hour ago",
        read: false
    },
    {
        id: 3,
        title: "Equipment returned",
        message: "Canon EOS R5 has been successfully returned",
        time: "3 hours ago",
        read: true
    }
];

// Placeholder profile image - replace with actual image
const profileImg = "https://ui-avatars.com/api/?name=User&background=0066cc&color=fff&size=32";

export const Header = React.memo(({ collapsed, setCollapsed }) => {
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    
    // Refs for dropdown elements
    const notificationsRef = useRef(null);
    const profileMenuRef = useRef(null);
    
    // Get unread notifications count
    const unreadCount = useMemo(() => 
        notifications.filter(n => !n.read).length, 
        []
    );
    
    // Close dropdowns when clicking outside
    useClickOutside(notificationsRef, useCallback(() => {
        setShowNotifications(false);
    }, []));
    
    useClickOutside(profileMenuRef, useCallback(() => {
        setShowProfileMenu(false);
    }, []));
    
    const handleLogout = useCallback(() => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        navigate('/login');
    }, [navigate]);

    const handleNotificationClick = useCallback(() => {
        setShowNotifications(prev => !prev);
        if (showProfileMenu) setShowProfileMenu(false);
    }, [showProfileMenu]);

    const handleProfileClick = useCallback(() => {
        setShowProfileMenu(prev => !prev);
        if (showNotifications) setShowNotifications(false);
    }, [showNotifications]);

    const handleNotificationItemClick = useCallback((notificationId) => {
        // In a real app, you'd mark notification as read here
        console.log('Notification clicked:', notificationId);
        setShowNotifications(false);
        navigate('/notifications');
    }, [navigate]);

    const handleThemeToggle = useCallback(() => {
        toggleTheme();
    }, [toggleTheme]);

    const handleSidebarToggle = useCallback(() => {
        setCollapsed(prev => !prev);
    }, [setCollapsed]);

    const handleSearchChange = useCallback((e) => {
        setSearchQuery(e.target.value);
    }, []);

    const handleSearchSubmit = useCallback((e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    }, [searchQuery, navigate]);

    const handleProfileNavigation = useCallback((path) => {
        setShowProfileMenu(false);
        navigate(path);
    }, [navigate]);

    return (
        <header className="relative z-10 flex h-[60px] items-center justify-between bg-white px-4 shadow-md transition-colors dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-x-3">
                <button
                    className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={handleSidebarToggle}
                    title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    <ChevronsLeft 
                        className={`transition-transform duration-200 ${collapsed ? "rotate-180" : ""}`} 
                        size={20}
                    />
                </button>
                
                <form onSubmit={handleSearchSubmit} className="relative">
                    <div className="relative flex items-center">
                        <Search
                            size={20}
                            className="absolute left-3 text-slate-400 dark:text-slate-500"
                            aria-hidden="true"
                        />
                        <input
                            type="text"
                            name="search"
                            id="search"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search products, customers, rentals..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors dark:bg-slate-800 dark:border-slate-600 dark:text-white dark:placeholder-slate-400 dark:focus:bg-slate-700 min-w-[300px] md:min-w-[400px]"
                        />
                    </div>
                </form>
            </div>

            <div className="flex items-center gap-x-2">
                {/* Theme Toggle */}
                <button
                    onClick={handleThemeToggle}
                    className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                    aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                >
                    {theme === "light" ? 
                        <Moon size={20} className="text-slate-600 dark:text-slate-300" /> : 
                        <Sun size={20} className="text-slate-600 dark:text-slate-300" />
                    }
                </button>

                {/* Notifications */}
                <div className="relative" ref={notificationsRef}>
                    <button
                        onClick={handleNotificationClick}
                        className="relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        title="Notifications"
                        aria-label="Notifications"
                    >
                        <Bell size={20} className="text-slate-600 dark:text-slate-300" />
                        {unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                                {unreadCount > 9 ? '9+' : unreadCount}
                            </span>
                        )}
                    </button>

                    {/* Notifications Dropdown */}
                    {showNotifications && (
                        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-2 max-h-96 overflow-y-auto">
                            <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700">
                                <h3 className="font-semibold text-slate-900 dark:text-white">Notifications</h3>
                            </div>
                            {notifications.length === 0 ? (
                                <div className="px-4 py-6 text-center text-slate-500 dark:text-slate-400">
                                    No notifications
                                </div>
                            ) : (
                                notifications.map((notification) => (
                                    <button
                                        key={notification.id}
                                        onClick={() => handleNotificationItemClick(notification.id)}
                                        className="w-full px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors border-b border-slate-100 dark:border-slate-600 last:border-b-0"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`w-2 h-2 rounded-full mt-2 ${notification.read ? 'bg-slate-300' : 'bg-blue-500'}`} />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                                                    {notification.title}
                                                </p>
                                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                                    {notification.message}
                                                </p>
                                                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                                                    {notification.time}
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                ))
                            )}
                        </div>
                    )}
                </div>

                {/* Profile Menu */}
                <div className="relative" ref={profileMenuRef}>
                    <button
                        onClick={handleProfileClick}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        aria-label="Profile menu"
                    >
                        <img
                            src={profileImg}
                            alt="Profile"
                            className="w-8 h-8 rounded-full object-cover border-2 border-slate-200 dark:border-slate-600"
                            onError={(e) => {
                                e.target.src = "https://ui-avatars.com/api/?name=User&background=0066cc&color=fff&size=32";
                            }}
                        />
                        <ChevronDown size={16} className={`text-slate-600 dark:text-slate-300 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Profile Dropdown */}
                    {showProfileMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-2">
                            <button
                                onClick={() => handleProfileNavigation('/profile')}
                                className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
                            >
                                <User size={16} />
                                Profile
                            </button>
                            <button
                                onClick={() => handleProfileNavigation('/settings')}
                                className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
                            >
                                <Settings size={16} />
                                Settings
                            </button>
                            <hr className="my-2 border-slate-200 dark:border-slate-600" />
                            <button
                                onClick={handleLogout}
                                className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2"
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
});

Header.displayName = 'Header';

Header.propTypes = {
    collapsed: PropTypes.bool.isRequired,
    setCollapsed: PropTypes.func.isRequired,
};

export default Header;