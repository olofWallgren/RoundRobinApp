import React from "react";
import { Route, Switch } from "react-router-dom";
import Loader from "../components/Loader";

const NotFound = React.lazy(() => import("./not-found"));
const Home = React.lazy(() => import("./home"));
const Tournament = React.lazy(() => import("./tournament"));
const PreviousRounds = React.lazy(() => import("./previous-rounds"));
const Round = React.lazy(() => import("./round"));
const Scoreboard = React.lazy(() => import("./scoreboard"));

interface IRoute {
  exact?: boolean;
  path: string;
  title: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
}

export const RouterTree: IRoute[] = [
  {
    path: "/",
    title: "Home",
    component: Home,
    exact: true,
  },
  {
    path: "/create-tournament",
    title: "Tournament",
    component: Tournament,
  },
  {
    path: "/current-tournament/previous-rounds",
    title: "Previous Rounds",
    component: PreviousRounds,
  },
  {
    path: "/current-tournament/round",
    title: "Round",
    component: Round,
  },
  {
    path: "/current-tournament/scoreboard",
    title: "Scoreboard",
    component: Scoreboard,
  },
  {
    path: "/not-found",
    title: "Not found",
    component: NotFound,
  },
];

const Router = () => (
  <React.Suspense fallback={<Loader />}>
    <Switch>
      {RouterTree.map((route) => (
        <Route
          key={route.title}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
      <Route component={NotFound} />
    </Switch>
  </React.Suspense>
);

export default Router;
