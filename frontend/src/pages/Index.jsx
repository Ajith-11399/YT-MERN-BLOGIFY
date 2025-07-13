import React, { useEffect, useState } from 'react';
import './pages.css';

// Hero Section
import bgHero from '../assets/bg-hero.jpg';
import handIcon from '../assets/hand-icon.png';

// About
import bgAbout from '../assets/bg-about.jpg';
import overviewImg from '../assets/blogify-overview.png';

import { Button } from '@/components/ui/button';
import { RouteHome } from '@/helpers/RouteName';
import { Link } from 'react-router-dom';

// Features
import bgFeatures from '../assets/bg-features.jpg';
import { MdLogin } from 'react-icons/md';
import { FaArrowRight, FaMagnifyingGlass, FaRegSquarePlus } from 'react-icons/fa6';
import { IoMdBook } from "react-icons/io";
import { FaUserPlus, FaUsers } from "react-icons/fa";
import { IoShieldHalfOutline } from 'react-icons/io5';

// Technologies
import bgTech from '../assets/bg-technology.jpg';
import reactJs from '../assets/reactJs.png';
import nodeJs from '../assets/nodeJs.svg';
import expressJs from '../assets/expressJs.svg';
import mongoDb from '../assets/mongoDB.svg';
import tailwindCSS from '../assets/tailwindCSS.png';
import redux from '../assets/redux.png';
import google from '../assets/google.png';
import cloudinary from '../assets/cloudinary.webp';
import ckeEditor from '../assets/cke-editor-5.png';
import framerMotion from '../assets/framer-motion.png';
import gitHub from '../assets/github.png';
import vercel from '../assets/vercel.png';

// Blogs
import { motion, useScroll, easeIn } from 'framer-motion';
import bgBlog from '../assets/bg-blogs.jpg';
import Loading from '@/components/Loading';
import { useFetch } from '@/hooks/useFetch';
import { getEnv } from '@/helpers/getEnv';
import BlogCard from '@/components/BlogCard';

// Contact Us
import bgContact from '../assets/bg-contact.jpg';
import { MdEmail } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { LuMapPinned } from "react-icons/lu";
import { IoIosSend } from "react-icons/io";

// Footer
import bgFooter from '../assets/bg-footer.jpg';

const Index = () => {

    const { data: blogData, loading, error } = useFetch(`${getEnv('VITE_BACKEND_URL')}/blog/blogs`, {
        method: 'get',
        credentials: 'include',
    }); 

    const { scrollYProgress } = useScroll();
    const [ isScroll, setIsScroll ] = useState(false);
    const [ result, setResult ] = useState("")

    useEffect(()=> {
        window.addEventListener('scroll', ()=> {
            if(window.innerWidth >= 768 && scrollY >= 100){
                setIsScroll(true);
            } else {
                setIsScroll(false);
            }
        })
    }, []);

    const technologies = [
        {
            img: reactJs,
            tech: 'ReactJs',
            desc: 'Frontend library for building dynamic UIs',
        },
        {
            img: nodeJs,
            tech: 'NodeJs',
            desc: 'Backend runtime environment for handling server-side logic',
        },
        {
            img: expressJs,
            tech: 'ExpressJs',
            desc: 'Lightweight backend framework for Node.js',
        },
        {
            img: mongoDb,
            tech: 'MongoDB',
            desc: 'NoSQL database for storing blog and user data',
        },
        {
            img: tailwindCSS,
            tech: 'TailwindCSS',
            desc: 'Utility-first CSS framework for responsive styling',
        },
        {
            img: redux,
            tech: 'Redux',
            desc: 'State management for handling global app state',
        },
        {
            img: google,
            tech: 'Google Auth',
            desc: 'Secure authentication using Google Sign-In',
        },
        {
            img: cloudinary,
            tech: 'Cloudinary',
            desc: 'Cloud storage for managing blog images and media',
        },
        {
            img: ckeEditor,
            tech: 'CKE Editor 5',
            desc: 'Rich text editor for writing and formatting blog posts',
        },
        {
            img: framerMotion,
            tech: 'Framer Motion',
            desc: 'Animations and transitions to enhance UI experience',
        },
        {
            img: gitHub,
            tech: 'GitHub',
            desc: 'Version control and code collaboration',
        },
        {
            img: vercel,
            tech: 'Vercel',
            desc: 'Web hosting and deployment platform',
        },
    ];

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.target);
    
        formData.append("access_key", "ed3ea7ff-3301-458e-8ac2-855bfb2727ac");
    
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });
    
        const data = await response.json();
    
        if (data.success) {
          setResult("Form Submitted Successfully");
          event.target.reset();
        } else {
          console.log("Error", data);
          setResult(data.message);
        }
    };

    // Technologies Animation
    const smoothFadeVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: (i = 0) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: i * 0.1,
            },
        }),
    };


    if(loading) return <Loading />

    
    return (
    
        <>

            {/* Navbar */}
            <div className='container'>
                <div className={`w-full flex justify-between items-center fixed z-50 px-5 py-3 ${ isScroll ? 'backdrop-blur-md bg-white/20 shadow-lg transform-all duration-500' : 'bg-transparent transform-all duration-500' }`}>
                    <Link to={RouteHome}>
                        <p className='text-3xl font-bold text-blue-950 hover:scale-105 hover:transition-all hover:duration-300'>Blogify</p>
                    </Link>
                    <Button>
                        <Link to={RouteHome} className='flex items-center justify-center px-5 gap-2 py-2 hover:scale-105 hover:transition-all hover:duration-300'>
                              <MdLogin />To Blogify
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Scroll linked animation */}
            <motion.div 
                id="scroll-indicator" 
                style={{ scaleX: scrollYProgress, position: "fixed", top: 0, left: 0, right: 0, height: 5, originX: 0, backgroundColor: "#172554",zIndex: 50}} 
                transition={{ duration: 0.3, ease: "easeInOut" }} 
            />
                
            {/* 1. Hero Section */}
            <section>
                <div style={{backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: '100vh'}} className='relative'>
                    <div className="absolute inset-0 bg-white/25 backdrop-blur-md px-5 flex items-center justify-center">
                        <div className='w-full md:w-3/4 text-center'>
                            <motion.p initial={{y: 20, opacity: 0}} whileInView={{y: 0, opacity: 1}} transition={{duration: 0.6, delay: 0.3}} className='flex justify-center text-center gap-2 mb-5'>
                                Welcome to Blogify!
                                <img src={handIcon} className='w-6 wave-hover' alt='' />
                            </motion.p>
                            <motion.h1 initial={{y: 20, opacity: 0}} whileInView={{y: 0, opacity: 1}} transition={{duration: 0.6, delay: 0.3}} className="text-4xl md:text-6xl font-bold mb-3">
                                Your Daily Dose of Insight & Inspiration
                            </motion.h1>
                            <motion.p initial={{y: 20, opacity: 0}} whileInView={{y: 0, opacity: 1}} transition={{duration: 0.6, delay: 0.3}} className="text-2xl font-bold my-5">
                                Explore stories, trends, and ideas shaping the digital world — one post at a time.
                            </motion.p>
                            <motion.div initial={{y: 20, opacity: 0}} whileInView={{y: 0, opacity: 1}} transition={{duration: 0.6, delay: 0.3}}>
                                <Button>
                                    <Link to={RouteHome} className='flex items-center justify-center px-5 gap-2 py-2 hover:scale-105 hover:transition-all hover:duration-300'>
                                        Explore more<FaArrowRight />
                                    </Link>
                                </Button>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* 2. About Section */}
            <section className="relative">
                <div style={{ backgroundImage: `url(${bgAbout})` }} className="bg-cover bg-center bg-no-repeat w-full">
                    <div className="bg-white/25 backdrop-blur-md flex items-center justify-center px-4 py-16">
                        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-14 items-center text-start">

                            <motion.div initial={{y: 20, opacity: 0}} whileInView={{y: 0, opacity: 1}} transition={{duration: 0.6, delay: 0.3}} className="flex justify-center">
                              <img src={overviewImg} alt="About Blogify" className="max-w-full h-auto rounded-xl" />
                            </motion.div>

                            <motion.div initial={{y: 20, opacity: 0}} whileInView={{y: 0, opacity: 1}} transition={{duration: 0.6, delay: 0.3}}>
                                <p className="text-sm text-gray-700 uppercase mb-2 tracking-wide">
                                    About Blogify
                                </p>
                                <h2 className="text-black text-2xl md:text-4xl font-bold leading-tight mb-4">
                                   A Place Where Ideas Come to Life
                                </h2>
                                <p className="text-md text-gray-800 font-medium">
                                      At Blogify, we believe in the power of words. Whether you're a tech enthusiast, lifestyle writer, or curious reader — our platform brings stories, trends, and deep insights straight to your screen. We're more than a blog — we're a community of thinkers and creators.
                                </p>
                                <p className="text-md text-gray-800 font-medium mt-4">
                                      Join us on a journey of discovery, inspiration, and knowledge sharing — one post at a time.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Features */}
            <section className='relative'>
                <div style={{ backgroundImage: `url(${bgFeatures})` }} className="bg-cover bg-center bg-no-repeat w-full">
                    <div className="bg-white/25 backdrop-blur-lg flex items-center justify-center px-4 py-20">
                        <div className="w-full max-w-7xl flex flex-col gap-6 items-center justify-center">

                            <motion.div initial={{y: 20, opacity: 0}} whileInView={{y: 0, opacity: 1}} transition={{duration: 0.6, delay: 0.3}}>
                                <h2 className="text-black text-2xl md:text-4xl font-bold text-center leading-tight mb-2">
                                   What You Can Do on Blogify
                                </h2>
                                <p className="text-black text-lg font-medium text-center mb-5">
                                    Everything You Need to Read, Write, and Discover — All in One Place.
                                </p>
                            </motion.div>

                            <motion.div initial={{y: 20, opacity: 0}} whileInView={{y: 0, opacity: 1}} transition={{duration: 0.6, delay: 0.3}} className='w-full flex flex-col md:flex-row gap-6'>
                                <div className="w-full md:w-3/5 bg-slate/10 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                                    <div className='flex items-center justify-start gap-4'>
                                        <IoMdBook className='w-10 h-10' />
                                        <h3 className="text-black text-xl font-bold">
                                            Read Curated Content
                                        </h3>
                                    </div>
                                    <p className="text-black text-md font-normal leading-relaxed">
                                        Discover handpicked blogs across categories that match your interests.
                                    </p>
                                </div>
                                <div className="w-full md:w-2/5 bg-slate/10 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                                    <div className='flex items-center justify-start gap-4'>
                                        <FaRegSquarePlus className='w-10 h-10' />
                                        <h3 className="text-black text-xl font-bold">
                                            Create & Manage Blogs
                                        </h3>
                                    </div>
                                    <p className="text-black text-md font-normal leading-relaxed">
                                        Easily write, edit, and delete posts using a simple, intuitive editor.
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div initial={{y: 20, opacity: 0}} whileInView={{y: 0, opacity: 1}} transition={{duration: 0.6, delay: 0.3}} className='w-full flex flex-col md:flex-row gap-6'>
                                <div className="w-full md:w-2/5 bg-slate/10 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                                    <div className='flex items-center justify-start gap-4'>
                                        <FaMagnifyingGlass className='w-10 h-10' />
                                        <h3 className="text-black text-xl font-bold">
                                            Smart Search & Categories
                                        </h3>
                                    </div>
                                    <p className="text-black text-md font-normal leading-relaxed">
                                        Find blogs fast with keyword search and organized categories.
                                    </p>
                                </div>
                                <div className="w-full md:w-3/5 bg-slate/10 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                                    <div className='flex items-center justify-start gap-4'>
                                        <FaUserPlus className='w-10 h-10' />
                                        <h3 className="text-black text-xl font-bold">
                                            User Profiles
                                        </h3>
                                    </div>
                                    <p className="text-black text-md font-normal leading-relaxed">
                                        Create a profile, showcase your posts, and track your activity.
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div initial={{y: 20, opacity: 0}} whileInView={{y: 0, opacity: 1}} transition={{duration: 0.6, delay: 0.3}} className='w-full flex flex-col md:flex-row gap-6'>
                                <div className="w-full md:w-3/5 bg-slate/10 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                                    <div className='flex items-center justify-start gap-4'>
                                        <IoShieldHalfOutline className='w-10 h-10' />
                                        <h3 className="text-black text-xl font-bold">
                                            Google Login & Route Protection
                                        </h3>
                                    </div>
                                    <p className="text-black text-md font-normal leading-relaxed">
                                        Secure sign-in with Google and restricted access to private routes.
                                    </p>
                                </div>
                                <div className="w-full md:w-2/5 bg-slate/10 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                                    <div className='flex items-center justify-start gap-4'>
                                        <FaUsers className='w-10 h-10' />
                                        <h3 className="text-black text-xl font-bold">
                                            Role-Based Access
                                        </h3>
                                    </div>
                                    <p className="text-black text-md font-normal leading-relaxed">
                                        Admins manage categories and users. Writers focus on content.
                                    </p>
                                </div>
                            </motion.div>
                            
                        </div>
                    </div>
                </div>
            </section>

            {/* Technologies Used */}
            <section className='relative'>
                <div style={{ backgroundImage: `url(${bgTech})` }} className="bg-cover bg-center bg-no-repeat w-full">
                    <div className="bg-white/25 backdrop-blur-lg flex items-center justify-center px-4 py-20">
                        <div className="w-full max-w-7xl flex flex-col gap-6 items-center justify-center">

                            <div className=''>
                                <h2 className="text-black text-2xl md:text-4xl font-bold text-center leading-tight mb-2">
                                   Technologies Powering Blogify
                                </h2>
                                <p className="text-black text-lg font-medium text-center mb-3">
                                    Built with modern tools to ensure performance, security, and a smooth user experience.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-3 gap-10 px-4 pt-5">
                                {technologies.map((ele, i) => (
                                    <motion.div
                                        key={ele.tech}
                                        className="flex flex-col items-center text-center backdrop-blur-sm bg-white/10 shadow-lg p-6 rounded-xl transition-transform duration-300 hover:scale-105"
                                        variants={smoothFadeVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        custom={i}
                                        viewport={{ once: true, amount: 0.3 }}
                                    >
                                        <img src={ele.img} alt={ele.tech} className="h-12 mb-3" />
                                        <p className="font-semibold text-lg text-black">{ele.tech}</p>
                                        <p className="text-sm text-black mt-1">{ele.desc}</p>
                                    </motion.div>
                                ))}


                            </div>
                            
                        </div>
                    </div>
                </div>
            </section>

            {/* Recent blogs */}
            <section className='relative'>
                <div style={{ backgroundImage: `url(${bgBlog})` }} className="bg-cover bg-center bg-no-repeat w-full">
                    <div className="bg-white/25 backdrop-blur-lg flex items-center justify-center px-4 py-20">
                        <div className="w-full max-w-full flex flex-col gap-6 items-center justify-center">

                            <motion.div initial={{y: 20, opacity: 0}} whileInView={{y: 0, opacity: 1}} transition={{duration: 0.6, delay: 0.3}}>
                                <div>
                                    <h2 className="text-black text-2xl md:text-4xl font-bold text-center leading-tight mb-2">
                                       Latest Blogs & Stories
                                    </h2>
                                    <p className="text-black text-lg font-medium text-center mb-3">
                                        Dive into fresh insights, ideas, and perspectives — curated just for you.
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div initial={{y: 20, opacity: 0}} whileInView={{y: 0, opacity: 1}} transition={{duration: 0.6, delay: 0.3}} className='grid lg:grid-cols-3 md:grid-cols-2 gap-10 py-10'>

                                {blogData?.blogs?.length > 0 
                                    ? blogData.blogs.slice(0, 3).map((blogs) => (
                                        <BlogCard key={blogs._id} props={blogs} />
                                    ))
                                    : <div>Data Not Found!</div>
                                }

                            </motion.div>

                            <motion.div initial={{y: 20, opacity: 0}} whileInView={{y: 0, opacity: 1}} transition={{duration: 0.6, delay: 0.3}}>
                                <Button>
                                    <Link to={RouteHome} className='flex items-center justify-center px-5 gap-2 py-2 hover:scale-105 hover:transition-all hover:duration-300'>
                                          View more blogs<MdLogin />
                                    </Link>
                                </Button>
                            </motion.div>
                        
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Us */}
            <section className='relative'>
                <div style={{ backgroundImage: `url(${bgContact})` }} className="bg-cover bg-center bg-no-repeat w-full">
                    <div className="bg-white/25 backdrop-blur-lg flex items-center justify-center px-4 py-20">
                        <div className="w-full max-w-7xl flex flex-col gap-6 items-center justify-center">

                            <motion.div initial={{y: 20, opacity: 0}} whileInView={{y: 0, opacity: 1}} transition={{duration: 0.6, delay: 0.3}}>
                                <h2 className="text-black text-2xl md:text-4xl font-bold text-center leading-tight mb-2">
                                   Get In Touch With Us
                                </h2>
                                <p className="text-black text-lg font-medium text-center mb-3">
                                    Have questions, feedback, or just want to say hi? Fill out the form — we’d love to hear from you.
                                </p>
                            </motion.div>

                            <div className='grid grid-cols-1 lg:grid-cols-2 items-start gap-20 px-[10%] mt-10'>

                                <motion.div initial={{y: 20, opacity: 0}} whileInView={{y: 0, opacity: 1}} transition={{duration: 0.6, delay: 0.3}}>
                                    <form onSubmit={onSubmitHandler} className='max-w-2xl mx-auto'>
                                        <div className="field" style={{"display": "none"}}>
                                            <input type="text" name="honeypot" tabIndex="-1" autoComplete="off" />
                                        </div>
                                
                                        <div className="field">
                                            <input type="text" name="fullName" id="fullName" placeholder=" " required />
                                            <label htmlFor="fullName">Full Name <span>*</span></label>
                                        </div>
                                
                                        <div className="field">
                                            <input type="tel" name="phone" id="phone" placeholder=" " required />
                                            <label htmlFor="phone">Phone Number <span>*</span></label>
                                        </div>
                                
                                        <div className="field">
                                            <input type="email" name="email" id="email" placeholder=" " required />
                                            <label htmlFor="email">Email Address <span>*</span></label>
                                        </div>
                                
                                        <div className="field">
                                            <textarea name="message" id="message" placeholder=" " rows="4" required></textarea>
                                            <label htmlFor="message">Message</label>
                                        </div>
                                        <Button whilehover={{ scale: 1.1 }} whiletap={{ scale: 0.95 }} className='flex items-center justify-center px-5 gap-2 py-2 hover:scale-105 hover:transition-all hover:duration-300' type='submit'>
                                            Submit
                                            <IoIosSend />
                                        </Button>

                                        <p className='mt-4'>{result}</p>
                                    </form>
                                </motion.div>

                                <div>
                                    {/* Text */}
                                    <motion.p initial={{y: 20, opacity: 0}} whileInView={{y: 0, opacity: 1}} transition={{duration: 0.6, delay: 0.3}} className='text-center md:text-start max-w-2xl mx-auto mb-12 jetb'>Whether you have a project in mind or want to discuss ideas, feel free to reach out. I’d love to hear from you and explore how we can work together!</motion.p>

                                    {/* Connect */}
                                    <motion.div initial={{y: 20, opacity: 0}} whileInView={{y: 0, opacity: 1}} transition={{duration: 0.6, delay: 0.3}} className='my-5'>
                                        <h4 className='w-max text-md jetb font-bold border-b-1'>Find Me Online</h4>
                                        <div  className='flex items-center gap-2'>
                                            <a className='flex items-center jetb mt-2 hover:transform hover:scale-110 transition duration-300' href="https://github.com/Ajith-11399" target='_blank' rel="noopener noreferrer">
                                                <FaGithub className='mr-1 w-6 h-6' />
                                            </a>
                                            <a className='flex items-center jetb mt-2 hover:transform hover:scale-110 transition duration-300' href="https://www.linkedin.com/in/ajith11399" target='_blank' rel="noopener noreferrer">
                                                <FaLinkedin className='mr-1 w-6 h-6' />
                                            </a>
                                        </div>
                                    </motion.div>

                                    {/* Location */}
                                    <motion.div initial={{y: 20, opacity: 0}} whileInView={{y: 0, opacity: 1}} transition={{duration: 0.6, delay: 0.3}} className='my-5'>
                                        <h4 className='w-max text-md jetb font-bold border-b-1'>Hometown</h4>
                                        <a className='flex items-center text-sm jetb mt-2' href="https://maps.app.goo.gl/TU41GRHgfXSfLmd19" target='_blank' rel="noopener noreferrer">
                                            <LuMapPinned className='mr-1 w-6 h-6 hover:transform hover:scale-110 transition duration-300' />
                                            Pollachi
                                        </a>
                                    </motion.div>

                                    {/* Contact */}
                                    <motion.div initial={{y: 20, opacity: 0}} whileInView={{y: 0, opacity: 1}} transition={{duration: 0.6, delay: 0.3}} className='my-5'>
                                        <h4 className='w-max text-md jetb font-bold border-b-1'>Stay in Touch</h4>
                                        <a className='flex items-center text-sm jetb mt-2' href="mailto:ajithironmark42@gmail.com" target='_blank' rel="noopener noreferrer">
                                            <MdEmail className='mr-1 w-6 h-6 hover:transform hover:scale-110 transition duration-300' />
                                            ajithironmark42@gmail.com
                                        </a>
                                    </motion.div>

                                </div>

                            </div>
                            
                        </div>
                    </div>
                </div>
            </section>

            <footer className='bg-black'>
                <div className="w-full border-t-1 border-t-blue-950">
                    <div className="backdrop-blur-lg justify-center px-4 py-10">

                        <div className='w-full px-[8%] py-12 scroll-mt-20 sm:flex items-center justify-between'>

                            {/* Branding */}
                            <motion.div initial={{y: 20, opacity: 0}} whileInView={{y: 0, opacity: 1}} transition={{duration: 0.6, delay: 0.3}} className='my-20 sm:my-10'>
                                <a href="#top"><h1 className='text-white text-5xl sm:text-4xl font-bold hover:transform hover:scale-110 transition duration-300'>Blogify</h1></a>
                            </motion.div>

                            {/* Contact & Connect */}
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>

                                {/* Connect */}
                                <motion.div initial={{y: 20, opacity: 0}} whileInView={{y: 0, opacity: 1}} transition={{duration: 0.6, delay: 0.3}}>
                                    <h4 className='w-max text-md text-white font-bold border-b-1'>Find Me Online</h4>
                                    <div  className='flex items-center text-white gap-2'>
                                        <a className='flex items-center mt-2 hover:transform hover:scale-110 transition duration-300' href="https://github.com/Ajith-11399" target='_blank' rel="noopener noreferrer">
                                            <FaGithub className='mr-1 w-6 h-6' />
                                        </a>
                                        <a className='flex items-center mt-2 hover:transform hover:scale-110 transition duration-300' href="https://www.linkedin.com/in/ajith11399" target='_blank' rel="noopener noreferrer">
                                            <FaLinkedin className='mr-1 w-6 h-6' />
                                        </a>
                                    </div>
                                </motion.div>

                                {/* Location */}
                                <motion.div initial={{y: 20, opacity: 0}} whileInView={{y: 0, opacity: 1}} transition={{duration: 0.6, delay: 0.3}}>
                                    <h4 className='w-max text-md text-white font-bold border-b-1'>Hometown</h4>
                                    <a className='flex items-center text-sm text-white mt-2' href="https://maps.app.goo.gl/TU41GRHgfXSfLmd19" target='_blank' rel="noopener noreferrer">
                                        <LuMapPinned className='mr-1 w-6 h-6 hover:transform hover:scale-110 transition duration-300' />
                                        Pollachi
                                    </a>
                                </motion.div>

                                {/* Contact */}
                                <motion.div initial={{y: 20, opacity: 0}} whileInView={{y: 0, opacity: 1}} transition={{duration: 0.6, delay: 0.3}}>
                                    <h4 className='w-max text-md text-white font-bold border-b-1'>Stay in Touch</h4>
                                    <a className='flex items-center text-sm text-white mt-2' href="mailto:ajithironmark42@gmail.com" target='_blank' rel="noopener noreferrer">
                                        <MdEmail className='mr-1 w-6 h-6 hover:transform hover:scale-110 transition duration-300' />
                                        ajithironmark42@gmail.com
                                    </a>
                                </motion.div>
                            </div>

                        </div>

                        <motion.div initial={{y: 20, opacity: 0}} whileInView={{y: 0, opacity: 1}} transition={{duration: 0.6, delay: 0.3}} className='flex items-center justify-center'>
                            <hr className='w-11/12' />
                        </motion.div>

                        <motion.div initial={{y: 20, opacity: 0}} whileInView={{y: 0, opacity: 1}} transition={{duration: 0.6, delay: 0.3}} className='flex items-center justify-center py-5'>
                            <p className=' text-sm text-white'>&copy;&nbsp;{new Date().getFullYear()}&nbsp;AJI 🤝 Aki. All rights reserved. Coded with passion.</p>
                        </motion.div>

                    </div>  
                </div>
            </footer>

        </>
    
    );

};

export default Index;