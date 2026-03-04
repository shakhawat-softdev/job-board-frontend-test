import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home/Home";
import JobDetail from "../pages/JobDetail/JobDetail";
import SignUp from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";
import AdminJobs from "../pages/AdminJobs/AdminJobs";
import ProtectedRoute from "../components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout />
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "/jobs/:jobId", element: <JobDetail /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/login", element: <Login /> },
      {
        path: "/admin/jobs",
        element: (
          <ProtectedRoute requireAdmin={true}>
            <AdminJobs />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
