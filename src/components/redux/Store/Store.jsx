import { configureStore } from "@reduxjs/toolkit";
import AuthThunk from "../../Services/Auth/AuthThunk";
import FoodThunk from "../../Services/FoodItems/FoodThunk";
import CartThunk from "../../Services/Cart/CartThunk";
import CartSlice from "../../redux/Slices/CartSlice";
import CheckoutThunk from "../../Services/Checkout/CheckoutThunk";
import WishlistThunk from "../../Services/Wishlist/WishlistThunk";
import CompareThunk from "../../Services/Compare/CompareThunk";
import WishlistSlice from "../Slices/WishlistSlice";
import CompareSlice from "../Slices/CompareSlice";
import HeaderThunk from "../../Services/Settings/SettingsThunk";
import FooterThunk from "../../Services/Footer/FooterThunk";
import HomeThunk from "../../Services/Home/HomeThunk";
import AboutThunk from "../../Services/About/AboutThunk";
import MenuThunk from "../../Services/Menu/MenuThunk";
import ProductDetailThunk from "../../Services/ProductDetail/ProductDetailThunk";

const Store = configureStore({
    reducer: {
        // Thunk
        auth: AuthThunk,
        food: FoodThunk,
        cartApi: CartThunk,
        checkout: CheckoutThunk,
        wishlist: WishlistThunk,
        compare: CompareThunk,
        header: HeaderThunk,
        footer: FooterThunk,
        home: HomeThunk,
        about: AboutThunk,
        menu: MenuThunk,
        productDetail: ProductDetailThunk,

        // Slice
        cartLocal: CartSlice,
        wishlistLocal: WishlistSlice,
        compareLocal: CompareSlice,
    },
});

export default Store;