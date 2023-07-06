import { lazy, Suspense } from "react";
import {Routes, Route, Outlet} from "react-router-dom";

import Loader from "assets/icons/loader.svg";

import LandingPage  from "pages/landing";

import { ROUTES } from "constants/routes";

const NotFoundPage = lazy(
  () => import(/* webpackChunkName: "NotFoundPage" */ "pages/not-found"),
);

const Routing = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      <Route path={ROUTES.home} element={<Outlet />}>
        <Route index element={<LandingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Suspense>
);

export default Routing;
