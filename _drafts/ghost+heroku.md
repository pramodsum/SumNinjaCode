As a programmer, one of the coolest things is the ability to pick up a new language by just messing around making sites or apps. In all honesty, that's how I've learned 90% of the programming languages I know today. 

In the last few months, I've been using blogs for my friends and family to learn the ins and outs of a few languages. This whole process actually taught my quite a bit, not only about individual programming languages but about what goes into the decision of choosing a particular language versus another for a website. 

Two summers ago, I had to learn some basic [Ruby on Rails](rubyonrails.com) for my summer internship project at [Workday](workday.com). In classes we were always taught C++ so switching to another object oriented programming language wasn't all that difficult. The interesting part about Ruby on Rails to me was the easy integration of databases into the front AND back end of your apps. I had never done any MySQL programming either so this whole concept was pretty new to me; Making sure my objects were properly formed, that data was encapsulated as needed, etc. 

Using this, I started setting up the first [blog](dearuniverse.me) for my friend. The easiest way of doing this would have been to set up a wordpress blog and just unleash her on the site, but I wanted more control over the user interface and full control on what each page looked like. Rails was clearly a good start in this experiment. I quickly realized that while active admin definitely made it easier to do user authentication and the easy integration of databases helped persist my friends posts, the blog overall was pretty clunky and to add new features like tags, etc it seemed to be unnecessarily complicated. Plus posting images in blog posts was irritating to set up. I ended up just setting up posts to be rendered in markdown so that anyone who writes posts can just link to a picture posted on facebook or some other site. It saved me a lot of work, but wasn't as easy to use from the user's perspective.

{<1>}![](/content/images/2014/11/Screen-Shot-2014-11-08-at-6-33-41-PM.png)

After this I thought, maybe I had just unknowingly confused myself during that process. So I decided to try making another rails [blog](uppukhara.com) for my mom. This blog didn't really go THAT much better. I reluctantly half assed the rest of the blog and showed it to my mom. Safe to say she wasn't all that thrilled about using it. Active Admin doesn't have the sleekest user interface. It was very bootstrap-y and my mom found it too much of an effort to learn how to use. 

{<2>}![](/content/images/2014/11/Screen-Shot-2014-11-08-at-6-34-48-PM.png)

I started to my make my own blog (a.k.a. this site) using [Node.js](http://nodejs.org). I had heard that Node was the new "it" language and that all the "cool kids" were coding in it. I didn't want to set up a database and create post models like I had done in the previous ruby on rails sites, so I went hunting for different methods. I found a platform called [Poet](http://jsantell.github.io/poet/) by [@jsantell](http://twitter.com/jsantellhttp://twitter.com/jsantell). For me, this was perfect. I could create my posts in markdown in a folder named '_posts/' in my root folder and just push to heroku. My posts were automatically uploaded with the specified date, tags, title, url, etc that I had specified. 

However from the perspective of a non-programmer, these ruby on rails blogs were much easier to post and maneuver. You had to know how to use text editors and in order to post ANYTHING you needed to know how to push to heroku, or in the least, find a friend who knew how and have them do it for you. I showed this concept to my mom and my friend and neither of them opted to migrate their current blogs to this lighter website. I had solved the clunkiness of the previous blogs at the cost of the user experience.

A few weeks later, Anagha and I decided we wanted to start a cooking blog. Once again I was setting up a blog, but because I wasn't the only one who was going to be posting on the blog I had to use ruby on rails. The blog turned out quite adorable, if I do say so myself, but I still hated setup and everything about it. 

{<3>}![](/content/images/2014/11/Screen-Shot-2014-11-08-at-6-35-21-PM.png)

**In comes [Ghost](ghost.org).**

Ghost was the answer to all my blogging problems. I was able to migrate ALL of my blogs within a single day! I didn't have to do much heavy lifting and I could customize a theme for each blog that I was creating. Blog posts could have tags, custom urls, post images, locally saved images could be uploaded to the post with ease, different posts could have different authors and much more! The issue came when I was pushing the blogs to heroku. What I didn't realize beforehand was that Ghost  natively operates using a MySQL database. This isn't too hard to change locally because all you need to do is setup the config.js file in the root folder to reflect your postgres database or whatever. For some reason, pushing those changes onto heroku caused my sites to crash REPEATEDLY. That was until I discovered [Greg Bergé's post](http://www.therightcode.net/deploy-ghost-to-heroku-for-free/). 

{<4>}![](/content/images/2014/11/heroku-ghost-1.png)

Within 5 minutes, each of my blogs were up and running flawleslly (well much better than before). The best part was when you wanted to create a new post, Ghost has an inbuilt markdown preview with an extremely user friend interface! I've become an official fan-girl for Ghost and definitely recommend trying it out. 

I'm sure there are still MANY kinks on each of the sites so if you happen to visit any of them and see something that doesn't look right, [please let me know](mailto:sumedha.pramod@gmail.com) so I can take care of it right away. 

- Anagha's Blog: [Dear Universe](dearuniverse.me)
- Mom's Blog: [UppuKhara](uppukhara.com)
- Mine and Anagha's cooking blog: [Cooking In Pajamas](cookinginpjs.com)

---
All of the code for these sites are avaible on my github page: 
[SumNinjaCode](https://github.com/pramodsum/SumNinjaCode)
[Dear Universe](https://github.com/pramodsum/Dear-Universe-Blog)
[UppuKhara](https://github.com/pramodsum/Uppu-Khara-Blog)
[Cooking In Pajamas](https://github.com/pramodsum/Cooking-In-Pajamas)

