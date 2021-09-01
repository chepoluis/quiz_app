class CreateComments < ActiveRecord::Migration[6.1]
  def change
    create_table :comments do |t|
      t.references :commentable, polymorphic: true, null: false
      t.string :text

      t.timestamps
    end
  end
end
