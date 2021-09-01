class Api::V1::Questions::CommentsController < Api::V1::CommentsController
    before_action :set_commentable

    # def commentable
    #     @commentable ||= Question.find(params[:question_id])
    # end

    private

    def set_commentable
        @commentable ||= Question.find(params[:question_id])
        puts "@commentable #{@commentable}"
    end
end

# ||= si no tiene valor no se va a ejecutar
