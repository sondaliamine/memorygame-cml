import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
  Heading,
  Button,
  Grid,
  GridItem,
  Flex,
  Box,
  VStack,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import SingleCards from "./components/singleCard";
import Link from "next/link";
import ModalWinner from "./components/modalWinner";
import Router from "next/router";

const cardImages = [
  { src: "/Images/9b8eeec164f189f7de0a9b2ff78e556e.png", matched: false },
  { src: "/Images/299b2e78c3237fe211033b5e79564740.jpeg", matched: false },
  { src: "/Images/Camel_cigarettes_logo.png", matched: false },
  { src: "/Images/camel.jpeg", matched: false },
  { src: "/Images/images.png", matched: false },
  {
    src: "/Images/mp,504x498,matte,f8f8f8,t-pad,600x600,f8f8f8.jpeg",
    matched: false,
  },
];

export default function Play() {
  let toast = useToast();
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [callModal, setCallModal] = useState(false);

  // shuffle and duplicate cards, and randomize cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setTurns(0);
  };

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // compare 2 selected cards

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 500);
      }
    }
  }, [choiceOne, choiceTwo]);

  // reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // call modal when game won
  if (
    cards.length > 0 &&
    cards.filter((card) => card.matched === true).length === 12
  ) {
    toast({
      position: "bottom-left",
      render: () => (
        <Box color="white" p={3} bg="red.500">
          Congratulations
        </Box>
      ),
    });
    setTimeout(() => Router.push("/listGamers"), 2000);
  }
  return (
    <VStack
      spacing={2}
      align="center"
      h="calc(100vh - 70px)"
      bgGradient="linear(to-l, blue.400, yellow.400)"
      justify={`center`}
      px="10px"
    >
      <Flex align="center" justify={`center`} w="50%">
        {cards.length > 0 ? (
          <Button
            textAlign={`center`}
            onClick={shuffleCards}
            size="lg"
            boxShadow="xl"
          >
            <Text bgGradient="linear(to-r, blue.400, yellow.400)" bgClip="text">
              {" "}
              Jouer
            </Text>
          </Button>
        ) : (
          <Flex
            bgColor="gray.50"
            borderRadius="20px"
            boxShadow="dark-lg"
            w="100%"
            h="400px"
            align="center"
            justify={`center`}
          >
            <Box onClick={shuffleCards} cursor="pointer">
              <Heading
                textAlign={`center`}
                color="red.500"
                fontSize="80px"
                textTransform={`uppercase`}
                bgGradient="linear(to-r, blue.400, yellow.400)"
                _hover={{
                  bgGradient: "linear(to-l, blue.400, yellow.400)",
                  transitionDuration: "0.5s",
                }}
                bgClip="text"
              >
                Camel Match
              </Heading>
              <Text textAlign={`center`} fontWeight="800" fontSize={25}>
                Start game
              </Text>
            </Box>
          </Flex>
        )}
      </Flex>

      {/* <Flex justify={`center`} align="center" w="100%" h="100%" px="5px"> */}
      {cards.length > 0 && (
        <Grid
          templateColumns="repeat(3, 1fr)"
          gap={5}
          align="center"
          bgColor="blue.500"
          p="20px"
          borderRadius={10}
          boxShadow="xl"
        >
          {cards.map((card) => (
            <SingleCards
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </Grid>
      )}

      {/*  </Flex> */}
    </VStack>
  );
}
