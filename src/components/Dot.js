import React from 'react';
import styled from "styled-components";

const Dot = ({year, week, isBefore, onChangeSelectedDay}) => {

  return (
    <Wrapper
      year={year}
      week={week}
      isBefore={isBefore}
      data-tip={`${year}Y ${week}W`}
      // data-delay-hide={1000}
      // data-delay-update={1000}
      onMouseEnter={() => onChangeSelectedDay([year, week])}
      // delayHide={0}
      // data-delay-hide={1000}
    />
  );
};

export default Dot;

//
const Wrapper = styled.div`
  display: inline-block;
  border-radius: 50%;
  border: ${({isBefore}) => isBefore ? 3 : 1}px solid #000;
  width: ${({isBefore}) => isBefore ? 8 : 12}px;
  height: ${({isBefore}) => isBefore ? 8 : 12}px;

  border-color: ${({year}) => {
    let color = '#70ED76';
    if (year < 12) {
      color = '#F4C99C'
    } else if (year < 20) {
      color = '#E99FA5'
    } else if (year < 50) {
      color = '#E76FCE'
    } else if (year < 80) {
      color = '#53B5CD'
    }

    return color;
  }}
`;