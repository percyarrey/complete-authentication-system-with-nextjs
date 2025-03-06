"use client";
import React, { useEffect } from "react";
import { Box, Heading, Text, Stack } from "@chakra-ui/react";
import { FaGlobe, FaMoneyBillWave, FaClipboardList } from "react-icons/fa";

export default function Whyuse(props: any) {
  useEffect(() => {
    (async () => {
      props.handle();
    })();
  }, []);
  return (
    <>
      <section className="py-24 bg-gray-100 ">
        <div className="container-lg">
          <Heading as="h2" size="xl" textAlign="center" className="mb-20">
            Why Us?
          </Heading>
          <Stack
            spacing={6}
            direction={{ base: "column", md: "row" }}
            align="center"
            className="flex lg:h-[23rem]"
          >
            {/* Card 1: Global Payout */}
            <Box
              className="flex flex-col items-center p-6 bg-white rounded-lg  h-full shadow-lg transition-transform transform hover:scale-105"
              borderWidth={1}
              borderColor="gray.300"
            >
              <Box className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-green-500">
                <FaGlobe className="text-white" size={30} />
              </Box>
              <Heading as="h3" size="lg" mb={2}>
                Global Payout
              </Heading>
              <Text textAlign="center" color={"gray.600"}>
                Experience fast and reliable payouts globally, ensuring you get
                your money quickly. Our platform connects you with a network of
                partners, making it easier than ever to cash out your gift cards
                regardless of your location.
              </Text>
            </Box>

            {/* Card 2: Available */}
            <Box
              className="flex flex-col items-center p-6 bg-white rounded-lg h-full shadow-lg transition-transform transform hover:scale-105"
              borderWidth={1}
              borderColor="gray.300"
            >
              <Box className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-green-500">
                <FaMoneyBillWave className="text-white" size={30} />
              </Box>
              <Heading as="h3" size="lg" mb={2}>
                Always Available
              </Heading>
              <Text textAlign="center" color={"gray.600"}>
                Our platform is accessible 24/7, allowing you to manage your
                gift card transactions anytime, anywhere. Whether {"you're"} at
                home or on the go, our user-friendly interface keeps you in
                control.
              </Text>
            </Box>

            {/* Card 3: Reliable */}
            <Box
              className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg h-full transition-transform transform hover:scale-105"
              borderWidth={1}
              borderColor="gray.300"
            >
              <Box className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-green-500">
                <FaClipboardList className="text-white" size={30} />
              </Box>
              <Heading as="h3" size="lg" mb={2}>
                Secured
              </Heading>
              <Text textAlign="center" color={"gray.600"}>
                Trust in our secure platform to handle your transactions without
                any hassle. We prioritize your security and privacy, utilizing
                advanced encryption and verification processes to keep your
                information safe.
              </Text>
            </Box>
          </Stack>
        </div>
      </section>
    </>
  );
}
