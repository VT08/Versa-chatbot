class ChatbotMessagesController < ApplicationController
    def index
        
    end
    def chatbot_history
        if(session[:user_id])
            render json: User.find_by_id(session[:user_id]).chatbot_history
        else
            render json: {"error":"please log in to get response"}
        end
    end

    def dialogflow_api
        project_id = "project-krystl"
        session_id = "mysession"
        texts = ["#{params[:query]}"]
        language_code = "en-US"

        require "google/cloud/dialogflow"


        session_client = Google::Cloud::Dialogflow.sessions
        dialogflow_session = session_client.session_path project: project_id,
                                            session: session_id

        texts.each do |text|
            query_input = { text: { text: text, language_code: language_code } }
            response = session_client.detect_intent session:     dialogflow_session,
                                                    query_input: query_input
            query_result = response.query_result
            render json: query_result
            translate_result(response)
        end
    end

    private

    def translate_result(res)
        query_result = res.query_result
        resJson = {}
        resJson = {
            input: res.query_result.query_text,
            response: [res.query_result.fulfillment_text]
        }
        if (query_result.fulfillment_messages[1])
            message_array = query_result.fulfillment_messages[1]
            if (message_array.suggestions.respond_to?(:suggestions))
                message_array.suggestions.suggestions.each do |item|
                    resJson[:response].push(item.title)
                end
                resJson[:type] = "suggestions"
            elsif(message_array.respond_to?(:list_select))
                resJson[:response].push(message_array.list_select.title)
                message_array.list_select.items.each do |item|
                    resJson[:response].push(item.info.key)
                    resJson[:response].push(item.title)
                end
                resJson[:type] = "listSelect"
            end
        else
        resJson[:type] = "text"
        end
        puts (resJson)
        if(session[:user_id])
            user_data = User.find_by_id(session[:user_id])
            user_data.update({"chatbot_history"=>[*user_data.chatbot_history, resJson]})
        end      
    end
end
