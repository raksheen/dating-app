class CreateLikes < ActiveRecord::Migration[5.1]
    def change
    create_table :likes do |t|
      t.bigint :user_id
      t.bigint :friend_id
      t.boolean :liked

  t.timestamps
  t.belongs_to :user, index:true
    end
  end
end
