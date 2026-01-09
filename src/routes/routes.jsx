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
import PackagesPage from "../pages/packages/PackagesPage";
import ResourcesPage from "../pages/Resources/ResourcesPage";
import AdminRoute from "./AdminRoute";
import UsersManagement from "../layout/UsersManagement/UsersManagement";
import ApproveCreator from "./../layout/Creator/ApproveCreator";
import ManageContests from "../layout/manage-contests/ManageContests";
import MyParticipatedContests from "../pages/dashboard/Normal-User/MyParticipatedContests";
import MyWinningContests from "../pages/dashboard/Normal-User/MyWinningContests";
import MyProfile from "../pages/dashboard/Normal-User/MyProfile";
import MyCreatedContests from "../pages/dashboard/contestCreator/MyCreatedContests";
import SubmittedTask from "../pages/dashboard/contestCreator/SubmittedTask";
import EditContest from "../pages/dashboard/contestCreator/EditContest";
import SubmittedTasks from "../pages/dashboard/contestCreator/SubmittedTask";
import DashboardHome from "../layout/Dashboard/DashboardHome";
import Errorpage from "../pages/Errorpage/Errorpage";
import Leaderboard from "../pages/dashboard/Leaderboard/Leaderboard";
import ContactUs from "../pages/ContactUs/ContactUs";
import Guidelines from "../pages/Guidlines/Guidelines";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "all-contests",
        element: <AllContests></AllContests>,
      },
      {
        path: "contest-details/:id",
        element: <DetailsContest></DetailsContest>,
      },
      {
        path: "/beAcreator",
        element: (
          <PrivateRoutes>
            <BeAcontestCreator></BeAcontestCreator>
          </PrivateRoutes>
        ),
      },
      {
        path: "/add-contest",
        element: <AddContest></AddContest>,
      },
      {
        path: "/packages",
        element: <PackagesPage></PackagesPage>,
      },
      {
        path: "/resources",
        element: <ResourcesPage></ResourcesPage>,
      },
      {
        path: "/contact-us",
        element: <ContactUs></ContactUs>
      },
      {
        path: '/guidelines',
        element: <Guidelines></Guidelines>
      }
    ],
  },
  {
    path: "/",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoutes>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRoutes>
    ),
    children: [
      {
        path: '',
        element:<DashboardHome></DashboardHome>
      },
      {
        path: 'leaderboard',
        element: <Leaderboard></Leaderboard>
      },
      {
        path: "my-contests",
        element: <MyContests></MyContests>,
      },
      {
        path: "payment/:contestId",
        element: <Payment></Payment>,
      },
      {
        path: "payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "payment-cancelled",
        element: <PaymentCancelled></PaymentCancelled>,
      },
      {
        path: "payment-history",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "approve-creator",
        element: (
          <AdminRoute>
            <ApproveCreator></ApproveCreator>
          </AdminRoute>
        ),
      },
      {
        path: "user-management",
        element: (
          <AdminRoute>
            <UsersManagement></UsersManagement>
          </AdminRoute>
        ),
      },
      {
        path: "manage-contests",
        element: (
          <AdminRoute>
            <ManageContests></ManageContests>
          </AdminRoute>
        ),
      },
      {
        path: "my-participated-contests",
        element: <MyParticipatedContests></MyParticipatedContests>,
      },
      {
        path: "my-winning-contests",
        element: <MyWinningContests></MyWinningContests>,
      },
      {
        path: "add-contest",
        element: <AddContest></AddContest>,
      },
      {
        path: "my-profile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "my-created-contest",
        element: <MyCreatedContests></MyCreatedContests>,
      },
      {
        path: "submitted-task",
        element: <SubmittedTask></SubmittedTask>,
      },
      {
        path: "edit-contest/:id",
        element: <EditContest></EditContest>,
      },
      {
        path: "submissions/:contestId",
        element: <SubmittedTasks></SubmittedTasks>
      },
      {
        path: 'my-profile',
        element: <MyProfile></MyProfile>
      }
    ],
  },
  {
    path: "*",
    element: <Errorpage></Errorpage>
  }
]);
