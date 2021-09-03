import styled from 'styled-components'

export const LinkWrapper = styled.div`
  margin: 30px 0 20px 0;
  height:50px;
  a {
    color: #fff;
    background-color: #000;
    border-radius: 4px;
    padding: 10px 10px;
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
    &:hover{
      border-color: #619a07;
      background: #619a07;
    }
  }
`

export const Wrapper = styled.div`
    background:white;
    padding:20px;
    margin-left: 15px;
    border-radius: 0;
    padding-bottom:80px;
    border-left: 1px solid rgba(0,0,0,0.1);
    height: 100vh;
    padding-top: 100px;
    background: white;
    padding-right: 80px;
`