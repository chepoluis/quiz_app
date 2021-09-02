class Api::V1::Exams::CommentsController < Api::V1::CommentsExamController
    def index
        comments = @commentable.comments.all
    
        render json: comment_serializer(comments).serialized_json
    end

    def show
        comment = @commentable.comments.find(params[:id])
        
        render json: comment_serializer(comment).serialized_json
    end

    def create
        comment = @commentable.comments.new comment_params

        if comment.save
            render json: comment_serializer(comment).serialized_json
        else
            render json: { error: comment.errors.messages }, status: 422
        end
    end

    def update
        comment = @commentable.comments.find(params[:id])
        
        if comment.update(comment_params)
            render json: comment_serializer(comment).serialized_json
        else
            render json: { error: comment.errors.messages }, status: 422
        end
    end

    def destroy
        comment = @commentable.comments.find(params[:id])
        
        if comment.destroy
            head :no_content
        else
            render json: { error: comment.errors.messages }, status: 422
        end
    end

    private

    def comment_params
        params.require(:comment).permit(:text)
    end

    def comment_serializer(obj)
        CommentSerializer.new(obj)
    end
end