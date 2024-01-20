import React, { lazy } from "react";
import { Redirect } from "react-router-dom";
import DashboardLayout from "src/layouts/DashboardLayout";

export const routes = [
  {
    exact: true,
    path: "/",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Dashboard")),
  },
  {
    exact: true,
    path: "/swap",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Swap/index")),
  },
  {
    exact: true,
    path: "/market",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Markets/index")),
  },
  {
    exact: true,
    path: "/landing",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Landing/index")),
  },
  {
    exact: true,
    path: "/staking",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Swap/index")),
  },
  {
    exact: true,
    path: "/wallet",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Swap/index")),
  },
  {
    exact: true,
    path: "/bridge",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Swap/index")),
  },
  {
    exact: true,
    path: "/vault",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Swap/index")),
  },

  {
    exact: true,
    guard: true,
    path: "/view-profile",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/Profile/ViewProfile")
    ),
  },
  {
    exact: true,
    guard: true,
    path: "/edit-profile",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/Profile/EditProfile")
    ),
  },
  
  {
    exact: true,
    path: "/404",
    component: lazy(() => import("src/views/errors/NotFound")),
  },
  {
    component: () => <Redirect to="/404" />,
  },
];
