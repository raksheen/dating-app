class UsersController < ApplicationController
  validates :ensureLoggedIn

##AUTH FUNCTIONALITY   
 # def index
 #    puts 'called'
 #    session[:session_token] = 3
 #    render json: [1, 2, 3, 4]
 #  end

  def index
    users = User.all
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
    pick_next_friend
    # render plain: "you like this person"
    # render json: like 
    # render :index
  end

  def swipeLeft
    pick_next_friend
  end
   
  def pick_next_friend
    p current_user
      friends = User.where.not(id: current_user.id)
      render json: friends 
      # friend = User.where.not(user_id: current_user.id).order("RANDOM()").first
  end
      
   private 

  def user_params
      params.require(:user).permit(:username,:password)    
  end

end
