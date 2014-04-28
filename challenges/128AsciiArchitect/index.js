'use strict';

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
var _ = require('underscore.string');

var line = '++--***···';
var lineLength = line.length;

var blockDictionary = {
    a: '+         ',
    b: '++        ',
    c: '++-       ',
    d: '++--      ',
    e: '++--*     ',
    f: '++--**    ',
    g: '++--***   ',
    h: '++--***·  ',
    i: '++--***·· ',
    j: '++--***···'
};

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

fs.readFileAsync('input.txt', 'utf8')
    .then(parseBlocks)
    .map(blocksToLines)
    .then(rotateLines)
    .then(linesToString)
    .then(console.log);