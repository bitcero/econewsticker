/*
jQuery EC News Ticker
http://eduardocortes.mx/
Copyright 2014, Eduardo Cortés
Free to use under the MIT license.
http://www.opensource.org/licenses/mit-license.php
*/

(function ( $ ) {

    var elements = new Array();

    $.fn.ecoNewsTicker = function( options ){

        // Options
        var settings = $.extend($.fn.ecoNewsTicker.settings, options );

        return this.each( function( index ){

            var ticker = $(this).find( "> ul");

            // If ticker list is not found then exit
            if ( ticker.length <= 0 )
                return true;

            if ( ticker.length > 1 ){
                console.log("ecoNewsTicker requires only one ticker list per container.");
                return true;
            }

            ticker.css({listStyle: 'none', padding: 0, margin: 0});

            $(this).css({height: settings.height + 'px', overflow: 'hidden'});

            var items = ticker.find("> li");

            if (items.length <= 0)
                return true;

            if (settings.direction === 'horizontal')
                items.css({'float': 'left'});

            items.find("> a").css({lineHeight: settings.height + 'px', padding: '0 10px 0 0'});

            var ticker_width = 0;
            items.each( function(){

                ticker_width += $(this).width();

            });

            ticker.width( ticker_width );
            elements[index] = {
                timer: 0,
                items: items,
                ticker: ticker,
            };

            elements[index].timer = setTimeout( function(){

                slide( index );

            }, settings.waitInterval * 1000 );

        } );

    }

    $.fn.ecoNewsTicker.settings = {
        speed: 1, // Speed for slide movement in seconds. 1 x 1000. Can use decimals
        waitInterval: 5, // Time to wait before to slide the ticker
        height: 30, // Height for ticker. This value must be provided in pixels
        direction: 'horizontal', // Direction of ticker
        hoverStop: true // Stop ticker when mouse hover
    }

    function slide( index ){

        if ( elements[index] == undefined )
            return;

        clearTimeout( elements[index].timer );
        var items = $(elements[index].ticker).find("> li");
        var ticker = elements[index].ticker;

        var left = $(items[0]).width();
        $(items[0]).animate({
            marginLeft: (left * -1) + 'px'
        }, $.fn.ecoNewsTicker.settings.speed * 1000, function(){

            $(items[0]).hide().css('margin-left', 0);
            $(ticker).append($(items[0]));
            $(items[0]).show();

        } );

        elements[index].timer = setTimeout(function(){
            slide( index );
        }, $.fn.ecoNewsTicker.settings.waitInterval * 1000 );
        return true;

    }

    $(window).on('blur', function(){

        $(elements).each( function(){
            clearTimeout( this.timer );
        });

    });

    $(window).on('focus', function(){
        $(elements).each( function(index){
            this.timer = setTimeout( function(){
                slide( index );
            }, $.fn.ecoNewsTicker.waitInterval * 1000 );
        });
    });

}( jQuery ));