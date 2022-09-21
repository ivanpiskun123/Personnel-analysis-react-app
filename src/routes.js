// import
import React, { Component }  from 'react';
import Dashboard from "views/Dashboard/Dashboard.js";
import Tables from "views/Dashboard/Tables.js";
import Billing from "views/Dashboard/Billing.js";
import RTLPage from "views/RTL/RTLPage.js";
import Profile from "views/Dashboard/Profile.js";
import SignIn from "views/Pages/SignIn.js";

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
  GlobeIcon,
  PayPalIcon,
  ProfileIcon
} from "components/Icons/Icons";

var dashRoutes = [
  {
    path: "/candidates",
    name: "Кандидаты",
    rtlName: "Candidates",
    icon: <PersonIcon color='inherit' />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Вакансии",
    rtlName: "Vacancies",
    icon: <GlobeIcon color='inherit' />,
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/billing",
    name: "Должности",
    rtlName: "Positions",
    icon: <DocumentIcon color='inherit' />,
    component: Billing,
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "Критерии",
    rtlName: "Criteria",
    icon: <SupportIcon color='inherit' />,
    component: Profile,
    layout: "/admin",
  },
  {
    name: "Настройки аккаунта",
    category: "account",
    rtlName: "Account settings",
    state: "pageCollapse",
    views: [
      {
        path: "/rtl-support-page",
        name: "Изменить сторону",
        rtlName: "Изменить сторону",
        icon: <PayPalIcon color='inherit' />,
        secondaryNavbar: true,
        component: RTLPage,
        layout: "/rtl",
      },
      {
        path: "/signout",
        name: "Выйти",
        rtlName: "Выйти",
        icon: <ProfileIcon color='inherit' />,
        isSignOut: true
      },
      {
        path: "/signin",
        name: "Войти",
        rtlName: "Войти",
        icon: <PersonIcon color='inherit' />,
        component: SignIn,
        layout: "/auth",
      },
    ],
  },
];
export default dashRoutes;
