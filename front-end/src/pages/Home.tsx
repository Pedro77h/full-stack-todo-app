import { Input, Text, Button, Row, Column, List, Logo, Icon } from "components";
import { useState } from "react";


const secondsDefault = 10

export const Home = () => {
  const [taskName, setTaskName] = useState<string>("");
  const [tasks, setTasks] = useState<{ label: string }[]>([]);
  const [seconds, setSeconds] = useState<number>(secondsDefault);
  const [timer, setTimer] = useState<any>()

  const handleOkButton = () => {
    if (!taskName) return;

    setTasks((previous) => {
      const copy = [...previous];
      copy.push({ label: taskName });
      return copy;
    });

    setTaskName("");
  };

  const secondsToTime = (secs: number) => {
    const divisorMinute = secs % 3600;

    const minutes = Math.floor(divisorMinute / 60);
    const seconds = Math.ceil(divisorMinute % 60);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2 , '0')}`;
  };


  const startTimer = () => {
   const timerInterval = setInterval(() => {
      setSeconds((previousSeconds) => {
        if (previousSeconds === 0) {
          clearInterval(timerInterval);
          return 0
        } 

        return previousSeconds - 1
      });
   }, 1000)
    
    setTimer(timerInterval)
  }


  return (
    <Column width="600px" margin="0 auto">
      <Column width="100%" py="25px" alignItems="center">
        <Logo />
      </Column>

      <Column
        width="100%"
        minHeight="308px"
        p="20px"
        bg="rgba(255, 255, 255 , 0.2)"
        borderRadius="4px"
        alignItems="center"
      >
        <Text fontFamily="secondary" fontSize="bodyExtraLarge">
          Ready
        </Text>
        <Text fontFamily="secondary" fontWeight="bold" fontSize="displayExtraLarge" py="30px">
          {secondsToTime(seconds)}
        </Text>

        <Button variant="primary"  onClick={startTimer}>
          <Text fontFamily="secondary" fontSize="bodyExtraLarge" fontWeight="bold" color="primary" >
            START
          </Text>
        </Button>

        <Row py="20px">
          <Button variant="primary" p="10px 20px" mx="5px">
            <Icon variant="play" />
          </Button>
          <Button variant="primary" p="10px 20px" mx="5px">
            <Icon variant="pause" />
          </Button>
          <Button variant="primary" p="10px 20px" mx="5px">
            <Icon variant="stop" />
          </Button>
          <Button variant="primary" p="10px 20px" mx="5px">
            <Icon variant="restart" />
          </Button>
          <Button variant="primary" p="10px 20px" mx="5px">
            <Icon variant="done" />
          </Button>
        </Row>
      </Column>

      <Text fontWeight="bold" fontSize="bodyLarge" my="10px" pl="10px">
        Tasks
      </Text>
      <Row width="100%">
        <Input
          flex={1}
          placeholder="Enter a task name here..."
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <Button onClick={handleOkButton}>OK</Button>
      </Row>
      <List items={tasks} />
    </Column>
  );
};
