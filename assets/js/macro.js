import JX3_MACRO from '@jx3box/jx3box-macro'
import $ from 'jquery'
import "@jx3box/jx3box-macro/macro.css";

function macro(selector=".e-jx3macro-area"){
    console.log($(selector))
    try {
        $(selector).each(function(i, ele) {
            let $macro = $(this);
            let macro = new JX3_MACRO($macro.text());
            $macro.html(macro.code);
        });
    } catch (e) {
        console.error(e);
    }
}
export default macro

