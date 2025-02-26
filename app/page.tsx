"use client";
import { useState, useEffect, useRef } from "react";
/* HOMESECTIONS */

/* DYNAMIC */
import dynamic from "next/dynamic";
/* const Hero = dynamic(() => import('./components/homesections/Hero'));
const HeroCarts = dynamic(() => import('./components/homesections/HeroCarts'));
const Discount = dynamic(() => import('./components/homesections/Discount'));
const BrandCarts = dynamic(() => import('./components/homesections/BrandCarts'));
const Trending = dynamic(() => import('./components/homesections/Trending'));
const ExtraProduct = dynamic(() => import('./components/homesections/ExtraProduct')); */

export default function Home() {
  const [component1Loaded, setComponent1Loaded] = useState(false);
  const [component2Loaded, setComponent2Loaded] = useState(false);
  const [component3Loaded, setComponent3Loaded] = useState(false);
  const [component4Loaded, setComponent4Loaded] = useState(false);
  const [component5Loaded, setComponent5Loaded] = useState(false);
  const [component6Loaded, setComponent6Loaded] = useState(false);
  useEffect(() => {
    setComponent1Loaded(true);
  }, []);

  const handleComponent2 = () => {
    setComponent2Loaded(true);
  };
  const handleComponent3 = () => {
    setComponent3Loaded(true);
  };

  const handleComponent4 = () => {
    setComponent4Loaded(true);
  };

  const handleComponent5 = () => {
    setComponent5Loaded(true);
  };

  const handleComponent6 = () => {
    setComponent6Loaded(true);
  };

  return (
    <main className="min-h-[55vh]">
      {/* HERO */}
      {/* {component1Loaded && <Hero VideoRef={VideoRef} handle={handleComponent2}/>} */}
      <div className=" relative top-[-0.2rem]  bg-white">
        {/* HERO CARTS */}
        {/* {component2Loaded && <HeroCarts  handle={handleComponent3}/>} */}
        {/* DISCOUNT */}
        {/* {component3Loaded && <Discount  handle={handleComponent4}/>} */}
        {/* BRANDS CARTS */}
        {/* {component4Loaded && <BrandCarts  handle={handleComponent5}/>} */}

        {/* TRENDING PRODUCTS */}
        {/* {component5Loaded && <Trending  handle={handleComponent6}/>} */}

        {/* Extra Products */}
        {/* {component6Loaded ? 
        
        <div  style={{display:'flex',minHeight:'50vh',justifyContent:'center',alignItems:'center',flexDirection:'column'}} >
        <div className='h-8 w-8 inline-block rounded-full border-4 border-r-gray-800 border-solid animate-spin' role='status'>
        </div>
    </div>
      } */}

        {/* HIDING */}
        <section className="h-0">
          <div className="h-[1rem] bg-white"></div>
        </section>
      </div>
    </main>
  );
}
