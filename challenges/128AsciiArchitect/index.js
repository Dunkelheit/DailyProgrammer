'use strict';

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
var _ = require('underscore.string');

var line = '++--***···';

function _lshift (str, padding) {
    return _.pad(str.slice(0, str.length - padding), str.length);
}

function _rshift(str, padding) {
    return _.rpad(str.slice(0, padding), str.length);
}

return fs.readFileAsync('input.txt', 'utf8')
    .then(function (map) {
        return map.match(/[1-9]*[a-j]/gi);
    })
    .then(function (blocks) {
        return Promise
            .reduce(_.chars('abcdefghij'), function (result, char, index) {
                result[char] = _rshift(line, index);
                return result;
            }, {})
            .then(function (dictionary) {
                return Promise.map(blocks, function (block) {
                    return block.length === 2 ? _lshift(dictionary[block[1]], parseInt(block[0], 10)) : dictionary[block[0]];
                })
            });
    })
    .then(function (lines) {
        var rotatedLines = [];
        var height = line.length;
        while (height--) {
            var rotatedLine = '';
            for (var i = 0; i < lines.length; i++) {
                rotatedLine += lines[i][height];
            }
            rotatedLines.push(rotatedLine);
        }
        return rotatedLines;
    })
    .then(function (lines) {
        console.log(lines.join('\n'));
    });
