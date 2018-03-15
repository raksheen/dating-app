class LikesController < ApplicationController
# before_action :ensureLoggedIn,only:[ :swipedRight]

  def index 
    likes = Like.all 
    render json: likes
  end 

  def create
    friend = User.where(id: params[:like][:user_id])
    p friend 
    # friend = User.find(params[:friend_id])
    like = Like.create!(like_params)

    # Like.create(friend: @friend)
    # like = friend.likes.new # or Like.create(friend: @friend)
    # like.user = current_user
    # WebsocketRails[:likes].trigger 'new', { id: friend.id}
    render json: like
  end
  ###

  def swipedRight
    friend_id = params[:id]
    like = params[:liked].present?
    Like.create(friend_id: friend_id, liked: true)
    # current_user.ike.create(friend_id: friend_id, liked: liked)
    # pick_next_friend
    render json: like
  end 

   # def swipedRight
   #  like = current_user.liked.new
   #  @like.post = Like.find_by_id(params[:friend_id])
    
   #  liked.save

   #  respond_to do |format|
   #    format.js 
   #  end
  # end



  # DELETE /posts/:id/likes
  def destroy
    current_user.likes.find(params[:id]).destroy
    redirect_to posts_path
  end

  private
 
  def like_params
    params.require(:like).permit(:user_id, :friend_id, liked: liked)
  end


end
