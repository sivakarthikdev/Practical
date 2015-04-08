/*scripts for carousel*/
$(document).ready(function() {
 $('#mycarousel,#mycarousel1').jcarousel({
  visible : 5,
  wrap : "circular"
 });
});


/* scriptfor button slider*/
jQuery(function() {
	jQuery("#slides").slides({
				generateNextPrev: false,
				play: 5000
	});
	
	jQuery("#list_gallery_holder").tabSlider({"interval":10});
	
	
});

/*scriots for tab slider with caption text*/

/*send to friend */

function sendToFrined_submission() {
	$.ajax({
		type : "POST",
		url : '/wps/pages/send_to_friend_thanks',
		data : $("#sendid").serialize(),
		dataType : "text",
		beforeSend : function() {
		},
		error : function() {
		},
		success : function(update_data) {
		if (update_data.match(/Errors\-(.*)/)) {
			var a = update_data.split('Errors-')
			$("#send_to_friend_message").html(a[1]);
			} else {
			location.reload();
			}
		}
	});
}
$(function() {
	$("#send_id>a").click(function(event) {
	event.preventDefault();
	jQuery("#send_to_friend").dialog("destroy");
	$("#send_to_friend").dialog({
	modal : true,
	buttons : {
	Cancel : function() {
	$(this).dialog('close');
	},
	'Submit' : function() {
	sendToFrined_submission();
	}
	}
})
$(".ui-widget-overlay").css({
	'opacity' : '0.3'
});
});
});

/*Comment */
function comment_submission(){
    //var form_id = ("#" + name);
    // var ul_id = name.replace('_form', '')
    // before_submit_form('#' + ul_id)
	
	var name = jQuery("#for_name").val();
          var email = jQuery("#for_email").val();
          var city = jQuery("#for_city").val();
          if(name=='Your name'){
            jQuery("#for_name").attr("value","");
          }
          if(email=='Your e-mail'){
            jQuery("#for_email").attr("value","");
          }
          if(city=='Your city'){
            jQuery("#for_city").attr("value","");
          }

    $.ajax({
        type: "POST",
        url: '/wps/pages_controller/save_comment',
        data: $("#comment_ajax").serialize(),
        dataType: "text",
        beforeSend: function(){
            //  $(form_id + " .success_message").remove();
            //  $(form_id + " div.inner_block").after("<p class='success_message'>Saving...</p>")
        },
        error: function(){
            //$(form_id + " p.success_message").html("error in saving<a href='#' onclick='delete_update_msg(this)' class='update_msg_close'></a>");
       		javascript: Recaptcha.reload();
	    },
        success: function(update_data){
			if(update_data.match(/Errors\-(.*)/)) {
				var a = update_data.split('Errors-')
				
				$("#error_comment").html(a[1]);
				javascript: Recaptcha.reload();
			}
			else{
			  $('#for_name,#for_email,#for_title,for_comment').attr('value','');
			  location.reload();			
			}
        }
    });
}

$(function(){
    $("#display_form").click(function(e){
  		$(".dynamic_disp").css("display","block");
        $(".dynamic_comment_button").addClass("grey_button");
    });
});

$(function(){
    $(".display_form").click(function(){
	    var t = $(this).attr("value");
	    $("#comment_form").val(t);
    });
	
	$(".reply_button").click(function(){
        var t = $(this).attr("value");
        //  alert(t);
        $(".form_value").val(t);
    });
});

 $(function(){
jQuery(".visitor_comments .comment_one .reply_button ").click(function(){
            jQuery('html, body').animate({
                scrollTop: jQuery('#disp').offset().top
            }, 'slow');
        });
 });

/*Search Results*/
$(function(){
    $("[name='sort'][type='radio']").click(function(){
        $("#filters").submit();
    });
    $(".save_article").click(function(event){
        event.preventDefault();
        alert("To save the article press Ctrl+S");
    });
});


function selected_month(month_year,blog_url)
{
    longMonths= {'January':'1', 'February':'2', 'March':'3','April':'4','May':'5','June':'6','July':'7','August':'8','September':'9','October':'10','November':'11','December':'12'};
    split_val = month_year.split(" ")
    month = longMonths[split_val[0]]
    year = split_val[1]
    window.location = blog_url + "?month=" + month + "&year=" +year
}

