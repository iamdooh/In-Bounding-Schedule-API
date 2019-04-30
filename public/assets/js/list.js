$(function(){
	$('.ui.button.remove').on('click', function(){
		var id = $(this).data('id');
		var _this = $(this);

		_this.addClass('loading disabled');

		$.ajax({
			type: 'DELETE',
			url: '/insert/' + id,
			success: function(data){
				$('.ui.button.remove[data-id="' + id + '"]').closest('.item').transition({
					animation: 'fly right',
					onComplete: function(){
						$(this).empty().remove();
					}
				});
			},
			error: function(xhr){
				alert(xhr.statusText);

				_this.removeClass('loading disabled');
			}
		});
	});

	$('.ui.list').find('.item > .content:not(".floated")').on('click', function(){
		var $item = $(this).closest('.item');

		if($item.find('.ui.button.remove').hasClass('disabled')){
			return false;
		}

		$('#dimmer')
			.dimmer({
				closable: false
			})
			.dimmer('show');

		$('#view').find('h4.ui.header').show();

		$('#data-title').text($item.data('title'));
		$('#data-start-date').text($item.data('start-date'));

		if($item.data('url') != ''){
			$('#data-url')
				.text($item.data('url'))
				.attr('href', $item.data('url'));
		} else {
			$('#data-url').closest('.ui.header').hide();
		}

		if($item.data('location') != ''){
			$('#data-location').text($item.data('location'));

			var map = $('<iframe>', {
				'width': '320',
				'height': '200',
				'src': 'https://maps.google.com/maps?q=' + $item.data('location') + '&t=&z=13&ie=UTF8&iwloc=&output=embed',
				'frameborder': 0,
				'scrolling': 'no',
				'marginheight': 0,
				'marginwidth': 0
			});

			$('#map').empty().html(map);
		} else {
			$('#data-location').closest('.ui.header').hide();
		}

		if($item.data('description') != ''){
			$('#data-description').html($('<p />').text($item.data('description')).html().replace(/\n/g,'<br />'));
		} else {
			$('#data-description').closest('.ui.header').hide();
		}

		$('#view').find('.title').off('click').on('click', function(e){
			$('#view').transition({
					animation: 'slide left',
					onComplete: function(){
						$('#dimmer').dimmer('hide');
					}
			});
		});

		setTimeout(function(){
			$('#view')
				.transition({
					animation: 'slide left',
					onStart: function(){
						viewScroll.refresh();
					},
					onComplete: function(){
						viewScroll.refresh();
					}
				});
		}, 600);
	});

	var iphoneScroll = new IScroll('#wrapper', {
		mouseWheel: true
	});

	var viewScroll = new IScroll('#view-wrapper', {
		mouseWheel: true
	});
});