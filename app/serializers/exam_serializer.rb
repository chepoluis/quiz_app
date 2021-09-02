class ExamSerializer
  include FastJsonapi::ObjectSerializer
  attributes :category, :group, :difficulty, :slug, :avg_score

  has_many :reviews
  has_many :questions
end
