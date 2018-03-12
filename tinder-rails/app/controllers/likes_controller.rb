class LikesController < ApplicationController
  def index 
    likes = Like.all 
    render json: likes
  end 

  def create
    like = Like.create!(user_params)
    render json: like
  end

  private
 
  def like_params
    params.require(:like).permit(:user_id, :friend_id)
  end


end
