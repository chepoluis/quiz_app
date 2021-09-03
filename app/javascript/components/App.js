import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Home/Home'
import Exams from './Exams/Exams'
import Exam from './Exam/Exam'
import Quiz from './Quiz/Quiz'
 
const App = () => {
    return (
        <Switch>
            <Route exact path="/" component={ Home }/>
            <Route exact path="/exams" component={ Exams }/>
            <Route exact path="/exams/:slug" component={ Exam }/>
            <Route exact path="/quiz/:slug" component={ Quiz }/>
        </Switch>
    )
}

export default App