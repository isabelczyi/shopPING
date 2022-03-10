class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home, :push ]

  def home
    @user = current_user
  end

  def push
    @notification = WebpushNotification.new(
      endpoint: params[:endpoint],
      p256dh_key: params[:keys][:p256dh],
      auth_key: params[:keys][:auth],
    )
    if @notification.save
      render json: @notification
    else
      render json: @notification.errors.full_message
    end
  end
end
