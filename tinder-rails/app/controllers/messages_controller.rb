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

  def chatAllowed 
    inverse_frienship = current_user.inverse_friendships.where(user_id: friend.id)

    unless inverse_frienship.blank?
      friend.accept_match(current_user)
      match = true
    else
      current_user.request_match(friend)
    end

    respond_to do |t|
    render json: message    
  end
end

# def create
#     @liker = current_user
#     @likee = User.find(params[:profile_id])
#     if @likee.likes_user(@liker) != []
#       preexisting_match = @likee.likes_user(@liker).first
#       preexisting_match.mutual = true
#       preexisting_match.save
#       # redirect_to profiles_path, alert: 'Congratulations it\'s a match!'
#       @conversation = Conversation.new(match: preexisting_match)
#       authorize @conversation
#       @conversation.save
#       redirect_to conversation_path(@conversation), alert: 'Congratulations it\'s a match!'
#     else
#       @match = Match.new(first_user: @liker, second_user: @likee)
#       authorize @match
#       @match.save
#       redirect_to profiles_path, notice: 'You liked that person!'
#     end
#   end


  private
 
  def message_params
    params.require(:message).permit(:user_id, :friend_id, :message_text)
  end

  def set_friend
    friend = User.find(params[:friend_id])
  end

end
