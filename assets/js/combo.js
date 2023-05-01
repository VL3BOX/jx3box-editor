import $ from "jquery";
import { iconLink } from "@jx3box/jx3box-common/js/utils";

function renderCombo(selector = ".e-skill-combo .w-skill-combo-item") {
    try {
        let html = ''
        $(selector).each(function(i, ele) {
            // 获取嵌入源地址
            let url = $(this).text();

            const [id, name, icon, extend] = url.split(",");

            // 渲染
            let code = `
                <span class="w-skill-combo-item">
                    <img class="u-skill-icon" src="${iconLink(icon)}" alt="${icon}" title="${name}" />
                    <span class="u-skill-name" title="${name}">${name}</span>
                    <i class="u-gcd-icon ${extend && extend.gcd ? 'is-show' : ''}" title="无GCD技能">
                        <i class="el-icon-time"></i>
                    </i>
                </span>
            `;
            html += code;
        });

        // 挂载点
        $(selector).parent().html(html);
    } catch(e) {
        console.log(e)
    }
}

export default renderCombo;
