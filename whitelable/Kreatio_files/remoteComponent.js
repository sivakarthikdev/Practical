/**
 *   @author ramkumarp
 *   @version 1.0
 *   @lastupdated 1st Aug 2012
 *   @lastupdatedby ramkumarp
 *   @usage: $("Any Selector").remoteComponent(options)
 *   @sample: $("[data-remote='true']").remoteComponent({}) // With default options
 *   		 $("[data-remote='true']").remoteComponent({"contentClass":"other_parent_class","requestType":"GET"}) // With customized options
 *   		 $("[data-remote='true']").remoteComponent({"errorMessage":"Coming Soon"}) // With customized options
*/
(function($) {
    $.fn.remoteComponent = function(options) {
        var defaults={"contentClass":"inner_section_content","requestType":"POST","errorMessage":"Information not available"}; // options which will be by default
        var settings = $.extend(defaults, options); // extending user defined options with defaults
          return this.each(function() {
            var data_url=$(this).attr("data-url");
            var content_parent=$(this).parent("."+ settings.contentClass);
                $.ajax({
                    type: settings.requestType,
                      url: data_url,
                      beforeSend: function(){},
                      error: function(){
                        content_parent.html(settings.errorMessage);
                    },
                      success: function(data, xhr){
                          content_parent.html(data);
                      }
                 });
        });
      };
    $(document).ready(function(){
        $("[data-remote-comp='true']").remoteComponent({})
    });
})(jQuery);