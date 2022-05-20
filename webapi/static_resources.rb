require 'sinatra'

get '/' do
  send_file '../homepage.html'
end

get '/profile' do
    send_file  '../profile.html'
end

get '/library' do
    send_file '../library.html'
end

get '/javascript/login.js' do
    send_file '../javascript/login.js'
end

get '/javascript/lessononeonclick.js' do
    send_file '..javascript/lessononeonclick.js'
end

get '/javascript/gotolesson.js' do
    send_file '../javascript/gotolesson.js'
end

get '/javascript/searchbar.js' do
    send_file '../javascript/searchbar.js'
end

get '/css/login.css' do
    send_file '../css/login.css'
end

get '/css/lessonicons.css' do
    send_file '..css/lessonicons.css'
end

get '/css/navstyle.css' do
    send_file '../css/navstyle.css'
end

get '/images/homepage.png' do
    send_file '../images/homepage.png'
end