class CreateMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :messages do |t|
      t.belongs_to :user
      t.bigint :friend_id
      t.text :message_text, null:false 

      t.timestamps
    end
  end
end
