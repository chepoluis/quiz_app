class CreateExams < ActiveRecord::Migration[6.1]
  def change
    create_table :exams do |t|
      t.string :category
      t.string :group
      t.string :difficulty
      t.string :slug

      t.timestamps
    end
  end
end
