'use strict';

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
var _ = require('underscore.string');

var line = '++--***···';

function lshift(str, amount) {
    return _.pad(str.slice(0, str.length - amount), str.length);
}

function rshift(str, amount) {
    return _.rpad(str.slice(0, amount), str.length);
}

function readFile() {
    return fs.readFileAsync('input.txt', 'utf8')
}

function parseBlocks(map) {
    return map.match(/[1-9]*[a-j]/gi);
}

function buildDictionary() {
    return Promise.reduce(_.chars('abcdefghij'), function (result, char, index) {
        result[char] = rshift(line, index);
        return result;
    }, {});
}

function blocksToLines(item) {
    return buildDictionary().then(function(dictionary) {
        if (item.length === 2) {
            return lshift(dictionary[item[1]], parseInt(item[0], 10));
        } else {
            return dictionary[item[0]];
        }
    });
}

function rotateLines(data) {
    var result = [];
    var height = data[0].length;
    while (height--) {
        var line = '';
        for (var i = 0; i < data.length; i++) {
            line += data[i][height];
        }
        result.push(line);
    }
    return result;
}

function display(lines) {
    console.log(lines.join('\n'));
}

readFile()
    .then(parseBlocks)
    .map(blocksToLines)
    .then(rotateLines)
    .then(display);
