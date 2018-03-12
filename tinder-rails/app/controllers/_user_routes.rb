class UsersController < ApplicationController
  # has_many :likes 
  # has_many :matches 
  def index 
    users = User.all 
    render json: users
  end 

  def show 
    user = User.find(params[:id])
    render json: user
  end 

  def create
    user = User.create!(user_params)
    render json: user
  end

  def update
    user = User.find(params[:id])
    user.update!(user_params)
    render json: user
  end

  def destroy
    user = User.find(params[:id])
    user.destroy!
    render plain: "your profile is deleted"
  end

  private
 
  def user_params
    params.require(:user).permit(:name, :email, :gender, :age, :profile_pic, :city, :tagline)
  end

end
