class ApplicationController < ActionController::Base
  protect_from_forgery prepend: true
  auto_session_timeout Rails.configuration.timeout

  def current_event
  	@current_event ||= Event.find_by(active: true)
  end
end
