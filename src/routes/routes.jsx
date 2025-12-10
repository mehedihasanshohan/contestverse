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
import DashBoardLayout from "../layout/DashBoardLayout";
import MyContests from "../pages/dashboard/MyContests";
import Payment from "../pages/dashboard/Payment";
import PaymentSuccess from "../pages/dashboard/PaymentSuccess";
import PaymentCancelled from "../pages/dashboard/PaymentCancelled";
import PaymentHistory from "../pages/dashboard/PaymentHistory";

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
  },
  {
    path: 'dashboard',
    element: <PrivateRoutes>
      <DashBoardLayout></DashBoardLayout>
    </PrivateRoutes>,
    children: [
      {
        path: 'my-contests',
        element: <MyContests></MyContests>
      },
      {
        path: 'payment/:contestId',
        element: <Payment></Payment>
      },
      {
        path: 'payment-success',
        element: <PaymentSuccess></PaymentSuccess>
      },
      {
        path: 'payment-cancelled',
        element: <PaymentCancelled></PaymentCancelled>
      },
      {
        path: 'payment-history',
        element: <PaymentHistory></PaymentHistory>
      }
    ]
  }
])