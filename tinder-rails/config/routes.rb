Rails.application.routes.draw do
  get 'isLoggedIn', :to => 'users#is_logged_in'
  post 'users/login', :to => 'users#login'  

  resources :users 
  resources :likes 
  resources :messages
  get 'friends', :to => 'users#pick_next_friend'
  post 'friends/swipeRight', :to => 'users#swipeRight'
  post 'users/login', :to => 'users#create'

end
