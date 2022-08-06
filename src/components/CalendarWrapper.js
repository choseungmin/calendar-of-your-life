import React, {useState} from 'react';
import styled from "styled-components";
import Dot from "./Dot";
import moment from "moment";
import ReactTooltip from "react-tooltip";
import ReactDatePicker from "react-date-picker"
import _ from 'lodash';

const CalendarWrapper = () => {

  const [maxAge, setMaxAge] = useState(90);
  const [birthDay, setBirthday] = useState(new Date('1989-04-21'));
  const [degreeX, setDegreeX] = useState(0);
  const [degreeY, setDegreeY] = useState(0);

  const years = Array.from(Array(Number(maxAge)).keys());
  const weeks = Array.from(Array(52).keys());

  const now = moment();
  const birth = moment(birthDay).format('YYYY-MM-DD');
  // const diffYear = now.diff(birth, 'years');
  const diffWeek = now.diff(birth, 'weeks');

  const onChangeSelectedDay = ([year, week]) => {
    const [x, y] = [
      (year - 50) / 5,
      (week - 26) / 2
    ];

    setDegreeX(x)
    setDegreeY(y)
  };

  const onChangeMaxAge = _.throttle((e) => {
    setMaxAge(e.target.value)
  }, 100);

  return (
    <Wrapper>
      <Inputs>
        <div>출생일: <ReactDatePicker onChange={setBirthday} value={birthDay}/></div>
        <div>
          기대수명:
          <input
            type={"number"}
            min={50}
            max={120}
            value={maxAge}
            onChange={onChangeMaxAge}
          /> Year
        </div>
        <div>지나온 삶: {Number(diffWeek / (maxAge * 52) * 100).toFixed(2)} %</div>
      </Inputs>
      <ReactTooltip scrollHide/>
      <Body degreeX={degreeX} degreeY={degreeY}>
        {years.map((year, index) => {
          return (
            <YearWrapper key={index}>
              <Year>{year + 1} </Year>
              {weeks.map((week, index) => {
                const ageWeeks = year * 52 + week;
                return (
                  <Dot
                    key={index}
                    year={year}
                    week={week}
                    isBefore={ageWeeks < diffWeek}
                    onChangeSelectedDay={onChangeSelectedDay}
                  />
                )
              })}
            </YearWrapper>
          )
        })}
      </Body>
    </Wrapper>
  );
};

export default CalendarWrapper;

const Wrapper = styled.div`
  width: 800px;
  height: 100%;
  text-align: center;
  margin: auto;
  padding: 0 0 100px 0;
`;

const Inputs = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 100px;
  margin: 20px 0;
`;

const Body = styled.div`
  border: 1px solid #dedede;
  border-radius: 10px;
  padding: 10px 0;

  box-shadow: -20px 40px 15px rgb(0 0 0 / 10%);

  transform-style: preserve-3d;
  transition: transform 0.5s;

  &:hover {
    transform: rotateY(${({degreeY}) => degreeY}deg) rotateX(${({degreeX}) => degreeX}deg);
      //transform: rotate3d(${({degreeX}) => degreeX / 360}, ${({degreeY}) => degreeY / 360}, 0, 10deg);
  }
`;

const YearWrapper = styled.div`
  height: 14px;
  text-align: right;
  display: flex;
`;

const Year = styled.div`
  display: inline-block;
  font-size: 8px;
  width: 20px;
  margin-right: 10px;
`;