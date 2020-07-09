import axios from "axios";
import { __node, __iconPath } from "@jx3box/jx3box-common/js/jx3box.json";
const API = __node; //TODO:
// const API = "http://localhost:3001/";

function loadResource(type, condition, query, params) {
    return axios
        .get(API + `${type}/${condition}/${query}`, {
            params: params,
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
}

function loadStat() {
    return axios
        .get(__node)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
}

function getIconsStat() {
    return axios
        .get(__iconPath + "data/stat.json")
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
}

function getIcons(query, params) {
    return axios
        .get(__node + "icon/name/" + query, {
            params: params,
        })
        .then((res) => {
            let data = res.data;
            let list = [...data.skill, ...data.buff, ...data.item];
            console.log(list);
            return list;
        })
        .catch((err) => {
            console.log(err);
        });
}

export { loadResource, loadStat, getIconsStat, getIcons };
