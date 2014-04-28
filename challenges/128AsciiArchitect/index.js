'use strict';

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
var _ = require('underscore');

String.prototype.repeat = function(count) {
    if (count < 1) return '';
    var result = '', pattern = this.valueOf();
    while (count > 0) {
        if (count & 1) result += pattern;
        count >>= 1, pattern += pattern;
    }
    return result;
};

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
    var blockName;
    var padding;
    if (item.length === 2) {
        padding = item[0];
        blockName = item[1];
        var response = ' '.repeat(padding) + blockDictionary[blockName];
        return response.substr(0, response.length - padding);
    } else {
        blockName = item[0];
        return blockDictionary[blockName];
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