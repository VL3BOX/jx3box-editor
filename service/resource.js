/*
 * @Author: X3ZvaWQ
 * @Date: 2022-08-20 22:17:27
 * @LastEditors: X3ZvaWQ
 * @LastEditTime: 2022-08-20 23:54:41
 * @Description:
 */
import { $node } from "@jx3box/jx3box-common/js/https";
const $ = $node();

/* import axios from 'axios'
const $ = axios.create({
    baseURL: 'http://localhost:7002/',
}) */

function getResource(id, client = 'std') {
    return $.get(`/resource/${client}/${id}`);
}

export { getResource };
