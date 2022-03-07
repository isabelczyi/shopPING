class CreateItems < ActiveRecord::Migration[6.1]
  def change
    create_table :items do |t|
      t.string :name
      t.text :description, null: true
      t.references :list, null: true, foreign_key: true
      t.boolean :completed, default: false

      t.timestamps
    end
  end
end
