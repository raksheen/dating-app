class ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Token::ControllerMethods

  def encode(payload, exp = 24.hours.from_now)
    payload[:exp] = exp.to_i JWT.encode(payload, Rails.application.secrets.secret_key_base) 
  end 

  def decode(token) 
    body = JWT.decode(token, Rails.application.secrets.secret_key_base)[0] 
    HashWithIndifferentAccess.new body 

  rescue nil 

  end

  def current_user
    @current_user ||= find_current_user
  end

  def find_current_user
    authenticate_with_http_token do | token, options |
      data = decode(token)
      token && User.find(data[:id])
    end
  end

  def ensure_signed_in
    return if current_user
    render nothing: true, status: 401
  end
end