/* jslint node: true */
"use strict";

exports.testOpen = function (test) {
    var iphoto = require("../src/iphoto");

    test.ok(iphoto);

    iphoto.open(function (err, photos) {
        var _ = require("underscore.string");

        console.log(photos.path);

        test.ok(_.endsWith(photos.path, "AlbumData.xml"));

        test.done();
    });
};

exports.testWatch = function (test) {
    test.done();
};