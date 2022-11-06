// import
import React, { Component }  from 'react';
import Candidates from "views/Dashboard/Candidates.js";
import Vacancies from "views/Dashboard/Vacancies.js";
import Billing from "views/Dashboard/Billing.js";
import RTLPage from "views/RTL/RTLPage.js";
import Profile from "views/Dashboard/Profile.js";
import SignIn from "views/Pages/SignIn.js";
import { FaRegWindowClose } from "react-icons/fa";


import {
  PersonIcon,
  GlobeIcon,
  ProfileIcon
} from "components/Icons/Icons";

var dashRoutes = [
  {
    path: "/candidates",
    name: "Кандидаты",
    rtlName: "Candidates",
    icon: <PersonIcon color='inherit' />,
    component: Candidates,
    layout: "/admin",
  },
  {
    path: "/vacancies",
    name: "Вакансии",
    rtlName: "Vacancies",
    icon: <GlobeIcon color='inherit' />,
    component: Vacancies,
    layout: "/admin",
  },
  // {
  //   path: "/billing",
  //   name: "Должности",
  //   rtlName: "Positions",
  //   icon: <DocumentIcon color='inherit' />,
  //   component: Billing,
  //   layout: "/admin",
  // },
  // {
  //   path: "/profile",
  //   name: "Критерии",
  //   rtlName: "Criteria",
  //   icon: <SupportIcon color='inherit' />,
  //   component: Profile,
  //   layout: "/admin",
  // },
  {
    name: "Аккаунт",
    category: "account",
    rtlName: "Account settings",
    state: "pageCollapse",
    views: [
      {
        path: "/signout",
        name: "Выйти",
        rtlName: "Выйти",
        icon: <FaRegWindowClose color='inherit' />,
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
