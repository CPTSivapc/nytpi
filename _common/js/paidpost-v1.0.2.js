"use strict";
(function(window, document, $, undefined)
{
    var elementPosition = 0;
    var topPosition = 0;
    if(!$ || $ === undefined)
    {
        var headTag = document.getElementsByTagName("head")[0];
        var jqTag = document.createElement('script');
        jqTag.type = 'text/javascript';
        jqTag.src = '//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js';
        jqTag.onload = jQueryLoaded;
        headTag.appendChild(jqTag);
    }else{
        start();
    }
    function jQueryLoaded()
    {
        $ = window.$;
        start();
    }
    function start()
    {
        if(document.location.toString().match(/\.app/g))
        {
            $('html').addClass('paidpost-in-app');
        }
        
            setSocialForMobile();
        if($('*').hasClass('mobile'))
        {
            return;
        }
        
        var fixedList = $('*').filter(function() {
                                                    //maybe just need to search for masthead when on the server
                                                     return $(this).css('position') == 'fixed' && $(this).css('top') == '0px';
                                                });
        $(fixedList).each(function(index, el)
        {
            if( $(el).outerHeight() >= $('#paid-top-bar').offset().top )
                {
                    return true;
                }
            topPosition += $(el).outerHeight();
        });

        elementPosition = $('#paid-top-bar').offset();
        $(window).scroll(checkTopBar);
        checkTopBar();
    }
    function checkTopBar()
    {
        var isPageLower = (( $(window).scrollTop() + topPosition) > elementPosition.top);
        $('#paid-top-bar').css('position',isPageLower ? 'fixed' : '').css('top',isPageLower ? topPosition : '');
    }
    function setSocialForMobile()
    {
        $('.mobile-trigger').on('touchend', function()
        {
            if($('.sub-bar-content .social.hover').length>0)
            {
                $('.sub-bar-content .social').removeClass('hover');
                $('.sub-bar-content .social ul').removeClass('hover');
            }else{
                $('.sub-bar-content .social').addClass('hover');
                $('.sub-bar-content .social ul').addClass('hover');
            }
        });
    }

})(window, document, window.$);
