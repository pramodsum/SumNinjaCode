class Post < ActiveRecord::Base
  validates :title, presence: true
  validates :text, presence: true
  validates :tag, presence: true

  scope :algorithm, where(:tag => "algorithm")
  scope :interview, where(:tag => "interview")
  scope :news, where(:tag => "news")
end
