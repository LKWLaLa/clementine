Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  devise_for :users, :controllers => { registrations: 'registrations' }

  root 'home#index'

  namespace :api, defaults: { format: :json } do
    resources :charges, only: [:create]
    resources :items, only: [:index]
    resources :exclusions, only: [:index]
    resources :qualifications, only: [:index]
    resources :upgrades, only: [:index]
    resources :item_types, only: [:index]
    get '/current_info', to: 'users#current_info'
  end
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
