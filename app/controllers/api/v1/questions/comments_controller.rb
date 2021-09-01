class Api::V1::Questions::CommentsController < Api::V1::CommentsController
            # protect_from_forgery with: :null_session
            # before_action :authenticate_user!
            
            def index
                comments = @commentable.comments.all
            
                render json: CommentSerializer.new(comments).serialized_json
            end

            def create
                comment = @commentable.comments.new comment_params
                # @comment.user = current_user

                if comment.save
                    render json: CommentSerializer.new(comment).serialized_json
                else
                    render json: { error: exam.errors.messages }, status: 422
                end

                #redirect_to @commentable, notice: "Your comment was successfully posted."
            end

            private

            def comment_params
                params.require(:comment).permit(:text)
            end
end


# class Api::V1::Questions::CommentsController < Api::V1::CommentsController
#     before_action :set_commentable

#     # def commentable
#     #     @commentable ||= Question.find(params[:question_id])
#     # end

#     private

#     def set_commentable
#         @commentable ||= Question.find(params[:question_id])
#         puts "@commentable #{@commentable}"
#     end
# end

# ||= si no tiene valor no se va a ejecutar
