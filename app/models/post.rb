class Post < ActiveRecord::Base
  attr_accessible :title, :text, :tag_list
  acts_as_taggable

  validates :title, presence: true
  validates :text, presence: true
end
