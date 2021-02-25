Rails.application.routes.draw do
  get "dashboard", to: "dashboard#index"
  get "reports" , to: "reports#index"
  post "/api/v1" , to: "chatbot_messages#dialogflow_api"
  root "chatbot_messages#index"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
