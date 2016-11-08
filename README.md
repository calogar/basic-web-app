# Basic web app template
This project is a minimal web application scaffold that includes basic configuration. It's meant to be used as a startup template for starting any kind of web application.

##Features
* **npm**, a plugin handler.
* **Bower**, a JS plugins and dependencies handler.
* **Gulp**, a task automation tool.
* **Babel**, for ES2015 JS.
* **Jasmine**, a JS testing framework.
* **SASS**, a stylesheets preprocessor.
* **slim**, a HTML preprocessor.
* **Bootstrap**, a front-end framework.
* **BroswerSync**, a live reload plugin embedded in Gulp.

##How to use
After downloading, we must install all the plugins stored in package.json by running this command in the root folder:
```
npm install
```

Then we do the same thing with the Bower plugins, by running:
```
bower install
```

After all the plugins are installed, we can run:
```
gulp dev
```
to compile all the preprocessors, launch the BrowserSync and start watching files so they can be automatically processed when somesthing changes.

##Gulp plugins
* browser-sync
* gulp-babel
* gulp-clean-css
* gulp-header
* gulp-jasmine
* gulp-rename
* gulp-sass
* gulp-slim
* gulp-uglify
* jasmine-reporters