<script>

var viewportWidth = $(window).width();

$(document).ready(function(){    
    [[?[[?[[S8]]::splash::T::]][[?[[S8]]::front::T::]]::T::
        instagramFeed();
        [[?[[S151:momentum_feature_1]]::TRUE::
            //FEATURE PARTICPANT ROTATOR            
            $("#owl-example").owlCarousel({ 
                navigation : true, // Show next and prev buttons
                slideSpeed : 300,
                paginationSpeed : 400,
                singleItem:true
            });
            var leftArrow = 'Back <div class="borderWrap"><div class="borderOutline"><div class="borderLeft"></div></div></div>';
            var rightArrow = 'Next <div class="borderWrap"><div class="borderOutline"><div class="borderLeft"></div></div></div>';
            $('.owl-prev').html(leftArrow);
            $('.owl-next').html(rightArrow);
            $('.owl-buttons > div').addClass('customBtn');
        ::
        ]]
    ::
    ]]

    //hide event donation link in donation search
    [[?x22183x::x[[S334:fr_id]]x::
        [[?xpfindx::x[[S334:pg]]x::
            $('#give_hdr_container').remove();
            $('.search-content').css("color","white");
        ::]]
    ::]]
        
});

function instagramFeed(){
    if (viewportWidth < 568) {
        var feedFrame = '<iframe src="https://snapwidget.com/in/?h=bWRhdGVhbXxpbnwxMjV8MXwzfHxub3w1fG5vbmV8b25TdGFydHx5ZXN8eWVz&ve=211215" title="Instagram Widget" class="snapwidget-widget" allowTransparency="true" frameborder="0" scrolling="no" style="border:none; overflow:hidden; width:100%;"></iframe>';
        $(feedFrame).appendTo('.instagramFeed');

    }else{
        var feedFrame = '<iframe src="https://snapwidget.com/in/?h=bWRhdGVhbXxpbnwxMjV8NnwyfHxub3w1fG5vbmV8b25TdGFydHx5ZXN8eWVz&ve=211215" title="Instagram Widget" class="snapwidget-widget" allowTransparency="true" frameborder="0" scrolling="no" style="border:none; overflow:hidden; width:100%;"></iframe>';
        $(feedFrame).appendTo('.instagramFeed');
    }

}
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


</script>