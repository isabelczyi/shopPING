Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :lists do
    resources :items, only: [:new, :create], controller: "lists/items"
  end
  resources :items do
    member do
      post :completed_toggle
    end
    collection do
      post :near
    end
    # end
  end
  get '/components', to: 'pages#components'
end
