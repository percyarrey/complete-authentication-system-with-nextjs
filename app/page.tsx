"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
/* HOMESECTIONS */

/* DYNAMIC */
import dynamic from "next/dynamic";
const Hero = dynamic(() => import("@/app/components/homeSections/Hero"));
const AboutGiftapex = dynamic(
  () => import("@/app/components/homeSections/AboutGiftapex")
);
const Howto = dynamic(() => import("@/app/components/homeSections/Howto"));
const Whyuse = dynamic(() => import("@/app/components/homeSections//Whyuse"));

export default function Home() {
  const router = useRouter();
  const { data: session, status }: { data: any; status: any } = useSession();
  const [component1Loaded, setComponent1Loaded] = useState(false);
  const [component2Loaded, setComponent2Loaded] = useState(false);
  const [component3Loaded, setComponent3Loaded] = useState(false);
  const [component4Loaded, setComponent4Loaded] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      if (session.user?.role === "admin") {
        router.push("/admin/recent-requests");
      } else {
        router.push("/user/sell-code");
      }
    } else {
      setComponent1Loaded(true);
    }
  }, [status]);

  const handleComponent2 = () => {
    setComponent2Loaded(true);
  };
  const handleComponent3 = () => {
    setComponent3Loaded(true);
  };

  const handleComponent4 = () => {
    setComponent4Loaded(true);
  };

  const heroCarouselRef: any = useRef(null);
  const loadheroCarousel = () => {
    if (heroCarouselRef) {
      if (heroCarouselRef.current) {
        heroCarouselRef.current();
      }
    }
  };

  return (
    <main>
      {/* HERO */}
      {component1Loaded && (
        <Hero heroCarouselRef={heroCarouselRef} handle={handleComponent2} />
      )}
      {/* ABOUT GIFTAPEX */}
      {component2Loaded && <AboutGiftapex handle={handleComponent3} />}
      {/* HOW TO */}
      {component3Loaded && <Howto handle={handleComponent4} />}
      {/* WHY USE */}
      {component4Loaded ? (
        <Whyuse handle={loadheroCarousel} />
      ) : (
        <>
          <div
            style={{
              display: "flex",
              minHeight: "50vh",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div
              className="h-8 w-8 inline-block rounded-full border-4 border-r-gray-800 border-solid animate-spin"
              role="status"
            ></div>
          </div>
        </>
      )}
    </main>
  );
}
