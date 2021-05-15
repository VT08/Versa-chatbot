module ApplicationHelper
    # helper method causing problems
    # helper_method :current_user
    def current_user
        puts(session)
        if session[:user_id]
            @current_user ||= User.find(session[:user_id])
        else
            @current_user = nil
        end
    end
end
