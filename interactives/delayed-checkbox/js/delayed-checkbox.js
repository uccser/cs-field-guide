var delay=1500;

$('#interactive-delayed-checkbox-box').on('change', function(event) {

    toggleCheckbox();

    setTimeout(function(){
        toggleCheckbox();
        var $counter = $("#interactive-delayed-checkbox-counter");
        var $count = Number($counter.html());
        $counter.html(++$count);
    }, delay);

    function toggleCheckbox() {
        var $checkbox = $("#interactive-delayed-checkbox-box");
        if ($checkbox.prop('checked')) {
            $checkbox.prop('checked', false);
        } else {
            $checkbox.prop('checked', true);
        }
    }
});
