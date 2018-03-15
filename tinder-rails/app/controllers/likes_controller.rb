class LikesController < ApplicationController
before_action :ensureLoggedIn,only:[ :swipedRight, :checkMatch]
# before_action :set_friend

  def index 
    likes = Like.all 
    render json: likes
  end 

  # def create
  #   friend = User.where(id: params[:like][:user_id])
  #   p friend 
  #   # friend = User.find(params[:friend_id])
  #   like = Like.create!(like_params)

  #   # Like.create(friend: @friend)
  #   # like = friend.likes.new # or Like.create(friend: @friend)
  #   # like.user = current_user
  #   # WebsocketRails[:likes].trigger 'new', { id: friend.id}
  #   render json: like
  # end
  ###

  # def swipedRight
  #   friend_id = params[:id]
  #   like = params[:liked].present?
  #   Like.create(friend_id: friend_id, liked: true)
  #   # current_user.ike.create(friend_id: friend_id, liked: liked)
  #   # pick_next_friend
  #   Like.save
  # end 

   def swipedRight
    user = current_user
    friend = params[:friend_id]
    likes = {user_id: user.id, friend_id: friend}
    like = Like.new(likes)

    like.save
    render json: like 
    checkMatch
  end

  def checkMatch
    inv_likes = current_user.inverse_friendships.to_a
    the_matches = []
    current_user.likes.to_a.each do |like|
      match = inv_likes.find do |inv_like|
        inv_like.user_id == like.friend_id
      end
      if match
        the_matches.push(match.user)
        puts "its a match"
      end
    end
    the_matches
  end


  # def checkMatch

  #   inverse_frienship = current_user.inverse_friendships.where(user_id: friendPerson.id)

  #   unless inverse_frienship.blank?
  #     friendPerson.accept_match(current_user)
  #     match = true
  #   else
  #     current_user.request_match(friendPerson)
  #   end

  #   respond_to do |format|
  #     format.js
  #   end

  # end

# https://stackoverflow.com/questions/5612736/how-to-implement-a-friendship-model-in-rails-3-for-a-social-networking-applicati?rq=1
#   def self.request(user, friend)
#     unless current_user == :friend_id or Like.exists?(current_user, friend_id)
#       transaction do
#         create(:user_id => user, :friend_id => friend, :liked => 'pending')
#         create(:user_id => friend, :friend_id => user, :liked => 'requested')
#       end
#     end
#   end

# def self.accept(user, friend)
#     transaction do
#       accepted_at = Time.now
#       accept_one_side(user, friend, accepted_at)
#       accept_one_side(friend, user, accepted_at)
#     end
#   end

#   def self.accept_one_side(user, friend, accepted_at)
#     request = find_by_user_id_and_friend_id(user, friend)
#     request.status = 'accepted'
#     request.accepted_at = accepted_at
#     request.save!
#   end

  # DELETE /posts/:id/likes
  def destroy
    current_user.likes.find(params[:id]).destroy
    redirect_to posts_path
  end

  private
 
  def like_params
    params.require(:like).permit(:user_id, :friend_id, liked: liked)
  end

  # def set_friend
  #   friendPerson = User.find(params[:friend_id])
  # end

end
