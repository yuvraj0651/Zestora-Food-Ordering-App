import './App.css'
import { Suspense, useEffect, useMemo, useState } from 'react';
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import Footer from './components/Layout/Footer/Footer'
import Header from './components/Layout/Header/Header'
import ErrorBoundary from './components/Error Boundary/ErrorBoundary';
import useDebounce from "./components/Hooks/useDebounce";
import ThemeProvider from './components/context/Theme/ThemeProvider';
import Chatbot from "./components/Pages/Chatbot/Chatbot";
import { fetchHeaderData } from './components/Services/Settings/SettingsThunk';
import { fetchFooterData } from './components/Services/Footer/FooterThunk';
import { fetchHomeData } from './components/Services/Home/HomeThunk';
import { fetchAboutData } from "./components/Services/About/AboutThunk";
import { fetchMenuData } from "./components/Services/Menu/MenuThunk";
import { fetchProductDetailData } from "./components/Services/ProductDetail/ProductDetailThunk";
import RouteRenderer from './components/Routes/RouteRenderer';

function App() {

  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const { foodItems } = useSelector((state) => state.food);

  useEffect(() => {
    dispatch(fetchHeaderData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchFooterData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchHomeData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAboutData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchMenuData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProductDetailData());
  }, [dispatch]);

  const debouncedSearch = useDebounce(searchTerm, 500);

  const filteredItems = useMemo(() => {
    if (!debouncedSearch) return foodItems;

    return foodItems.filter((item) => {
      return item?.strMeal?.toLowerCase().includes(debouncedSearch.toLowerCase());
    })
  }, [debouncedSearch, foodItems]);

  return (
    <>
      <ThemeProvider>
        <Toaster position="top-right" reverseOrder={false} toastOptions={{
          duration: 3000,
          style: {
            fontSize: "14px",
          }
        }} />
        {/* Header Component */}
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <main className="main-section">
          <ErrorBoundary>
            <Suspense fallback={<div style={{ padding: "40px", textAlign: "center" }}>Loading...</div>}>
              <RouteRenderer filteredItems={filteredItems} />
            </Suspense>
            <Chatbot openAIKey={import.meta.env.VITE_OPENAI_API_KEY} />
          </ErrorBoundary>
        </main>
        {/* Footer Component */}
        <Footer />
      </ThemeProvider>
    </>
  )
}

export default App
