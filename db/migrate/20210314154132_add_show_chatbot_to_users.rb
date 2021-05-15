class AddShowChatbotToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :show_chatbot, :boolean, default: false
    add_column :users, :chatbot_history, :string, array:true, default: []
  end
end
