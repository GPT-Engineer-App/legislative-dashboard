import React, { useState } from "react";
import { Container, VStack, Button, Text, Heading, Input, useToast, Stack, Radio, RadioGroup, FormControl, FormLabel } from "@chakra-ui/react";
import { FaLock, FaUnlock } from "react-icons/fa";

const Index = () => {
  const [isBoardLocked, setIsBoardLocked] = useState(false);
  const [voteTitle, setVoteTitle] = useState("");
  const [votes, setVotes] = useState([]);
  const toast = useToast();

  const handleLockBoard = () => {
    setIsBoardLocked(!isBoardLocked);
    const status = isBoardLocked ? "unlocked" : "locked";
    toast({
      title: `Board ${status}`,
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const recordVote = () => {
    const voteCounts = votes.reduce((acc, vote) => {
      acc[vote] = (acc[vote] || 0) + 1;
      return acc;
    }, {});

    toast({
      title: "Vote Recorded",
      description: `Aye: ${voteCounts.Aye || 0}, Nay: ${voteCounts.Nay || 0}, Present: ${voteCounts.Present || 0}`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });

    setVotes([]);
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={4}>
        <Heading>Legislative Dashboard</Heading>
        <Button onClick={recordVote} colorScheme="green">
          Record Vote
        </Button>
        <Button rightIcon={isBoardLocked ? <FaUnlock /> : <FaLock />} colorScheme="red" onClick={handleLockBoard}>
          {isBoardLocked ? "Unlock Board" : "Lock Board"}
        </Button>
        <FormControl>
          <FormLabel>Vote Title</FormLabel>
          <Input value={voteTitle} onChange={(e) => setVoteTitle(e.target.value)} placeholder="Enter vote title" />
        </FormControl>

        <Text>Board Status: {isBoardLocked ? "Locked" : "Unlocked"}</Text>
        <VStack>
          {votes.map((vote, index) => (
            <Text key={index}>{vote}</Text>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;
