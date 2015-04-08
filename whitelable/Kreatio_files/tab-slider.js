/*
 * tabSlider 1.0
 */
(function($){
    var $$;
    $$ = $.fn.tabSlider = function($options) {
    	// set default options
    	var $defaults = {
            timeOut     : 4000,
            rotate      : false,
            rotateLoops : 2
    	};
        // extend the options
        var $opts = $.extend($defaults, $options);

       	return this.each(function(){
            var o = $opts;
			var obj = $(this);
			var items = $("ul.list_holder li", obj);
			$(".head_div h1, .head_div a,.slide_image img,.slide_image p","#list_gallery_holder").mouseenter(function(){
                window.clearInterval($.tabSlider.timeoutid);
			});
			$(".head_div h1, .head_div a,.slide_image img,.slide_image p","#list_gallery_holder").mouseleave(function(){
    			if($.tabSlider.timeoutid){
    			     window.clearInterval($.tabSlider.timeoutid);
    			}
                $.tabSlider.timeoutid= window.setInterval("$.tabSlider.auto_next()",$.tabSlider.interval)
			});
            items.hover(function() {
                window.clearInterval($.tabSlider.timeoutid);
                $.tabSlider.current = $(this);
                $.tabSlider.activate($(this))
            },
            function(){
                $.tabSlider.current = $(this);
                $.tabSlider.play($(this))
                $.tabSlider.rotateLoop=0;
            });
            $.tabSlider.parentObj=$(this);
            $.tabSlider.play(obj);
       	});
    };
/** @name NextSelector, @desc Returns the sibling sibling, or the first one **/
$$.nextSelector = function(selector) {
	return $(selector).is(':last-child') ?
		   $(selector).siblings(':first-child') :
    	   $(selector).next();
    	   
};

/** @name previousSelector, @desc Returns the previous sibling, or the last one **/
$$.previousSelector = function(selector) {
	return $(selector).is(':first-child') ?
		   $(selector).siblings(':last-child') :
    	   $(selector).prev();
    	   
};
$$.onTabLoad = function(_obj) {
    var item_id=_obj.attr("class").split(" ")[0].split("_")[1];
    $.tabSlider.hide_all($.tabSlider.parentObj);
    $(".heading_" + item_id, $.tabSlider.parentObj).show();
    $("#image_" + item_id , $.tabSlider.parentObj).show();
    $.tabSlider.current=_obj;
    _obj.addClass("tab-slider-active")
};
$.extend({tabSlider : {
    timeoutid   :   '',
    interval    :   4000, 
    current     :   null,
    parentObj   :   '',
    rotateLoop  :   0,
    stopRotate  :   false,
    activate    :   function(_obj) { 
        $$.onTabLoad(_obj);
	},
	next : function() {
        window.clearInterval($.tabSlider.timeoutid);
        var _next = $($$.nextSelector($.tabSlider.current));
        $.tabSlider.activate(_next);
	},
	prev : function() {
        window.clearInterval($.tabSlider.timeoutid);
		var _prev = $($$.previousSelector($.tabSlider.current));
		$.tabSlider.activate(_prev);
	},
    auto_next:function(){
        var _played = $($$.nextSelector($.tabSlider.current));
        $.tabSlider.activate(_played);
        if($($.tabSlider.current).is(':first-child')){$.tabSlider.rotateLoop+=1;}
        if($.tabSlider.rotateLoop>2){
            window.clearInterval($.tabSlider.timeoutid);
        }
    },
    play: function(obj){
        $.tabSlider.current = ($.tabSlider.current!=null)? $.tabSlider.current : $("ul li:first", obj)
        if($.tabSlider.rotateLoop<2){
            $.tabSlider.timeoutid= window.setInterval("$.tabSlider.auto_next()",$.tabSlider.interval)
        }
    },
    hide_all: function(obj){
        $("li", $.tabSlider.parentObj).removeClass("tab-slider-active");
        $(".head_div>div", obj).hide();
        $(".slide_image>div", obj).hide();
    }
}
});
})(jQuery);