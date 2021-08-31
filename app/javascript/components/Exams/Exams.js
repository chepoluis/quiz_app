import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Exams = () => {
    const [exams, setExams] = useState([])

    useEffect(() => {
        // Get all of our exams from API
        // Update exams in our state

        axios.get('/api/v1/exams.json').then((res) => {
            setExams(res.data.data)
        }).catch(err => {
            console.log(err)
        })
    }, [exams.length])

    const list = exams.map(item => {
        return (
            <li key={item.attributes.category}>{ item.attributes.category }</li>
        )
    })

    return (
        <div>
            <h1>Many exams</h1>
            <ul>{ list }</ul>
        </div>
    )
}

export default Exams