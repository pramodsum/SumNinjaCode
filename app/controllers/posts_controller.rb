class PostsController < ApplicationController
	def new
	  @post = Post.new
	end

	def create
	  @post = Post.new(params[:post].permit(:title, :text, :tag_list))

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

	def edit
	  @post = Post.find(params[:id])
	end

	def update
	  @post = Post.find(params[:id])
	 
	  if @post.update(params[:post].permit(:title, :text, :tag_list))
	    redirect_to @post
	  else
	    render 'edit'
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
	  if params[:tag]
	  	@tag = params[:tag]
	    @posts = Post.tagged_with(params[:tag])
	  else
	    @posts = Post.all
	  end
	end
end
