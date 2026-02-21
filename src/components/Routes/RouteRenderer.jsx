import { Routes, Route, Navigate } from "react-router-dom";
import cmsRoutes from "../Database/cmsRoutes.json";
import { ComponentMap } from "../Routes/ComponentMap";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";

const RouteRenderer = ({ filteredItems }) => {

    return (
        <Routes>
            {cmsRoutes.routes.map((route, index) => {
                const Component = route.component
                    ? ComponentMap[route.component]
                    : null;

                if (!Component && route.type !== "redirect") {
                    console.warn(`Component not found for route: ${route.path}`);
                    return null;
                }


                // 🔁 Redirect Route
                if (route.type === "redirect") {
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={<Navigate to={route.redirectTo} replace />}
                        />
                    );
                }

                // 🎯 Dynamic Props Logic
                const dynamicProps = {};

                if (route.props?.includes("filteredItems")) {
                    dynamicProps.filteredItems = filteredItems;
                }

                // 🌍 Public Route
                if (!route.protected) {
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={<Component {...dynamicProps} />}
                        />
                    );
                }

                // 🔐 Protected Route
                return (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <ProtectedRoutes allowedRole={route.allowedRole}>
                                <Component {...dynamicProps} />
                            </ProtectedRoutes>
                        }
                    />
                );
            })}
        </Routes>
    );
};

export default RouteRenderer;
