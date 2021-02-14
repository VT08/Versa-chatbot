Rails.application.routes.draw do
  root "chatbot_messages#index"
  post "/api/v1" , to: "chatbot_messages#dialogflow_api"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
