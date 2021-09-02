Rails.application.routes.draw do
  devise_for :users
  root 'pages#index'
  # root 'home#index'

  # get 'home/index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  #root to: "home#index"

  namespace :api do
    namespace :v1 do
        resources :exams, param: :slug do
          resources :comments, module: :exams
        end
        resources :reviews
        resources :questions do
          resources :comments, module: :questions
        end
    end
  end

  get '*path', to: 'pages#index', via: :all
  # get '*path', to: 'home#index', via: :all
end
