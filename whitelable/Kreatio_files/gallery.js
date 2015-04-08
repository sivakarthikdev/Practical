$('#btn-next').click(function() {
  var defind_page = $("#defind_page").attr("value");
  var sitename=document.location.hostname;
  var gal_id = jQuery("#gallery_id").val();
  var gal_page = jQuery("#page_id").val();
  var page_count = jQuery("#gallery_count").val();
  var page_count_new =parseInt(page_count);
  var gal_page_val = parseInt(gal_page);
  var gal_cat=jQuery("#gallery_url").val();
  var cat_name=jQuery("#category_name").val();
  var page_num=jQuery("#page_name").val();
  var query_str=jQuery("#query_value").text();
  if(gal_page_val == page_count_new){
    var gal_page_val = 0;
  }
    var gal_page_new = gal_page_val +1;
    if(defind_page=="gallery_page"){
      window.location.href="http://" + sitename + "/"+gal_cat+gal_id+"/page/"+gal_page_new+page_num+query_str;
    }
    if(defind_page=="article_page"){
      window.location.href="http://" + sitename + "/"+gal_cat+"?g_page="+gal_page_new;
    }
});

$('#btn-prev').click(function() {
  var defind_page = $("#defind_page").attr("value");
  var sitename=document.location.hostname;
  var gal_id = jQuery("#gallery_id").val();
  var gal_page = jQuery("#page_id").val();
  var page_count = jQuery("#gallery_count").val();
  var gal_page_val = parseInt(gal_page);
  var page_count_new =parseInt(page_count);
  var gal_cat=jQuery("#gallery_url").val();
  var cat_name=jQuery("#category_name").val();
  var page_num=jQuery("#page_name").val();
  var query_str=jQuery("#query_value").text();
  if(gal_page_val == 1){
    var gal_page_val = page_count_new +1;
  }
    var gal_page_new = gal_page_val - 1;
    if(defind_page=="gallery_page"){
		if(gal_page_new  == 1){
		      window.location.href="http://" + sitename + "/"+gal_cat+gal_id+page_num+query_str;
		}
		else{
		  window.location.href="http://" + sitename + "/"+gal_cat+gal_id+"/page/"+gal_page_new+page_num+query_str;
		}
    }
    if(defind_page=="article_page") {
       if(gal_page == 1){
	   window.location.href="http://" + sitename + "/"+gal_cat;
	}	
        else{
           window.location.href="http://" + sitename + "/"+gal_cat+"?g_page="+gal_page_new;
        }
    }
});


$("#gallery_crousal li").click(function(){ 
	 var defind_page = $("#defind_page").attr("value");
	var image_id = parseInt($(this).index()) + 1;
	$("#page_id").attr("value",image_id);
	var sitename=document.location.hostname;
	var gal_id = jQuery("#gallery_id").val();
	var gal_page = jQuery("#page_id").val();
	var page_count = jQuery("#gallery_count").val();
	var gal_page_val = parseInt(gal_page);
	var page_count_new =parseInt(page_count);
	var gal_cat=jQuery("#gallery_url").val();
	var cat_name=jQuery("#category_name").val();
	var page_num=jQuery("#page_name").val();
	var query_str=jQuery("#query_value").text();
	var gal_page_new = gal_page_val;
	if(defind_page=="gallery_page"){
	    window.location.href="http://" + sitename + "/"+gal_cat+gal_id+"/page/"+gal_page_new+page_num+query_str;
	}
	if(defind_page=="article_page"){
	    window.location.href="http://" + sitename + gal_cat+"?g_page="+gal_page_new;
	}
});
