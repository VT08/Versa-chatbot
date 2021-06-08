# Versa Chatbot

### Installation process-

The latest branch is copyJS (created for integration into Versa), so after cloning the git repository, you should switch to it, and decide, if you want to merge it into the master branch.

Install Ruby on Rails first, using the link attached in transmittal document.

Add environment variable to your system

for e.g. in Ubuntu, add the following line to ~/.bashrc -

```
export GOOGLE_APPLICATION_CREDENTIALS="~/Downloads/Krystl-852d46eee60b.json"
```

you'll need to change the address if you file isn't present in the Downloads folder


Then run
```
git clone https://github.com/VT08/Versa-chatbot.git
cd Versa-chatbot
bundle install
rails s
```
