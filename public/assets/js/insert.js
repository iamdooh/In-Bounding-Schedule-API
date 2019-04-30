$(function(){
	$('#description')
		.html($('<p />').text($('#description').text()).html().replace(/\n/g,'<br />'));

	$('#open-confirm-button').on('click', function(){
		$('#confirm')
			.transition({
				animation: 'scale',
				onStart: function(){
					confirmScroll.refresh();
				},
				onComplete: function(){
					confirmScroll.refresh();
				}
			});
	});

	$('#add-button').on('click', function(){
		var _this = $(this);

		_this.addClass('loading disabled');

		$.ajax({
			type: 'POST',
			url: '/insert',
			data: $('.ui.form').serializeJSON(),
			success: function(response){
				location.href = '/list';
			},
			error: function(xhr){
				alert(xhr.statusText);

				_this.removeClass('loading disabled');
			}
		});
	});

	$('#close-button').on('click', function(){
		$('#confirm')
			.transition({
				animation: 'scale'
			});
	});

	var confirmScroll = new IScroll('#confirm-wrapper', {
		mouseWheel: true
	});
});