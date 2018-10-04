class ApplicationController < ActionController::Base
  protect_from_forgery prepend: true
  auto_session_timeout Rails.configuration.timeout
end
