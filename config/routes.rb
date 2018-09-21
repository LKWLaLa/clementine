Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  devise_for :users

  root 'home#index'

  namespace :api, defaults: { format: :json } do
    resources :items, only: [:index]
    resources :exclusions, only: [:index]
    resources :qualifications, only: [:index]
    resources :upgrades, only: [:index]
    resources :item_types, only: [:index]
    post '/sales', to: 'sales#create'
    post '/exchanges', to: 'sales#exchange'
    get '/current_user', to: 'users#user_info'
  end
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
