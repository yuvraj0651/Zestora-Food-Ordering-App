import { lazy } from "react";
const AuthPage = lazy(() => import("../Pages/Auth/AuthPage"));
const Homepage = lazy(() => import("../Pages/Home/Homepage"));
const About = lazy(() => import("../Pages/About/About"));
const MenuPage = lazy(() => import("../Pages/Menu/MenuPage"));
const ProductDetails = lazy(() => import("../Pages/Product Details/ProductDetails"));
const CartPage = lazy(() => import("../Pages/Cart/CartPage"));
const Checkout = lazy(() => import("../Pages/Checkout/Checkout"));
const Wishlist = lazy(() => import("../Pages/WIshlist/Wishlist"));
const Compare = lazy(() => import("../Pages/Compare/Compare"));
const Profile = lazy(() => import("../Pages/Profile/Profile"));
const NotFound = lazy(() => import("../Pages/NotFound/NotFound"));
const UnAuthorized = lazy(() => import("../Pages/UnAuthorized/UnAuthorized"));
const ThankYou = lazy(() => import("../Pages/ThankYou/ThankYou"));
const OrderTracking = lazy(() => import("../Pages/OrderTracking/OrderTracking"));

export const ComponentMap = {
    AuthPage,
    Homepage,
    About,
    MenuPage,
    ProductDetails,
    CartPage,
    Checkout,
    Wishlist,
    Compare,
    Profile,
    NotFound,
    UnAuthorized,
    ThankYou,
    OrderTracking
};