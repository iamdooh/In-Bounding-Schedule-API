$(document).ready(function(){
	var $form = $('#builder-form');
	var $display = $('#display');

	$form.form({
		on: 'submit',
		inline: true,
		fields: {
			title:  {
				identifier: 'title',
				rules: [{
					type : 'empty',
					prompt : 'Please enter a title'
				}]
			},
			startDate:  {
				identifier: 'startDate',
				rules: [{
					type : 'empty',
					prompt : 'Please select a start date'
				}]
			}
		}
	});

	$form.find('.ui.button').on('click', function(){
		var _this = $(this);

		$form.trigger('submit');

		if($form.form('is valid')) {
			var domain = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
			var url = domain + '/insert?' + $.param($form.serializeJSON());

			var type = $(this).data('type');

			$display.empty();

			if(type == 'url') {
				var inputBox = $('<div>', {
					'class': 'ui action input container field',
					'html': '<textarea rows="5" id="code" readonly="readonly">' + url + '</textarea><button class="ui teal right labeled icon button" data-clipboard-target="#code" data-inverted=""><i class="copy icon"></i>Copy</button>'
				});

				$display.append(inputBox);
			} else if(type == 'tag') {
				var iframeTag = $('<iframe>', {
					'allowtransparency': 'true',
					'src': domain + '/generate-button?u=' + encodeURIComponent(url),
					'frameBorder': '0',
					'width': '155',
					'height': '36',
					'scrolling': 'no'
				});

				$display.append(iframeTag)

				var inputBox = $('<div>', {
					'class': 'ui action input container field',
					'html': '<textarea rows="5" id="code" readonly="readonly">' + $display.html() + '</textarea><button class="ui teal right labeled icon button" data-clipboard-target="#code" data-inverted=""><i class="copy icon"></i>Copy</button>'
				});

				$display.append(inputBox);
			} else if(type == 'qrcode') {
				var image = $('<img>', {
					'style': 'width: 150px; height: 150px; margin-bottom: 20px; background-color: #fff;',
					'src': domain + '/qrcode?originalUrl=' + encodeURIComponent(url)
				});

				$display.append(image);

				var inputBox = $('<div>', {
					'class': 'ui action input container field',
					'html': '<textarea rows="5" id="code" readonly="readonly">' + $display.html() + '</textarea><button class="ui teal right labeled icon button" data-clipboard-target="#code" data-inverted=""><i class="copy icon"></i>Copy</button>'
				});

				$display.append(inputBox);
			} else if(type == 'shortUrl') {
				_this.addClass('loading disabled');

				$.ajax({
					type: 'POST',
					url: '/generate-short-url',
					data: { 'originalUrl': url },
					success: function(response){
						var shortUrl = domain + '/url/' + response._id;

						var inputBox = $('<div>', {
							'class': 'ui action input container field',
							'html': '<textarea rows="5" id="code" readonly="readonly">' + shortUrl + '</textarea><button class="ui teal right labeled icon button" data-clipboard-target="#code" data-inverted=""><i class="copy icon"></i>Copy</button>'
						});

						$display.append(inputBox);

						_this.removeClass('loading disabled');
					},
					error: function(xhr){
						alert(xhr.statusText);

						_this.removeClass('loading disabled');
					}
				});
			}

			new ClipboardJS('.ui.labeled.button').on('success', function(e) {
				$(e.trigger).popup({
					on: 'click',
					inline: true,
					content: 'Copied!'
				}).popup('show');

				e.clearSelection();
			});
		}

		return false;
	});

	$form.find('input[name="startDate"]').datetimepicker({
		format: 'm/d/Y H:m',
		minDate:0
	});
});
