import Layout from "../components/Global/Layout";
import LoginPage from "../pages/auth/LoginPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import VerifyOtpPage from "../pages/auth/VerifyOtpPage";
import ChangePasswordPage from "../pages/auth/ChangePasswordPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import BookingDetailsPage from "../pages/dashboard/BookingDetailsPage";
import Cookies from "js-cookie";
import { Navigate, Route, Routes } from "react-router-dom";
import CaptchaDemo from "../pages/auth/CaptchaDemo";
import LabOrders from "../pages/labOrders/LabOrders";
import LabOrderdetailsPage from "../pages/labOrders/LabOrderdetailsPage";
import EnrolledPatientsPage from "../pages/enrolledPatients/EnrolledPatientsPage";

const isAuthenticated = () => {
  return Cookies.get("token") !== undefined;
};

const AuthRoute = ({ element, redirectTo }) => {
  return isAuthenticated() ? element : <Navigate to={redirectTo} />;
};

const PublicRoute = ({ element, redirectTo }) => {
  return isAuthenticated() ? <Navigate to={redirectTo} /> : element;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={<PublicRoute element={<LoginPage />} redirectTo={"/"} />}
      />
      <Route
        path="/captcha-demo"
        element={<PublicRoute element={<CaptchaDemo />} redirectTo={"/"} />}
      />
      <Route
        path="/verify-email"
        element={
          <PublicRoute element={<ForgotPasswordPage />} redirectTo={"/"} />
        }
      />
      <Route
        path="/verify-otp"
        element={<PublicRoute element={<VerifyOtpPage />} redirectTo={"/"} />}
      />
      <Route
        path="/reset-password"
        element={
          <PublicRoute element={<ChangePasswordPage />} redirectTo={"/"} />
        }
      />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <AuthRoute
            element={<Layout pages={<DashboardPage />} />}
            redirectTo={"/login"}
          />
        }
      />
      <Route
        path="/bookings/:id"
        element={
          <AuthRoute
            element={<Layout pages={<BookingDetailsPage />} />}
            redirectTo={"/login"}
          />
        }
      />

      <Route
        path="/lab-orders"
        element={
          <AuthRoute
            element={<Layout pages={<LabOrders />} />}
            redirectTo={"/login"}
          />
        }
      />
      <Route
        path="/lab-orders/:id"
        element={
          <AuthRoute
            element={<Layout pages={<LabOrderdetailsPage />} />}
            redirectTo={"/login"}
          />
        }
      />

      <Route
        path="/enrolled-patients"
        element={
          <AuthRoute
            element={<Layout pages={<EnrolledPatientsPage />} />}
            redirectTo={"/login"}
          />
        }
      />
    </Routes>
  );
};
// {
//   title: "Login Page",
//   url: "/login",
//   page: <LoginPage />,
// },
// {
//   title: "Forgot Password",
//   url: "/verify-email",
//   page: <ForgotPasswordPage />,
// },
// {
//   title: "Verify OTP",
//   url: "/verify-otp",
//   page: <VerifyOtpPage />,
// },
// {
//   title: "Reset Password",
//   url: "/reset-password",
//   page: <ChangePasswordPage />,
// },
// {
//   title: "Dashboard",
//   url: "/",
//   page: <Layout pages={<DashboardPage />} />,
// },
// {
//   title: "Dashboard",
//   url: "/bookings/:id",
//   page: <Layout pages={<BookingDetailsPage />} />,
// },

export default AppRoutes;
