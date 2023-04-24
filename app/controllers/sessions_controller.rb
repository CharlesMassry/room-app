class SessionsController < ApplicationController
  def create
    user = User.find_by(email: user_params[:email])

    if user.authenticate(user_params[:password])
      session[:current_user_id] = user.id
    end

    redirect_to root_path
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
