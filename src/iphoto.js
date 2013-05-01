/*jslint node: true */
"use strict";

(function () {

var Photos = function (path) {
    this.path = path;
};

exports.open = function (path_or_callback) {
    var _ = require("underscore");

    if (!_.isFunction(path_or_callback)) {
        return new Photos(path_or_callback);
    }

    getAlbumPath(function (err, path) {
        path_or_callback(err, new Photos(path));
    });
};

function getUserHome() {
    return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
}

function getAlbumPath(callback) {
    var path = require('path');
    var bplist = require('bplist-parser');

    try {
        var pref = path.normalize(getUserHome() + "/Library/Preferences/com.apple.iPhoto.plist");

        bplist.parseFile(pref, function(err, obj) {
            if (err) {
                callback(err);
            } else {
                callback(err, obj[0].XMLDataFilePath);
            }
        });
    } catch (ex) {
        callback(ex);
    }
}

})();