class Exam < ApplicationRecord
    has_many :users
    has_many :reviews, dependent: :delete_all
    has_many :questions, dependent: :delete_all
    has_many :comments, as: :commentable

    before_create :slugify

    def slugify
        self.slug = category.parameterize
    end

    def avg_score
        return 0 unless reviews.count.positive?

        reviews.average(:score).round(2).to_f
    end
end
