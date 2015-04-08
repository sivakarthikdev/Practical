$(function(){
	$('#gallery_crousal_div').carousel({
		    	itemsPerPage: 2,
		    	itemsPerTransition: 2,
		    	pagination: false
	});
});

//Main Image change when click thumbnail list images
/*$(function(){
	$("#gallery_crousal_div #gallery_crousal li").click(function(){
		var thumbnail_img_id = $(this).find("img").attr("id");
		var original_img_id = $("#all_original_images").find("#"+thumbnail_img_id).attr("src");
		$("#main_holder_image .slider-image").find("img").attr("src",original_img_id);
		gallery_pagination();
		gallery_caption();
		active_img_effect($(this).index())
	});
	
});*/

//Gallery Pagination
/*function gallery_pagination(){
	var original_img_size = $("#all_original_images img").size();
	var img_src = $("#main_holder_image .slider-image img").attr("src");
	var a = [];
	$("#all_original_images img").each(function(){
	    var ori_img = $(this).attr("src");
	    if(ori_img==img_src){
		a.push($(this).index()+1);
	    }
	});
	var page_item  = "Image: "+a+" / "+original_img_size;
	$(".image_sec").html(page_item);
	$("#page_id").attr("value",a);
	
}*/

//Gallery Caption
$(function(){
	gallery_caption();
	blur_effect();
});

function gallery_caption(){
	$("#gallery_caption_container .text_style").css("display","none");
	var img_src = $("#main_holder_image .slider-image img").attr("src");
	var a = [];
	$("#all_original_images img").each(function(){
	    var ori_img = $(this).attr("src");
	
	    if(ori_img==img_src){
		a.push($(this).index());
	    }
	});
	$("#gallery_caption_container .text_style:eq("+a+")").css("display","block");
	$("#gallery_crousal li img:eq("+a+")").addClass("gal_active_one");

	
}

//Gallery blur Effect
function blur_effect(){
    $("#gallery_crousal li img").addClass("gal_hover");
    $("#gallery_crousal li img").hover(function(){
         $(this).addClass("gal_active");
         $(this).removeClass("gal_hover")
    },
    function(){
         $(this).addClass("gal_hover")
         $(this).removeClass("gal_active")
    });
 }

 /*function active_img_effect(ele){
	$("#gallery_crousal li img").addClass("gal_hover");
	$("#gallery_crousal li img").removeClass("gal_active_one");
	$("#gallery_crousal li img:eq("+ele+")").addClass("gal_active_one");
	$("#gallery_crousal li img:eq("+ele+")").removeClass("gal_hover");
 }*/


