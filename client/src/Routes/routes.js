import { createBrowserRouter } from "react-router-dom"
import LeadUpload from "../Dashboard/Admin/Lead/LeadUpload";
import TotalAdmission from "../Dashboard/Admin/Lead/TotalAdmission";
import TotalClose from "../Dashboard/Admin/Lead/TotalClose";
import UploadLead from "../Dashboard/Admin/UploadLead";
import Dashboard from "../Dashboard/Dashboard";
import MyAdmission from "../Dashboard/Employee/MyAdmission";
import MyClose from "../Dashboard/Employee/MyClose";
import MyLead from "../Dashboard/Employee/MyLead";
import OnlineStudent from "../Dashboard/Employee/OnlineStudent";
import OfflineStudent from "../Dashboard/Employee/OfflineStudent";
import DashBoardLayout from "../Layout/DashBoardLayout";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Login/Signup";
import PrivateRoutes from "./PrivateRoutes";
import OfflineStudents from "../Dashboard/Admin/Lead/OfflineStudents";
import OnlineStudents from "../Dashboard/Admin/Lead/OnlineStudents";
import SeminarInterested from "../Dashboard/Employee/SeminarInterested";
import TodayFollowup from "../Dashboard/Employee/TodayFollowup";
import TotalAdd from "../Dashboard/Head/TotalAdd";
import TClose from "../Dashboard/Head/TClose";
import OnlineSt from "../Dashboard/Head/OnlineSt";
import OfflineSt from "../Dashboard/Head/OfflineSt";
import UserSetting from "../Dashboard/Admin/Settings/UserSetting";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        //   errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            // {
            //     path: '/blog',
            //     element: <Blog />,
            // },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/signup',
                element: <Signup />,
            },
            // {
            //     path: "/categorie/:id",
            //     element: <PrivateRoutes><CategoryDetails></CategoryDetails></PrivateRoutes>,
            //     loader: ({ params }) =>
            //         fetch(
            //             `https://used-products-resale-server-vert.vercel.app/categorie/${params.id}`
            //         ),
            // },
        ],
    },
    {
        path: '/dashboard',
        element: <PrivateRoutes><DashBoardLayout></DashBoardLayout></PrivateRoutes>,
        // errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>
            },
            {
                path: '/dashboard/upload-lead',
                element: <UploadLead></UploadLead>
            },
            {
                path: '/dashboard/total-admission',
                element: <TotalAdmission></TotalAdmission>
            },
            {
                path: '/dashboard/total-close',
                element: <TotalClose></TotalClose>
            },
            {
                path: '/dashboard/online-students',
                element: <OnlineStudents></OnlineStudents>
            },
            {
                path: '/dashboard/offline-students',
                element: <OfflineStudents></OfflineStudents>
            },
            {
                path: '/dashboard/lead-upload',
                element: <LeadUpload></LeadUpload>
            },
            {
                path: '/dashboard/settings',
                element: <UserSetting></UserSetting>
            },
            {
                path: '/dashboard/my-lead',
                element: <MyLead></MyLead>
            },
            {
                path: '/dashboard/my-admission',
                element: <MyAdmission></MyAdmission>
            },
            {
                path: '/dashboard/my-close',
                element: <MyClose></MyClose>
            },
            {
                path: '/dashboard/online-student',
                element: <OnlineStudent></OnlineStudent>
            },
            {
                path: '/dashboard/offline-student',
                element: <OfflineStudent></OfflineStudent>
            },
            {
                path: '/dashboard/seminar-interested',
                element: <SeminarInterested></SeminarInterested>
            },
            {
                path: '/dashboard/today-followup',
                element: <TodayFollowup></TodayFollowup>
            },
            {
                path: '/dashboard/head-admission',
                element: <TotalAdd></TotalAdd>
            },
            {
                path: '/dashboard/head-close',
                element: <TClose></TClose>
            },
            {
                path: '/dashboard/head-online',
                element: <OnlineSt></OnlineSt>
            },
            {
                path: '/dashboard/head-offline',
                element: <OfflineSt></OfflineSt>
            },
            // {
            //     path: '/dashboard/sellerProducts',
            //     element: <SellerRoute><SellerProducts></SellerProducts></SellerRoute>
            // },

            // {
            //     path: '/dashboard/allSeller',
            //     element: <AdminRoute><AllSeller></AllSeller></AdminRoute>
            // },
            // {
            //     path: '/dashboard/allBuyer',
            //     element: <AdminRoute><AllBuyers></AllBuyers></AdminRoute>
            // },
            // {
            //     path: '/dashboard/adddoctor',
            //     element: <AdminRoutes><AddDoctor></AddDoctor></AdminRoutes>
            // },
            // {
            //     path: '/dashboard/managedoctors',
            //     element: <AdminRoutes><ManageDoctors></ManageDoctors></AdminRoutes>
            // },
            // {
            //     path: '/dashboard/payment/:id',
            //     element: <Payment></Payment>,
            //     loader: ({ params }) => fetch(`https://used-products-resale-server-vert.vercel.app/bookings/${params.id}`)
            // },

        ]
    },

])

export default router
