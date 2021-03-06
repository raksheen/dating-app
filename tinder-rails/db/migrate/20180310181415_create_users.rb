class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :username 
      t.string :password_digest 
      t.string :email 
      t.string :gender 
      t.integer :age 
      t.string :profile_pic 
      t.string :city
      t.string :tagline  

      t.timestamps
    end
  end
end
