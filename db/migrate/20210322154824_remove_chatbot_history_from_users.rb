class RemoveChatbotHistoryFromUsers < ActiveRecord::Migration[6.0]
  def change
    remove_column :users, :chatbot_history, :string, array:true, default:[]
  end
end
