class ChatbotMessagesController < ApplicationController
    def index
        
    end
    def dialogflow_api
        project_id = "project-krystl"
        session_id = "mysession"
        texts = ["#{params[:query]}"]
        language_code = "en-US"

        require "google/cloud/dialogflow"

        puts "#{params}"
        puts "#{request.url}"

        session_client = Google::Cloud::Dialogflow.sessions
        session = session_client.session_path project: project_id,
                                            session: session_id
        puts "Session path: #{session}\n\n"

        texts.each do |text|
            query_input = { text: { text: text, language_code: language_code } }
            response = session_client.detect_intent session:     session,
                                                    query_input: query_input
            query_result = response.query_result
            render json: query_result
            puts(json: query_result)
        end
    end
end
