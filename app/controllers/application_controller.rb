class ApplicationController < ActionController::Base

  def current_user
    @current_user ||= User.find_by(id: session[:current_user_id]) || NullUser.new
  end
  helper_method :current_user
end
