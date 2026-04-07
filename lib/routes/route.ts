// lib/manifest.ts (or wherever your manifest lives)
export const ROUTE_MANIFEST = [
    '/',
    '/projects/school/infoVis-DatasetProject',
    '/blog',
    '/dashboard/calendar',
    '/dashboard/compare',
    '/dashboard/hobbies',
    '/dashboard/hooks',
    '/dashboard/stats',
    '/login',
    '/signup',
    '/logout',
    '/profile',
    '/projects/writing',
    '/projects/npwebapps',
    '/projects/npapps',
    '/projects/recipes',
    '/about',
    '/contact',
    '/blog',
];

export const FormatRouteName = (route: string): string => {
    if (route === '/') {
        return 'Home';
    } else if (route === '/projects/school/infoVis-DatasetProject') {
        return 'InfoVis Dataset Project';
    } else if (route.includes('/dashboard')) {
        const last = route.split('/').pop() ?? 'dashboard';
        return last.charAt(0).toUpperCase() + last.slice(1);
    } else if (route.includes('/projects')) {
        const last = route.split('/').pop() ?? 'projects';
        return 'Projects - ' + last.charAt(0).toUpperCase() + last.slice(1);
    } else {
        return route.split('/')[1].charAt(0).toUpperCase() + route.split('/')[1].slice(1);
    }
};

export type RoutePattern = string | RegExp;

export function isValidRoute(pathname: string): boolean {
    return ROUTE_MANIFEST.some((route) =>
        pathname === route || pathname.startsWith(route + '/')
    );
}