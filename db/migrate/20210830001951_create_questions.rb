class CreateQuestions < ActiveRecord::Migration[6.1]
  def change
    create_table :questions do |t|
      t.string :question_name
      t.string :correct_answer
      t.string :incorrect_answers, array: true, default: []
      t.belongs_to :exam, null: false, foreign_key: true

      t.timestamps
    end
  end
end
