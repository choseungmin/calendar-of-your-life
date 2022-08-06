import React, {useState} from 'react';
import styled from "styled-components";
import Dot from "./Dot";
import moment from "moment";
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
      (year - (maxAge / 2)) / 5,
      (week - 26) / 2
    ];

    setDegreeX(x)
    setDegreeY(-y)
  };

  const onChangeMaxAge = _.throttle((e) => {
    const {value} = e.target;

    if (value < 50 || value > 120) {
      return;
    }

    setMaxAge(e.target.value)
  }, 100);

  return (
    <Wrapper>
      <Inputs>
        <div>Your Birthday: <ReactDatePicker onChange={setBirthday} value={birthDay}/></div>
        <div>
          Life expectancy:{' '}
          <input
            className="react-date-picker__wrapper"
            style={{display: 'inline-block', height: '25px', fontSize: '16px'}}
            type={"number"}
            min={50}
            max={120}
            value={maxAge}
            onChange={onChangeMaxAge}
          /> Year
        </div>
        <div>
          One's life:
          <input
            className="react-date-picker__wrapper"
            style={{display: 'inline-block', width: '50px', height: '25px', fontSize: '16px'}}
            value={`${Number(diffWeek / (maxAge * 52) * 100).toFixed(2)}`}
            disabled
          />
          {' '}%
        </div>
      </Inputs>
      {/*<ReactTooltip scrollHide/>*/}
      <Body degreeX={degreeX} degreeY={degreeY}>
        <Top/>
        <Left/>
        <Front>
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
        </Front>
        <Right/>
        <Bottom/>
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
  padding: 0 40px;
  margin: 20px 0;
`;

const Body = styled.div`
  background-color: #fff;
  border: 1px solid #dedede;
  border-radius: 10px;


  box-shadow: -20px 40px 15px rgb(0 0 0 / 10%);

  transform-style: preserve-3d;
  transition: transform 0.5s;

  &:hover {
    transform: rotateY(${({degreeY}) => degreeY}deg) rotateX(${({degreeX}) => degreeX}deg);
  }
`;

const Front = styled.div`
  padding: 10px 0;
`;

const Top = styled.div`
  transform: rotateX(270deg) translateY(50px);
  transform-origin: center left;
  width: 100%;
  height: 100px;
  background-color: #dedede;
  position: absolute;
  top: -50px;
`;

const Bottom = styled.div`
  transform: rotateX(90deg) translateY(-50px);
  transform-origin: center left;
  width: 100%;
  height: 100px;
  background-color: #dedede;
  position: absolute;
  bottom: -50px;

`;

const Left = styled.div`
  transform: rotateY(270deg) translateX(-100px);
  transform-origin: center left;
  width: 100px;
  height: 100%;
  background-color: #dedede;
  position: absolute;
`;

const Right = styled.div`
  transform: rotateY(90deg) translateX(0px);
  transform-origin: center left;
  width: 100px;
  height: 100%;
  background-color: #dedede;
  position: absolute;
  top: 0;
  left: 100%;
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