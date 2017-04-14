get '/posts' do
  @posts = Post.all
  erb :index
end

post '/posts/:id/vote' do
  post = Post.find(params[:id])
  post.votes.create(value: 1)
  postIdentity = {
    points: post.points,
    id: params[:id]
  }
  postIdentity.to_json
  # redirect "/posts"
end

delete '/posts/:id' do
  post = Post.find(params[:id])
  post.destroy
  deleteIdentity = {
    id: params[:id]
  }.to_json
  # write logic for deleting posts here.
end

post '/posts' do
  @post = Post.new( title: params[:title],
               username: Faker::Internet.user_name,
               comment_count: rand(1000) )
  if @post.save
    status 200
    erb :'/partials/_newpost', layout: false
  else 
    status 422
  end
end

get '/post/:id' do
  @post = Post.find(params[:id])
  erb :post
end
