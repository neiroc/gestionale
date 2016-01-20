		$('#btnEditRow').button({icons: {primary:'ui-icon-pencil'},
						 disabled: true
						}).click(function() {
							var desc, scale, man, roadname, value, type, id, roadnumber, partnumber;
							$.ajax({
								type: "POST",
								dataType: "json",
								data: ({id : clickedRowId, ref : "items", action : "fetch" }),
								context: "#edit_form",
								url: "edit.php", 
								success: function(data) {
									desc = data.i_description;
									scale = data.i_scale;
									man = data.i_manufacturer;
									roadname = data.i_roadname;
									value = data.i_value;
									type = data.i_type;
									id = data.i_index;
									partnumber = data.i_partnumber;
									roadnumber = data.i_roadnumber;
								}
							});
							
							$("#edit_form").load('form.php', function() {
								$("#edit_form").dialog({
									title: "Edit item",
									width: 500,
									modal: true,
									draggable: true,
									open: function() {
										$("#description").val(desc);
										$("#scale").val(scale);
										$("#manufacturer").val(man);
										$("#value").val(value);
										$("#type").val(type);
										$("#item_id").val(id);
										$("#roadname").val(roadname);
										if(partnumber == 'unk') {
											$("#partnumbercbx").attr('checked','checked');
											$("#partnumber").val("");
											$("#partnumber").attr("disabled", true);
										} else {
											$("#partnumber").val(partnumber);
											$("#partnumber").attr("disabled", false);
										}
										if(roadnumber == 'n/a') {
											$("#roadnumbercbx").attr('checked','checked');
											$("#roadnumber").val("");
											$("#roadnumber").attr("disabled", true);
										} else {
											$("#roadnumber").val(roadnumber);
										}										
									},
									buttons: {
										"Edit Item": function() {
											if($("#edit_form").valid()) {
												$("#edit_form").submit();
												$( this ).dialog( "close" );
											}
										},
										Cancel: function() {
											$( this ).dialog( "close" );
										}
									},
									close: function() {
										$(':text',"#edit_form").val("");
										$("#partnumber").attr("disabled", false);
										$("#roadnumber").attr("disabled", false);
										$(':input',"#edit_form").removeAttr('checked').removeAttr('selected');
									}
								});
							});
						});	