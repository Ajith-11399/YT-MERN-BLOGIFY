import { getEnv } from '@/helpers/getEnv';
import { useFetch } from '@/hooks/useFetch';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import BlogCard from '../BlogCard';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Blogs = () => {
  
    const [[activeIndex, direction], setActiveIndex] = useState([0, 0]);
    const [isHovered, setIsHovered] = useState(false);

    const { data: blogData, loading, error } = useFetch(`${getEnv("VITE_BACKEND_URL")}/blog/blogs`,{
        method: 'get',
        credentials: 'include',
    });

    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {setActiveIndex(([prev]) => [prev + 1, 1])}, 2500);
        return () => clearInterval(interval);
    }, [isHovered]);

    if (loading)
        return <p className="text-center text-lg text-gray-600 py-20">Loading blogs...</p>;
    if (error)
        return <p className="text-center text-red-600 py-20">Failed to load blogs.</p>;

    const blogsArray = Array.isArray(blogData?.blogs) ? blogData.blogs : [];
    if (blogsArray.length === 0)
        return <p className="text-center text-gray-500 py-20">No blogs available.</p>;

    const indexInArrayScope =
        ((activeIndex % blogsArray.length) + blogsArray.length) % blogsArray.length;

    const visibleItems = [...blogsArray, ...blogsArray].slice(
        indexInArrayScope,
        indexInArrayScope + 3
    );

    const handleClick = (newDirection) => {
        setActiveIndex(([prev]) => [prev + newDirection, newDirection]);
    };

    const variants = {
        enter: ({ direction }) => ({ scale: 0.75, x: direction < 1 ? 80 : -80, opacity: 0}),
        center: ({ position }) => ({ scale: position() === 'center' ? 1.05 : 0.9, x: 0, zIndex: zIndex[position()], opacity: 1}),
        exit: ({ direction }) => ({ scale: 0.75, x: direction < 1 ? -80 : 80, opacity: 0}),
    };

    const zIndex = { left: 1, center: 2, right: 1, };

    return (
        <section className="w-full px-6 pt-16">
            <div className="max-w-7xl mx-auto text-center">
                {/* Blog Carousel */}
                <AnimatePresence mode="popLayout" initial={false}>
                    <div
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
                    >
                        {visibleItems.map((item, index) => (
                            <motion.div
                                key={item._id || index}
                                layout
                                custom={{
                                  direction,
                                  position: () => {
                                    if (item === visibleItems[0]) return 'left';
                                    if (item === visibleItems[1]) return 'center';
                                    return 'right';
                                  },
                                }}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ type: 'spring', stiffness: 180, damping: 24, mass: 1.2, }}
                                className="rounded-2xl shadow-xl bg-white overflow-hidden"
                            >
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }}>
                                    <BlogCard props={item} />
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </AnimatePresence>
                  
                {/* Carousel Controls */}
                <div className="flex justify-center gap-6 mt-12">
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleClick(-1)}
                        className="w-12 h-12 rounded-full bg-white hover:bg-blue-100 transition-all flex items-center justify-center text-2xl text-gray-600"
                        aria-label="Previous"
                    >
                        <IoIosArrowBack />
                    </motion.button>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleClick(1)}
                        className="w-12 h-12 rounded-full bg-white hover:bg-blue-100 transition-all flex items-center justify-center text-2xl text-gray-600"
                        aria-label="Next"
                    >
                        <IoIosArrowForward />
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default Blogs;