module Api
    module V1
        class QuestionsController < ApplicationController
            protect_from_forgery with: :null_session

            def index
                questions = Question.all
            
                render json: QuestionSerializer.new(questions).serialized_json
            end

            def create
                question = exam.questions.new(question_params)
                
                if question.save
                    render json: QuestionSerializer.new(question).serialized_json
                else
                    render json: { error: question.errors.messages }, status: 422
                end
            end
            
            def destroy
                question = Question.find(params[:id])
                
                if question.destroy
                    head :no_content
                else
                    render json: { error: question.errors.messages }, status: 422
                end
            end
            
            #####
            private

            def exam
                @exam ||= Exam.find(params[:exam_id])
            end
            
            def question_params
                params.require(:question).permit(:question_name, :correct_answer, :exam_id, incorrect_answers: [])
            end
        end
    end
end