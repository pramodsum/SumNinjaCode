class Post < ActiveRecord::Base
  attr_accessible :tags
  acts_as_taggable

  validates :title, presence: true
  validates :text, presence: true
end
