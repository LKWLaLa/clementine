Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  devise_for :users, :controllers => { 
    registrations: 'registrations', 
    sessions: 'sessions'
  } 
  
  devise_scope :user do
    get 'active' => 'sessions#active'
    get 'timeout' => 'sessions#timeout'  
  end    


  root 'home#index'
  

  namespace :api, defaults: { format: :json } do
    resources :items, only: [:index]
    resources :exclusions, only: [:index]
    resources :qualifications, only: [:index]
    resources :upgrades, only: [:index]
    resources :item_types, only: [:index]
    post '/sales', to: 'sales#create'
    get '/sales', to: 'sales#index'
    post '/exchanges', to: 'sales#exchange'
    get '/current_user', to: 'users#user_info'
    get '/current_event', to: 'events#event_info'
    get '/buyer_partnerships', to: 'partnerships#buyer_partnerships'
    get '/invitee_partnerships', to: 'partnerships#invitee_partnerships'
    get '/users', to: 'users#all'
    patch '/partnerships/:id', to: 'partnerships#update'
    post '/volunteers', to: 'event_volunteers#set'
  end
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
