class MessagesController < ApplicationController
  def index 
    messages = Message.all 
    render json: messages
  end 

  def show 
    message = Message.find(params[:id])
    render json: message
  end 

  def create
    message = Message.create!(message_params)
    render json: message
  end

  private
 
  def user_params
    params.require(:message).permit(:user_id, :friend_2, :message_text)
  end

end
