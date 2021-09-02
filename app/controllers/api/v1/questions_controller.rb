module Api
    module V1
        class QuestionsController < ApplicationController
            # protect_from_forgery with: :null_session

            def index
                questions = Question.all
            
                render json: question_serializer(questions).serialized_json
            end

            def show
                question = Question.find(params[:id])
                
                render json: question_serializer(question).serialized_json
            end

            def create
                question = exam.questions.new(question_params)
                
                if question.save
                    render json: question_serializer(question).serialized_json
                else
                    render json: { error: question.errors.messages }, status: 422
                end
            end

            def update
                question = Question.find(params[:id])
                
                if question.update(question_params)
                    render json: question_serializer(question).serialized_json
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

            def question_serializer(obj)
                QuestionSerializer.new(obj)
            end
        end
    end
end