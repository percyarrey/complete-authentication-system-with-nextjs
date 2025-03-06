"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  SimpleGrid,
  Divider,
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

const giftcards = [
  {
    name: "Amazon",
    rate: "70%",
    usd: 70,
    cfa: 200,
    crypto: 0.05,
    image: "/home/giftcards/amazon.svg",
  },
  {
    name: "Apple",
    rate: "70%",
    usd: 70,
    cfa: 200,
    crypto: 0.05,
    image: "/home/giftcards/apple.svg",
  },
  {
    name: "Xbox",
    rate: "70%",
    usd: 70,
    cfa: 200,
    crypto: 0.05,
    image: "/home/giftcards/xbox.svg",
  },
];

function Hero(props: any) {
  const [heroCarousel, setHeroCarousel] = useState(false);
  const router = useRouter();

  useEffect(() => {
    props.handle();
  }, [props]);

  const heroCarouselRef = () => {
    setHeroCarousel(true);
  };

  props.heroCarouselRef.current = heroCarouselRef;
  return (
    <>
      <section className="min-h-[87vh] flex items-center relative overflow-hidden max-h-[900px]">
        <div className="radial-background"></div>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={10}
          className="w-full h-full flex items-center relative container-lg pt-8 lg:pt-0"
        >
          <Box className="flex flex-col lg:block">
            <Heading
              as="h1"
              textAlign={{ base: "center", lg: "start" }}
              fontSize={{ base: "4xl", lg: "6xl" }}
              mb={4}
            >
              Sell Your Giftcards <br />
              with the Fastest <br /> Payout
            </Heading>
            <Text
              textAlign={{ base: "center", lg: "start" }}
              fontSize={{ base: "lg", md: "xl" }}
              mb={6}
            >
              {"It's"} a 2 minute process.
            </Text>
            <Button
              colorScheme="green"
              variant={"outline"}
              size="lg"
              className="mx-auto"
              onClick={() => {
                router.push("/auth/register");
              }}
            >
              Sell Giftcard
            </Button>
          </Box>
          <Box position="relative" className="h-fit py-5 overflow-hidden">
            {heroCarousel ? (
              <div>
                <Swiper
                  modules={[Autoplay, Navigation, EffectCoverflow]}
                  spaceBetween={30}
                  slidesPerView={2}
                  centeredSlides={true}
                  speed={4000}
                  navigation
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                  }}
                  effect="coverflow"
                >
                  {giftcards.map((card, index) => (
                    <SwiperSlide key={index} virtualIndex={index}>
                      <Box
                        p={5}
                        textAlign="center"
                        bg="gray.50"
                        border="1px"
                        borderColor="teal.400"
                        borderRadius="md"
                        boxShadow="2xl"
                      >
                        <div className="h-[10rem] w-full relative">
                          <Image
                            src={card.image}
                            objectFit="contain"
                            fill
                            alt={card.name}
                          />
                        </div>
                        <Heading size="md" mt={4}>
                          {card.name}
                        </Heading>
                        <Divider my={2} />
                        <Text fontSize="lg">Rate: {card.rate}</Text>
                        <Divider my={2} />
                        <Text fontSize="lg">USD: {card.usd}</Text>
                        <Divider my={2} />
                        <Text fontSize="lg">CFA: {card.cfa}</Text>
                        <Divider my={2} />
                        <Text fontSize="lg">Crypto: {card.crypto}</Text>
                      </Box>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="text-sm text-center mt-4">
                  Sell for <b>100 USD</b> Gift Card and receive
                </div>
              </div>
            ) : (
              <LoadingSpinner />
            )}
          </Box>
        </SimpleGrid>
        <style jsx>{`
          .radial-background {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(
              circle at center,
              rgba(144, 238, 144, 0.2),
              rgba(255, 255, 255, 1)
            );
            filter: blur(10px);
            z-index: -1; /* Behind the content */
          }
        `}</style>
      </section>
    </>
  );
}

const LoadingSpinner = () => {
  return (
    <Box
      position="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      zIndex={10}
      borderRadius="md"
      p={4}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <div className="dot-loader">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      <style jsx>{`
        .dot-loader {
          display: flex;
          justify-content: space-between;
          width: 60px; /* Adjust for spacing */
        }

        .dot {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background-color: lightgreen;
          animation: bounce 0.6s infinite alternate;
        }

        .dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes bounce {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </Box>
  );
};

export default Hero;
