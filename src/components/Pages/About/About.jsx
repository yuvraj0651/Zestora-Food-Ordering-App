import { motion } from "framer-motion";
import { Sparkles, Rocket, ShieldCheck, Clock } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
};

const About = () => {

    const { aboutData } = useSelector((state) => state.about);

    const iconMap = {
        Sparkles,
        Rocket,
        ShieldCheck,
        Clock
    };

    const positionClasses = {
        top: "absolute -top-4 left-1/2 -translate-x-1/2",
        bottom: "absolute -bottom-4 left-1/2 -translate-x-1/2",
        left: "absolute -left-4 top-1/2 -translate-y-1/2",
        right: "absolute -right-4 top-1/2 -translate-y-1/2",
        topLeft: "absolute top-[10%] left-[7%]",
        bottomRight: "absolute bottom-[10%] right-[7%]",
        topRight: "absolute top-[10%] right-[7%]",
        bottomLeft: "absolute bottom-[10%] left-[7%]"
    };

    return (
        <div className="bg-white overflow-hidden">

            <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white py-24 px-6 text-center">

                <motion.h1
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-bold mb-6"
                >
                    {aboutData?.heroSection?.title}
                </motion.h1>

                <motion.p
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-3xl mx-auto text-gray-300 text-lg"
                >
                    {aboutData?.heroSection?.description}
                </motion.p>

            </section>

            <section className="py-20 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center dark:bg-slate-800/90">

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-3xl font-bold mb-6 dark:text-slate-100">{aboutData?.missionVisionSection?.mission?.title}</h2>
                    <p className="text-gray-600 leading-relaxed dark:text-slate-50">
                        {aboutData?.missionVisionSection?.mission?.description}
                    </p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-gray-100 rounded-2xl p-10 shadow-lg dark:bg-slate-600/80"
                >
                    <h2 className="text-3xl font-bold mb-6 dark:text-slate-100">{aboutData?.missionVisionSection?.vision?.title}</h2>
                    <p className="text-gray-600 leading-relaxed dark:text-slate-50">
                        {aboutData?.missionVisionSection?.vision?.description}
                    </p>
                </motion.div>

            </section>

            <section className="bg-gray-50 py-20 px-6 dark:bg-slate-700/90">
                <div className="max-w-7xl mx-auto text-center">

                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        transition={{ duration: 0.8 }}
                        className="text-3xl font-bold mb-12 dark:text-slate-100"
                    >
                        {aboutData?.whyChooseSection?.title}
                    </motion.h2>

                    <div className="grid md:grid-cols-4 gap-8">

                        {aboutData?.whyChooseSection?.features?.map((item, i) => {
                            const Icon = iconMap[item.icon];

                            return (
                                <motion.div
                                    key={i}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={fadeUp}
                                    transition={{ duration: 0.6, delay: i * 0.2 }}
                                    className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition hover:-translate-y-2 dark:bg-slate-500/80"
                                >
                                    <Icon size={40} className="mx-auto mb-4 text-black dark:text-slate-50" />
                                    <h3 className="font-semibold text-lg mb-2 dark:text-slate-100">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm dark:text-slate-50">
                                        {item.description}
                                    </p>
                                </motion.div>
                            );
                        })}

                    </div>
                </div>
            </section>

            <section className="food-category-catalogue py-14 px-6 dark:bg-slate-900/80">
                <div className="food-catalogue-top text-center">
                    <h4 className="capitalize font-[600] mb-[0.7rem] tracking-wide text-2xl dark:text-slate-100">{aboutData?.foodCatalogueSection?.title}</h4>
                    <div className="max-w-[55rem] mx-auto">
                        <p className="tracking-wide leading-[1.7rem] font-[500] text-[1rem] dark:text-slate-50">{aboutData?.foodCatalogueSection?.description}</p>
                    </div>
                </div>
                <div className="food-catalogue-bottom mt-12 w-full flex justify-center py-[0.5ren]">
                    <div className="relative size-[22rem] flex items-center justify-center">

                        {/* Center Circle */}
                        <div className="border-2 border-dashed border-red-700 p-[0.4rem] rounded-full dark:border-slate-100">
                            <div className="size-[12rem] flex items-center justify-center rounded-full bg-red-100 shadow-sm shadow-[#ccc] border border-red-400 dark:bg-slate-600/70 dark:border-slate-100">
                                <h4 className="capitalize font-[500] tracking-wide text-[1rem] text-center p-2 leading-[1.8rem] text-red-900 dark:text-slate-50">
                                    {aboutData?.foodCatalogueSection?.centerText}
                                </h4>
                            </div>
                        </div>
                        {
                            aboutData?.foodCatalogueSection?.categories?.map((item, index) => (
                                <div
                                    key={`${item.name} - ${index}`}
                                    className={`${positionClasses[item.position]} text-center`}>
                                    <img src={item.image} alt="pizza" className="w-[3.2rem] mx-auto" />
                                    <span className="text-[0.9rem] font-semibold tracking-wide dark:text-slate-50">{item.name}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>

            <section className="py-20 px-6 bg-black text-white">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 text-center">

                    {aboutData?.statsSection?.stats?.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.2 }}
                        >
                            <h3 className="text-4xl font-bold mb-2">
                                {stat.number}
                            </h3>
                            <p className="text-gray-400">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}

                </div>
            </section>

            <section className="py-20 px-6 text-center bg-gradient-to-r from-slate-900 to-black text-white">

                <motion.h2
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    transition={{ duration: 0.8 }}
                    className="text-3xl font-bold mb-6"
                >
                    {aboutData?.ctaSection?.title}
                </motion.h2>

                <Link to={aboutData?.ctaSection?.buttonLink}>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-black px-8 py-3 rounded-lg font-semibold"
                    >
                        {aboutData?.ctaSection?.buttonText}
                    </motion.button>
                </Link>

            </section>

        </div>
    );
};

export default About;
