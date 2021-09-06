import React, { useState } from 'react'
import axios from 'axios'

const NewExam = (props) => {
    const [newExam, setNewExam] = useState({})

    const handleChange = (e) => {
        e.preventDefault()
        console.log(e.target.value)

        setNewExam({ ...newExam, [e.target.name]: e.target.value })
        console.log('review: ', newExam)
    }

    // Handle the submit of the info
    const handleSubmit = (e) => {
        e.preventDefault()

        const csrfToken = document.querySelector('[name=csrf-token]').content
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

        axios.post(`/api/v1/exams`, newExam)
            .then(res => {
                console.log(res)
                props.history.push({
                    pathname: `/exams/edit/${res.data.data.attributes.slug}/new_question`,
                    state: {
                        exam_id: res.data.data.id
                    }
                    
                })
            }).catch(err => {
                console.error(err)
            })
    }

    return (
        <div className="container">
            <div className="title">New exam</div>
            <div className="content">
                <form onSubmit={handleSubmit}>
                    <div className="user-details">
                        <div className="input-box">
                            <span className="details">Category</span>
                            <input onChange={(e) => handleChange(e)} name="category" type="text" placeholder="Enter category" required />
                        </div>
                        <div className="input-box">
                            <span className="details">Group</span>
                            <input onChange={(e) => handleChange(e)} name="group" type="text" placeholder="Enter group" required />
                        </div>
                        <div className="input-box">
                            <span className="details">Difficulty</span>
                            <input onChange={(e) => handleChange(e)} name="difficulty" type="text" placeholder="Enter difficulty" required />
                        </div>
                    </div>
                    <div className="button">
                        <input type="submit" value="Create" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewExam