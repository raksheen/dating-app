class LikesController < ApplicationController
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


  # DELETE /posts/:id/likes
  def destroy
    current_user.likes.find(params[:id]).destroy
    redirect_to posts_path
  end

  private
 
  def like_params
    params.require(:like).permit(:user_id, :friend_id)
  end


end
