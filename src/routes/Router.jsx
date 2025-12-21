import { createBrowserRouter } from "react-router";
import HomePageLayout from "../layout/HomePageLayout";
import Home from "../pages/Home";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Forget from "../pages/Forget";
import DashBoardLayout from "../layout/DashBoardLayout";
import DashBoard from "../pages/dashboard/DashBoard";
import AddRequest from "../pages/addRequest/AddRequest";
import AllUsers from "../pages/dashboard/allUsers/AllUsers";
import PrivateRoute from "./PrivateRoute";
import MyRequest from "../pages/dashboard/myRequest/MyRequest";
import Funding from "../pages/Funding";
import Profile from "../pages/profile/Profile";
import UpdateProfile from "../pages/profile/UpdateProfile";
import SearchRequest from "../pages/searchRequest/SearchRequest";
import AllRequest from "../pages/allRequest/AllRequest";
import RequestDetails from "../pages/requestDetails/RequestDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePageLayout></HomePageLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },

      {
        path: "/funding",
        element: <Funding></Funding>,
      },

      {
        path: "/search-request",
        element: <SearchRequest></SearchRequest>,
      },

      {
        path: "/request-details/:id",
        element: (
          <PrivateRoute>
            <RequestDetails></RequestDetails>
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/",
        element: <DashBoard></DashBoard>,
      },

      {
        path: "/dashboard/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/dashboard/update-profile",
        element: <UpdateProfile></UpdateProfile>,
      },

      {
        path: "/dashboard/add-request",
        element: <AddRequest></AddRequest>,
      },

      {
        path: "/dashboard/users",
        element: <AllUsers></AllUsers>,
      },

      {
        path: "/dashboard/my-request",
        element: <MyRequest></MyRequest>,
      },

      {
        path: "/dashboard/all-request",
        element: <AllRequest></AllRequest>,
      },
    ],
  },

  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/register",
        element: <Register></Register>,
      },
      {
        path: "/auth/forget/:userEmail",
        element: <Forget></Forget>,
      },
    ],
  },
]);

export default router;
