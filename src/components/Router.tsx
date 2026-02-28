import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';

// Pages
import HomePage from '@/components/pages/HomePage';
import ReportPage from '@/components/pages/ReportPage';
import ReportsPage from '@/components/pages/ReportsPage';
import ReportDetailPage from '@/components/pages/ReportDetailPage';
import DashboardPage from '@/components/pages/DashboardPage';
import ResourcesPage from '@/components/pages/ResourcesPage';
import AboutPage from '@/components/pages/AboutPage';
import ContactPage from '@/components/pages/ContactPage';
import ProfilePage from '@/components/pages/ProfilePage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "report",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to report cleanliness issues">
            <ReportPage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "reports",
        element: <ReportsPage />,
      },
      {
        path: "reports/:id",
        element: <ReportDetailPage />,
      },
      {
        path: "dashboard",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to access your dashboard">
            <DashboardPage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "resources",
        element: <ResourcesPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "profile",
        element: (
          <MemberProtectedRoute>
            <ProfilePage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
