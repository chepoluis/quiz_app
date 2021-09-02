import React, { useEffect, useState, Fragment, Button } from 'react'
import Header from './Header'
import ReviewForm from './ReviewForm'
import Review from './Review'
import axios from 'axios'
import styled from 'styled-components'

const Wrapper = styled.div`
    margin-left: auto;
    margin-right: auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`
const Column = styled.div`
    background: #fff;
    height: 100vh;
    overflow: scroll;

    // &:last-child {
    //     background: #aad2f4;
    // }
`
const Main = styled.div`
    padding-left: 50px;
`

const Exam = (props) => {
    const [exam, setExam] = useState({})
    const [review, setReview] = useState({})
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const slug = props.match.params.slug;
        const url = `/api/v1/exams/${slug}`

        axios.get(url).then(res => {
            console.log(res)
            setExam(res.data)
            setLoaded(true)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    // Handle changes in the inputs
    const handleChange = (e) => {
        e.preventDefault()

        setReview({...review, [e.target.name]: e.target.value})
        //console.log('review: ', review)
    }

    // Handle the submit of the info
    const handleSubmit = (e) => {
        e.preventDefault()

        const csrfToken = document.querySelector('[name=csrf-token]').content
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

        //console.log('csrf token: ', document.querySelector('[name=csrf-token]'))

        const exam_id = exam.data.id
        const user_id = 1
        const { title, description, score } = review

        console.log('review ', review)

        axios.post('/api/v1/reviews', {title, description, score, exam_id, user_id})
        .then(res => {
            const included = [...exam.included, res.data.data]
            console.log('Included: ', included)

            setExam({...exam, included})
            setReview({title: '', description: '', score: 0})
        }).catch(err => {
            console.error(err)
        })
    }

    const setRating = (score) => {
        setReview({...review, score})
        // console.log(review)
    }

    let reviews
    if (loaded && exam.included) {
        reviews = exam.included.map((item, index) => {
            if (item.type == 'review') {
                return (
                    <Review
                        key={index}
                        attributes={item.attributes}
                    />
                )
            }
        })
    }

    return (
        <Wrapper>
            {
                loaded &&
                <Fragment>
                    <Column>
                        <Main>
                            <Header
                                attributes={exam.data.attributes}
                                reviews={exam.included}
                            />
                            { reviews }
                        </Main>
                    </Column>
                    <Column>
                        <ReviewForm 
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            setRating={setRating}
                            attributes={exam.data.attributes}
                            review={review}
                        />
                    </Column>
                </Fragment>
            }
        </Wrapper>
    )
}

export default Exam