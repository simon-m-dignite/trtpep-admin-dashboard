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
import ProductsPage from "../pages/products/ProductsPage";
import EditProductsPage from "../pages/products/EditProductsPage";
import FaqsPage from "../pages/faqs/FaqsPage";
import AddFaqs from "../pages/faqs/AddFaqs";
import EditFaqs from "../pages/faqs/EditFaqs";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import AddUpdatePrivacyPolicy from "../pages/PrivacyPolicy/AddUpdatePrivacyPolicy";
import CustomersPage from "../pages/customers/CustomersPage";
import CancelationPolicy from "../pages/cancelationPolicy/CancelationPolicyPage";
import UpdateCancelationPolicyPage from "../pages/cancelationPolicy/UpdateCancelationPolicyPage";
import TermsOfServicePage from "../pages/TermsOfServicePolicy/TermsOfServicePage";
import UpdateTermsOfService from "../pages/TermsOfServicePolicy/UpdateTermsOfService";
import BlogsPage from "../pages/blogs/BlogsPage";
import BlogPage from "../pages/blogs/BlogPage";
import UpdateBlog from "../pages/blogs/UpdateBlog";
import AddBlogPage from "../pages/blogs/AddBlogPage";
import CustomerDetailsPage from "../pages/customers/CustomerDetailsPage";
import PricesPage from "../pages/prices/PricesPage";
import UpdatePricesPage from "../pages/prices/UpdatePricesPage";

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

      <Route
        path="/products"
        element={
          <AuthRoute
            element={<Layout pages={<ProductsPage />} />}
            redirectTo={"/login"}
          />
        }
      />

      <Route
        path="/products/update-pricing"
        element={
          <AuthRoute
            element={<Layout pages={<EditProductsPage />} />}
            redirectTo={"/login"}
          />
        }
      />

      <Route
        path="/faqs"
        element={
          <AuthRoute
            element={<Layout pages={<FaqsPage />} />}
            redirectTo={"/login"}
          />
        }
      />

      <Route
        path="/faqs/add-faqs"
        element={
          <AuthRoute
            element={<Layout pages={<AddFaqs />} />}
            redirectTo={"/login"}
          />
        }
      />

      <Route
        path="/faqs/update-faq/:id"
        element={
          <AuthRoute
            element={<Layout pages={<EditFaqs />} />}
            redirectTo={"/login"}
          />
        }
      />

      <Route
        path="/customers"
        element={
          <AuthRoute
            element={<Layout pages={<CustomersPage />} />}
            redirectTo={"/login"}
          />
        }
      />

      <Route
        path="/customers/customer-details/:_id"
        element={
          <AuthRoute
            element={<Layout pages={<CustomerDetailsPage />} />}
            redirectTo={"/login"}
          />
        }
      />

      <Route
        path="/policy/privacy-policy"
        element={
          <AuthRoute
            element={<Layout pages={<PrivacyPolicy />} />}
            redirectTo={"/login"}
          />
        }
      />

      <Route
        path="/policy/update-privacy-policy"
        element={
          <AuthRoute
            element={<Layout pages={<AddUpdatePrivacyPolicy />} />}
            redirectTo={"/login"}
          />
        }
      />

      <Route
        path="/policy/cancelation-policy"
        element={
          <AuthRoute
            element={<Layout pages={<CancelationPolicy />} />}
            redirectTo={"/login"}
          />
        }
      />

      <Route
        path="/policy/update-cancelation-policy"
        element={
          <AuthRoute
            element={<Layout pages={<UpdateCancelationPolicyPage />} />}
            redirectTo={"/login"}
          />
        }
      />

      <Route
        path="/policy/terms-of-service"
        element={
          <AuthRoute
            element={<Layout pages={<TermsOfServicePage />} />}
            redirectTo={"/login"}
          />
        }
      />

      <Route
        path="/policy/update-terms-of-service"
        element={
          <AuthRoute
            element={<Layout pages={<UpdateTermsOfService />} />}
            redirectTo={"/login"}
          />
        }
      />

      <Route
        path="/blogs"
        element={
          <AuthRoute
            element={<Layout pages={<BlogsPage />} />}
            redirectTo={"/login"}
          />
        }
      />

      <Route
        path="/blogs/add-new-blog"
        element={
          <AuthRoute
            element={<Layout pages={<AddBlogPage />} />}
            redirectTo={"/login"}
          />
        }
      />

      <Route
        path="/blogs/blog/:_id"
        element={
          <AuthRoute
            element={<Layout pages={<BlogPage />} />}
            redirectTo={"/login"}
          />
        }
      />

      <Route
        path="/blogs/update-blog/:_id"
        element={
          <AuthRoute
            element={<Layout pages={<UpdateBlog />} />}
            redirectTo={"/login"}
          />
        }
      />

      <Route
        path="/prices"
        element={
          <AuthRoute
            element={<Layout pages={<PricesPage />} />}
            redirectTo={"/login"}
          />
        }
      />
      <Route
        path="/prices/update-prices/:_id"
        element={
          <AuthRoute
            element={<Layout pages={<UpdatePricesPage />} />}
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
