import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Home/Home'
import Exams from './Exams/Exams'
import Exam from './Exam/Exam'
import EditExam from './Exam/EditExam'
import NewExam from './Exam/NewExam'
import NewQuestionn from './Question/NewQuestion'
import Quiz from './Quiz/Quiz'
 
const App = () => {
    return (
        <Switch>
            <Route exact path="/" component={ Home }/>
            <Route exact path="/exams" component={ Exams }/>
            <Route exact path="/exams/edit" component={ Exams }/>
            <Route exact path="/exams/edit/new_exam" component={ NewExam }/>
            <Route exact path="/exams/edit/:slug" component={ EditExam }/>
            <Route exact path="/exams/edit/:slug/new_question" component={ NewQuestionn }/>
            <Route exact path="/exams/:slug" component={ Exam }/>
            <Route exact path="/quiz/:slug" component={ Quiz }/>
        </Switch>
    )
}

export default App