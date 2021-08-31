import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Exams from './Exams/Exams'
import Exam from './Exam/Exam'
 
const App = () => {
    return (
        <Switch>
            <Route exact path="/exams" component={ Exams }/>
            <Route exact path="/exams/:slug" component={ Exam }/>
        </Switch>
    )
}

export default App