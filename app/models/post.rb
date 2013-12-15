class Post < ActiveRecord::Base
  validates :title, presence: true
  validates :text, presence: true
  validates :tag, presence: true
end
