<script>
$(document).ready(function(){
    //DEVICE DETECTION
    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
    if(isAndroid) {
        $('html').addClass('android');
    }

    //STYLING SELECTS
    var selectArrow = '<span class="selectArrow"><i class="fa fa-caret-up"></i><i class="fa fa-caret-down"></i></span>';
    $('select').wrap('<div class="selectWrap"></div>');
    $(selectArrow).appendTo('.selectWrap'); 

    //NAV DROPDOWNS
    $('.desk ul.nav li.dropdown').click(function() {
        $(this).find('.dropdown-menu').stop(true, true).slideToggle();
        $(this).find('.dropdown').toggleClass('active');
    });
    $('.mobileShow ul.nav li.dropdown').click(function() {
         $('.mastheadWrap.mobileShow').toggleClass('active');
         $(this).find('.navbar-nav').stop(true, true).slideToggle();
    });
    $('.desk .logInForm').click(function() {
        $('.navbar-static-top form').slideToggle();
        $('.logInForm').toggleClass('hidden');
    });
    $('.mobileShow .logInForm').click(function() {
        $('.navbar-static-top form').slideToggle();
        $('.mastheadWrap.mobileShow .navbar-brand').toggleClass('hidden');
        $('.mastheadWrap.mobileShow .nav').toggleClass('hidden');
        $('.mastheadWrap.mobileShow .login.right').toggleClass('hidden');
    });

    // When user hits 'enter', do a click instead
    $(".eventSearchComponent form").submit(function() {
        $('#zipSubmit').click();
        return false; 
    });

    [[?xentryx::x[[S334:pg]]x::
        //wrapping google map link around place name and address
        mapArray = '[[T1:[[E42:[[S334:fr_id]]::street]] [[E42:[[S334:fr_id]]::city]] [[E42:[[S334:fr_id]]::state]] [[E42:[[S334:fr_id]]::zip]]]]';
        mapLink = 'http://maps.google.com/?q='+mapArray;
        $('.mapLink').attr('href', mapLink);
        
        //QUICK SEARCH CUSTOMIZATIONS
        $('#TeamRaiserQuickSearch br').remove();
        $('#TeamRaiserQuickSearch #qf').attr('placeholder', 'Search by Participant Name');
        $('#TeamRaiserQuickSearch #qf').addClass('form-control');
        $('#TeamRaiserQuickSearch #qf_go').val('');

        //TOP LISTS
        $('.topParticipant .hidden .indicator-list-row .display-name a').each(function(){
            var url = $(this).prop('href').split("?")[1];
            var urlSplit = url.split('&');
            var px = urlSplit[0];
            var pxID = px.split('px=');
            var consID = pxID[1];
            var donateUrl = 'Donation2?df_id=[[E42:[[S334:fr_id]]:form-id]]&FR_ID=[[S334:fr_id]]&PROXY_ID='+consID+'&PROXY_TYPE=20&[[E42:[[S334:fr_id]]:form-id]].donation=form1';
            var name = $(this).parent().parent().parent().html();
            var total = $(this).parent().parent().parent().children('.list-value-container');
            consInfo ='<div class="listRow">'+name+'<a class="right" href="'+donateUrl+'">Donate</a><div class="clear"></div></div>';
            $(consInfo).appendTo('.topParticipant .list');
        });
        $('.topTeam .hidden .indicator-list-row .display-name a').each(function(){
            var url = $(this).prop('href').split("?")[1];
            var urlSplit = url.split('&');
            var team = urlSplit[0];
            var teamSplit = team.split('team_id=');
            var teamID = teamSplit[1];
            var donateUrl = 'Donation2?df_id=[[E42:[[S334:fr_id]]:form-id]]&FR_ID=[[S334:fr_id]]&PROXY_ID='+teamID+'&PROXY_TYPE=22&[[E42:[[S334:fr_id]]:form-id]].donation=form1';
            var joinUrl = 'TRR?fr_tjoin='+teamID+'&pg=tfind&fr_id=[[S334:fr_id]]'
            var name = $(this).parent().parent().parent().html();
            var total = $(this).parent().parent().parent().children('.list-value-container');
            teamInfo ='<div class="listRow">'+name+'<a class="right" href="'+donateUrl+'">Donate</a><a class="right" href="'+joinUrl+'">Join</a><div class="clear"></div></div>';
            $(teamInfo).appendTo('.topTeam .list');
        });

        //hide local sponsior div if empty
        if( !$.trim( $('.localLogos').html() ).length ) {
            $('.sponsors.local').remove();
        }
    ::]]

    [[?x27x::x[[S4]]x::
        //REG Flow customizations             
        var rightArrow = '<i class="fa fa-caret-right"></i>'
        $(rightArrow).appendTo('#team_find_registration_type_container a');
        $('.reactivate').prependTo('.section-footer');        
        [[?xptypex::x[[S334:pg]]x::
            $('.prizes').insertAfter('#part_type_fundraising_goal_container');
            //GIFT LEVEL BUTTONS
            $('#part_type_additional_gift_container .donation-level-row-container input').wrap('<div class="donation-level-label-input-container"></div>');
            $('div.responsive #part_type_additional_gift_container label.donation-level-row-label-no-gift').text('No Gift');
            $('.donation-level-row-container').click(function(){
                $('.donation-level-row-container').removeClass('active');
                $(this).addClass('active');
            });
            $('.donation-level-row-label-no-gift').text('No donation');
            $('.donation-level-row-container:nth-child(5)').addClass('otherAmt');
            $('.otherAmt input').attr('placeholder', "Other Amount");
        ::]]
        [[?xwaiverx::x[[S334:pg]]x::
            $('#waiver_custom_html').insertAfter('.progress-bar-container');
        ::
        ]]        
        //PARTICIPANT INFO PAGE
        $('#registration_options_page #cons_info_component_contact_info_section #contact_info_section_two').appendTo('#personal_info_container');
        $('#registration_options_page #reg_options_cons_info_extension #reg_options_cons_info_extension_body').appendTo('#personal_info_container');
        $('#registration_options_page #cons_info_component_contact_info_section .cons-info-question-container.cons-address-street-full-container').addClass('street');
        $('#cons_city').closest('.cons-info-question-container').addClass('city');
        $('#cons_state').closest('.cons-info-question-container').addClass('state');
        $('#cons_zip_code').closest('.cons-info-question-container').addClass('zip');
        $('#cons_info_country_container').addClass('country');

           
    ::]]

    [[?[[?xpersonalxteamx::x[[S334:pg]]x::T::]][[?xfr_personalxfr_teamx::x[[S334:page_type]]x::T::]]::T::    
        $('.manageable-editor-window-editor').appendTo('.description');
        [[?xpersonalx::x[[S334:pg]]x::
            $('.tr-page-header h2').appendTo('.updateTitle');
            $('.trPage-header h2').appendTo('.updateTitle');
            $('.tr-image-div').appendTo('.detailsSection');
            $('.TrAchievementBadgeIconListLarge').appendTo('.badges');
            var name = '[[E48:[[S334:fr_id]]-[[S334:px]]:cons.first_name]]';
            var pgTitle = "Welcome to "+name+"'s Page";
            $('.pageTitle h2').text(pgTitle);
            
        ::
            $('#team_page_team_name').appendTo('.pageTitle');
            $('#team_image').appendTo('.detailsSection');
            $('.team-roster-participant-container').appendTo('.teamList');
            var teamCaptain = $('.team-roster-captain-name').html();
            $('p.captain').append(teamCaptain);
            $('.team-roster-legend').appendTo('.teamList');
            $('.team-roster-participant-name a').each(function(i){
                var url = $(this).attr('href');
                var splitUrl = url.split('px=');
                var pxID = splitUrl[1];
                var splitPX = pxID.split('&');
                var px = splitPX[0];
                var donateBtn = '<a class="red btn" href="Donation2?df_id=[[S42:0:form-id]]&FR_ID=[[S334:fr_id]]&PROXY_ID='+px+'&PROXY_TYPE=20&[[S42:0:form-id]].donation=form1">Donate</a>';
                $(this).parent().parent().addClass('row-'+i);
                $(donateBtn).appendTo('.row-'+i);
                i++
            });
        ]]            
    ::
    ]]

    [[?x9x::x[[S4]]x::
        //DONATION FORM
        jQuery('.custom-field-container.form-row').appendTo('.matchingGiftWrap');
        var addText = '<span> and select from the list:</span>';
            $(addText).appendTo('.matchingGiftWrap .form-input-label-block label');
        var amountLevel = readCookie('level')
        $('.donation-level-container:last-child').addClass('enterAmt'); 
        $('.enterAmt .donation-level-user-entered input').attr('placeholder','Other Amount');
        var donateSpan = '<span class="donation-level-total-amount"></span>';
        $('.donation-level-container').each(function(i){
            $(this).addClass('level'+i);
            i++;
        });        
        $('.donation-level-container').click(function(){
            $('.donation-level-container').removeClass('active');
            $('.formMessage p').removeClass('active');
            if($(this).hasClass('level0')){
                var level = 'level0';
            }else if ($(this).hasClass('level1')){
                var level = 'level1';
            }else if ($(this).hasClass('level2')){
                var level = 'level2';
            }else if ($(this).hasClass('level3')){
                var level = 'level3';
            }else if ($(this).hasClass('level4')){
                var level = 'level4';
            }
            document.cookie="level="+level;
            $(this).addClass('active');
            var amt = $(this).find('.donation-level-amount-container').text();
            $('#pstep_finish').text('Donate '+amt);        
            if($('.donation-level-container.active').hasClass('level0')) {
                $('.formMessage .level0').addClass('active');
            }else if ($('.donation-level-container.active').hasClass('level1')) {
                $('.formMessage .level1').addClass('active');
            }else if ($('.donation-level-container.active').hasClass('level2')) {
                $('.formMessage .level2').addClass('active');
            }else if ($('.donation-level-container.active').hasClass('level3')) {
                $('.formMessage .level3').addClass('active');
            }else if ($('.donation-level-container.active').hasClass('level4')) {
                $('.formMessage .level4').addClass('active');
            }            
        }); 
        //UPDATE BUTTON WHEN INSTALLMENT SELECTED
        $('#level_installmentduration').change(function(){
            console.log('click');
            var amt = $('donation-level-container.active .donation-level-amount-container').text();
            console.log(amt);

            $('#level_installmenttotal_row .donation-level-total-amount').text();
            $('#pstep_finish').text('Donate '+amt);
        });
        //make sure to remember values on reload
        if(amountLevel == 'level0') {
            $('.level0').addClass('active');
            $('.level0 .donation-level-label-input-container input').click();
        }else if (amountLevel == 'level1') {
            $('.level1').addClass('active');
            $('.level1 .donation-level-label-input-container input').click();
        }else if (amountLevel == 'level2') {
            $('.level2').addClass('active');
            $('.level2 .donation-level-label-input-container input').click();
        }else if (amountLevel == 'level3') {
            $('.level3').addClass('active');
            $('.level3 .donation-level-label-input-container input').click();
        }else if (amountLevel == 'level4') {
            $('.level4').addClass('active');
            $('.level4 .donation-level-label-input-container input').click();
        }     
    ::]]

    [[?xentryxpersonalxteamx::x[[S334:pg]]x::
        therm('[[S334:pg]]');
    ::]]
    
    [[?xptypex::x[[S334:pg]]x::
        $('.goalText').prependTo('#part_type_fundraising_goal_container .form-content .input-container');
    ::]]

    [[?xrthanksx::x[[S334:pg]]x::
        $('.part-center-container').appendTo('.pcCta');
    ::]]

});
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function therm(type) {
    if(type === 'entry') {
        var percent = '[[E130:[[E130:[[E42:[[S334:fr_id]]:dollars]] [[E42:[[S334:fr_id]]:goal]] /]] 100 *]]';
        var radialValue ='[[E130:[[E42:[[S334:fr_id]]:dollars]] [[E42:[[S334:fr_id]]:goal]] /]]';
        if(percent > 100) {
            var wholePercent = '100';
        }
        else {
            var splitPercent = percent.split('.');
            var wholePercent = splitPercent[0];
        }       
        animateRadial(radialValue,percent,type);
        animatePercent();        
    }else if(type === 'personal') {
        var percent = '[[E130:[[E130:[[E48:[[S334:fr_id]]:dollars]] [[E48:[[S334:fr_id]]:goal]] /]] 100 *]]';
        var radialValue ='[[E130:[[E48:[[S334:fr_id]]:dollars]] [[E48:[[S334:fr_id]]:goal]] /]]';
        if(percent > 100) {
            var wholePercent = '100';
        }
        else {
            var splitPercent = percent.split('.');
            var wholePercent = splitPercent[0];
        }        
        animateRadial(radialValue,percent,type);
        animatePercent();
    }else {
        var percent = '[[E130:[[E130:[[E43:[[S334:fr_id]]:dollars:[[S334:team_id]]]] [[E43:[[S334:fr_id]]:goal-dollars:[[S334:team_id]]]] /]] 100 *]]';
        var radialValue ='[[E130:[[E43:[[S334:fr_id]]:dollars:[[S334:team_id]]]] [[E43:[[S334:fr_id]]:goal-dollars:[[S334:team_id]]]] /]]';
        if(percent > 100) {
            var wholePercent = '100';
        }
        else {
            var splitPercent = percent.split('.');
            var wholePercent = splitPercent[0];
        } 
        animateRadial(radialValue,percent,type);     
        animatePercent();

    }
    function animatePercent() {
        var percent_number_step = $.animateNumber.numberStepFactories.append('%')
        $('.progressRadial .overlay .percent').animateNumber({
            number: wholePercent,
            easing: 'easeInQuad',
            numberStep: percent_number_step
        },
        2500        
        );
    }  
    function animateRadial(radialValue,percent,type){
        if(type === 'entry'){
            $('.progressRadial').circleProgress({
                value: radialValue,
                size: 275,
                thickness: 50,
                startAngle: -Math.PI / 2,
                reverse: true,
                animation: {duration: 2500},
                emptyFill: 'rgba(255, 255, 255, 1)',
                fill: {color: "#f1b434"}
                
            }); 
        }else{
            $('.progressRadial').circleProgress({
                value: radialValue,
                size: 275,
                thickness: 50,
                startAngle: -Math.PI / 2,
                reverse: true,
                animation: {duration: 2500},
                emptyFill: '#485cc7',
                fill: {color: "#f1b434"}
            });  
        } 
    }
}
</script>

[[?x9x::x[[S4]]x::
<!--DONATE DOUBLE CODE SLIGHT VARIATION FROM reus_donate_double - moving dropdown into form as static element, passing PROXY ID to DONOR DOUBLE DATABASE-->
<link href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css" rel="stylesheet" type="text/css" />
<script>
Y.use("jquery", function(Y) {
    jQuery(document).ready(function() {
        [[?[[S8]]::donation=completed::
            [[?xx::x[[S120:dc:custom:custom_string15]]x::
            ::
                jQuery.ajax({
                    type: "POST",
                    url: "https://donatedouble.org/donate_api.php",
                    data: { api_key:"KDO4HIOPpkkCCCQFFqycc3tsSTD",json: '{"action":"update","type":"donation","data":{"donationamount":"[[S120:dc:giftAmount]]","firstname":"[[S120:dc:donorFirstName]]","lastname":"[[S120:dc:donorLastName]]","street1":"[[S120:dc:donorStreet1]]","street2":"[[S120:dc:donorStreet2]]","city":"[[S120:dc:donorCity]]","state":"[[S120:dc:donorState]]","zip":"[[S120:dc:donorZip]]","country":"[[S120:dc:donorCountry]]","phone":"[[S120:dc:phone]]","email":"[[S120:dc:email]]","company":"[[S120:dc:custom:custom_string15]]",[[?x20x::x[[S334:PROXY_TYPE]]x::"confirmation"::[[?x22x::x[[S334:PROXY_TYPE]]x::"custom_1"::"member_id"]]]]:"[[S334:PROXY_ID]]","npo_id":"13-1665552"}}'},
                    success: function(data) {
                        console.log(data);
                    }
                }); 
            ]]

        ::
            jQuery.ajax({
                type: "POST",
                url: "https://donatedouble.org/donate_api.php",
                data: { api_key:"KDO4HIOPpkkCCCQFFqycc3tsSTD",json: '{"action":"read","type":"companies"}'},
                success: function(data){
                    jQuery('#donatedouble_select_menu_dropdown').empty();
                    jQuery.each(data.companies, function(i, value) {
                        jQuery('#donatedouble_select_menu_dropdown').append(jQuery('<option>').text(value).attr('value', i));
                    });
                    jQuery("#donatedouble_text_field_input").autocomplete({
                        source: data.companies
                    });
                    //move Donate Double Component dropdown list
                    jQuery('ul.ui-menu').appendTo('.matchingGiftWrap .form-content');
                }
            });
        ]]
    });
});
</script>
::
]]
