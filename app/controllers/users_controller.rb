class UsersController < ApplicationController
  def create
    user = User.create(user_params)
    session[:current_user_id] = user.id

    redirect_to root_path
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end