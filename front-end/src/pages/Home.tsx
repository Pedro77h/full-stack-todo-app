import { Input, Text, Button, Row, Column, List, Logo, Icon } from 'components';
import { useTodo } from 'hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';

const secondsDefault = 1500;

export const Home = () => {
  const { tasks, getAllTodos, createTodo, updateTodo } = useTodo();

  const [taskName, setTaskName] = useState<string>('');
  const [seconds, setSeconds] = useState<number>(secondsDefault);
  const [timer, setTimer] = useState<any>();
  const [stage, setStage] = useState<string>('ready');
  const [taskIndex, setTaskIndex] = useState<number>(0);

  const handleOkButton = useCallback(async () => {
    await createTodo({ task: taskName, isDone: 0 });
    await getAllTodos();
    setTaskName('');
  }, [createTodo, taskName]);

  const secondsToTime = (secs: number) => {
    const divisorMinute = secs % 3600;

    const minutes = Math.floor(divisorMinute / 60);
    const seconds = Math.ceil(divisorMinute % 60);

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const startTimer = () => {
    setStage('in_progress');

    const timerInterval = setInterval(() => {
      setSeconds((previousSeconds) => {
        if (previousSeconds === 0) {
          clearInterval(timerInterval);
          setStage('finished');
          setTimer(undefined);
          return 0;
        }

        return previousSeconds - 1;
      });
    }, 1000);

    setTimer(timerInterval);
  };

  const handlePauseButton = () => {
    clearInterval(timer);
    setTimer(undefined);
  };

  const handleStopButton = () => {
    setStage('ready');
    handlePauseButton();
    setSeconds(secondsDefault);
  };

  const handleRestartButton = () => {
    handleStopButton();
    startTimer();
  };

  const handleStageStatus = useMemo<string>(() => {
    switch (stage) {
      case 'ready':
        return 'Ready';
      case 'in_progress':
        return 'Time to work!';
      case 'finished':
        return 'Finished';
      default:
        return 'Ready';
    }
  }, [stage]);

  const handleDoneButton = useCallback(async () => {
    const task = tasks[taskIndex];

    await updateTodo(task.id, { ...task, isDone: 1 });
    await getAllTodos();

    setSeconds(secondsDefault);
    setStage('ready');
  }, [timer, taskIndex, updateTodo]);

  const handleStageButtons = useMemo(() => {
    switch (stage) {
      case 'ready':
        return (
          <>
            <Button variant="primary" onClick={startTimer}>
              <Text fontFamily="secondary" fontSize="bodyExtraLarge" fontWeight="bold" color="primary">
                START
              </Text>
            </Button>
          </>
        );
      case 'in_progress':
        return (
          <>
            <Row py="20px">
              <Button variant="primary" p="10px 20px" mx="5px" onClick={startTimer}>
                <Icon variant="play" />
              </Button>
              <Button variant="primary" p="10px 20px" mx="5px" onClick={handlePauseButton}>
                <Icon variant="pause" />
              </Button>
              <Button variant="primary" p="10px 20px" mx="5px" onClick={handleStopButton}>
                <Icon variant="stop" />
              </Button>
            </Row>
          </>
        );
      case 'finished':
        return (
          <>
            <Row py="20px">
              <Button variant="primary" p="10px 20px" mx="5px" onClick={handleRestartButton}>
                <Icon variant="restart" />
              </Button>
              <Button variant="primary" p="10px 20px" mx="5px" onClick={handleDoneButton}>
                <Icon variant="done" />
              </Button>
            </Row>
          </>
        );
      default:
        return (
          <>
            <Button variant="primary" onClick={startTimer}>
              <Text fontFamily="secondary" fontSize="bodyExtraLarge" fontWeight="bold" color="primary">
                START
              </Text>
            </Button>
          </>
        );
    }
  }, [handlePauseButton, handleStopButton, handleRestartButton, stage]);

  useEffect(() => {
    getAllTodos();
  }, [getAllTodos]);

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
          {handleStageStatus}
        </Text>
        <Text fontFamily="secondary" fontWeight="bold" fontSize="displayExtraLarge" py="30px">
          {secondsToTime(seconds)}
        </Text>
        {handleStageButtons}
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
      <List items={tasks} selectedIndex={taskIndex} onClick={setTaskIndex} />
    </Column>
  );
};
