Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "rooms#index"

  resource :sessions, only: [:create, :destroy]
  resources :users, only: [:create]
  resources :rooms, only: [:new, :create, :show]
end
