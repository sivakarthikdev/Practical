/**
 *   @author ramkumarp
 *   @version 1.1
 *   @lastupdated 24th Aug 2012
 *   @lastupdatedby ramkumarp
*/
(function($) {
	
	$.fn.checkGeneral=function(){
		if($("[data-ajax-pagination='true']").length>0){$("[data-ajax-pagination='true']").remotePaginate({})}
		if($("[data-remote-comp='true']").length>0){$("[data-remote-comp='true']").remoteComponent({})}
	}
	
    $.fn.remotePaginate = function(options) {
        var defaults={"contentClass":"inner_section_content","requestType":"POST","errorMessage":"Information not available"}; // options which will be by default
        var settings = $.extend(defaults, options); // extending user defined options with defaults
          return this.each(function() {
        	var componentParent=$(this);  
            var content_parent=$("."+settings.contentClass,componentParent);
            var data_url=$(this).attr("data-ajax-pagination-url");
            $(".pagination a",this).unbind("click");
            $(".pagination a",this).bind("click",function() {
            	var pageId=$(this).attr("data-page");
                content_parent.html("Loading...");
                $.ajax({
                    type: settings.requestType,
                      url: data_url+"page/"+pageId,
                      beforeSend: function(){},
                      error: function(){
                    	  content_parent.append(settings.errorMessage);
                      },
                      success: function(data, xhr){
                    	  $(".heading",$(data)).remove();
                    	  componentParent.find(".inner_section_content").remove();
                    	  componentParent.append($(".inner_section_content",$(data)).unwrap());
                    	  $("[data-ajax-pagination='true']").remotePaginate({})
                      }
                });
                return false;
        	});
        });
      };
    $(document).ready(function(){
        $("[data-ajax-pagination='true']").remotePaginate({})
    });
})(jQuery);