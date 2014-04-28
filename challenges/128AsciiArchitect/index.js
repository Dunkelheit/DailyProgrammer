'use strict';

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
var _ = require('underscore.string');

var line = '++--***···';
var lineLength = line.length;

var blockDictionary = {};

function rshift(str, amount) {
    return _.rpad(str.slice(0, amount), str.length);
}

function buildDictionary() {
    return Promise.reduce(_.chars('abcdefghij'), function (result, char, index) {
        result[char] = rshift(line, index);
        return result;
    }, {}).then(function (dictionary) {
        blockDictionary = dictionary;
    });
}

function readFile() {
    return fs.readFileAsync('input.txt', 'utf8')
}

function parseBlocks(map) {
    return map.match(/[1-9]*[a-j]/gi);
}

function blocksToLines(item) {
    if (item.length === 2) {
        return _.pad(blockDictionary[item[1]], lineLength + parseInt(item[0], 10));
    } else {
        return blockDictionary[item[0]];
    }
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

function linesToString(data) {
    return data.join('\n');
}

buildDictionary()
    .then(readFile)
    .then(parseBlocks)
    .map(blocksToLines)
    .then(rotateLines)
    .then(linesToString)
    .then(console.log);