class CommentSerializer
  include FastJsonapi::ObjectSerializer
  attributes :text

  # belongs_to :commentable, polymorphic: true
end
