Rails.application.routes.draw do
  get 'isLoggedIn', :to => 'users#is_logged_in'
  post 'users/login', :to => 'users#login'  

  resources :users 
  resources :likes 
  resources :messages
end
