module Api
    module V1
        class ExamsController < ApplicationController
            # protect_from_forgery with: :null_session

            def index
                exams = Exam.all
            
                render json: ExamSerializer.new(exams, options).serialized_json
            end

            def show
                exam = Exam.find_by(slug: params[:slug])
                
                render json: ExamSerializer.new(exam, options_questions).serialized_json
            end

            # def show_reviews # Create a custom method to show the exams with reviews
            #     exam = Exam.find_by(slug: params[:slug])
                
            #     render json: ExamSerializer.new(exam, options).serialized_json
            # end

            def create
                exam = Exam.new(exam_params)
                
                if exam.save
                    render json: ExamSerializer.new(exam).serialized_json
                else
                    render json: { error: exam.errors.messages }, status: 422
                end
            end
            
            def update
                exam = Exam.find_by(slug: params[:slug])
                
                if exam.update(exam_params)
                    render json: ExamSerializer.new(exam, options).serialized_json
                else
                    render json: { error: exam.errors.messages }, status: 422
                end
            end
            
            def destroy
                exam = Exam.find_by(slug: params[:slug])
                
                if exam.destroy
                    head :no_content
                else
                    render json: { error: exam.errors.messages }, status: 422
                end
            end

            private
        
            def exam_params
                params.require(:exam).permit(:category, :group, :difficulty)
            end
            
            def options
                @options ||= { include: %i[reviews] }
            end

            def options_questions
                @options_q ||= { include: %i[questions] }
            end
        end
    end
end