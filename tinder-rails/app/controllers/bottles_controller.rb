class BottlesController < ApplicationController
  before_action :ensure_signed_in

  def index
    bottles = ["wine", "beer", "gatorade"]
    render json: bottles
  end
end
