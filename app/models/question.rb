class Question < ApplicationRecord
  belongs_to :exam
  has_many :comments, as: :commentable
end
