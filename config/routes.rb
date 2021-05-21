Rails.application.routes.draw do
  # resources :users
  # resources :sessions, only: [:new, :create, :destroy]
  # get "signup", to: "users#new", as: "signup"
  # get "login", to: "sessions#new", as: "login"
  # get "logout", to: "sessions#destroy", as: "logout"
  # get "dashboard", to: "dashboard#index"
  # get "reports" , to: "reports#index"
  # post "/api/v1" , to: "chatbot_messages#dialogflow_api"
  # get "/api/v1/chat_history" , to: "chatbot_messages#chatbot_history"
  # post "deleteChatHistory", to: "chatbot_messages#desChatHistory"
  root "chatbot#index"
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end