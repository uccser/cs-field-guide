$(document).ready(function(){
	$("#interactive-payment-interface-input").bind('input', updatePaymentInteractive);
});

function updatePaymentInteractive() {
	var inputText = document.getElementById('interactive-payment-interface-input').value;
	var $paymentInteractiveMessage = $("#interactive-payment-interface-message");

	if (inputText.match(/^(\d+(\.\d{0,2})?)$/) != null && inputText.substring(0,1) != "0") {
		$paymentInteractiveMessage.html(payment_interface_il8n["valid"]);
		$paymentInteractiveMessage.addClass('success');
		$paymentInteractiveMessage.removeClass('error');
	} else {
		$paymentInteractiveMessage.html(payment_interface_il8n["invalid"]);
		$paymentInteractiveMessage.addClass('error');
		$paymentInteractiveMessage.removeClass('success');
	}
}
