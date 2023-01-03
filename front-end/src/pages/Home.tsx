import { Input, Text, Button, Row  , Column} from "components";

export const Home = () => {
  return (
    <Column width='600px'>
      <Text fontWeight="bold">Home</Text>
      <Row>
        <Input placeholder="Enter a task name here..." />
        <Button>OK</Button>
      </Row>
    </Column>
  );
};
