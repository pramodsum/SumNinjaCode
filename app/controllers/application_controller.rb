class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  # @interview_count = Post.where(:tag => "interview").count
  # @news_count = Post.where(:tag => "news").count
  # @algo_count = Post.where(:tag => "algorithm").count
end
