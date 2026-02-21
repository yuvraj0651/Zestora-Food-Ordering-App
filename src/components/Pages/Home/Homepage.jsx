import { useEffect } from 'react'
import AISuggestions from './AI Suggestions/AISuggestions'
import CategorySlider from './CategorySlider/CategorySlider'
import FeaturedProducts from './FeaturedProducts/FeaturedProducts'
import FloatingAd from './FloatingAd/FloatingAd'
import HeroCarousel from './HeroCarousel/HeroCarousel'
import Newsletter from './Newsletter/Newsletter'
import TrendingDeals from './TrendingDeals/TrendingDeals'
import { useDispatch } from 'react-redux';
import { fetchHomeData } from "../../Services/Home/HomeThunk";

const Homepage = ({ filteredItems }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchHomeData());
    }, [dispatch]);

    return (
        <>
            <section id='home-page' className="homepage-section dark:bg-slate-700">
                {/* Hero Section */}
                <HeroCarousel />
                {/* Category Section */}
                <CategorySlider />
                {/* Featured Products */}
                <FeaturedProducts filteredItems={filteredItems} />
                {/* Floating Ad */}
                <FloatingAd />
                {/* Trending Deals Section */}
                <TrendingDeals />
                {/* AI Suggestions */}
                <AISuggestions />
                {/* Newsletter Sections */}
                <Newsletter />
            </section>
        </>
    )
}

export default Homepage