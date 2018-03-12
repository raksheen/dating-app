class User_login < ApplicationRecord
  PASSWORD_LENGTH = (6..25)
  USERNAME_LENGTH = (5..15)

  validates_presence_of :username
  validates :username, length: USERNAME_LENGTH, uniqueness: true

  validates :password, length: PASSWORD_LENGTH, allow_nil: true

  has_many :monsters

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
