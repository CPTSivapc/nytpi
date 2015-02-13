#The New York Times Paid Post Scaffolding

## Why not use an existing scaffolding project (Yeoman, etc..)?
Paid Posts are treated as articles in the NYTimes.com ecosystem.  As a result, there are at least three major proprietary requirements for deployment and management:

* Managed by our internal CMS "Scoop"
* Rendered by our internal web framework "NYT5"
* Hosted in the NYTimes.com server ecosystem

All of the decisions in scaffolding are designed to allow maximum flexibility for development within the above constraints.

## Getting started
Scaffolding is a discrete starting point for a new Paid Post.  No installer is required. 

The simplest way to start a project is to clone, remove .git and git init:

    git clone https://github.com/nytpi/scaffolding.git <your projectname>
    cd <your projectname>
    rm -rf .git
    git init
    git remote add origin <your repo>
    git add .
    git commit -m"Initial Commit"
    git push origin master
    npm install

This same effect can also be accomplished through a variety of other means.

## Working with the Scaffolding
> Below is an overview of how to develop Paid Posts from this scaffolding.  Please reach out early an often to NYTimes developers with any questions, concerns or if you would like any explanations to why things are the way they are.

### Building 
Paid Posts are built using Grunt.  To get started, go to your project folder and run

    grunt watch

You can see which files are watched in Gruntfile.js.  It's set up by default to watch for any relevant js and html changes, but you may need to add other paths/files if you choose to use files/directories outside of our conventions.

Feel free to add any other libraries you'd like to use to the build process, such as js/css precompilers, templating engines, etc...

### Previewing
Grunt builds a local development version of the Paid Post into the index.html file in the rood of the folder structure, so simply aim your browser at the directory and you should see what you will get.

### Updating HTML
All html updates need to happen in the /htmlComponents/body.html file and should exist between <main> tags:

    <main> ... your code goes here ...</main>
    
If you are running grunt watch, each update will be built into index.html on save.

Template preprocessors can be used here.  For example, you could create a main.hbs file that gets built by grunt into the main.html file early in the build process.

### Working with JS
Scaffolding concatinates all code into a require block in order to insulate it from the javascript at play in the greater NYT5 application.  

Look at the concat section of Gruntfile.js to see how it concatinates.  Fee free to update this files/folders to make sure your code is put together like this:

    /js/src/head.js 
    ... all of your js files 
    /js/src/tail.js.  

Open up head.js and notice that all this happens within a require context.  Feel free to add any libraries or other depenencies into this require context.

> Note: Please only use require to include libraries and make sure your code is concatinated into the app-build file.  This will greatly aid us during the deployment process.

### Working with CSS
Scaffolding ships with a simple css file in the /styles/ directory.  Note that the css file is versioned and that version is controlled in the top of Gruntfile.js.  If you want to precompile css, make sure to set your precompiler's filename to the name of the current file.

## Delivery
Paid Posts should be delivered to us via a public repo (aka, github.com).  

### Assets
All assets except videos should be included in the repo.  

Videos are to be zipped up and posted somewhere we can download them.  Please ensure the link remains live up to the launch date of the project. 

If video compression is part of your deal, all videos should be compressed into three sizes:
* Web mp4 720p (for laptop/desktops not Firefox)
* Web webm 720p (for Firefox)
* Mobile mp4 360p 

Compression is as much art as science.  Care should be taken to find the smallest filesize that does not result in video or audio deterioration.  When in doubt, send samples to us for approval.

## Thanks!  
Ad Platform Innovations
