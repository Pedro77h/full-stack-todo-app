import { Input, Text, Button, Row, Column, List, Logo } from "components";
import { useState } from "react";

export const Home = () => {
  const [taskName, setTaskName] = useState<string>("");
  const [tasks, setTasks] = useState<{ label: string }[]>([]);

  const handleOkButton = () => {
    if (!taskName) return;

    setTasks((previous) => {
      const copy = [...previous];
      copy.push({ label: taskName });
      return copy;
    });

    setTaskName("");
  };

  return (
    <Column width="600px" margin="0 auto">
      <Column width='100%' py="25px" alignItems='center'>
        <Logo />
      </Column>

      <Column width='100%' minHeight='308px' bg='rgba(255, 255, 255 , 0.2)' borderRadius='4px'>
        <Button variant="primary">
          <Text fontSize='bodyExtraLarge' fontWeight='bold' color="primary">START</Text>
        </Button>
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
