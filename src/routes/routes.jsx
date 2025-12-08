import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PrivateRoutes from "./PrivateRoutes";
import BeAcontestCreator from "../pages/contestCreator/BeAcontestCreator";
import AddContest from "../pages/contests/AddContest";
import AllContests from "../pages/AllContests/AllContests";
import DetailsContest from "../pages/contests/DetailsContest";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path:'all-contests',
        element: <AllContests></AllContests>,
      },
      {
        path:'contest-details/:id',
        element: <DetailsContest></DetailsContest>
      },
      {
        path: '/beAcreator',
        element: <PrivateRoutes>
          <BeAcontestCreator></BeAcontestCreator>
        </PrivateRoutes>
      },
      {
        path:'/add-contest',
        element: <AddContest></AddContest>
      }
    ]
  },
  {
    path: '/',
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      }
    ]
  }
])