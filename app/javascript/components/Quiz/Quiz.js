import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios'
import './Quiz.css';
import { LinkWrapper } from './styled_components/Quiz'

const Quiz = (props) => {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
	const [exam, setExam] = useState({})
    const [loaded, setLoaded] = useState(false)
	const { slug } = props.match.params

	// const questions = [
	// 	{
	// 		questionText: 'What is the capital of France?',
	// 		answerOptions: [
	// 			{ answerText: 'New York', isCorrect: false },
	// 			{ answerText: 'London', isCorrect: false },
	// 			{ answerText: 'Paris', isCorrect: true },
	// 			{ answerText: 'Dublin', isCorrect: false },
	// 		],
	// 	},
	// 	{
	// 		questionText: 'Who is CEO of Tesla?',
	// 		answerOptions: [
	// 			{ answerText: 'Jeff Bezos', isCorrect: false },
	// 			{ answerText: 'Elon Musk', isCorrect: true },
	// 			{ answerText: 'Bill Gates', isCorrect: false },
	// 			{ answerText: 'Tony Stark', isCorrect: false },
	// 		],
	// 	},
	// 	{
	// 		questionText: 'The iPhone was created by which company?',
	// 		answerOptions: [
	// 			{ answerText: 'Apple', isCorrect: true },
	// 			{ answerText: 'Intel', isCorrect: false },
	// 			{ answerText: 'Amazon', isCorrect: false },
	// 			{ answerText: 'Microsoft', isCorrect: false },
	// 		],
	// 	},
	// 	{
	// 		questionText: 'How many Harry Potter books are there?',
	// 		answerOptions: [
	// 			{ answerText: '1', isCorrect: false },
	// 			{ answerText: '4', isCorrect: false },
	// 			{ answerText: '6', isCorrect: false },
	// 			{ answerText: '7', isCorrect: true },
	// 		],
	// 	},
	// ];

	useEffect(() => {
        const url = `/api/v1/exams/${slug}`

        axios.get(url).then(res => {
            console.log(res)
            setExam(res.data)
            setLoaded(true)
        }).catch(err => {
            console.log(err)
        })
    }, [])

	let questions = []
    if (loaded && exam.included) {
        exam.included.forEach((item, index) => {
			const attributes = item.attributes

            if (item.type == 'question') {
				questions.push({...questions, attributes})
            }
        })
    }

	console.log('questions', questions)

	function getRandomInt() {
		return Math.floor(Math.random() * (3 - 0)) + 0;
	}

	const random_order_correct_question = () => {
		
		const random_number = getRandomInt()

		return questions[currentQuestion].attributes.incorrect_answers.map((answerOption, index) => {
			if (random_number == index) {
				return <div key={'correct'}>
						<button key={answerOption} onClick={() => handleAnswerOptionClick(answerOption)}>{answerOption}</button>
						<button key={questions[currentQuestion].attributes.correct_answer} onClick={() => handleAnswerOptionClick(questions[currentQuestion].attributes.correct_answer)}>{questions[currentQuestion].attributes.correct_answer}</button>
					</div>
			} else {
				return <button key={answerOption} onClick={() => handleAnswerOptionClick(answerOption)}>{answerOption}</button>
			}
		})
	}
 
	const handleAnswerOptionClick = (isCorrect) => {
		console.log(isCorrect)
		if (questions[currentQuestion].attributes.correct_answer == isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	};
	return (
        <div className="grid">
            <div className='app'>
				{
					questions.length > 0 ? (
						showScore ? (
							<div>
								<div className='score-section'>
									You scored {score} out of {questions.length} :D
								</div>
								<LinkWrapper>
									<Link to={`/exams/${slug}`}>Submit your review</Link>
									<Link to="/exams">Go to learn!</Link>
								</LinkWrapper>
							</div>
						) : (
							<>
								<div className='question-section'>
									<div className='question-count'>
										<span>Question {currentQuestion + 1}</span>/{questions.length}
									</div>
									<div className='question-text'>{questions[currentQuestion].attributes.question_name}</div>
								</div>
								<div className='answer-section'>
									{
										random_order_correct_question()
									}
								</div>
							</>
						)
					) : (
						<h1>Loading...</h1>
					)
				}
            </div>
        </div>
	);
}

export default Quiz