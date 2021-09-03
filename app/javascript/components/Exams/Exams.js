import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ExamData from './ExamData'
import styled from 'styled-components'

const Home = styled.div`
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
`

const Header = styled.div`
    padding: 100px 100px 10px 100px;

    h1 {
        font-size: 42px;
    }
`

const Subheader = styled.div`
    font-weight: 300;
    font-size: 26px;
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
    width: 100%;
    padding: 20px;
`

const Exams = (props) => {
    // console.log('props! ', props.location.pathname.includes('edit'))
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

    const grid = exams.map(item => {
        return (
            <ExamData
                key={item.attributes.category}
                attributes={item.attributes}
                isEdit={props.location.pathname.includes('edit')}
            />
        )
    })

    return (
        <Home>
            <Header>
                <h1>Many exams</h1>
                <Subheader>Get ready for the future</Subheader>
            </Header>
            <Grid>
                { grid }
            </Grid>
        </Home>
    )
}

export default Exams