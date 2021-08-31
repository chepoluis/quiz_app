class ReviewSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :description, :score, :exam_id, :user_id
end
