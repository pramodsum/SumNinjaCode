class PostsController < ApplicationController
	def new
	  @post = Post.new(post_params)
	end

	def create
	  @post = Post.new(post_params)

	  respond_to do |format|
	    if @post.save
	      format.html { 
	      	redirect_to @post, notice: 'Posted successfully.' 
	      }
	      format.json { 
	      	render json: @post, status: :created, location: @post 
	      }
	    else
	      format.html { render action: "new" }
	      format.json { 
	      	render json: @post.errors, status: :unprocessable_entity 
	      }
	    end
	  end
	end

	def destroy
	   @post = Post.find(params[:id])
	   tag = @post.tag
	   @post.destroy

	   respond_to do |format|
	     format.html { 
	     	if tag == "news"
	     		redirect_to posts_path(:scope => "news") 
	     	elsif tag == "interview"
	     		redirect_to posts_path(:scope => "interview") 
	     	elsif tag == "algorithm"
	     		redirect_to posts_path(:scope => "algorithm") 
	     	end
	     }
	     format.json { head :no_content }
	  end
	end

	def show
	  @post = Post.find(params[:id])
	end

	def index
	  @tag = params[:scope]
	  if @tag == "news"
	  	@posts = Post.news.order("created_at DESC")
	  elsif @tag == "algorithm"
	  	@posts = Post.algorithm.order("created_at DESC")
	  elsif @tag == "interview"
	  	@posts = Post.interview.order("created_at DESC")
	  else
	  	@tag = "all"
	  	@posts = Post.order("created_at DESC")
	  end
	end
 
  private
	def post_params
	  params.require(:post).permit(:title, :text, :tag)
	end
end
