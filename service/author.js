import { $next, $cms } from "@jx3box/jx3box-common/js/https";

function getUserMedals(uid) {
    return $next({ mute: true })
        .get("/api/user/" + uid + "/medals")
        .then((res) => {
            return res.data.data;
        });
}

function getUserInfo(uid) {
    return $cms({ mute: true })
        .get(`/api/cms/user/${uid}/info`)
        .then((res) => {
            return res.data.data;
        });
}

function getUserPublicTeams(uid) {
    return $team({ mute: true }).get(`/api/team/relation/public`, {
        params: {
            uid: uid,
        },
    }).then((res) => {
        return res.data.data;
    });
}


export {
    getUserMedals,
    getUserInfo,
    getUserPublicTeams,
}