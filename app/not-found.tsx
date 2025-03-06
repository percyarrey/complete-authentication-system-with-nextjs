// pages/404.js
"use client";
import { Button, Box, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Page = () => {
  const router = useRouter();
  const { status } = useSession();
  return (
    <Box className="flex flex-col items-center justify-center h-[25rem]">
      <Heading as="h1" size="4xl" className="text-red-500 mb-4">
        404
      </Heading>
      <Text fontSize="2xl" className="mb-4">
        Page Not Found
      </Text>
      <Text className="mb-8">
        Sorry, the page you are looking for does not exist.
      </Text>
      <Button
        colorScheme="teal"
        size="lg"
        onClick={() => {
          if (status === "authenticated") {
            router.push("/user/sell-code");
          } else {
            router.push("/");
          }
        }}
      >
        Go back to Home
      </Button>
    </Box>
  );
};

export default Page;
