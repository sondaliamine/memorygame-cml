import { Flex, Box, Text, Button } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import ModalWinner from "./modalWinner";
export default function Navbar() {
  return (
    <Flex
      justify={`space-between`}
      align="center"
      bgGradient="linear(to-l, blue.400, yellow.400)"
      w="100%"
      h="70px"
      px="20px"
    >
      <Box cursor={`pointer`}>
        <Link href="/" passHref={true}>
          <Image
            src="/Images/camel-logo.png"
            alt="logo"
            width={200}
            height={80}
          />
        </Link>
      </Box>
      <Link href="/listGamers" passHref={true}>
        <Button
          cursor={`pointer`}
          fontWeight={`bold`}
          /* _hover={{ textDecoration: "underline", fontSize:"18px", transitionDuration:"0.5s" }} */
          fontSize={`16px`}
          boxShadow="xl"
        >
          Liste des joueurs
        </Button>
      </Link>
    </Flex>
  );
}
