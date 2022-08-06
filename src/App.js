import styled from "styled-components";
import CalendarWrapper from "./components/CalendarWrapper";

function App() {
  return (
    <Wrapper>
      <Title>CALENDAR OF YOUR LIFE</Title>
      <CalendarWrapper/>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 62px;
  font-weight: bold;
  margin: 0;
`;