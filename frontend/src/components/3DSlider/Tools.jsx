import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion, useScroll, easeIn } from 'framer-motion';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import reactJs from '../../assets/reactJs.png';
import nodeJs from '../../assets/nodeJs.svg';
import expressJs from '../../assets/expressJs.svg';
import mongoDb from '../../assets/mongoDB.svg';
import tailwindCSS from '../../assets/tailwindCSS.png';
import redux from '../../assets/redux.png';
import google from '../../assets/google.png';
import cloudinary from '../../assets/cloudinary.webp';
import ckeEditor from '../../assets/cke-editor-5.png';
import framerMotion from '../../assets/framer-motion.png';
import gitHub from '../../assets/github.png';
import vercel from '../../assets/vercel.png';

const Tools = () => {

    const tools = [
        {
            img: reactJs,
            tech: "ReactJs",
            desc: "Frontend library for building dynamic UIs"
        },
        {
            img: nodeJs,
            tech: "NodeJs",
            desc: "Backend runtime environment for handling server-side logic"
        },
        {
            img: expressJs,
            tech: "ExpressJs",
            desc: "Lightweight backend framework for Node.js"
        },
        {
            img: mongoDb,
            tech: "MongoDB",
            desc: "NoSQL database for storing blog and user data"
        },
        {
            img: tailwindCSS,
            tech: "TailwindCSS",
            desc: "Utility-first CSS framework for responsive styling"
        },
        {
            img: redux,
            tech: "Redux",
            desc: "State management for handling global app state"
        },
        {
            img: google,
            tech: "Google Auth",
            desc: "Secure authentication using Google Sign-In"
        },
        {
            img: cloudinary,
            tech: "Cloudinary",
            desc: "Cloud storage for managing blog images and media"
        },
        {
            img: ckeEditor,
            tech: "CKE Editor 5",
            desc: "Rich text editor for writing and formatting blog posts"
        },
        {
            img: framerMotion,
            tech: "Framer Motion",
            desc: "Animations and transitions to enhance UI experience"
        },
        {
            img: gitHub,
            tech: "GitHub",
            desc: "Version control and code collaboration"
        },
        {
            img: vercel,
            tech: "Vercel",
            desc: "Web hosting and deployment platform"
        }
    ];

    return (
        <motion.div initial={{y: 20, opacity: 0}} whileInView={{y: 0, opacity: 1}} transition={{duration: 0.6, delay: 0.3}} className="w-full px-4">
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={30}
                slidesPerView={3}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: false,
                }}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                    430: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1199: { slidesPerView: 4 },
                }}
            >
                {tools.map((tool, index) => (
                    <SwiperSlide key={index}>
                        <motion.div className="bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md border border-white transition-transform ease-in-out duration-300 shadow-lg p-6 rounded-2xl flex flex-col items-center text-center h-full">
                            <img src={tool.img} alt={tool.tech} className="w-20 h-20 object-contain mb-4 drop-shadow-md" />
                            <h3 className="font-bold text-xl text-black tracking-wide">{tool.tech}</h3>
                            <p className="text-sm text-black/80 mt-2">{tool.desc}</p>
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </motion.div>
    );
};

export default Tools;
