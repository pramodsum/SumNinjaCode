class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :title
      t.text :text, :limit => nil
      t.string :tag

      t.timestamps
    end
  end
end
