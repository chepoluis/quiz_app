import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import styled from 'styled-components'

const Card = styled.div`
  border: 1px solid #efefef;
  background: #fff;
  text-align: center;
`

const ExamLogo = styled.div`
  height: 50px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  padding-top: 10px;
  
  img {
    height: 50px;
    width: 50px;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 100%;
  }
`

const ExamName = styled.div`
  padding: 20px 0 10px 0;
`

const LinkWrapper = styled.div`
  margin: 30px 0 20px 0;
  height:50px;
  a {
    color: #fff;
    background-color: #000;
    border-radius: 4px;
    padding: 10px 50px;
    cursor: pointer;
    border-radius: 3px;
    border: 1px solid #000;
    text-align: center;
    line-height: 20px;
    min-height: 40px;
    margin: 7px;
    font-weight: 600;
    text-decoration: none;
    width: 100%;
    transition: ease-in-out 0.1s;
    // &:hover{
    //   border-color: #619a07;
    //   background: #619a07;
    // }
  }
`

const ExamData = (props) => {
  return (
      <Card>
          <ExamName>{props.attributes.category}</ExamName>
          {/* <Rating score={props.attributes.avg_score}/> */}
          <LinkWrapper>
              <Link to={`/quiz/${props.attributes.slug}`}>Let's learn :)</Link>
          </LinkWrapper>
          {/* <LinkWrapper>
              <Link to={`/exams/${props.attributes.slug}`}>View reviews</Link>
          </LinkWrapper> */}
      </Card>
  )
}

export default ExamData
