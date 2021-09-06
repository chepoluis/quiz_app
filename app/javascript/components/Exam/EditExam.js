import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './styles/EditExam.css'
import Question from '../Question/Question'
import { Link } from 'react-router-dom'

const EditExam = (props) => {
    const [examData, setExamData] = useState({})
    const [editExam, setEditExam] = useState({})
    const [loaded, setLoaded] = useState(false)
    const { slug } = props.match.params

    useEffect(() => {
        const url = `/api/v1/exams/${slug}`

        axios.get(url).then(res => {
            console.log(res)
            setExamData(res.data)
            setLoaded(true)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    // Handle changes in the inputs
    const handleChange = (e) => {
        e.preventDefault()
        console.log(e.target.value)

        setEditExam({ ...editExam, [e.target.name]: e.target.value })
        console.log('review: ', editExam)
    }

    // Handle the submit of the info
    const handleSubmit = (e) => {
        e.preventDefault()

        const csrfToken = document.querySelector('[name=csrf-token]').content
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

        //console.log('csrf token: ', document.querySelector('[name=csrf-token]'))

        // const exam_id = exam.data.id
        const user_id = 1
        // const { title, description, score } = review

        // console.log('review ', review)

        axios.patch(`/api/v1/exams/${slug}`, editExam)
        .then(res => {
            console.log(res)
            //const included = [...exam.included, res.data.data]
            //console.log('Included: ', included)

            // setExam({...exam, included})
            // setReview({title: '', description: '', score: 0})
        }).catch(err => {
            console.error(err)
        })
    }

    const deleteExam = (e) => {
        e.preventDefault()

        axios.delete(`/api/v1/exams/${slug}`)
            .then(res => {
                console.log(res)
                props.history.goBack()
            }).catch(err => {
                console.error(err)
            })
    }

    // const showQuestions = examData.data.included.map(item => {
    //     return (
    //         <Question
    //             key={item.attributes.category}
    //             attributes={item.attributes}
    //             isEdit={props.location.pathname.includes('edit')}
    //         />
    //     )
    // })

    return (
        <div className="container">
            {
                loaded ? (
                    <>
                        <Link to={{
                            pathname: `/exams/edit/${slug}/new_question`,
                            state: {
                                exam_id: examData.data.id
                            }
                            }}>Add question</Link>
                        <div className="title">Edit {examData.data.attributes.category}</div>
                        <div className="content">
                            <form onSubmit={handleSubmit}>
                                <div className="user-details">
                                    <div className="input-box">
                                        <span className="details">Category</span>
                                        <input readOnly={true} onChange={(e) => handleChange(e)} name="category" type="text" placeholder="Enter category" defaultValue={examData.data.attributes.category} required />
                                    </div>
                                    <div className="input-box">
                                        <span className="details">Group</span>
                                        <input onChange={(e) => handleChange(e)} name="group" type="text" placeholder="Enter group" defaultValue={examData.data.attributes.group} required />
                                    </div>
                                    <div className="input-box">
                                        <span className="details">Difficulty</span>
                                        <input onChange={(e) => handleChange(e)} name="difficulty" type="text" placeholder="Enter difficulty" defaultValue={examData.data.attributes.difficulty} required />
                                    </div>
                                </div>
                                <div className="button">
                                    <input type="submit" value="Edit" />
                                    {/* <input type="submit" value="Delete" /> */}

                                    <button onClick={deleteExam} style={{ backgroundColor: "red" }}>Delete</button>
                                </div>
                            </form>

                            <Question
                                slug={slug}
                            />
                        </div>
                    </>
                ) : (
                    <h1>Loading...</h1>
                )
            }
        </div>
    )
}

export default EditExam

{/* <div className="content">
    <form action="#">
        <div className="user-details">
            <div className="input-box">
                <span className="details">Category</span>
                <input type="text" placeholder="Enter category" required />
            </div>
            <div className="input-box">
                <span className="details">Group</span>
                <input type="text" placeholder="Enter group" required />
            </div>
            <div className="input-box">
                <span className="details">Difficulty</span>
                <input type="text" placeholder="Enter difficulty" required />
            </div>
            <div className="input-box">
                <span className="details">Phone Number</span>
                <input type="text" placeholder="Enter your number" required />
            </div>
            <div className="input-box">
                <span className="details">Password</span>
                <input type="text" placeholder="Enter your password" required />
            </div>
            <div className="input-box">
                <span className="details">Confirm Password</span>
                <input type="text" placeholder="Confirm your password" required />
            </div>
        </div>
        <div className="gender-details">
            <input type="radio" name="gender" id="dot-1" />
            <input type="radio" name="gender" id="dot-2" />
            <input type="radio" name="gender" id="dot-3" />
            <span className="gender-title">Gender</span>
            <div className="category">
                <label for="dot-1">
                    <span className="dot one"></span>
                    <span className="gender">Male</span>
                </label>
                <label for="dot-2">
                    <span className="dot two"></span>
                    <span className="gender">Female</span>
                </label>
                <label for="dot-3">
                    <span className="dot three"></span>
                    <span className="gender">Prefer not to say</span>
                </label>
            </div>
        </div>
        <div className="button">
            <input type="submit" value="Register" />
            <input type="submit" value="Delete" />
        </div>
    </form>
</div> */}