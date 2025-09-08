import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
} from "react-router-dom";

import { ThemeProvider } from "@/contexts/theme-context";
import Layout from "@/routes/layout";
import DashboardPage from "@/routes/dashboard/page";
import ProductAdd from "./pages/productAdd";
import Products from "./pages/products";

// Public pages
import { SignupPage } from "./pages/authpages/SignupPage";
import { LoginPage } from "./pages/authpages/LoginPage";
import EmailVerificationPage from "./pages/authpages/EmailVerificationPage";
import ForgotPasswordPage from "./pages/authpages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/authpages/ResetPasswordPage";

// Auth logic
import { useAuthStore } from "./store/authStore";
import LoadingSpinner from "./components/LoadingSpinner";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

// Auth guards
const ProtectedRoute = ({ element }) => {
	const { isAuthenticated, user ,isCheckingAuth} = useAuthStore();
	if(isCheckingAuth) return <LoadingSpinner/>;
	if (!isAuthenticated || !user) return <Navigate to="/login" replace />;
	if (!user.isverified) return <Navigate to="/verify-email" replace />;
	return element;
};

const RedirectAuthenticatedUser = ({ element }) => {
	const { isAuthenticated, user,isCheckingAuth } = useAuthStore();
	if(isCheckingAuth) return <LoadingSpinner/>;
	if (isAuthenticated && user?.isverified) {
		return <Navigate to="/" replace />;
	}
	return element;
};

// Spinner while checking auth
function AuthWrapper({ children }) {
	const { isCheckingAuth, checkAuth } = useAuthStore();
	const [ready, setReady] = useState(false);

	useEffect(() => {
		checkAuth().then(() => setReady(true));
	}, [checkAuth]);

	if (isCheckingAuth || !ready) return <LoadingSpinner />;
	return <RouterProvider router={router} />;
}

const router = createBrowserRouter([
	// Public auth-related routes
	{
		path: "/signup",
		element: <RedirectAuthenticatedUser element={<SignupPage />} />,
	},
	{
		path: "/login",
		element: <RedirectAuthenticatedUser element={<LoginPage />} />,
	},
	{
		path: "/verify-email",
		element: <EmailVerificationPage />,
	},
	{
		path: "/forgot-password",
		element: <RedirectAuthenticatedUser element={<ForgotPasswordPage />} />,
	},
	{
		path: "/reset-password/:token",
		element: <RedirectAuthenticatedUser element={<ResetPasswordPage />} />,
	},

	// Protected app routes
	{
		path: "/",
		element: <ProtectedRoute element={<Layout />} />,
		children: [
			{ index: true, element: <DashboardPage /> },
			{ path: "dashboard", element: <DashboardPage /> },
			{ path: "products", element: <Products/>},
			{ path: "products/add", element: <ProductAdd /> },
			{ path: "earnings", element: <h1 className="text-2xl font-bold">Earnings</h1> },
			{ path: "notifications", element: <h1 className="text-2xl font-bold">Notifications</h1> },
			{ path: "requests", element: <h1 className="text-2xl font-bold">Rental Requests</h1> },
			{ path: "analytics", element: <h1 className="text-2xl font-bold">Analytics</h1> },
			{ path: "reports", element: <h1 className="text-2xl font-bold">Reports</h1> },
			{ path: "help", element: <h1 className="text-2xl font-bold">Help & Support</h1> },
			{ path: "settings", element: <h1 className="text-2xl font-bold">Settings</h1> },
			{ path: "customers", element: <h1 className="text-2xl font-bold">Customers</h1> },
			{ path: "inventory", element: <h1 className="text-2xl font-bold">Inventory</h1> },
		],
	},

	// Catch-all: redirect unknown routes
	{
		path: "*",
		element: <Navigate to="/" replace />,
	},
]);

function App() {
	return (
		<ThemeProvider storageKey="renthub-theme">
			<AuthWrapper>
				<Toaster />
			</AuthWrapper>
		</ThemeProvider>
	);
}

export default App;
