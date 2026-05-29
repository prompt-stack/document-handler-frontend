import { Routes, Route } from "react-router-dom";
import Login from "./screens/pages/auth/login";
import { useEffect, useState } from "react";
import AppLayout from "./screens/pages/layout/app-layout";
import Callback from "./screens/pages/auth/callback";
import ProtectedRoute from "./middleware/protectedRoute";
import { profileService } from "./service/profileService";
import Dashboard from "./screens/pages/protectedRoutes/dashboard";


export default function AppRouter() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    async function isLoggedIn() {
        const profile = await profileService.getProfile();
        setIsAuthenticated(!!profile);
    }

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <Routes>
            <Route element={<AppLayout isAuthenticated={isAuthenticated} /> }>
                <Route path="/login" element={<Login />} />
                <Route path="/callback" element={<Callback />} />

                <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
                    <Route path="/" element={<Dashboard />} />
                    {/* add more protected routes here */}
                </Route>
            </Route>
        </Routes>
    );
}