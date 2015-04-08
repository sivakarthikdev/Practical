var kreatioAddEdit =  {
  
	settings : {
			SortPage: false, 		  			 					 //Sortable page  				
		    SortDragComponent : true, 								 // Drag and Drop components and sortable components 				
			SortContainer: false,	 								 //if true ,we can sort container				
			WrapperDivID: 'wrapper', 								 //wrapper id			
			ContainerClassName: '.container_block', 		 		 //container class name		
			ComponentClassName: '.component_block',					 //component class name
			ComponentHeaderClassName: '.component_header',  		 //component header class name (add toolbox also)
			ComponentContentClassName: '.component_content',		 //component content
			ComponentToolBox: true,    								 //Component toolbox insert the components
			DragComponentToolBox: false, 							 //Insert toolbox draggable components
			ComponentToolBoxClassName: 'tool_comp',					 //toolbox class name
			ContentHighlightClass: 'content_highlight',				 //Container_highlight class
			DragComponentClassName: '.component_block',			
			AddWidget : {
				Editable:true,										 //addwidget panel  if true for css purpose & save otherwise panel not come 
				PartialGenerte : true,								 //if true addwidget component partial generate via ajax
				AddWidgetDivParentID: 'add_components',				 //addwidget div id
				OnlySaveOption:false								 //if true only save button come else remove collapseAll & expandAll and open preview
			},
			
			ComponentDropLength:3,									//Components count to show drop message to receive container
			DropMessageShow:false,									//if true the drop message will be shown
			
			SaveComponents : {
			    type:'submit', 										 //save option ajax or submit,
			    action:'/save-component'							 //form submit action or ajax-url
			},
			
			UiClassHelper : {
			  SortClass : '.ui-sortable',							 //Ui Sortable class
			  SortPlaeholderClass: '.ui-sortable-placeholder',		 //UI Sortable placeholder class
			  DragClass : '.ui-draggable',							 //UI Draggable Class
			  SortDragClassName : '.ui-draggable.ui-sortable-placeholder',
			  TabsClass : '.ui-tabs',								 //UI Tabs Class
			  TabsPanelClass : '.ui-tabs-panel'					     //UI Tabs Panel Class
			},
			
			SlideToggleText : {
		 	  OpenText : 'Open',								      //Set text for open and collapse add Widget panel
			  CloseText : 'Close',
			  AddwidgetPartialUrl:'/add_widget'	
			},
			
			NotSortableComponents:'',     							  //Components don't move (Don't sortable)
			
			ComponentHeaderPart : {									  //creare component header part with only have the component content div
				Headerpart : true,							
				toolbox : true										  //header part div(Insert toolbox)
			},
				
			CreateComponent :{										  //Create Component empty and existing
				EmptyComponentId :'component_empty',				  //Empty component id
				NewComponentUrl : '/new-component/',				  //get url for Empty component
				GetComponentUrl : '/get-component/'			    	  //get url for existing component
			},
			
			ComponentEdit : {
				Editable : true,									  //component editable
				EditableComponents : '' 							  //give id's for editable components
			},
				
			ExpandCollapseAll : true,						 		  //Expand all & collapse all buttons
			
			ComponentFragmentEdit : true,
			
			TabComponentEdit : {
				Editable : true,
				TabComponentHeaderClass:'tabcomponent_header',
				TabComponentClass :'.ui-tabs-component'
			},
			
			Enable_disable_addedit_functionality : true,				 //Disabel & Enable Addedit functionality
			
			ComponentContentEditable : false
		},
		
		// End of settings
		
		empty_componentId_change  : function () {
			$("#"+kreatioAddEdit.settings.AddWidget.AddWidgetDivParentID).find('#'+kreatioAddEdit.settings.CreateComponent.EmptyComponentId).attr('id','');
		},

		Sortable_page : function () {
			$("#"+kreatioAddEdit.settings.WrapperDivID).sortable({
			    revert:true
			});
		},
		
		Only_save_option_remove_others : function () {
			$('#components_list,#control_widget_panel,#control_widget_panel_expand,#control_widget_panel_collapse').remove();
		},
		
		Sortable_drggable_components : function(){ 
			     $(kreatioAddEdit.settings.ContainerClassName).each(function () {
			     	  var container_id = $(this).attr('id');
			     	  var connect_with = $(this).attr('data-connectWith');
				       $("#"+container_id).sortable({
						connectWith:connect_with, 
						cursor:'move',
						helper:function(event,ele) {
								var id = $(ele).attr('id')
			      				return $('<div class="comp_ui_helper"><p>'+$.trim($('#'+id+' '+kreatioAddEdit.settings.ComponentHeaderClassName).find('p').text())+'</p><div class="componet_content_uihelper"></div></div>');
		    			},
		    			cursorAt: {top: 25, left: 64 },
						items:kreatioAddEdit.settings.ComponentClassName,
						forceHelperSize:true,
						forcePlaceholderSize:true,
						handle: kreatioAddEdit.settings.ComponentHeaderClassName,
						opacity: 0.6,
						scroll:true,
						revert: true ,
						dropOnEmpty: true,
						start:function(event,ui){
							 $(connect_with).addClass(kreatioAddEdit.settings.ContentHighlightClass);
							 kreatioAddEdit.save_display();
						},
						receive :function(event,ui){
							if(kreatioAddEdit.settings.DropMessageShow){
								kreatioAddEdit.drop_message(ui.sender,ui.item);
							}
						},
						update: function(){
							kreatioAddEdit.create_space_for_emptyContainer();
						},
						stop:function(event,ui){
							 kreatioAddEdit.save_components();
						   	 $(kreatioAddEdit.settings.UiClassHelper.SortClass).removeClass(kreatioAddEdit.settings.ContentHighlightClass);
						},
						sort:function(event,ui){
							return kreatioAddEdit.declare(true);
						}
					});
				   $("#"+container_id).disableSelection();
				});
		},
		
		draggable_widget : function () {
			$("#"+kreatioAddEdit.settings.AddWidget.AddWidgetDivParentID+" "+kreatioAddEdit.settings.DragComponentClassName).draggable({
			 helper: 'clone',
			 scroll: true,
			 connectToSortable:kreatioAddEdit.settings.ContainerClassName,
			 revert: function(valid) {
			      if(valid) { 
					  kreatioAddEdit.insert_component_toolbox_new();
					  kreatioAddEdit.existing_and_empty_component_generate($(kreatioAddEdit.settings.ContainerClassName+kreatioAddEdit.settings.UiClassHelper.SortClass+' '+kreatioAddEdit.settings.ComponentClassName+kreatioAddEdit.settings.UiClassHelper.SortDragClassName).parents(kreatioAddEdit.settings.ContainerClassName+kreatioAddEdit.settings.UiClassHelper.SortClass).attr('id'),$(this).attr('id'));
				  	  $(kreatioAddEdit.settings.ContainerClassName+' '+kreatioAddEdit.settings.UiClassHelper.SortDragClassName).before('<div class="update_component"></div>');
			      }
			      return !valid;
			  },
			  stop:function(event,ui){
			      $(kreatioAddEdit.settings.UiClassHelper.SortClass).removeClass(kreatioAddEdit.settings.ContentHighlightClass);
			      return kreatioAddEdit.declare(true);
			  }
		  });
		  	$("#"+kreatioAddEdit.settings.AddWidget.AddWidgetDivParentID+" "+kreatioAddEdit.settings.DragComponentClassName).disableSelection();
		},
		
		 //Insert toolbox for all existing component when page load
		   insert_component_toolbox_existing : function (){
				$(kreatioAddEdit.settings.ContainerClassName+kreatioAddEdit.settings.UiClassHelper.SortClass+' '+kreatioAddEdit.settings.ComponentClassName+' '+kreatioAddEdit.settings.ComponentHeaderClassName).each(function(){
				  $(this).append('<span class="'+kreatioAddEdit.settings.ComponentToolBoxClassName+'"></span>');
				  $(this).find('.'+kreatioAddEdit.settings.ComponentToolBoxClassName).append('<a href="javascript:void(0)" class="content_hide collepse_comp"></a>');
				  $(this).find('.'+kreatioAddEdit.settings.ComponentToolBoxClassName).append('<a href="javascript:void(0)" class="edit_comp"></a>');
				  $(this).find('.'+kreatioAddEdit.settings.ComponentToolBoxClassName).append('<a href="javascript:void(0)" class="close_comp"></a>');
				});
		    },
	     
	     //Insert toolbox for new draggable component from widget to container 
		    insert_component_toolbox_new : function (){
		      $(kreatioAddEdit.settings.ContainerClassName+' '+kreatioAddEdit.settings.ComponentClassName+kreatioAddEdit.settings.UiClassHelper.DragClass+' '+kreatioAddEdit.settings.ComponentHeaderClassName).each(function(){
				  $(this).append('<span class="'+kreatioAddEdit.settings.ComponentToolBoxClassName+'"></span>');
				  $(this).find('.'+kreatioAddEdit.settings.ComponentToolBoxClassName).append('<a href="javascript:void(0)" class="content_hide collepse_comp"></a>');
				  $(this).find('.'+kreatioAddEdit.settings.ComponentToolBoxClassName).append('<a href="javascript:void(0)" class="edit_comp"></a>');
				  $(this).find('.'+kreatioAddEdit.settings.ComponentToolBoxClassName).append('<a href="javascript:void(0)" class="close_comp"></a>');
		      });
		    },
	    
	    //Register toolBox for existing components when we changed title and others (Register new toolkit for new responsed component)
	     toolBox_reg_component : function (id){
		  var new_tool_component =  $(kreatioAddEdit.settings.UiClassHelper.SortClass+' #component_'+id+' '+kreatioAddEdit.settings.ComponentHeaderClassName)
		   $(new_tool_component).append('<span class="'+kreatioAddEdit.settings.ComponentToolBoxClassName+'"></span>');
		   $(new_tool_component).find('.'+kreatioAddEdit.settings.ComponentToolBoxClassName).append('<a href="javascript:void(0)" class="content_hide collepse_comp"></a>');
		   $(new_tool_component).find('.'+kreatioAddEdit.settings.ComponentToolBoxClassName).append('<a href="javascript:void(0)" class="edit_comp"></a>');
		   $(new_tool_component).find('.'+kreatioAddEdit.settings.ComponentToolBoxClassName).append('<a href="javascript:void(0)" class="close_comp"></a>');
	     },
	     
	    //Already existing component when drag and drop widget to container(based on component ID)
	    already_exists_component : function (exists_id){
	    	if(exists_id != kreatioAddEdit.settings.CreateComponent.EmptyComponentId){
	    		//console.log('already='+exists_id)
	    		var exist_id_drag = exists_id.split('_')[1];
				var ids = [];
				$(kreatioAddEdit.settings.ContainerClassName+kreatioAddEdit.settings.UiClassHelper.SortClass+' '+kreatioAddEdit.settings.ComponentClassName).not(kreatioAddEdit.settings.ContainerClassName+kreatioAddEdit.settings.UiClassHelper.SortClass+' '+kreatioAddEdit.settings.ComponentClassName+kreatioAddEdit.settings.UiClassHelper.DragClass).each(function(){
				    ids.push($(this).attr('id').split('_')[1]);
				});
				if($.inArray(exist_id_drag,ids) != -1){
					alert('already the component exists');
					$(kreatioAddEdit.settings.ContainerClassName+kreatioAddEdit.settings.UiClassHelper.SortClass+' '+kreatioAddEdit.settings.ComponentClassName+kreatioAddEdit.settings.UiClassHelper.DragClass).not(kreatioAddEdit.settings.ContainerClassName+kreatioAddEdit.settings.UiClassHelper.SortClass+' '+kreatioAddEdit.settings.ComponentClassName+kreatioAddEdit.settings.UiClassHelper.SortDragClassName).remove();
				}
			}
	    },
	    
	    //show error message - component count within container
	    drop_message : function(ui_sender,ui_item){
	      var length_find = ui_item.parent().find(kreatioAddEdit.settings.ComponentClassName).not(kreatioAddEdit.settings.ComponentClassName+kreatioAddEdit.settings.UiClassHelper.DragClass).length;
	      if(length_find > kreatioAddEdit.settings.ComponentDropLength){
		  alert('we can\'t drop more then '+ kreatioAddEdit.settings.ComponentDropLength +' components to this container')
		  $(ui_sender).sortable("cancel")
	      }
	    },
	    
	    form_create : function (){
	    	var $form = $('<form id="components_save" action="'+kreatioAddEdit.settings.SaveComponents.action+'" type="post" />');
	    	$('.widget_toggle').append($form);
	    	var $div = $('<div id="component_input_content">')
			$('#components_save').html($div);
			var $form_submit_button = $('<a href="javascript:void(0)" id="save_component_formSubmit" class="submit_style_form" style="visibility:hidden;">Save</a>');
	   		$('#components_save').after($form_submit_button);
		 },
	    
	    save_componente_form_submit_BySubmit : function () {
	    	$(document).on('click','#save_component_formSubmit',function () {
	    		$('#components_save').submit();
	    	});	
	    },
	    
	    save_components : function (){
		  if(kreatioAddEdit.settings.SaveComponents.type == 'submit') {
		    var contain = '';
		      $(kreatioAddEdit.settings.ContainerClassName).each(function () {
				var compon = [];
			      $(this).find('>'+kreatioAddEdit.settings.ComponentClassName).not(kreatioAddEdit.settings.ComponentClassName+'.remove_component_block').each(function () {
				  compon.push($(this).attr('id'))
			      });
			    contain = contain + '<input type="hidden" name="'+$(this).attr('id')+'" value="'+compon.join(',')+'" >';
		      });
		   
		    $('#component_input_content').html(contain);
		 //  return kreatioAddEdit.declare(false);
		  }
		  else if(kreatioAddEdit.settings.SaveComponents.type == 'ajax'){
			 	$("#save_component_formSubmit").remove();
			 	var contain = '';
			    $(kreatioAddEdit.settings.ContainerClassName).each(function () {
			    	var compon = [];
				      $(this).find('>'+kreatioAddEdit.settings.ComponentClassName).not(kreatioAddEdit.settings.ComponentClassName+'.remove_component_block').each(function () {
					  compon.push($(this).attr('id'))
				      });
					contain = contain + '<input type="hidden" name="'+$(this).attr('id')+'" value="'+compon.join(',')+'" >';
			    });
				$('#component_input_content').html(contain);
				$.ajax({
				      type:'POST',
				      url:kreatioAddEdit.settings.SaveComponents.action,
				      data:$('#components_save').serialize(),
				      dataType:'text',
				      success:function (data){
					      //we have show saving status
				      }
				});
			return kreatioAddEdit.declare(false);
		  }
		  else {
		    alert('Please choose correct save option type');
		    return false;
		  }
	    },
	    
	    //Add component widget panel slidetoggle
	       slide_toggle : function (){
				  var component_list  = $("#components_list");
				  if(component_list.is(':hidden')){
				      component_list.slideDown('slow');
				     // $(this).text(kreatioAddEdit.settings.SlideToggleText.CloseText);
				     $(this).addClass('close_panel').removeClass('open_panel');
				  }
				  else{
				      component_list.slideUp('slow');
				   //   $(this).text(kreatioAddEdit.settings.SlideToggleText.OpenText);
				      $(this).addClass('open_panel').removeClass('close_panel');
				  }
	      },
	      
	      //widgetpanel hide
	      widget_panel_hide : function () {
	      	$(document).on('click','.'+kreatioAddEdit.settings.ComponentToolBoxClassName+' a',function () {
	      		if($("#components_list").css('display')=='block'){   
   						  $("#components_list").hide(2000);
   						 // $("#control_widget_panel").text('Open');
   						 $("#control_widget_panel").addClass('open_panel').removeClass('close_panel');
				}
	      	});
	      },
	      
	      //Expand and Collapse component
	      expand_collapse_components : function (){
		  $(document).on('click',kreatioAddEdit.settings.ComponentHeaderClassName+' .content_hide', function(){
			  var com_this = $(this).parents(kreatioAddEdit.settings.ComponentHeaderClassName).next(kreatioAddEdit.settings.ComponentContentClassName);
			  if(com_this.is(':visible')){
			      $(com_this).slideUp('fast');
			      $(this).removeClass('collepse_comp').addClass('expand_comp');
			      $(this).attr('title','Expand Component');
			  }
			  else{
			      $(com_this).slideDown('fast');
			      $(this).addClass('collepse_comp').removeClass('expand_comp');
			      $(this).attr('title','Collapse Component');
			  }
		  });
	     },
	     
	     //Delete component
	    remove_component : function() {
	    	  $(document).on('click','.'+kreatioAddEdit.settings.ComponentToolBoxClassName+' .close_comp', function(){
	      			if(confirm("Do u wand remove this component?")){
					 /* $(this).parents(kreatioAddEdit.settings.ComponentClassName).animate({  
						      opacity: 0      
					  },function () {  
							$(this).wrap('<div class="test"></div>').parent().slideUp(function () {  
							      $(this).remove();  
							      kreatioAddEdit.save_components();
							      kreatioAddEdit.create_space_for_emptyContainer();
							      kreatioAddEdit.save_display();
							});  
					  });  */
					   //$(this).remove();
					   $(this).parents(kreatioAddEdit.settings.ComponentHeaderClassName).before('<div class="remove_comp_overlay"><a href="javascript:void(0)" class="undo_components">UNDO</a></div>');  
					   $(this).parents(kreatioAddEdit.settings.ComponentClassName).addClass('remove_component_block');
					   $(this).parents(kreatioAddEdit.settings.ComponentClassName).wrap('<div class="undo_remove_component"></div>');
				       kreatioAddEdit.save_components();
				       kreatioAddEdit.create_space_for_emptyContainer();
				       kreatioAddEdit.save_display();
				       return kreatioAddEdit.declare(true); 
					}
	      });
	    },
	    
	    //Edit Existing component - change title & datastring & etc ..
		edit_component : function (){
		  $(document).on('click', '.'+kreatioAddEdit.settings.ComponentToolBoxClassName+' .edit_comp', function(){
			var component_sendUrl = $(this).parents(kreatioAddEdit.settings.ComponentClassName).attr("data-url");
			var title = $(this).parents(kreatioAddEdit.settings.ComponentHeaderClassName).find('p').text();
    		//console.log(title)
			$("body").css("overflow", "hidden");
			$.ajax({
			    type:'POST',
			    url:component_sendUrl,
			    dataType:'html',
			    beforeSend:function(){
			    	$("#ajaxBusyloader").show();
					$('.ui-dialog').remove();
					$('.ui-overlay').removeClass('ui-widget-overlay');
					$("#existing_component_dialog").html('');	
			    },
			    success:function(data){
					$('.ui-overlay').addClass('ui-widget-overlay');
					$("#existing_component_dialog").html(data).dialog({
						model:true,
						//title:'Component Edit',
						title : title,
						position: "center",
						draggable: false,
						closeText: ' ',
						beforeClose: function (){
	                     if(!confirm('Do u want close the dialog?')){
	                          return false;
	                     }        
	                      else {
	                              $('.ui-overlay').removeClass('ui-widget-overlay');
	                              $("body").css("overflow", "auto");
	                      }
	                   },
	                   buttons: {
							"Submit": function() {
								kreatioAddEdit.existing_component_form_submit($(this).find('form').attr('action'),$(this).find('form').attr('id'),$(this).find('#component_id').attr('value'))
							},
					   }
					});
						$("#emp_dialog .comp_tabs").tabs();
						$("#ajaxBusyloader").hide();
			    },
			    complete:function(){
			    }
		      });
		  });
		},
		  addwidgettoolcreate:function (){
		  	  $('#'+kreatioAddEdit.settings.AddWidget.AddWidgetDivParentID).css('display','block');
		   	  $('#'+kreatioAddEdit.settings.AddWidget.AddWidgetDivParentID).wrap('<div class="addedit_widget_parent"></div>')
		   	  $('#'+kreatioAddEdit.settings.AddWidget.AddWidgetDivParentID).wrapInner('<div id="components_list" style="display:none;"></div>');
			  $('#'+kreatioAddEdit.settings.AddWidget.AddWidgetDivParentID).append('<div class="widget_toggle"></div>');
			  
		      var button_create_widget_toggle = '<a href="javascript:void(0)" id="control_widget_panel" class="open_panel"></a>'
			  $('.widget_toggle').before(button_create_widget_toggle);
			  
			 if(kreatioAddEdit.settings.ExpandCollapseAll){
				  var button_create_components_expand = '<a href="javascript:void(0)" id="control_widget_panel_expand">Expand All</a>'
				  $('.widget_toggle').append(button_create_components_expand);
				  
				  var button_create_components_collapse = '<a href="javascript:void(0)" id="control_widget_panel_collapse">Collapse All</a>'
				  $('.widget_toggle').append(button_create_components_collapse);    
			  }  
		  },
		  	
	      create_htmlPart_page : function (){
	      	
	       	  if(kreatioAddEdit.settings.AddWidget.Editable){kreatioAddEdit.addwidgettoolcreate()}
			  
			  kreatioAddEdit.form_create();
			  
			  var $dialog_div = '<div id="existing_component_dialog"></div>';
			  $('body').append($dialog_div);
			  
			  var ui_widget_overlay = '<div class="ui-overlay"></div>'
			  $(ui_widget_overlay).hide().appendTo('body');
			  
			  $('body').append('<div id="ajaxBusyloader" class="loading_ajax"><img src="/images/add_edit/loadingtext.gif" /></div>');
			  $('.addedit_widget_parent').next('div').css('padding-top','30px')
		 },
		
		//Collapse all components when expand all components
		collapse_all_components : function(){
		  $(kreatioAddEdit.settings.ContainerClassName+' >'+kreatioAddEdit.settings.ComponentClassName).find('>'+kreatioAddEdit.settings.ComponentHeaderClassName).next(kreatioAddEdit.settings.ComponentContentClassName).each(function(){
			if($(this).is(':visible')){
			  $(this).slideUp('1000');
			  $(this).prev(kreatioAddEdit.settings.ComponentHeaderClassName).find('.content_hide').removeClass('collepse_comp').addClass('expand_comp')
			}
		      });
		},

		//Expand all components when collapse all components
		expand_all_components : function (){
		  $(kreatioAddEdit.settings.ContainerClassName+' >'+kreatioAddEdit.settings.ComponentClassName).find('>'+kreatioAddEdit.settings.ComponentHeaderClassName).next(kreatioAddEdit.settings.ComponentContentClassName).each(function(){
		    if($(this).is(':hidden')){
			$(this).slideDown('1000');
			$(this).prev(kreatioAddEdit.settings.ComponentHeaderClassName).find('.content_hide').addClass('collepse_comp').removeClass('expand_comp')
		    }
		  });
		},
		
		//component form submit(edit dialog form) existing and empty components
		existing_component_form_submit : function (form_action,form_id,comp_id){
				var Get_componentID = Get_componentID_edit = comp_id;
				var form_data = $(this).parents('form').attr('id');
				var form_data_url = $(this).parents('form').attr('action');
				$.ajax({
				    type:"POST",
				    dataType: 'html',
				    url:form_action,
				    data:$("#"+form_id).serialize(),
				    beforeSend : function (){
				    	$('.form_saving').html('saving ....');
				    },
				    success:function(data){
				    	if(form_id == 'empty_form'){
				    		kreatioAddEdit.EmptyComponentSubmitLoadingIndicator();
				    		setTimeout(function(){location.reload()},3000)
				    	}
				    	else{
				    		
				    		$("#component_"+Get_componentID).html(data);
							$('.ui-dialog').remove();
						//	kreatioAddEdit.toolBox_reg_component(Get_componentID);
							kreatioAddEdit.toolBox_reg_Editablecomponent(Get_componentID_edit);
							kreatioAddEdit.regComponentFragement(Get_componentID_edit);
							kreatioAddEdit.component_header();
							$('.ui-overlay').removeClass('ui-widget-overlay');
							$("body").css("overflow", "auto");
							$("#ajaxBusyloader").hide();
							$('.form_saving').html('');
						}
							
				    },
				    error : function () {
				    	$('.form_saving').html('error ....');
				    },
				    complete:function(){
				    	$('#component_'+Get_componentID).find(kreatioAddEdit.settings.ComponentClassName).unwrap();
						$("body").checkGeneral();
				    }
				});
				return false;
			},
		
		//Create space for empty container for accept components
		create_space_for_emptyContainer : function (){
			$(kreatioAddEdit.settings.ContainerClassName+kreatioAddEdit.settings.UiClassHelper.SortClass).each(function(){
			if($(this).find(kreatioAddEdit.settings.ComponentClassName).length == 0 ){
				$(this).css("height","40px");
			}
			else{
				$(this).css("height","auto");
			}
			});
		},
		
		//Create component header part div
		component_header : function () {
			$(kreatioAddEdit.settings.ComponentClassName).each(function(){
				if($(this).find(kreatioAddEdit.settings.ComponentHeaderClassName).length == 0 ){
				//	console.log('header='+$(this).attr('id'))
					$(this).find(kreatioAddEdit.settings.ComponentContentClassName).before("<div class="+kreatioAddEdit.settings.ComponentHeaderClassName.replace('.',' ')+"></div>")
				//	$(this).find(kreatioAddEdit.settings.ComponentHeaderClassName).addClass('heading');
					$(this).find(kreatioAddEdit.settings.ComponentHeaderClassName).addClass('non-header-component');
					var Get_componentID = $(this).attr('id').split('_')[1];
					if(kreatioAddEdit.settings.ComponentHeaderPart.toolbox){	 //settings true for component toolbox
						kreatioAddEdit.toolBox_reg_Editablecomponent(Get_componentID);
					}
					$(this).find('.'+kreatioAddEdit.settings.ComponentToolBoxClassName).before('<p style="height:19px;"></p>');
			    }
			});
	 },
		
		//Empty and Existing component 
		existing_and_empty_component_generate : function (drop_container_id,Exs_comp_id){
			if(Exs_comp_id == kreatioAddEdit.settings.CreateComponent.EmptyComponentId){
				//console.log(Exs_comp_id+' '+kreatioAddEdit.settings.CreateComponent.EmptyComponentId)
				var components_collect = [];
				   	 $("#"+drop_container_id).find(kreatioAddEdit.settings.ComponentClassName).not(kreatioAddEdit.settings.ComponentClassName+kreatioAddEdit.settings.UiClassHelper.SortDragClassName).each(function (){
				   	 	if($(this).attr('id') != kreatioAddEdit.settings.CreateComponent.EmptyComponentId){
					 	 components_collect.push($(this).attr('id'));
					 	}
				     });
				$(kreatioAddEdit.settings.ContainerClassName+kreatioAddEdit.settings.UiClassHelper.SortClass).find('#'+kreatioAddEdit.settings.CreateComponent.EmptyComponentId).removeClass('component_block')
		    	$.ajax({
						type:'POST',
						url:'/new-component?new_site_component=true&type=site',
						data:"id="+''+"&container_id="+drop_container_id+"&components="+components_collect,
						dataType:'text',
						beforeSend:function(){
						      $('.ui-dialog').remove();
						      $('.ui-overlay').removeClass('ui-widget-overlay');
						      $("#ajaxBusyloader").show();
						      $("#existing_component_dialog").html('');
						},
						success:function (data){
							  $('.ui-overlay').addClass('ui-widget-overlay');
						      $("#existing_component_dialog").html(data).dialog({
									model:true,
									title:'Component Edit',
									closeText: ' ',
									beforeClose: function (){
					                     if(!confirm('Do u want close the dialog?')){
					                          return false;
					                      }        
					                      else {
					                             $('.ui-overlay').removeClass('ui-widget-overlay');
												 $(kreatioAddEdit.settings.ContainerClassName+kreatioAddEdit.settings.UiClassHelper.SortClass).find('#'+kreatioAddEdit.settings.CreateComponent.EmptyComponentId).remove();
					                      }
					                },
					                 buttons: {
										"Submit": function() {
											kreatioAddEdit.existing_component_form_submit($(this).find('form').attr('action'),$(this).find('form').attr('id'),$(this).find('#component_id').attr('value'))
										},
					  				 }
					           });
						      $("#emp_dialog #tabs").tabs();
						      
						},
						complete:function(){
							 $("#ajaxBusyloader").hide();
						},
						error:function(xhr,textStatus){
							
						}
			    });
		    }
		    
		  if(Exs_comp_id != kreatioAddEdit.settings.CreateComponent.EmptyComponentId){
			var exist_id_drag = Exs_comp_id.split('_')[1];
			
		    	var components_collect = [];
			 	 $("#"+drop_container_id).find(kreatioAddEdit.settings.ComponentClassName).not(kreatioAddEdit.settings.ComponentClassName+kreatioAddEdit.settings.UiClassHelper.SortDragClassName).each(function (){
			 	 	if($(this).attr('id') != Exs_comp_id){
						components_collect.push($(this).attr('id'));
					}
				});
			  
				var ids = [];
				$(kreatioAddEdit.settings.ContainerClassName+kreatioAddEdit.settings.UiClassHelper.SortClass+' '+kreatioAddEdit.settings.ComponentClassName).not(kreatioAddEdit.settings.ContainerClassName+kreatioAddEdit.settings.UiClassHelper.SortClass+' '+kreatioAddEdit.settings.ComponentClassName+kreatioAddEdit.settings.UiClassHelper.DragClass).each(function(){
				    ids.push($(this).attr('id').split('_')[1]);
				});
			
				if($.inArray(exist_id_drag,ids) != -1){
				      alert('already the component exists');
				      $(kreatioAddEdit.settings.ContainerClassName+kreatioAddEdit.settings.UiClassHelper.SortClass+' '+kreatioAddEdit.settings.ComponentClassName+kreatioAddEdit.settings.UiClassHelper.DragClass).not(kreatioAddEdit.settings.ContainerClassName+kreatioAddEdit.settings.UiClassHelper.SortClass+' '+kreatioAddEdit.settings.ComponentClassName+kreatioAddEdit.settings.UiClassHelper.SortDragClassName).remove();
				}
				
				else{
				      $.ajax({
					      type:'POST',
					      url:'/get-component/',
					      data:"id="+exist_id_drag+"&container_id="+drop_container_id+"&components="+components_collect,
					      dataType:'text',
					      beforeSend:function(){
					      	$("#ajaxBusyloader").show();
						/*    $("#"+Exs_comp_id).removeClass(kreatioAddEdit.settings.ComponentClassName)
                            $("#"+Exs_comp_id).removeAttr('id');
                            $("#"+Exs_comp_id).removeAttr('style');*/

					      },
					      success:function (data){
							$("#"+drop_container_id+" #"+Exs_comp_id).remove();
                            $("#"+drop_container_id+" .update_component").html(data)
                            var new_comp_id = $(".update_component").find(kreatioAddEdit.settings.ComponentClassName).attr('id').split('_')[1];
                            $(".update_component").find(kreatioAddEdit.settings.ComponentClassName+' '+kreatioAddEdit.settings.ComponentContentClassName).prepend("<div class='overlay_ae content_noEdit'>");
                            kreatioAddEdit.toolBox_reg_Editablecomponent(new_comp_id);
						 },
					      complete:function(){
							  $("#"+drop_container_id+" .update_component").removeAttr('class');
                               kreatioAddEdit.save_components();
                               $("#ajaxBusyloader").hide();
						   },
					      error:function(xhr,textStatus){
						       alert('error ...')
						       $("#ajaxBusyloader").css('display','none');
						       $("#"+drop_container_id+" #"+Exs_comp_id).remove();
					      }
				      });
			  }
		}
	},
		
		//Editable component toolbox
		insert_EditableComponent_toolbox_new : function (){
		      $(kreatioAddEdit.settings.ComponentClassName+' '+kreatioAddEdit.settings.ComponentHeaderClassName).not(kreatioAddEdit.settings.ContainerClassName+kreatioAddEdit.settings.UiClassHelper.SortClass+' '+kreatioAddEdit.settings.ComponentClassName+' '+kreatioAddEdit.settings.ComponentHeaderClassName).each(function(){
				  $(this).append('<span class="'+kreatioAddEdit.settings.ComponentToolBoxClassName+'"></span>');
				  $(this).find('.'+kreatioAddEdit.settings.ComponentToolBoxClassName).append('<a href="javascript:void(0)" class="content_hide collepse_comp" title="Collapse Component"></a>');
				  $(this).find('.'+kreatioAddEdit.settings.ComponentToolBoxClassName).append('<a href="javascript:void(0)" class="edit_comp" title="Edit Component"></a>');
				  $(this).find('.'+kreatioAddEdit.settings.ComponentToolBoxClassName).append('<a href="javascript:void(0)" class="close_comp" title="Close Component"></a>');
		      });
		},
		
		//Register toolBox for Editable components when we changed title and others (Register new toolkit for new responsed component)
	     toolBox_reg_Editablecomponent : function (id){
		  var new_tool_component =  $('#component_'+id+' '+kreatioAddEdit.settings.ComponentHeaderClassName)
		   $(new_tool_component).append('<span class="'+kreatioAddEdit.settings.ComponentToolBoxClassName+'"></span>');
		   $(new_tool_component).find('.'+kreatioAddEdit.settings.ComponentToolBoxClassName).append('<a href="javascript:void(0)" class="content_hide collepse_comp"></a>');
		   $(new_tool_component).find('.'+kreatioAddEdit.settings.ComponentToolBoxClassName).append('<a href="javascript:void(0)" class="edit_comp"></a>');
		   $(new_tool_component).find('.'+kreatioAddEdit.settings.ComponentToolBoxClassName).append('<a href="javascript:void(0)" class="close_comp"></a>');
	     },
		
		delete_toolbox_otherComponent : function (){
			$('#components_list '+kreatioAddEdit.settings.ComponentClassName+' '+kreatioAddEdit.settings.ComponentHeaderClassName).each(function(){
				$(this).find('.'+kreatioAddEdit.settings.ComponentToolBoxClassName).remove();
			});
		},
		
		editable_components : function () {
			$(kreatioAddEdit.settings.ComponentEdit.EditableComponents).addClass(kreatioAddEdit.settings.ComponentClassName.replace('.',' '));
			kreatioAddEdit.insert_EditableComponent_toolbox_new();
		},
		
		widget_tooltip : function () {
			$('#components_list .pal_tip').hover(function () {
    			$(this).find('span').show();
			},function(){
    			$(this).find('span').hide();
			});
		//	$( document ).tooltip({items: ".simple_list li a"});

		},
		
		addWidgetPartialGenerate : function () {
			$.ajax({
				type:'POST',
				url:kreatioAddEdit.settings.SlideToggleText.AddwidgetPartialUrl,
				dataType:'html',
				success : function (data){
					$('#components_list').html(data);
					kreatioAddEdit.draggable_widget();
					kreatioAddEdit.widget_tooltip();
					$('.widget_components_tabs').tabs();
					$('#control_widget_panel').css('display','block');
				}
			});
		},
		
		EmptyComponentSubmitLoadingIndicator : function () {
			 $('.ui-dialog').append('<div id="ajaxBusy"><p><img src="images/add_edit/ajax-loader.gif"></p></div>');
			  $('#ajaxBusy').addClass('emptyloadingindicator');
		},
		
		loadingIndicator : function () {
			 $(document).ajaxStart(function(){
			   $('.ui-overlay').addClass('ui-widget-overlay');
			   $("#ajaxBusyloader").show();
			 });
			 $(document).ajaxStop(function(){
			 	 $("#ajaxBusyloader").hide();
			     $('.ui-overlay').removeClass('ui-widget-overlay');
			 });
		},
		
		componentFragmentEdit : function () {
			var fragmentEdit ='<a href="javascript:void(0)" class="fragment_edit" title="Fragement Edit"></a>'
			$(kreatioAddEdit.settings.ComponentClassName).each(function(){
				 if($(this).attr('data-editurl')){
				        $(this).find(kreatioAddEdit.settings.ComponentHeaderClassName+' .tool_comp .content_hide').before(fragmentEdit);
				        kreatioAddEdit.edit_fragment($(this).attr('data-editurl'),$(this).attr('id'));
				 }
			});
		},
		regComponentFragement : function (fragement_id){
			var fragmentEdit ='<a href="javascript:void(0)" class="fragment_edit" title="Fragement Edit"></a>'
			$('#component_'+fragement_id).each(function(){
				if($(this).attr('data-editurl')){
				       // console.log($(this).attr('data-editurl'))
				        $(this).find(kreatioAddEdit.settings.ComponentHeaderClassName+' .tool_comp .content_hide').before(fragmentEdit);
				        kreatioAddEdit.edit_fragment($(this).attr('data-editurl'),$(this).attr('id'));
				}
			});
		},
		
		edit_fragment : function (data_editUrl,data_id) {
			 $(document).on('click',"#"+data_id+' '+kreatioAddEdit.settings.ComponentHeaderClassName+' .fragment_edit', function(){
			 	window.open(data_editUrl,'AddEdit Admin','width=900,height=800,scrollbars=1')
			 });
	    },
		
		
		tabComponentsEdit : function () {
			$(kreatioAddEdit.settings.UiClassHelper.TabsClass+' '+kreatioAddEdit.settings.TabComponentEdit.TabComponentClass+' '+kreatioAddEdit.settings.ComponentHeaderClassName+' .tool_comp .content_hide').remove();
			$(kreatioAddEdit.settings.UiClassHelper.TabsClass+' '+kreatioAddEdit.settings.TabComponentEdit.TabComponentClass+' '+kreatioAddEdit.settings.ComponentHeaderClassName+' .tool_comp .close_comp').remove();
			kreatioAddEdit.tabToolboxComponentEdit();
		},
		
		nonEditabletabComponent : function () {
			$(kreatioAddEdit.settings.UiClassHelper.TabsClass+' '+kreatioAddEdit.settings.TabComponentEdit.TabComponentClass+' '+kreatioAddEdit.settings.ComponentHeaderClassName+' .tool_comp').remove();
		},
		
		tabToolboxComponentEdit : function () {
			$(kreatioAddEdit.settings.ComponentClassName+' '+kreatioAddEdit.settings.UiClassHelper.TabsClass+' '+kreatioAddEdit.settings.TabComponentEdit.TabComponentClass).find(kreatioAddEdit.settings.ComponentHeaderClassName).css('display','none');
			var selected_id = $(kreatioAddEdit.settings.ComponentClassName+' '+kreatioAddEdit.settings.UiClassHelper.TabsClass).attr('id');
			$('#'+selected_id).tabs();
			$(kreatioAddEdit.settings.ComponentClassName+' '+kreatioAddEdit.settings.UiClassHelper.TabsClass+' '+kreatioAddEdit.settings.TabComponentEdit.TabComponentClass+':eq(1)').find(kreatioAddEdit.settings.ComponentHeaderClassName).css('display','block');
			$(kreatioAddEdit.settings.ComponentClassName+' .ui-tabs ul>li.ui-corner-top a').click(function () {
					$(kreatioAddEdit.settings.ComponentClassName+' '+kreatioAddEdit.settings.UiClassHelper.TabsClass).find(kreatioAddEdit.settings.ComponentHeaderClassName).css('display','none');
					var href = $(this).attr('href');
					var replaced = $.trim(href.replace('#',''));
					$(kreatioAddEdit.settings.ComponentClassName+' '+kreatioAddEdit.settings.UiClassHelper.TabsClass).find('#'+replaced).prev(kreatioAddEdit.settings.ComponentHeaderClassName).css('display','block');
			});
		},
		
		declare : function(boolen){
				sort_flag = boolen;
				console.log('dc='+sort_flag)
				if(sort_flag==true){
				//	alert('true')
				}
   		},
		
		pageLoadconfirmation : function () {
			//console.log('pc='+sort_flag)
			window.onbeforeunload = function() {
				console.log('load='+sort_flag)
					if(sort_flag==true){
						return 'Are you sure you want to leave our website?';
					}
			}
		},
		
		previewAddedit : function () {
			var create_buttons = '<div class="preview_addedit">'+
								  '<a href="javascript:void(0)" class="panel_control disable_addedit">Preview</a>'+
								 '</div>';
			  $('#'+kreatioAddEdit.settings.AddWidget.AddWidgetDivParentID).after(create_buttons);
			  kreatioAddEdit.previewAddedit_enable();
			  kreatioAddEdit.previewAddedit_disable();
		},
		
		previewAddedit_enable : function () {
			$(document).on('click','.enable_addedit',function () {		
				$('body').removeClass('widgetDisabled').addClass('widgetEnabled');
				$('#'+kreatioAddEdit.settings.AddWidget.AddWidgetDivParentID).css('display','block');
				$(kreatioAddEdit.settings.ContainerClassName+kreatioAddEdit.settings.UiClassHelper.SortClass).sortable( "enable" );
				$('.preview_addedit .panel_control').removeClass('enable_addedit').addClass('disable_addedit');
				$('.preview_addedit .panel_control').text('Preview');
				$(kreatioAddEdit.settings.ComponentClassName).find('.content_noEdit').addClass('overlay_ae');
				return kreatioAddEdit.declare(false);
			});
		},
		
		previewAddedit_disable : function () {
			$(document).on('click','.disable_addedit',function () {
				$('body').removeClass('widgetEnabled').addClass('widgetDisabled');
				$('#'+kreatioAddEdit.settings.AddWidget.AddWidgetDivParentID).css('display','none');
				$(kreatioAddEdit.settings.ContainerClassName+kreatioAddEdit.settings.UiClassHelper.SortClass).sortable( "disable" );
				$('.preview_addedit .panel_control').removeClass('disable_addedit').addClass('enable_addedit');
				$('.preview_addedit .panel_control').text('Close Preview');
				$(kreatioAddEdit.settings.ComponentClassName).find('.content_noEdit').removeClass('overlay_ae');
				return kreatioAddEdit.declare(true);
			});
		},
		
		content_non_editable : function(){
			$(kreatioAddEdit.settings.ComponentContentClassName).each(function(){
				$(this).prepend("<div class='overlay_ae content_noEdit'>");
			});
		},
		
		content_non_editable_remote_pagination : function(content_className){
			$('.'+content_className).prepend("<div class='overlay_ae'>");
		},
		
		save_display : function(){
			$('#save_component_formSubmit').addClass('save_display');
		},
		
		undo_remove_component : function(){
			$(document).on('click','.undo_components',function(){
				var component_id = $(this).parents('.remove_component_block').attr('id');
				var container_id = $(this).parents(kreatioAddEdit.settings.ContainerClassName).attr('id');
				var compon_collect = [];
				$("#"+container_id).find(kreatioAddEdit.settings.ComponentClassName).not(kreatioAddEdit.settings.ComponentClassName+'.remove_component_block').each(function (){
			 	 	compon_collect.push($(this).attr('id'));
				});
				$.ajax({
					      type:'POST',
					      url:'/get-component/',
					      data:"id="+component_id+"&container_id="+container_id+"&components="+compon_collect,
					      dataType:'text',
					      success:function (data){
							$("#"+container_id+" .undo_remove_component").html(data)
							$(".undo_remove_component").find(kreatioAddEdit.settings.ComponentClassName+' '+kreatioAddEdit.settings.ComponentContentClassName).prepend("<div class='overlay_ae content_noEdit'>");
                            var new_comp_id = $(".undo_remove_component").find(kreatioAddEdit.settings.ComponentClassName).attr('id').split('_')[1];
                            kreatioAddEdit.toolBox_reg_Editablecomponent(new_comp_id);
						  },
					      complete:function(){
							$("#"+container_id+" .undo_remove_component").removeAttr('class');
							var compon_collect = [];
							$("#"+container_id).find(kreatioAddEdit.settings.ComponentClassName).not(kreatioAddEdit.settings.ComponentClassName+'.remove_component_block').each(function (){
						 	 	compon_collect.push($(this).attr('id'));
							});
							$('#components_save input[name="'+container_id+'"]').attr('value',compon_collect);
						  },
				});
			});
		},
		
		//Initlize all function
		init : function () {
		  var sort_flag = false;
		  kreatioAddEdit.declare(sort_flag)
		  kreatioAddEdit.create_htmlPart_page();
		  if(kreatioAddEdit.settings.SortPage) { kreatioAddEdit.Sortable_page(); }
		  if(kreatioAddEdit.settings.SortDragComponent) { kreatioAddEdit.Sortable_drggable_components(); }
		  if(kreatioAddEdit.settings.ComponentToolBox) { kreatioAddEdit.insert_component_toolbox_existing(); }
		  if(kreatioAddEdit.settings.DragComponentToolBox) { kreatioAddEdit.insert_component_toolbox_new(); }
		  if(kreatioAddEdit.settings.ComponentEdit.Editable) { kreatioAddEdit.editable_components(); }
		  if(kreatioAddEdit.settings.ComponentHeaderPart.Headerpart) { kreatioAddEdit.component_header(); }
		  kreatioAddEdit.save_components();
		  kreatioAddEdit.edit_component();
		  kreatioAddEdit.remove_component();
		  kreatioAddEdit.existing_component_form_submit();
		  kreatioAddEdit.expand_collapse_components();
		  $('#control_widget_panel').click(kreatioAddEdit.slide_toggle);
		  $('#control_widget_panel_expand').click(kreatioAddEdit.expand_all_components);
		  $('#control_widget_panel_collapse').click(kreatioAddEdit.collapse_all_components);
		  kreatioAddEdit.delete_toolbox_otherComponent();
		  if(kreatioAddEdit.settings.AddWidget.PartialGenerte){ kreatioAddEdit.addWidgetPartialGenerate(); } 
		  if(kreatioAddEdit.settings.ComponentFragmentEdit){ kreatioAddEdit.componentFragmentEdit(); }
		  if(kreatioAddEdit.settings.Enable_disable_addedit_functionality){ kreatioAddEdit.previewAddedit(); }
		  kreatioAddEdit.widget_panel_hide();
		  kreatioAddEdit.undo_remove_component();
		  kreatioAddEdit.save_componente_form_submit_BySubmit();
		  setTimeout('kreatioAddEdit.pageLoadconfirmation()', 2000);
		  if(kreatioAddEdit.settings.AddWidget.OnlySaveOption){ kreatioAddEdit.Only_save_option_remove_others() }
		  if(kreatioAddEdit.settings.ComponentContentEditable){ kreatioAddEdit.content_non_editable() }
		  if(kreatioAddEdit.settings.TabComponentEdit.Editable){kreatioAddEdit.tabComponentsEdit();} else { kreatioAddEdit.nonEditabletabComponent() }
		  
		}
		
}

//Execute function only one time
var fun_regist;
function KreatioAddEdit() {
 if(!fun_regist) {
   kreatioAddEdit.init();
   fun_regist=true;
 }
 else{
   alert('The function already exists');
 }
}
