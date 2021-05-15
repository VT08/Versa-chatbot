class ReportsController < ApplicationController
   def index
        if(session[:user_id])
            gon.chat_history = User.find_by_id(session[:user_id]).chatbot_history 
        end
   end
end
