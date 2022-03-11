class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home, :components ]

  def home
    @user = current_user
  end

  def components
  end
end
