class User < ApplicationRecord
  has_secure_password

  def signed_in?
    true
  end
end
