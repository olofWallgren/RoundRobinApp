import React from 'react';
import { Route, Switch } from "react-router-dom";

// import { Loader } from '../components/loader';

const NotFound = React.lazy(()  => import('./not-found'));
const Home = React.lazy(()  => import('./home'));
const Tournament = React.lazy(()  => import('./tournament'));

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
        path: '/tournament',
        title: 'Tournament',
        component: Tournament,
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