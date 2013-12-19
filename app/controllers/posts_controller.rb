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
	     		redirect_to posts_path(:tag => "news") 
	     	elsif tag == "interview"
	     		redirect_to posts_path(:tag => "interview") 
	     	elsif tag == "algorithm"
	     		redirect_to posts_path(:tag => "algorithm") 
	     	end
	     }
	     format.json { head :no_content }
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
