class Api::V1::CommentsQuestionController < ApplicationController
    before_action :set_commentable

    private

    def set_commentable
        @commentable ||= Question.find(params[:question_id])
    end
end
