class User < ApplicationRecord

  has_many :likes 
  has_many :messages 


  PASSWORD_LENGTH = (4..25)
  USERNAME_LENGTH = (4..15)

  validates_presence_of :username
  validates :username, length: USERNAME_LENGTH, uniqueness: true

  validates :password, length: PASSWORD_LENGTH, allow_nil: true


  attr_reader :password

  def self.find_from_credentials(username, password)
    user = find_by(username: username)
    return nil unless user
    user if user.is_password?(password)
  end

  def is_password?(password_attempt)
    BCrypt::Password.new(password_digest).is_password?(password_attempt)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

end
