//YAHOO.Convio.PC2.Utils.LoadingMessage="Loading, please wait.";
//YAHOO.Convio.PC2.Utils.LoadingMessage_en_US="Loading, please wait.";

var loadCustomHandlers = function() {
    /*
     * This is an example for subscribing to the registrationLoaded event.
     * The single argument passed is the Registration object, which is also
     * saved to YAHOO.Convio.PC2.Data.Registration
     */
    //YAHOO.Convio.PC2.Utils.publisher.on("pc2:registrationLoaded", function(registration) {
    //    YAHOO.log("registrationId: " + registration.registrationId, "debug", "custom.js");
    //});
    
    /*
     * This is an example for subscribing to the constituentLoaded event.
     * The single argument passed is the user object, which is also
     * saved to YAHOO.Convio.PC2.Data.User
     */
    //YAHOO.Convio.PC2.Utils.publisher.on("pc2:constituentLoaded", function(user) {
    //    YAHOO.log("name: " + user.name.first + ' ' + user.name.last, "debug", "custom.js");
    //});
    
    /*
     * This is an example for subscribing to the wrapperLoaded event.
     * The single argument passed is the wrapper object.
     */
    //YAHOO.Convio.PC2.Utils.publisher.on("pc2:wrapperLoaded", function(wrapper) {
    //    YAHOO.log("personal page URL: " + wrapper.personalPageUrl, "debug", "custom.js");
    //});
    
    /*
     * This is an example for subscribing to the configurationLoaded event.
     * The single argument passed is the config object, which is also
     * saved to YAHOO.Convio.PC2.Data.TeamraiserConfig
     */
    //YAHOO.Convio.PC2.Utils.publisher.on("pc2:configurationLoaded", function(config) {
    //    YAHOO.log("Accepting donations: " + config.acceptingDonations, "debug", "custom.js");
    //    YAHOO.Convio.PC2.Data.TeamraiserConfig.AdminNewsFeed.showAdminNewsFeed = false;
    //    YAHOO.Convio.PC2.Data.TeamraiserConfig.AdminNewsFeed.feedCount = 1;
    //    YAHOO.Convio.PC2.Data.TeamraiserConfig.AdminNewsFeed.cycleInterval = 0;
    //    YAHOO.Convio.PC2.Data.TeamraiserConfig.AdminNewsFeed.maxTextLength = 50;
    //    YAHOO.Convio.PC2.Data.TeamraiserConfig.AdminNewsFeed.showBelowProgress = true;
    //});
    
    /*
     * This is an example for subscribing to the participantProgressLoaded event.
     * The single argument passed is the progressData object, which is also
     * saved to YAHOO.Convio.PC2.Data.ProgressData
     */
    //YAHOO.Convio.PC2.Utils.publisher.on("pc2:participantProgressLoaded", function(progressData) {
    //    YAHOO.log("Days left: " + progressData.daysLeft, "debug", "custom.js");
    //});
    
    /*
     * This is an example for subscribing to the viewChanged event.
     * The single argument passed is the viewChange object, which has 
     * these attributes.
     * 
     * oldView: the name of the old primary view.
     * oldSubview: the name of the old subview.
     * view: the name of the new primary view.
     * subview: the name of the new subview.
     */
    YAHOO.Convio.PC2.Utils.publisher.on("pc2:viewChanged", function(viewChange) {
        /*console.log("View changed. Old was: " + viewChange.oldView + "-" + viewChange.oldSubview 
                + ". New is: " + viewChange.view + "-" + viewChange.subview + ".", "debug", "custom.js");*/
        var theView = viewChange.view + "-" + viewChange.subview;
        if(theView == 'dashboard-home') {
            jQuery('#bd').addClass('full');
            jQuery('#sidebar').prependTo('#dashboard-content');
            jQuery('#sidebar').addClass('homeSide');
            jQuery('#dashboard-sidebar').addClass('hidden-form');
        }else{
            jQuery('#bd').removeClass('full');
            jQuery('#sidebar').insertAfter('#yui-main');
            jQuery('#sidebar').removeClass('homeSide');
            jQuery('#dashboard-sidebar').removeClass('hidden-form');
        }
    });
    
    /*
     * This is an example for subscribing to the contactAdded event.
     * The single argument passed is the contact, or array of contacts, added
     * by an explicit API call.
     * 
     * Note that this event will not fire if a contact is added as a 
     * side effect of another action such as processing an offline gift.
     */
    //YAHOO.Convio.PC2.Utils.publisher.on("pc2:contactAdded", function(contacts) {
    //    contacts = YAHOO.Convio.PC2.Utils.ensureArray(contacts);
    //    YAHOO.log("Number of contacts added: " + contacts.length, "debug", "custom.js");
    //});
    
    /*
     * This is an example for subscribing to the emailSent event.
     * The single argument passed is the JSON object containing a 
     * success flag.
     */
    //YAHOO.Convio.PC2.Utils.publisher.on("pc2:emailSent", function(response) {
    //    YAHOO.log("Email sent: " + response.success, "debug", "custom.js");
    //});
    
    /*
     * This is an example for subscribing to the personalPageUpdated event.
     * The single argument passed is the JSON object containing a 
     * success flag.
     */
    //YAHOO.Convio.PC2.Utils.publisher.on("pc2:personalPageUpdated", function(response) {
    //    YAHOO.log("Personal page updated: " + response.success, "debug", "custom.js");
    //});
    
    /*
     * This is an example for subscribing to the suggestionLoaded event.
     * The single argument passed is the Suggestion object.
     */
//    YAHOO.Convio.PC2.Utils.publisher.on("pc2:suggestionLoaded", function(suggestion) {
//      
//        YAHOO.log("Loaded default 'what next?' suggestion: " + suggestion.success, "debug", "custom.js");
//        
//        // resolve a self-donation URL
//        var personalDonationUrl = YAHOO.Convio.PC2.Data.personalDonationUrl;
//        
//        // if users has self-donation URL and is not already a self-donor
//        if (personalDonationUrl && YAHOO.Convio.PC2.Data.Registration.selfDonor == 'false') {
//          
//          var el = YAHOO.util.Dom.get("what-next-answer");
//          el.innerHTML = "<a href=\"" + personalDonationUrl + "\"> Make a self-donation.</a>";
//          
//          YAHOO.log("Overwrote default 'what next?' suggestion; self-donation message", "debug", "custom.js");
//        }
//        
//    });
}

/* Executes after new JS is dynamically loaded, 
 * and before new view load begins. */
var loadOverrides=function(view,subview){

    //CODE BRought OVER FROM 2015 to populate SUGGESTED MESSAGES. NEEDS REWORKED SINCE NOT EMBEDDED PC
     if(view=='email'&&subview=='compose'){
        GetSuggestedMessageCallback.success=function(o){
            var divString="";
            //GRABBING MERGE FIELDS AND SETTING AS VARS
            var firstName = jQuery('#mergeFirst').text();
            var lastName = jQuery('#mergeLast').text();
            var eventName = jQuery('#mergeEventName').text();
            var eventStartDate = jQuery('#mergeStart').text();
            var eventEndDate = jQuery('#mergeEnd').text();
            var eventLocation = jQuery('#mergeLocation').text();
            var consAddress = jQuery('#mergeConsAddress').text();
            var teamName = jQuery('#mergeTeamName').text();
            
            var partPageLinkText = jQuery('#mergePartPageLinkText').text();
            var partPageLink = '<a href="'+partPageLinkText+'">';
            
            var teamPageLinkText = jQuery('#mergeTeamPageLinkText').text();
            var teamPageLink = '<a href="'+teamPageLinkText+'">';
            
            var participantCenterLinkText = jQuery('#mergeParticipantCenterLink').text();
            var participantCenterLink = '<a href="'+participantCenterLinkText+'">';

            var participantCenterEmailLinkText = jQuery('#mergeParticipantCenterEmailLink').text();
            var participantCenterEmailLink = '<a href="'+participantCenterEmailLinkText+'">';

            var boundlessFundraisingLinkText = jQuery('#boundlessFundraisingLink').html();
            var boundlessFundraisingLink = '<a href="'+boundlessFundraisingLinkText+'">';

            var officemailadd = jQuery('#mergeOfficeMailAdd').text();
            console.log(partPageLink);

            var response=YAHOO.lang.JSON.parse(o.responseText).getSuggestedMessageResponse;
            YAHOO.util.Dom.get("email-subject").value=response.messageInfo.subject;
            messageId=response.messageInfo.messageId;
            selectTemplate(messageId);  
            initialSubject=response.messageInfo.subject;
            var messageBody="";
            if(YAHOO.lang.isString(response.messageInfo.messageBody)){
                //SWITCHING FROM GRABBING VAR IN PARENT WINDOW - NOW GRABBING FROM VALUE PLACED IN HTML
                messageBody=response.messageInfo.messageBody;
                messageBody=messageBody.replace(/\[EventName\]/g,eventName).replace(/\[EventStartDate\]/g,eventStartDate).replace(/\[EventEndDate\]/g,eventEndDate).replace(/\[EventLocation\]/g,eventLocation);

                messageBody=messageBody.replace(/\[PartFirstName\]/g,firstName).replace(/\[PartLastName\]/g,lastName).replace(/\[PartAddress\]/g,consAddress);

                messageBody=messageBody.replace(/\[TeamName\]/g,teamName);

                messageBody=messageBody.replace(/\[PartPageLink\]/g,partPageLink).replace(/\[TeamPageLink\]/g,teamPageLink).replace(/\[PartPageLinkText\]/g,partPageLinkText).replace(/\[TeamPageLinkText\]/g,teamPageLinkText).replace(/\[ParticipantCenterLink\]/g,participantCenterLink).replace(/\[ParticipantCenterEmailLink\]/g,participantCenterEmailLink).replace(/\[BoundlessFundraisingLink\]/g,boundlessFundraisingLink).replace(/\[EndLink\]/g,'</a>'); 

                messageBody=messageBody.replace(/\[OfficeMailAdd\]/g,officemailadd);
            }
            var layoutId=response.messageInfo.layoutId;
            if(YAHOO.lang.isValue(layoutId)&&layoutId>0){
                chooseLayout(layoutId);
                lockLayouts();
            }
            else{
                unlockLayouts();
                chooseLayout(defaultLayoutId);
            }
            setComposeEditorContent(messageBody);
            initialMessage=messageBody;
        }
        PreviewMessageCallback.success=function(o){ //workaround for bug #51003
            updatePageStatus('');
            var response=YAHOO.lang.JSON.parse(o.responseText).getMessagePreviewResponse;
            if(YAHOO.lang.isString(response.subject)){
                var subject=YAHOO.util.Dom.get("preview-header");
                subject.innerHTML=response.subject;
            }
            var body=YAHOO.util.Dom.get("preview-body");
            body.innerHTML=response.message.replace('[[S431]]','');
            lightBox.show();
        }
    }
};

var loadCustom = function() {
    /*
     * You can execute a function once all of the specified
     * events have fired with the YAHOO.Convio.PC2.Utils.require
     * function. 
     */
    YAHOO.Convio.PC2.Utils.require("pc2:registrationLoaded", "pc2:constituentLoaded", "pc2:configurationLoaded", "pc2:wrapperLoaded", function() {
        YAHOO.log("Registration, Constituent, Configuration, and Wrapper are all loaded.", "debug", "custom.js");

        //MOVING ITEMS
        jQuery('#hd_nav_etc_help_link').prependTo('.utilityHelp');
        jQuery('.tagline.welcome').insertAfter('#hd-nav');
        jQuery('.ctaBtn').appendTo('#bd-personal-progress');
        jQuery('#dashboard-sidebar .side-links').appendTo('.footerActions');
        //jQuery('.frontContent').insertBefore('#what-next-answer');
        jQuery('#captainsMessage').addClass('container');
        jQuery('#captainsMessage').insertBefore('#bd-recent-activity');
        jQuery('footer').insertAfter('#msg_address_not_in_list');
        //EXTRA NAV BTN
        jQuery("#fundResources").appendTo('#hd-nav');        
        
        //PROGRESS BAR
        jQuery('#msg_cat_progress_my_goal').addClass('tiny-block');
        jQuery('.fundraising-progress .section').each(function(){
            jQuery(this).children('.tiny-block').prependTo(this);
        });       
        jQuery('#msg_cat_team_progress_days_left_label').text('Days Left');
        jQuery('#msg_cat_change_goal_link').text('Change Goal');
        jQuery('#msg_cat_change_goal_link').insertAfter('#progress-goal-value');
         jQuery('#msg_cat_team_report_change_goal_link').text('Change Goal');
         jQuery('#msg_cat_team_report_change_goal_link').insertAfter('#team-progress-goal-value');             
    });
    
    /*
    var leftNav = document.createElement("div");
    leftNav.id = "custom_left_nav";
    
    var leftNavContent = document.createElement("p");
    leftNavContent.appendChild(document.createTextNode("Hello left nav"));
    leftNav.appendChild(leftNavContent);
    
    YAHOO.util.Dom.addClass(leftNav, "custom-left-nav");
    
    var firstChild = YAHOO.util.Dom.getFirstChild("yui-main");
    YAHOO.util.Dom.insertBefore(leftNav, firstChild);
    */
};


