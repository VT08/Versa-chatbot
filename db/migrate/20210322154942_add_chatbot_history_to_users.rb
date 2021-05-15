class AddChatbotHistoryToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :chatbot_history, :json, array:true, default:[]
  end
end
