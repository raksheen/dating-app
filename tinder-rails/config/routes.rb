Rails.application.routes.draw do
  get 'isLoggedIn', :to => 'users#is_logged_in'
  post 'users/login', :to => 'users#login'  

  resources :users 
  resources :likes 
  resources :messages
  get 'likes', :to => 'likes#checkMatch'
  get 'friends', :to => 'users#pick_next_friend'
  post 'swipedRight', :to => 'likes#swipedRight'
  post 'users/login', :to => 'users#create'

  ##to get matches to work
  get   'matches' => "likes#checkMatch"
  post   'matches' => "likes#checkMatch"
  # delete 'delete_friendship' => "friendships#destroy"

  get 'editProfile' => "users#update"
  put 'editProfile' => "users#update"

  get 'showMessage' => 'likes#showMessage'

end
