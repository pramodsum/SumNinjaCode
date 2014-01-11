class PostsController < ApplicationController
	def new
	  @post = Post.new
	end

	def create
	  @post = Post.new(params[:post].permit(:title, :text, :tag))

	  respond_to do |format|
	    if @post.save
	      format.html { 
	      	redirect_to @post, notice: 'Posted successfully.' 
	      }
	      format.json { 
	      	render json: @post, status: :created, location: @post 
	      }
	    else
	      format.html { render action: :new}
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
	 
	  if @post.update(post_params)
	    redirect_to @post
	  else
	    render 'edit'
	  end
	end

	def destroy
	  @post = Post.find(params[:id])
	  @post.destroy
	  
	  redirect_to posts_path
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
 
  private
    def post_params
      params.require(:post).permit(:title, :text, :tag)
    end
end
