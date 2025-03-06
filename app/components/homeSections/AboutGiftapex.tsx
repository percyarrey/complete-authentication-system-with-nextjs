"use client";
import React, { useEffect } from "react";
import { Box, Heading, Text, Image, Button } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AboutGiftapex(props: any) {
  useEffect(() => {
    props.handle();
  }, [props]);
  const router = useRouter();
  return (
    <>
      <section className="bg-gray-100">
        {" "}
        {/* Added background color */}
        <div className="container-lg py-32">
          <Box
            className="flex flex-col md:flex-row gap-6 border-2 border-gray-200 shadow-lg rounded-lg overflow-hidden bg-white" // Added white background for the box
          >
            <div className="md:w-5/12">
              <Image
                src="/home/aboutgiftapex/about.jpg" // Replace with your image path
                alt="Giftapex Overview"
                objectFit="cover"
                className="h-full w-full rounded-md"
                loading="lazy" // Lazy loading the image
              />
            </div>
            <div className="pt-5 pb-6 px-4 w-full">
              <Heading as="h2" size="xl" mb={4}>
                About Gift<span className=" text-green-500">A</span>pex
              </Heading>
              <Text color={"gray.600"}>
                Giftapex is a modern web application designed to simplify the
                process of converting gift cards into cash. Inspired by
                platforms like Gift2Money and Faixchange, Giftapex focuses on
                providing a user-friendly interface that ensures a seamless
                experience for our users. We prioritize transparency and
                integrity in all our exchanges, ensuring a safe and reliable
                platform for our users. For more details, please refer to our{" "}
                {"website's "}
                <Link className="text-green-700" href={"/privacy-policy"}>
                  privacy policy{" "}
                </Link>
                page.
              </Text>
              <div className="flex justify-end mt-3">
                <Button
                  colorScheme="green"
                  variant={"outline"}
                  size="md"
                  onClick={() => {
                    router.push("/auth/register");
                  }}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </Box>
        </div>
      </section>
    </>
  );
}
