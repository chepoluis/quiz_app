class Api::V1::CommentsExamController < ApplicationController
    before_action :set_commentable

    private

    def set_commentable
        @commentable ||= Exam.find_by(slug: params[:exam_slug])
    end
end