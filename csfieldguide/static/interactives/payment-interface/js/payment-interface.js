$(document).ready(function(){
	$("#interactive-payment-interface-input").bind('input', updatePaymentInteractive);
});

function updatePaymentInteractive() {
	var inputText = document.getElementById('interactive-payment-interface-input').value;
	var $paymentInteractiveMessage = $("#interactive-payment-interface-message");

	if (inputText.match(/^(\d+(\.\d{0,2})?)$/) != null && inputText.substring(0,1) != "0") {
		$paymentInteractiveMessage.html(gettext('Valid amount.'));
		$paymentInteractiveMessage.addClass('success');
		$paymentInteractiveMessage.removeClass('error');
	} else {
		$paymentInteractiveMessage.html(gettext('Invalid amount. Decimals are allowed up to two places.'));
		$paymentInteractiveMessage.addClass('error');
		$paymentInteractiveMessage.removeClass('success');
	}
}
