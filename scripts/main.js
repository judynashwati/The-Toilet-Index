import "jquery";

const CHUNK_ATTR = "data-chunk";

const Main = {};

function init() {
    Main.head = $("head");
    Main.body = $("body");
    //Load order: HTML, CSS, JS
    Main.loadChunk = function(chunk, destElem) {
        //TODO: input validation
        let dest = $(destElem);
        if (dest.length != 1) {
            console.error(`Cannot load chunk: destination element selector \"${destElem}\" returned ${dest.length} elements`);
        }
        dest.load(`../html/${chunk}.html`, function() {
            $("<link />").appendTo(Main.head)
                .attr({
                    rel: "stylesheet",
                    type: "text/css",
                    href: `../styles/${chunk}.css`
                });
            $("<script></script>").appendTo(Main.head)
                .attr({
                    type: "module",
                    src: `../scripts/${chunk}.js`
                });
        })
    };
}

$(function() {
    init();

    //Load all statically-defined chunks
    $(`[${CHUNK_ATTR}]`).each(function() {
        let elem = $(this);
        let chunk = elem.attr(CHUNK_ATTR);
        if (chunk == undefined || chunk == "") {
            console.error(`Cannot load chunk: destination element ${elem} does not have a valid ${CHUNK_ATTR} attribute defined`);
        }
        Main.loadChunk(chunk, elem);
    });
});