class SessionsController < Devise::SessionsController

  #configure auto_session_timeout
  def active
    render_session_status
  end

  def timeout
    flash[:notice] = "Your session has timed out."
    redirect_to "/users/sign_in"
  end
end