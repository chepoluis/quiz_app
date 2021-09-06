import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const NewQuestionn = (props) => {
    const [newQuestion, setNewQuestion] = useState({})
    const [incorrectAnswersArray, setIncorrectAnswersArray] = useState([])

    console.log("props: ", props)
    // let incorrectAnswersArray = []
    const handleChange = (e, index) => {
        e.preventDefault()
        
        if (e.target.name == 'incorrect_answers') {
            let newArray = [...incorrectAnswersArray]
            newArray[index] = e.target.value

            // incorrectAnswersArray = [...incorrectAnswersArray, e.target.value]
            setIncorrectAnswersArray(newArray)

            console.log('incorrectAnswersArray: ', incorrectAnswersArray)
            setNewQuestion({ ...newQuestion, [e.target.name]: incorrectAnswersArray })
        } else {
            setNewQuestion({ ...newQuestion, [e.target.name]: e.target.value })
        }

        
        console.log('editQuestion: ', newQuestion)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()

        const csrfToken = document.querySelector('[name=csrf-token]').content
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

        const newObject = newQuestion
        const { question_name, correct_answer, incorrect_answers } = newObject
        const exam_id = props.location.state.exam_id

        axios.post(`/api/v1/questions`,{ question_name, correct_answer, incorrect_answers, exam_id})
        .then(res => {
            console.log(res)
        }).catch(err => {
            console.error(err)
        })

        props.history.push({
            pathname: `/exams/edit/${props.match.params.slug}`
        })
    }

    return (
        <div className="container">
            <div className="title">New Question</div>
            <div className="content">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="user-details">
                        <div className="input-box">
                            <span className="details">Question</span>
                            <input onChange={(e) => handleChange(e)} name="question_name" type="text" placeholder="Enter question" required />
                        </div>
                        <div className="input-box">
                            <span className="details">Correct answer</span>
                            <input onChange={(e) => handleChange(e)} name="correct_answer" type="text" placeholder="Enter correct answer" required />
                        </div>
                        <div className="input-box">
                            <span className="details">Incorrect answer 1</span>
                            <input onChange={(e) => handleChange(e, 0)} name="incorrect_answers" type="text" placeholder="Enter incorrect answer" required />
                        </div>
                        <div className="input-box">
                            <span className="details">Incorrect answer 2</span>
                            <input onChange={(e) => handleChange(e, 1)} name="incorrect_answers" type="text" placeholder="Enter incorrect answer" required />
                        </div>
                        <div className="input-box">
                            <span className="details">Incorrect answer 3</span>
                            <input onChange={(e) => handleChange(e, 2)} name="incorrect_answers" type="text" placeholder="Enter incorrect answer" required />
                        </div>
                    </div>
                    <div className="button">
                        <input type="submit" value="Add" />
                        {/* <Link type="submit" to="/exams/edit/geography">Add</Link> */}
                    </div>
                </form>
            </div>
        </div>
    )
}
export default NewQuestionn