class PostsController < ApplicationController
	def new
	  @post = Post.new(post_params)
	end

	def create
	  @post = Post.new(post_params)
	  if @post.save
	  	redirect_to action: "index"
	  else render 'posts/new'
	  end
	end

	def show
	  @post = Post.find(params[:id])
	end

	def index
		tag = params[:tag]
		@posts = Post.where(:tag => tag).order("created_at DESC")
	end
 
  private
	def post_params
	  params.require(:post).permit(:title, :text, :tag)
	end
end
