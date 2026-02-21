import { useEffect, useRef, useState } from 'react'

const LazyImage = ({ src, className, alt }) => {

    const [isVisible, setIsVisible] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const imageRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            })
        }, {
            threshold: 0.2,
            rootMargin: "100px",
        });

        if (imageRef.current) observer.observe(imageRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div className='relative w-full h-40 overflow-hidden rounded-lg'>
            {
                !isLoaded && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                )
            }
            <img
                ref={imageRef}
                src={isVisible ? src : ""}
                alt={alt}
                onLoad={() => {
                    setIsLoaded(true);
                }}
                className={`${className} transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
            />
        </div>
    )
}

export default LazyImage