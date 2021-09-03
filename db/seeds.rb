# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.new
user.email = 'test@example.com'
user.password = 'valid_password'
user.password_confirmation = 'valid_password'
user.encrypted_password = '123456'
user.save!

exams = Exam.create([
    {
        category: 'Geography',
        group: 'multiple',
        difficulty: 'hard'
    },
    {
        category: 'Maths',
        group: 'multiple',
        difficulty: 'easy'
    },
    {
        category: 'Mythology',
        group: 'multiple',
        difficulty: 'easy'
    }
])

questions = Question.create([
    {
        question_name: '¿Que es Colima?',
        correct_answer: 'Un estado',
        incorrect_answers: ['Un continente', 'Un pais', 'Un oceano'],
        exam: exams.first
    },
    {
        question_name: '¿Que es Mina?',
        correct_answer: 'Un municipio',
        incorrect_answers: ['Un continente', 'Un pais', 'Un oceano'],
        exam: exams.first
    },
    {
        question_name: '¿Cuanto es 2 + 2?',
        correct_answer: '4',
        incorrect_answers: ['2', '1', 'Pez'],
        exam: exams[1]
    },
    {
        question_name: 'Which of the following Mesopotamian mythological figures was NOT a deity?',
        correct_answer: 'Enkidu',
        incorrect_answers: ['Enki', 'Enlil', 'Enkimdu'],
        exam: exams[2]
    },
    {
        question_name: 'In Greek Mythology, who was the daughter of King Minos?',
        correct_answer: 'Ariadne',
        incorrect_answers: ['Athena', 'Ariel', 'Alana'],
        exam: exams[2]
    },
    {
        question_name: 'Which Greek &amp; Roman god was known as the god of music, truth and prophecy, healing, the sun and light, plague, poetry, and more?',
        correct_answer: 'Apollo',
        incorrect_answers: ['Aphrodite', 'Artemis', 'Athena'],
        exam: exams[2]
    },
    {
        question_name: 'Nidhogg is a mythical creature from what mythology?',
        correct_answer: 'Norse',
        incorrect_answers: ['Egyptian', 'Greek', 'Hindu'],
        exam: exams[2]
    },
    {
        question_name: 'Who is the Egyptian god of reproduction and lettuce?',
        correct_answer: 'Min',
        incorrect_answers: ['Menu', 'Mut', 'Meret'],
        exam: exams[2]
    }
])

reviews = Review.create([
    {
        title: 'Nice',
        description: 'Chido',
        score: 5,
        user: User.first,
        exam: exams.first
    },
    {
        title: 'Good',
        description: 'Great',
        score: 3,
        user: User.first,
        exam: exams.first
    }
])
