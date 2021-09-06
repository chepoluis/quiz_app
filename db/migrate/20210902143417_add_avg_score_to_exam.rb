class AddAvgScoreToExam < ActiveRecord::Migration[6.1]
  def change
    add_column :exams, :avg_score, :integer
  end
end
