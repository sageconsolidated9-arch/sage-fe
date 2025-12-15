import { Outlet, Route, Routes } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { SidebarRoutes } from "./SidebarRoutes";
// import { AuthGuard } from "../layouts/AuthGuard";
import NotFound from "../pages/page404";

const toElement = (Comp?: React.LazyExoticComponent<React.ComponentType>) =>
  Comp ? <Comp /> : <Outlet />;
const AppRoutes = () => (
  <Routes>
    <Route element={<DashboardLayout />}>
      {SidebarRoutes.map((route) => {
        /* ---------- parent with children ---------- */
        if (route.children?.length) {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={toElement(route.component)}
            >
              {route.children.map((child) => (
                <Route
                  key={child.path}
                  path={child.path.slice(route.path.length + 1)} // strip parent prefix
                  element={
                    child.component ? (
                      <child.component />
                    ) : (
                      toElement(route.component)
                    )
                  }
                />
              ))}
            </Route>
          );
        }

        /* ---------- simple leaf route ---------- */
        return (
          <Route
            key={route.path}
            path={route.path}
            element={toElement(route.component)}
          />
        );
      })}
    </Route>

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
