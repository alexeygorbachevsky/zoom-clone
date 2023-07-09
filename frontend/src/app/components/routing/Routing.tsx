import { lazy, Suspense } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import Loader from "assets/icons/loader.svg";

import MainPage from "pages/main";

import { ROUTES } from "constants/routes";

const NotFoundPage = lazy(
  () => import(/* webpackChunkName: "NotFoundPage" */ "pages/not-found"),
);

const RoomPage = lazy(
  () => import(/* webpackChunkName: "NotFoundPage" */ "pages/room"),
);

const Routing = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      <Route path={ROUTES.main} element={<Outlet />}>
        <Route index element={<MainPage />} />
        <Route path={`${ROUTES.room}/:id`} element={<RoomPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Suspense>
);

export default Routing;
