module Api
    module V1
        class CommentsController < ApplicationController
            # protect_from_forgery with: :null_session
            # before_action :authenticate_user!

            def create
                comment = @commentable.comments.new comment_params
                # @comment.user = current_user

                comment.save

                # Write if condition TO DO
                #redirect_to @commentable, notice: "Your comment was successfully posted."
            end

            private

            def comment_params
                params.require(:comment).permit(:text)
            end
        end
    end
end
