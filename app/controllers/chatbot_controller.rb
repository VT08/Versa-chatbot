class ChatbotController < ApplicationController
    def index
    
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
            puts(translate_result(response))
            # render json: query_result
            render json: translate_result(response)
        end
    end

    private

    def translate_result(res)
        time = Time.new
        query_result = res.query_result
        resJson = {}
        resJson = {
            input: res.query_result.query_text,
            fulfillment_text: [res.query_result.fulfillment_text],
            response: [],
            date: time.strftime("%Y-%m-%d"),
            time: time.strftime("%H:%M")
        }
        if (query_result.fulfillment_messages[1])
            message_array = query_result.fulfillment_messages[1]
            if (message_array.suggestions.respond_to?(:suggestions))
                message_array.suggestions.suggestions.each do |item|
                    resJson[:response].push(item.title)
                end
                resJson[:type] = "suggestions"
            elsif(message_array.respond_to?(:linkOutSuggestion))
                resJson[:fulfillment_text].push(message_array.linkOutSuggestion.uri)
                resJson[:response].push(message_array.linkOutSuggestion.destinationName)
                resJson[:type] = "linkOutSuggestion"
            elsif(message_array.respond_to?(:list_select))
                if (message_array.list_select == nil)
                    resJson[:fulfillment_text].push("Sorry, I couldn't understand that, you can try out")
                    resJson[:response].push("https://support.versaclouderp.com/hc/en-us")
                    resJson[:type] = "unknown"
                else
                    resJson[:fulfillment_text].push(message_array.list_select.title)
                    message_array.list_select.items.each do |item|
                        # resJson[:response].push(item.info.key)
                        resJson[:response].push(item.title)
                    end
                    resJson[:type] = "listSelect"
                end
            end
        else
        resJson[:type] = "text"
        end   
        return resJson
    end
end