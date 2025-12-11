import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { SidebarRoutes } from "./SidebarRoutes";
// import { AuthGuard } from "../layouts/AuthGuard";
import NotFound from "../pages/page404";

const AppRoutes = () => {
  return (
    <Routes>
      {/* public */}

      {/* protected area */}
      <Route element={<DashboardLayout />}>
        {SidebarRoutes.map((route) => {
          // If the route has children with their own components
          if (route.children && route.children.length > 0) {
            return (
              <Route key={route.path} path={route.path}>
                {/* Parent route (index route) */}
                <Route index element={<route.component />} />
                {/* Child routes */}
                {route.children.map((child) =>
                  child.component ? (
                    <Route
                      key={child.path}
                      path={child.path.replace(`${route.path}/`, "")}
                      element={<child.component />}
                    />
                  ) : (
                    // Fallback to parent component if child doesn't have its own
                    <Route
                      key={child.path}
                      path={child.path.replace(`${route.path}/`, "")}
                      element={<route.component />}
                    />
                  )
                )}
              </Route>
            );
          }

          // If no children, just render the regular route
          return (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          );
        })}
      </Route>

      {/* fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
