import React, { lazy, Suspense } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";

import Loader from "components/loader";

import { ROUTES } from "constants/routes";

import HomePage from "pages/home";
import Template from "../../../components/template";

const NotFoundPage = lazy(
  () => import(/* webpackChunkName: "NotFoundPage" */ "pages/not-found"),
);

const RoomPage = lazy(
  () => import(/* webpackChunkName: "RoomPage" */ "pages/room"),
);

const JoinRoomPage = lazy(
  () => import(/* webpackChunkName: "JoinRoomPage" */ "pages/join-room"),
);

const Routing = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      <Route path={ROUTES.home} element={<Outlet />}>
        <Route
          index
          element={
            <Template>
              <HomePage />
            </Template>
          }
        />
        <Route
          path={ROUTES.join}
          element={
            <Template>
              <JoinRoomPage />
            </Template>
          }
        />
        <Route path={ROUTES.room}>
          <Route index element={<Navigate to={ROUTES.home} replace />} />
          <Route path=":roomId" element={<RoomPage />} />
        </Route>
        <Route
          path="*"
          element={
            <Template>
              <NotFoundPage />
            </Template>
          }
        />
      </Route>
    </Routes>
  </Suspense>
);

export default Routing;
