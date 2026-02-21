import { motion } from "framer-motion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFoodItems } from "../../../Services/FoodItems/FoodThunk";
import { Link } from "react-router";
import { AddingCart } from "../../../Services/Cart/CartThunk";
import { addToCart } from "../../../redux/Slices/CartSlice";
import LazyImage from "../../../UI/LazyImage/LazyImage";

const FeaturedProducts = ({ filteredItems }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFoodItems());
    }, [dispatch]);

    // const { foodItems } = useSelector((state) => state.food);
    const { homeData } = useSelector((state) => state.home);

    const cartItems = useSelector((state) => state.cartLocal.cartItems);

    const addProductHandler = (product) => {
        dispatch(AddingCart(product))
            .unwrap()
            .then(() => {
                dispatch(addToCart(product));
                alert("Product Added To Cart");
            })
            .catch((error) => {
                alert(error);
            });
    }

    return (
        <div className="px-4 py-10 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 dark:text-slate-50">{homeData?.featuredSection?.title}</h2>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                    hidden: {},
                    visible: {
                        transition: {
                            staggerChildren: 0.15
                        }
                    }
                }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
                {filteredItems.map((food , index) => {
                    const isInCart = cartItems.some((item) => item?.idMeal === food?.idMeal);
                    return (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-2 transition"
                        >
                            <LazyImage
                                src={food.strMealThumb ?? "No Image"}
                                alt=""
                                className="h-40 w-full object-cover"
                            />
                            <div className="p-4">
                                <h3 className="font-semibold">{food.strMeal || "Delicious Meal"}</h3>
                                <p className="text-sm text-gray-500 font-[600]">₹{food.strMealPrice}</p>
                                <div className="view-food-block mt-4">
                                    <Link to={`/menu/${food.id}`}>
                                        <span className="pl-1 capitalize rounded-[7px] tracking-wide font-[500] text-[0.9rem] hover:underline">view details</span>
                                    </Link>
                                </div>
                                <button
                                    onClick={() => addProductHandler(food)}
                                    className="mt-3 w-full bg-black text-white py-2 rounded-lg text-sm hover:bg-gray-800 transition">
                                    {isInCart ? "Added To Cart" : "Add to Cart"}
                                </button>
                            </div>
                        </div>
                    )
                })}
            </motion.div>
        </div >
    );
};

export default FeaturedProducts;
