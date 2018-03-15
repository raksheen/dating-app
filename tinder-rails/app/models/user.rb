class User < ApplicationRecord

  has_many :likes 
  has_many :messages

  #has_many :likes, dependent: :destroy
  has_many :inverse_friendships, class_name: "Like", foreign_key: "friend_id", dependent: :destroy


  # https://github.com/nuggetpie/Web-based-Tinder
  # Friendship Methods
  def request_match(user2)
    self.friendships.create(friend: user2)
  end

  def accept_match(user2)
    self.friendships.where(friend: user2).first.update_attribute(:state, "ACTIVE")
  end

  def remove_match(user2)
    
    inverse_friendship = inverse_friendships.where(user_id: user2).first

    if inverse_friendship
      self.inverse_friendships.where(user_id: user2).first.destroy
    else
      self.friendships.where(friend_id: user2).first.destroy
    end

  end

  # Friendship Methods


  # has_many :pending_friends,
  #        :through => :friendships,
  #        :source => :friend,
  #        :conditions => "confirmed = 0"  # assuming 0 means 'pending'
 
 ##AUTH STUFF: 

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
