import styled from "styled-components";
import CalendarWrapper from "./components/CalendarWrapper";

function App() {
  return (
    <Wrapper>
      <Title>CALENDAR OF YOUR LIFE</Title>
      <CalendarWrapper/>
      <div style={{textAlign: "center"}}>Idea From <a href="https://www.youtube.com/watch?v=JXeJANDKwDc&ab_channel=Kurzgesagt%E2%80%93InaNutshell">Kurzgesagt</a></div>
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