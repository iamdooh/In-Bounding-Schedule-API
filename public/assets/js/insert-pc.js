$(document).ready(function(){
	$('#description')
		.html($('<p />').text($('#description').text()).html().replace(/\n/g,'<br />'));

	$('.ui.modal')
		.modal({
			useFlex: true,
			closable: false,
			observeChanges: true,
			onApprove: function($element){
				$element.addClass('loading disabled');

				setTimeout(function(){
					location.href = '/download';
				}, 1000);

				return false;
			},
			onDeny: function(){
				window.close();
			}
		})
		.modal('show');
});
