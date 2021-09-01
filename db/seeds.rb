# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# user = User.new
# user.email = 'test@example.com'
# user.password = 'valid_password'
# user.password_confirmation = 'valid_password'
# user.encrypted_password = '123456'
# user.save!

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
