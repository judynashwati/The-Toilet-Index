import "jquery";

const PIN_DETAILS = $("#pin-details").hide();
PIN_DETAILS.setPosition = function(x, y) {
    return this.css({
    left: `${x}px`,
    top: `${y}px`,
    });
}

$(".pin", "#map-container").on("mouseenter", function(e) {
    PIN_DETAILS.text("Details for pin " + $(this).text())
    .show();
}).on("mousemove", function(e) {
    PIN_DETAILS.setPosition(e.clientX + 10, e.clientY + 10);
}).on("mouseleave", function() {
    PIN_DETAILS.hide();
});
