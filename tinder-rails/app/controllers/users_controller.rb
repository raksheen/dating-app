class UsersController < ApplicationController
  before_action :ensureLoggedIn,only:[:pick_next_friend, :swipeLeft, :show]
  # before_action :ensureLoggedIn,only:[:create, :login, :is_logged_in, :pick_next_friend, :index,:user_params, :pick_next_friend, :swipeRight, :swipeLeft, :show, :current_user]
  # validates :current_user
##AUTH FUNCTIONALITY   
 # def index
 #    puts 'called'
 #    session[:session_token] = 3
 #    render json: [1, 2, 3, 4]
 #  end

  def index
    # users = User.all
    # render json: users
    pick_next_friend
  end

  def gen_token(user_id)
    payload = {id: user_id}
    JWT.encode(payload, Rails.application.secrets.secret_key_base) 
  end


  def is_logged_in
    if current_user
      render json: current_user
    else render nothing: true, status: 401
    end
  end

  def login
    username = params[:username]
    password = params[:password]

    user = User.find_from_credentials username, password
    if user.nil?
      render json: { err: 'No User' }
    else 
      render json: {user: user, token: gen_token(user.id)}
    end
  end

  def create
    username = params[:username]
    password = params[:password]

    new_user = User.create!({
      password: password,
      username: username
    })
    # render json: user  

    p new_user

    if new_user.valid?
      render json: {token: gen_token(new_user.id)}
    else
      render nothing: true, status: 401
    end
  end

  def show 
    user = User.find(params[:id])
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

####SWIPING 


  def swipeRight
    friend_id = params[:id]
    liked = params[:liked].present?
    current_user.liked.create(friend_id: friend_id, liked: liked)
    # checkMatch
    pick_next_friend
    # render plain: "you like this person"
    # render json: likes  
    # render :index
  end

  def swipeRight
    inverse_friendship = User.where(id: current_user.id)
    liked = params
    current_user.create(friend_id: friend_id,liked: liked)
        
        
    end


# def checkMatch
#     friend_id = params[:id]
#     liked_friend = User.find(params[:friend_id])
#     user_pressed_btn = current_user
#     liked = Liked.new(current_user: user_pressed_btn, friend_id: liked_friend)
#     authorize liked
#     if params[:liked].present?
#        User.match = match.where(id: params[:liked])
#       render json: likes 
#     end
# end

  def swipeLeft
    pick_next_friend
  end
   
  def pick_next_friend
    p current_user
    # current_user = params[:current_user]
      friends = User.where.not(id: current_user.id).order("RANDOM()").first
      render json: friends 
      # friend = User.where.not(user_id: current_user.id).order("RANDOM()").first
  end

   private 

  def user_params
      params.require(:user).permit(:username,:password)    
  end

end
