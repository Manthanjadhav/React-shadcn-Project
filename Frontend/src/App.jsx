import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDetails from "./components/JobDetails";
import Companies from "./admin/Companies";
import CreateCompany from "./admin/CreateCompany";
import CompanySetup from "./admin/CompanySetup";
import AdminJobs from "./admin/AdminJobs";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/details/:id",
    element: <JobDetails />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  //admin routes
  {
    path: "admin/companies",
    element: <Companies />,
  },
  {
    path: "admin/companies/:id",
    element: <CompanySetup />,
  },
  {
    path: "admin/companies/create",
    element: <CreateCompany />,
  },
  {
    path: "admin/jobs",
    element: <AdminJobs />,
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
