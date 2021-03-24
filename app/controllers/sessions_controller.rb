class SessionsController < ApplicationController
  def new
  end
  def create
    user = User.find_by_email(params[:email])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to root_url, notice: "Logged in!"
    else
      flash.now[:alert] = "Email or password is invalid"
      render "new"
    end
  end
  def destroy
    if(session[:user_id])
      User.find_by_id(session[:user_id]).update({"chatbot_history"=>[]})
    end
    session[:user_id] = nil
    redirect_to root_url, notice: "Logged out!"
  end
end