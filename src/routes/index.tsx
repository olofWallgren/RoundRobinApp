import React from 'react';
import { Route, Switch } from "react-router-dom";

// import { Loader } from '../components/loader';

const NotFound = React.lazy(()  => import('./not-found'));
const Home = React.lazy(()  => import('./home'));
const Tournament = React.lazy(()  => import('./tournament'));
const PreviousRounds = React.lazy(()  => import('./previous-rounds'));
const Round = React.lazy(()  => import('./round'));
const Scoreboard = React.lazy(()  => import('./scoreboard'));

interface IRoute {
    exact?: boolean,
    path: string,
    title: string,
    component: any,
}

export const RouterTree: IRoute[] = [
    {
        exact: true,
        path: '/',
        title: 'home',
        component: Home,
    },
    {
        path: '/create-tournament',
        title: 'Tournament',
        component: Tournament,
    },
    {
        path: '/current-tournament/previous-rounds',
        title: 'PreviousRounds',
        component: PreviousRounds,
    },
    {
        path: '/current-tournament/round',
        title: 'Round',
        component: Round,
    },
    {
        path: '/current-tournament/scoreboard',
        title: 'Scoreboard',
        component: Scoreboard,
    },
    {
        path: '/not-found',
        title: 'Not-found',
        component: NotFound,
    },
];

const Router = () => (
    // <React.Suspense fallback={<Loader center />}>
    <React.Suspense fallback >   
        <Switch>
            {RouterTree.map((r: IRoute) =>
                <Route key={r.path} {...r} />
            )}
            <Route component={NotFound} />
        </Switch>
</React.Suspense>
);

export default Router;