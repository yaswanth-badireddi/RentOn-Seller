import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/contexts/theme-context";
import Layout from "@/routes/layout";
import DashboardPage from "@/routes/dashboard/page";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <DashboardPage />,
                },
                {
                    path: "dashboard",
                    element: <DashboardPage />,
                },
                // Rental business routes
                {
                    path: "products",
                    element: <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Products</h1>,
                },
                {
                    path: "products/add",
                    element: <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Add New Product</h1>,
                },
                {
                    path: "earnings",
                    element: <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Earnings</h1>,
                },
                {
                    path: "notifications",
                    element: <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Notifications</h1>,
                },
                {
                    path: "requests",
                    element: <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Rental Requests</h1>,
                },
                // Analytics and Reports
                {
                    path: "analytics",
                    element: <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Analytics</h1>,
                },
                {
                    path: "reports",
                    element: <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Reports</h1>,
                },
                // Account routes
                {
                    path: "help",
                    element: <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Help & Support</h1>,
                },
                {
                    path: "settings",
                    element: <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>,
                },
                // Additional routes
                {
                    path: "customers",
                    element: <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Customers</h1>,
                },
                {
                    path: "inventory",
                    element: <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Inventory</h1>,
                },
            ],
        },
    ]);

    return (
        <ThemeProvider storageKey="renthub-theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;