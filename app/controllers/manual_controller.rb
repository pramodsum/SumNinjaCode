class ManualController < ApplicationController
	def index
	end

	def post
		require 'net/http'
		require 'json'
		message = params[:kanye][:text]
		url = URI.parse('https://api.groupme.com/v3/bots/post')
		post_args = {"bot_id" => 'e6eb5f1ad32abbd7016a29f4ae', "text" => "#{message}"}.to_json
		a = ActiveSupport::JSON.decode(post_args)
		resp, data = Net::HTTP.post_form(url, a)
		redirect_to manual_path
	end
end
