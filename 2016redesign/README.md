#Setting Up Development Environment
This project utlizes Gulp as a build tool for compiling sass into css (inlcuding linting, prefixing and minification) and image compression. 

You will need to have [Node](https://nodejs.org/en/) and Ruby (Mac users have this automatically, [PC folks go here](https://www.ruby-lang.org/en/documentation/installation/) installed on your machine. You will also need to [install SASS](http://sass-lang.com/install). 

Once all of these are on your machine install gulp globally (if you have never done so). If these are already on your machine then no need:

	$ npm install -g gulp

Then install the dependencies:

	$ npm install --save-dev gulp gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-rename gulp-scss-lint gulp-imagemin gulp-cache del

To start gulp compiling and watching tasks type: 

	$ gulp

**Gulp is set to complie CSS into the stylesheets folder.** A copy of each SASS file is produced, but you will mostly only need the styles.min.css. All images placed in the image folder will be compressed and move into the dist folder.


#Wrappers
All wrappers were built using Twitter Bootstrap (http://getbootstrap.com/) on a 1000px grid. All CSS was written using SASS and then compiled and minified for performance purposes. The base file for all wrappers resides on the server at [http://www2.mda.org/css/teamRaiser/base/styles.min.css] http://www2.mda.org/css/teamRaiser/base/styles.min.css. The site default wrappers also uses [https://secure2.convio.net/mda/css/siteRedesign2016.min.css]https://secure2.convio.net/mda/css/siteRedesign2016.min.css. This is compiled in the stylesheet folder seperately as siteRedesign2016.min.css.

**Be careful making updates as this stylesheet is used across all event programs and several donation forms.**

The following JavaScript libraries and plugins are utilized in the wrapper: 
*	Modnizr (for feature detection)
*	jQuery (for DOM manipulation, AJAX/JSON for event search) 
*	Luminate API (for event search)
*	Google Maps API (for geo-location and event search)
*	Owl Carousel (for Feature Participants)
*	Animate Number (for radial thermometer)
*	Circle Progress (for radial thermometer)

All of these are included at the end of the html section in the wrapper to ensure proper loading. All scripts used for the wrapper are located in two PageBuilder reusables:
*	teamraiser_scripts (scripts that are used for all TeamRaiser events)
*	musclewalk_events_js (which includes scripts specific for Muscle Walk events, other wrappers will have specific reusables created to target just those wrappers)

To find the wrappers in Luminate, go to PageWrapper and search for 2016. This will pull up all the wrappers created for this project. This inlcudes each of the TeamRaiser's wrappers, as well as a genreral site wrapper that is mostly used for donation forms. 

The client has begun to create new wrapper for General Events, so there are a ton of these now. Not sure the thinking here, this was done without our input or advice (aside from creating 2 extra General Event Wrappers for no registration and no teams). Looks like they are just creating new wrappers with each new event, which is probably not necessary or best practice.


#PageBuilder
Several content folder were created to stroe PageBuilder pages and reusbales to keep things reorganized. These are as follows:
*	Cross Event Reusable (used for all wrappers) 
*	General Event -> General 2016
*	Golf
*	Lock Up -> Loc Up 2016
*	Muscle Walk -> Muscle Walk 2016
*	Team Momentum -> Team Momentum


#JavaScript
Each of the TeamRaiser wrappers has the teamRaiserScripts.js fole included. Then each event has an event specific file also included. The siteScripts.js file is inlcuded in the Site Wrappers used for donation forms.

#Particpant Center
Files for this inlcude a sample dahsboard file. I am inlcuding the base and event styles here, **although I think they should be moved into the custom css file using @import to protect against upgrades.** Also included are the PC Wrapper html and a merge fields file. The merge fields basically just saves values that are moved into place with JavaScript to allow for Suggested Messages tohave dynamic data. This is now already incorporated into the PC Wrapper.


