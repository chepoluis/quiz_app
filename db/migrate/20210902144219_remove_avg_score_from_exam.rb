class RemoveAvgScoreFromExam < ActiveRecord::Migration[6.1]
  def change
    remove_column :exams, :avg_score, :integer
  end
end
