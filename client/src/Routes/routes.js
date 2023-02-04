import { createBrowserRouter } from "react-router-dom"
import LeadUpload from "../Dashboard/Admin/Lead/LeadUpload";
import UploadLead from "../Dashboard/Admin/UploadLead";
import Dashboard from "../Dashboard/Dashboard";
import DashBoardLayout from "../Layout/DashBoardLayout";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Login/Signup";
import PrivateRoutes from "./PrivateRoutes";

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
                path: '/dashboard/lead-upload',
                element: <LeadUpload></LeadUpload>
            },
            // {
            //     path: '/dashboard/myProducts',
            //     element: <MyProducts></MyProducts>
            // },
            // {
            //     path: '/dashboard/myWishlists',
            //     element: <MyWishlists></MyWishlists>
            // },
            // {
            //     path: '/dashboard/addProducts',
            //     element: <SellerRoute><AddProduct></AddProduct></SellerRoute>
            // },
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
