import React, { useState } from "react";
import { Container, VStack, Button, Text, Heading, Input, useToast, Stack, Radio, RadioGroup, FormControl, FormLabel } from "@chakra-ui/react";
import { FaLock, FaUnlock } from "react-icons/fa";

const Index = () => {
  const [rollCalls, setRollCalls] = useState([]);
  const [currentRollCall, setCurrentRollCall] = useState(null);
  const [isBoardLocked, setIsBoardLocked] = useState(false);
  const [voteTitle, setVoteTitle] = useState("");
  const [votes, setVotes] = useState([]);
  const toast = useToast();

  const handleCreateRollCall = () => {
    const newRollCall = {
      id: rollCalls.length + 1,
      votes: [],
    };
    setRollCalls([...rollCalls, newRollCall]);
    setCurrentRollCall(newRollCall);
    setIsBoardLocked(false);
    toast({
      title: "Roll call created",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

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

  const handleVote = (vote) => {
    if (!currentRollCall || isBoardLocked) {
      toast({
        title: "Unable to vote",
        description: "The board is locked or no roll call is active.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const updatedRollCall = {
      ...currentRollCall,
      votes: [...currentRollCall.votes, vote],
    };
    setRollCalls(rollCalls.map((rc) => (rc.id === currentRollCall.id ? updatedRollCall : rc)));
    setCurrentRollCall(updatedRollCall);
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={4}>
        <Heading>Legislative Dashboard</Heading>
        <Button onClick={handleCreateRollCall} colorScheme="blue">
          Create Roll Call
        </Button>
        <Button rightIcon={isBoardLocked ? <FaUnlock /> : <FaLock />} colorScheme="red" onClick={handleLockBoard}>
          {isBoardLocked ? "Unlock Board" : "Lock Board"}
        </Button>
        <FormControl>
          <FormLabel>Vote Title</FormLabel>
          <Input value={voteTitle} onChange={(e) => setVoteTitle(e.target.value)} placeholder="Enter vote title" />
        </FormControl>
        <RadioGroup onChange={handleVote}>
          <Stack direction="row">
            <Radio value="Aye">Aye</Radio>
            <Radio value="Nay">Nay</Radio>
            <Radio value="Present">Present</Radio>
          </Stack>
        </RadioGroup>
        <Text>Current Roll Call ID: {currentRollCall ? currentRollCall.id : "None"}</Text>
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
