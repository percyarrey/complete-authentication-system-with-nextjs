import React, { useEffect } from "react";
import { Box, Heading, Text, Button, Stack } from "@chakra-ui/react";
import { FaUserPlus, FaUpload, FaMoneyCheck } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Howto(props: any) {
  useEffect(() => {
    props.handle();
  }, [props]);
  const router = useRouter();
  return (
    <>
      <section className="py-24">
        <Heading
          as="h2"
          size="xl"
          textAlign={"center"}
          fontWeight={"black"}
          className=" font-extrabold mb-20"
        >
          How to Sell {"GiftCard's"}
        </Heading>
        <Box className="flex flex-col lg:flex-row container-lg gap-3">
          {/* First Column: Steps */}
          <Box className="w-full lg:w-1/2 p-6">
            <Stack spacing={4}>
              {/* Step 1 */}
              <Box className="flex items-center p-4 border border-gray-300 rounded-full text-center shadow-md md:mr-10">
                <FaUserPlus className="text-green-500 mr-3" size={24} />
                <Text fontSize="lg">
                  Create an account and log in to sell your code.
                </Text>
              </Box>
              {/* Step 2 */}
              <Box className="flex items-center p-4 border border-gray-300 text-center rounded-full shadow-md mt-6 md:ml-4">
                <FaUpload className="text-green-500 mr-3" size={24} />
                <Text fontSize="lg">Upload your gift card details.</Text>
              </Box>
              {/* Step 3 */}
              <Box className="flex items-center p-4 border border-gray-300 text-center rounded-full shadow-md mt-6 md:mr-10">
                <FaMoneyCheck className="text-green-500 mr-3" size={24} />
                <Text fontSize="lg">
                  Hold on for a few minutes and receive your cash.
                </Text>
              </Box>
            </Stack>
          </Box>

          {/* Second Column: Background Image with Button */}
          <Box
            className="w-full lg:w-1/2 relative rounded-e-lg rounded-s-sm overflow-hidden min-h-[20rem]"
            style={{
              backgroundImage: "url(/home/howto/giftCards.jpg)", // Replace with your image path
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Box className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-80" />
            <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Button
                colorScheme="green"
                size="lg"
                onClick={() => {
                  router.push("/auth/register");
                }}
              >
                Get Started
              </Button>
            </Box>
          </Box>
        </Box>
      </section>
    </>
  );
}
