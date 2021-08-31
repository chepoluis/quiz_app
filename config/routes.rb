Rails.application.routes.draw do
  # root 'pages#index'

  devise_for :users
  get 'home/index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: "home#index"

  namespace :api do
    namespace :v1 do
        resources :exams, param: :slug
        resources :reviews, only: [:create, :destroy]
        resources :questions
    end
  end

  get '*path', to: 'pages#index', via: :all
end
