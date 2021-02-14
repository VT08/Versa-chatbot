project_id = "project-krystl"
session_id = "mysession"
texts = ["hello", "create a new user", "Just joined versa", "random input"]
language_code = "en-US"

require "google/cloud/dialogflow"

session_client = Google::Cloud::Dialogflow.sessions
session = session_client.session_path project: project_id,
                                      session: session_id
puts "Session path: #{session}\n\n"

texts.each do |text|
  query_input = { text: { text: text, language_code: language_code } }
  response = session_client.detect_intent session:     session,
                                          query_input: query_input
  query_result = response.query_result
  if query_result.fulfillment_messages[1].respond_to?(:suggestions) && query_result.fulfillment_messages[1].suggestions!=nil
  # if query_result.fulfillment_messages[1].suggestions
  puts "Result type - Suggestion"
  # puts "#{query_result.fulfillment_messages[1].suggestions}\n some return value" #this turns out to be empty
    Suggestions = query_result.fulfillment_messages[1].suggestions.suggestions
    Suggestions.each do |suggestion|
      puts "#{suggestion.title}\n"
    end
  elsif query_result.fulfillment_messages[1].respond_to?(:list_select) && query_result.fulfillment_messages[1].list_select!=nil
    puts "Result type - List Select"
    puts "#{query_result.fulfillment_messages[1].list_select.title}"
    puts "---------------------"
    query_result.fulfillment_messages[1].list_select.items.each do |item|
      puts "#{item.title} -- #{item.info.key}"
    end
  else 
    puts "Result type - Text"
    puts "Fulfillment text:  #{query_result.fulfillment_text}"
  end
  puts ""
  puts "full result:      #{query_result.language_code}"
  puts "Query text:        #{query_result.query_text}"
  puts "Intent detected:   #{query_result.intent.display_name}"
  puts "Intent confidence: #{query_result.intent_detection_confidence}"
  puts "Fulfillment text:  #{query_result.fulfillment_text}\n"
  2.times {puts "-----------------"}
end