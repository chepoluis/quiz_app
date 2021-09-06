import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Question = (props) => {
    const [exam, setExam] = useState({})
    const [loaded, setLoaded] = useState(false)
    const [editQuestion, setEditQuestion] = useState({})
    const [incorrectAnswers, setIncorrectAnswers] = useState([])
    
    const loadData = () => {
        const url = `/api/v1/exams/${props.slug}`

        axios.get(url).then(res => {
            console.log(res)
            setExam(res.data)
            setLoaded(true)
        }).catch(err => {
            console.log(err)
        })
    }
    useEffect(() => {
        loadData()
    }, [])

    let questions = []
    if (loaded && exam.included) {
        exam.included.forEach((data, index) => {
			// const attributes = item.attributes

            if (data.type == 'question') {
				questions.push({...questions, data})
            }
        })
    }

    console.log("questions: ", questions)

    const handleChange = (e, array, index) => {
        e.preventDefault()
        
        console.log('array: ', array)
        if (index >= 0) {
            console.log('index: ', index)
            array[index] = e.target.value

            console.log('array: ', array)
            setEditQuestion({ ...editQuestion, [e.target.name]: array })
        } else {
            setEditQuestion({ ...editQuestion, [e.target.name]: e.target.value })
        }

        
        console.log('editQuestion: ', editQuestion)
    }

    const handleSubmit = (e, id) => {
        e.preventDefault()
        console.log('id: ', id)

        const csrfToken = document.querySelector('[name=csrf-token]').content
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

        axios.patch(`/api/v1/questions/${id}`, editQuestion)
        .then(res => {
            console.log(res)
        }).catch(err => {
            console.error(err)
        })
    }

    const deleteExam = (e, id) => {
        e.preventDefault()

        console.log('Deleted')
        axios.delete(`/api/v1/questions/${id}`)
        .then(res => {
            console.log(res)
            loadData()
        }).catch(err => {
            console.error(err)
        })
    }


    return (
            loaded ? (
                questions.map((q) => (
                    <div key={q.data.attributes.question_name} style={{ paddingTop: '10px' }}>
                        {/* <h1 key={q.attributes.question_name}>{q.attributes.question_name}</h1> */}
                        <form onSubmit={(e) => handleSubmit(e, q.data.id)}>
                                <div className="user-details">
                                    <div className="input-box">
                                        <span className="details">Question</span>
                                        <input onChange={(e) => handleChange(e)} name="question_name" type="text" placeholder="Enter question" defaultValue={q.data.attributes.question_name} required />
                                    </div>
                                    <div className="input-box">
                                        <span className="details">Correct answer</span>
                                        <input onChange={(e) => handleChange(e)} name="correct_answer" type="text" placeholder="Enter correct answer" defaultValue={q.data.attributes.correct_answer} required />
                                    </div>
                                    <div className="input-box">
                                        <span className="details">Incorrect answer 1</span>
                                        <input onChange={(e) => handleChange(e, q.data.attributes.incorrect_answers, 0)} name="incorrect_answers" type="text" placeholder="Enter incorrect answer" defaultValue={q.data.attributes.incorrect_answers[0]} required />
                                    </div>
                                    <div className="input-box">
                                        <span className="details">Incorrect answer 2</span>
                                        <input onChange={(e) => handleChange(e, q.data.attributes.incorrect_answers, 1)} name="incorrect_answers" type="text" placeholder="Enter incorrect answer" defaultValue={q.data.attributes.incorrect_answers[1]} required />
                                    </div>
                                    <div className="input-box">
                                        <span className="details">Incorrect answer 3</span>
                                        <input onChange={(e) => handleChange(e, q.data.attributes.incorrect_answers, 2)} name="incorrect_answers" type="text" placeholder="Enter incorrect answer" defaultValue={q.data.attributes.incorrect_answers[2]} required />
                                    </div>
                                </div>
                                <div className="button">
                                    <input type="submit" value="Edit" />

                                    <button onClick={(e) => deleteExam(e, q.data.id)} style={{ backgroundColor: "red" }}>Delete</button>
                                </div>
                            </form>
                    </div>
                ))
            ) : (
                <h1>Loading...</h1>
            )
    )
}

export default Question