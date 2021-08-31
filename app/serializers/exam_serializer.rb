class ExamSerializer
  include FastJsonapi::ObjectSerializer
  attributes :category, :group, :difficulty, :slug

  # has_many :users
  has_many :reviews
  has_many :questions
end
