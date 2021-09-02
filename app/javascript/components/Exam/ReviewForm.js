import React, {Fragment} from 'react'
import Gray from './Stars/Gray'
import Hover from './Stars/Hover'
import Selected from './Stars/Selected'
import styled from 'styled-components'

const RatingContainer = styled.div`
  text-align: center;
  border-radius: 4px;
  font-size:20px;
  padding: 40px 0 10px 0;
  border: 1px solid #e6e6e6;
  margin: 20px 0;
  padding:20px;
  background: #fff;
`
const RatingBox = styled.div`
  background: #fff;
  display: flex;
  width: 100%;
  justify-content: center;
  overflow: hidden;
  flex-direction: row-reverse;
  position: relative;
  input { display: none; }
  label {
    cursor: pointer;
    width: 40px;
    height: 40px;
    margin-top: auto;
    background-image: url("data:image/svg+xml;charset=UTF-8,${Gray}");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 76%;
    transition: .3s;
  }
  input:checked ~ label, 
  input:checked ~ label ~ label {
    background-image: url("data:image/svg+xml;charset=UTF-8,${Selected}");
  }
  input:not(:checked) ~ label:hover,
  input:not(:checked) ~ label:hover ~ label {
    background-image: url("data:image/svg+xml;charset=UTF-8,${Hover}");
  }
`

// const RatingBoxTitle = styled.div`
//   font-size: 20px;
//   padding-bottom: 20px;
//   font-weight: bold;
// `

const Field = styled.div`
  border-radius: 4px;
  input {
    width: 96%;
    min-height:50px;
    border-radius: 4px;
    border: 1px solid #E6E6E6;
    margin: 12px 0;
    padding: 12px;
  }
  
  textarea {
    width: 100%;
    min-height:80px;
    border-radius: 4px;
    border: 1px solid #E6E6E6;
    margin: 12px 0;
    padding: 12px;      
  }
`

const Wrapper = styled.div`
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

const SubmitBtn = styled.button`
    color: #fff;
    background-color: #71b406;
    border-radius: 4px;   
    padding:12px 12px;  
    border: 1px solid #71b406;
    width:100%;
    font-size:18px;
    cursor: pointer;
    transition: ease-in-out 0.2s;

    &:hover {
        background: #71b406;
        border-color: #71b406;
        border: 1px solid #fff;
    }
`

const Headline = styled.div`
    font-size:20px;
    padding: 15px 0;
    font-weight: bold;
    color: black;
`

const RatingTitle = styled.div`
    font-size: 20px;
    padding-bottom: 20px;
    font-weight: bold;
`

const Error = styled.div`
    width: 100%;
    color: rgb(255, 80, 44);
    border: 1px solid rgb(255, 80, 44);
    border-radius: 4px;
    margin-top: 8px;
    text-align:center;
    padding: 4px;
    `

const ReviewForm = (props) => {
    const ratingOptions = [5,4,3,2,1].map((score, index) => {
        return (
            <Fragment key={score}>
                <input type="radio" value={score} checked={props.review.score == score} name="rating" onChange={() => console.log('selected: ', score)} id={`rating-${score}`}/>
                <label onClick={props.setRating.bind(this, score)}></label>
            </Fragment>
        )
    })

    return (
        <Wrapper>
            <form onSubmit={props.handleSubmit}>
                <Headline>Have an experience with {props.attributes.category || ''} exam? Share your review!</Headline>
                <Field>
                    <input onChange={props.handleChange} value={props.review.title || ''} type="text" name="title" placeholder="Review Title"/>
                </Field>

                <Field>
                    <input onChange={props.handleChange} value={props.review.description || ''} type="text" name="description" placeholder="Review Description"/>
                </Field>

                <Field>
                    <RatingContainer>
                        <RatingTitle className="rating-title-text">Rate This Exam</RatingTitle>
                        <RatingBox>
                            { ratingOptions }
                        </RatingBox>
                    </RatingContainer>
                </Field>

                <SubmitBtn type="submit">Submit your review</SubmitBtn>
            </form>
        </Wrapper>
    )
}

export default ReviewForm;