---
title: Getting Started with Middleman
date: 2016-06-26
tags: web development, middleman
---

Hello blogland!

Much like the shoemaker's children go barefoot, the web developer's personal site often suffers neglect. Wanting a blogging platform for pragmatic reasons, I knew I couldn't live with myself if I built yet another *\*gasp\** Wordpress site. Having recently joined the cult of static site fanaticism, and curious about this one called Middleman, I present to you a fun Sunday evening project for weirdos and normals alike: how to create a Middleman blog.

READMORE

### Introduction

As is often the case with these things, each install is going to require a slightly different subset of these steps, depending on your setup and what you do or do not already have configured on your machine. As is also often the case, you're going to get frustrated and I'm going to sound like a jerk when I fail to tell you to update homebrew. Again. Or whatever.

Here's the general outline.

1. Install/update Ruby
2. Install Middleman
3. Initialize a Middleman site
4. Add blog functionality
5. Enhance blog features
6. Move blog to subdirectory
7. Voila! Done.

### Install/Update Ruby

I'm running a mac, so I pretty much googled <a href="http://code.tutsplus.com/tutorials/how-to-install-ruby-on-a-mac--net-21664" target="_blank">How to Install Ruby on a Mac</a> and followed this article.

About halfway though, it has you update your bash profile. If you haven't already tricked out your bash profile, I highly recommend doing so. I usually start with <a href="https://natelandau.com/my-mac-osx-bash_profile/" target="_blank">Nate Landeau's bash profile</a> and then make it my own.

If you're still following the Tutsplus tutorial, you can stop after Step 3. Everything about XCode and Rails and versioning are really specific to the use case and not necessary for a basic Middleman build. For what it's worth, I'm running Ruby 2.3.0 but that information will be obsolete in about 5 seconds.

### Install Middleman
From there, I jumped over to the <a href="https://middlemanapp.com/" target="_blank">Middleman</a> site and followed their instructions. To start with you'll open your terminal and run:

`gem install middleman`

which installs the Middleman Ruby gem on your system. Now, you're able to use the `middleman` prompt to create any number of Middleman sites.

### Initialize a Middleman site

Next, cd into whatever folder where you want to make your site. For me this means:

`cd /Users/USERNAME/Sites`

And then run this command to create your new site in a folder called *my_site*:

`middleman init my_site`

At the time of this writing, I got prompts asking if I wanted to activate livereload and compass and the answer is yes and yes! Technically, you don't *have* to, but then you'll miss out on all kinds of fun. 

Now you should see that a folder was created containing a source folder, a gemfile, and *config.rb* file. This means your basic site is up and running, so to see it you'll run:

`bundle exec middleman server`

And then visit http://localhost:4567/.

If you just want a static site, you're done! Stop reading!

### Add blog functionality

This is where the <a href="https://middlemanapp.com/basics/blogging/" target="_blank">middleman documentation</a> forks a bit and it took some experimentation. You have to decide whether you want to create a new blog site, retrofit your static site with a blog, or some other combination of roundabout problem solving which is what I did. And thank goodness! Middleman documentation isn't totally clear, so I'm going to save you some grief.

We're actually going to create a new site for the blog and then port over some of the features from our static site. At this time, the blog starter doesn't offer livereload and some of the features that the static starter does.

First, we need to add the Middleman blog gem:

`gem install middleman-blog`

Then, navigate out of your *my_site* folder and let's create a *my_blog* site:

`middleman init my_blog --template=blog`

Now move into the folder:

`cd my_blog`

And run:

`bundle exec middleman server`

Now when you visit http://localhost:4567/, you should see an unstyled blog home page with one example post.

### Enhance blog features

We're going to take all the goodness from the static site you created and marry it with the blog.

First, copy over all files from the source folder in *my_site* into the source folder in *my_blog* __except__ *index.html.erb*.

Next, copy over these lines from the gemfile in *my_site* and paste them into the gemfile in *my_blog*:

<pre>
gem 'middleman-livereload'
gem 'middleman-compass', '>= 4.0.0'
</pre>

Then, in the terminal, run:

`gem install middleman-livereload && gem install middleman-compass`

Next, from *config.rb*, copy over the code that activates livereload. It should look something like this:

<pre>
configure :development do
  activate :livereload
end
</pre>

Finally, grab the code from the layout.erb file in *my_site* (this one is nested in the layouts folder) that references the font, stylesheet, and javascript and add it to the layout.erb file in *my_blog*. It should look like this, but obviously you can customize those later:

<pre>
&lt;link href='//fonts.googleapis.com/css?family=Lato:300,400' rel='stylesheet' type='text/css'&gt;

<%= stylesheet_link_tag :site %>
<%= javascript_include_tag :all %>
</pre>

This step can be a little convoluted, but by comparing these two sites, you can learn a lot about what their disparate components do. Ideally by the end of this stage, your blog should be loading like it was at the end of the previous step, but now with some basic styles and livereload.

### Move blog to subdirectory

This may not apply to you, but I wanted my blog to live under /blog instead of in the root folder. This takes moving files and also customizing settings in config.rb. 

First, create your /blog subdirectory move the following files to it:

<ul>
	<li>calendar.html.erb</li>
	<li>index.html.erb</li>
	<li>tag.html.erb</li>
	<li>example post file</li>
</ul>

Now we need to to update config.rb to reflect that we want the blog to serve from /blog. Update these three lines as follows:

<pre>
# Set blog home to live at /blog
blog.prefix = "blog"
	
# Set tag and calendar home to live at /blog/tags and /blog/date
blog.tag_template = "blog/tag.html"
blog.calendar_template = "blog/calendar.html"
</pre>

Finally, we need to maintain separate <a href="https://middlemanapp.com/basics/layouts/" target="_blank">layout files</a> for our blog pages and our non-blog pages. Thankfully, we have both layout files already created from earlier steps. We just have to rename and rearrange them.

First, find the *layout.erb* file that's in the root folder and rename it to *blog.erb*. Then move it into the *layouts* folder.

Next, we're going to add this line to config.rb, which tells Middleman to use the blog.erb file as the layout for all pages in the /blog subdirectory:

`page "/blog/*", layout: :blog`

Now that your blog should be serving from /blog, your homepage may look pretty empty. Feel free to grab the index.html.erb from *my_site* and copy to *my_blog*.

Now you should have a static page serving from http://localhost:4567/ and your blog homepage serving from http://localhost:4567/blog. You're ready to start writing!

### Optional Customization

I chose to also add features including:

<ul>
	<li>custom permalinks</li>
	<li><a href="https://middlemanapp.com/basics/blogging/#article-summaries" target="_blank">summaries</a></li>
	<li>header and footer <a href="https://middlemanapp.com/basics/partials/" target="_blank">partials</a></li>
	<li>css and javascript minification</li>
</ul>

Some of these are settings in config.rb. Others are pretty well documented already in the <a href="https://middlemanapp.com/basics/install/" target="_blank">Middleman docs</a> so I don't need to dive into them here.

### Conclusion

I'm just getting start with Middleman, but so far I'm pretty impressed with the ease of use plus extensibility. The documentation also feels really complete and generally easy to follow, so I was suprised at the gaps I found which prompted this post. Hopefully your experience has been even smoother and you're up and running without a hitch!

















