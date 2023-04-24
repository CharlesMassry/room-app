class NullUser
  def signed_in?
    false
  end

  def email
    "anonymous"
  end
end