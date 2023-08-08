import React, { lazy, Suspense } from "react";
import { Routes, Route, Outlet, Navigate, useNavigate } from "react-router-dom";

import Loader from "components/loader";
import Template from "components/template";

import { ROUTES } from "constants/routes";

import { HISTORY } from "constants/history";

import HomePage from "pages/home";
import JoinRoomPage from "pages/join-room";

const NotFoundPage = lazy(
  () => import(/* webpackChunkName: "NotFoundPage" */ "pages/not-found"),
);

const RoomPage = lazy(
  () => import(/* webpackChunkName: "RoomPage" */ "pages/room"),
);

const Routing = () => {
  HISTORY.navigate = useNavigate();

  return (
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
};

export default Routing;
