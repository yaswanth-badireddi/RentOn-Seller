// Sample notifications data for header component
export const notifications = [
  {
    id: 1,
    title: "New Rental Request",
    message: "You have a new rental request for MacBook Pro",
    time: "2 minutes ago",
    read: false
  },
  {
    id: 2,
    title: "Payment Received",
    message: "Payment of $299 received for Camera Rental",
    time: "1 hour ago", 
    read: false
  },
  {
    id: 3,
    title: "Product Returned",
    message: "iPhone 14 has been returned by customer",
    time: "3 hours ago",
    read: true
  },
  {
    id: 4,
    title: "Low Stock Alert",
    message: "Gaming Console stock is running low",
    time: "1 day ago",
    read: true
  },
  {
    id: 5,
    title: "Review Received",
    message: "New 5-star review for your Drone rental",
    time: "2 days ago",
    read: true
  }
];

// Dashboard statistics
export const dashboardStats = {
  totalProducts: 8,
  totalEarnings: 34900,
  activeRentals: 2,
  totalCustomers: 50,
  availableProducts: 5,
  monthlyGrowth: 12
};

// Product categories for rental items
export const productCategories = [
  { id: 1, name: "Electronics", icon: "💻" },
  { id: 2, name: "Cameras", icon: "📷" },
  { id: 3, name: "Gaming", icon: "🎮" },
  { id: 4, name: "Tools", icon: "🔧" },
  { id: 5, name: "Sports", icon: "⚽" },
  { id: 6, name: "Music", icon: "🎵" },
  { id: 7, name: "Furniture", icon: "🪑" },
  { id: 8, name: "Vehicles", icon: "🚗" },
  { id: 9, name: "Party Equipment", icon: "🎉" }
];

// Rental status options
export const rentalStatuses = [
  { 
    value: "available", 
    label: "Available", 
    color: "green",
    bgColor: "bg-green-100",
    textColor: "text-green-800"
  },
  { 
    value: "rented", 
    label: "Rented", 
    color: "blue",
    bgColor: "bg-blue-100",
    textColor: "text-blue-800"
  },
  { 
    value: "maintenance", 
    label: "Maintenance", 
    color: "yellow",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-800"
  },
  { 
    value: "unavailable", 
    label: "Unavailable", 
    color: "red",
    bgColor: "bg-red-100",
    textColor: "text-red-800"
  }
];

// Sample rental products
export const sampleProducts = [
  {
    id: 1,
    name: "MacBook Pro 16-inch",
    category: "Electronics",
    dailyRate: 50,
    status: "available",
    description: "Latest MacBook Pro with M2 chip",
    image: "/api/placeholder/300/200"
  },
  {
    id: 2,
    name: "Canon EOS R5",
    category: "Cameras", 
    dailyRate: 80,
    status: "rented",
    description: "Professional mirrorless camera",
    image: "/api/placeholder/300/200"
  },
  {
    id: 3,
    name: "PlayStation 5",
    category: "Gaming",
    dailyRate: 25,
    status: "available", 
    description: "Latest gaming console",
    image: "/api/placeholder/300/200"
  }
];

// Navigation menu items
export const menuItems = [
  {
    id: 'overview',
    label: 'Overview',
    path: '/dashboard',
    section: 'main'
  },
  {
    id: 'my-products',
    label: 'My Products',
    path: '/products',
    section: 'main'
  },
  {
    id: 'add-products',
    label: 'Add Products',
    path: '/products/add',
    section: 'main'
  },
  {
    id: 'notifications',
    label: 'Notifications',
    path: '/notifications',
    section: 'main'
  },
  {
    id: 'earnings',
    label: 'Earnings',
    path: '/earnings',
    section: 'main'
  },
  {
    id: 'help',
    label: 'Help',
    path: '/help',
    section: 'account'
  },
  {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    section: 'account'
  }
];