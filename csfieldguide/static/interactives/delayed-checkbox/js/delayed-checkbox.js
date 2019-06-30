var DelayedCheckbox = {};
DelayedCheckbox.delay = 1500;
DelayedCheckbox.clicks = 0;

$('#interactive-delayed-checkbox-box').on('change', function(event) {
    toggleCheckbox();
    setTimeout(function(){
        toggleCheckbox();
        DelayedCheckbox.clicks++;
        if (DelayedCheckbox.clicks < 10) {
            $("#interactive-delayed-checkbox-counter").html(DelayedCheckbox.clicks);
        } else {
            $("#interactive-delayed-checkbox-counter").html('many');
        }
    }, DelayedCheckbox.delay);
});

function toggleCheckbox() {
    var $checkbox = $("#interactive-delayed-checkbox-box");
    if ($checkbox.prop('checked')) {
        $checkbox.prop('checked', false);
    } else {
        $checkbox.prop('checked', true);
    }
}
