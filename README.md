# Javascript playground

This is  only a playground for JavaScript course

## How to prepare enviroment 

If you haven't already installed npm, please read http://blog.npmjs.org/post/85484771375/how-to-install-npm

Please be sure that you have configured PATH to you npm instalation. 

Before you run the test please be sure that you install following packages: karma, karma-qunit, gulp, karma-phantomjs-launcher. Here are required commands (installation of required packages see node_modules directory):

   npm install gulp -g   
   
   npm install karma -g
   
   npm install karma-qunit
   
   npm install karma-phantomjs-launcher
   

 -g parameter means that the package will be install in global npm directory.  


##To run simple test: 

gulp test - to run the test only ones.

gulp tdd - test will be run automaticly after each test change. 

you may also run karma directly by invoking 

karma start karma.conf.js









