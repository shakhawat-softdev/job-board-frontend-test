import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home/Home";
import JobDetail from "../pages/JobDetail/JobDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout />
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "/jobs/:jobId", element: <JobDetail /> },
    ],
  },
]);

export default router;
