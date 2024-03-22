"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSimilarity = exports.computeDistance = void 0;
function computeDistance(source, target, threshold) {
    if (threshold === void 0) { threshold = .1; }
    var sourceLength = source.length;
    var targetLength = target.length;
    // Ensure source string is shorter or equal to target string
    if (sourceLength > targetLength) {
        return computeDistance(target, source, threshold);
    }
    if (targetLength - sourceLength > threshold * targetLength) {
        // Early exit if the difference in length exceeds the threshold
        return targetLength;
    }
    var previousRow = Array.from({ length: sourceLength + 1 }, function (_, i) { return i; });
    var currentRow = new Array(sourceLength + 1);
    for (var j = 1; j <= targetLength; j++) {
        currentRow[0] = j;
        var minDistanceInRow = j;
        for (var i = 1; i <= sourceLength; i++) {
            var cost = target[j - 1] === source[i - 1] ? 0 : 1;
            currentRow[i] = Math.min(currentRow[i - 1] + 1, // insertion
            previousRow[i] + 1, // deletion
            previousRow[i - 1] + cost // substitution
            );
            minDistanceInRow = Math.min(minDistanceInRow, currentRow[i]);
        }
        if (minDistanceInRow > threshold * targetLength) {
            // Early exit if the minimum distance in the current row exceeds the threshold
            return targetLength;
        }
        // Swap previousRow and currentRow
        var tempRow = previousRow;
        previousRow = currentRow;
        currentRow = tempRow;
    }
    return previousRow[sourceLength];
}
exports.computeDistance = computeDistance;
function getSimilarity(sourceString, targetString, threshold) {
    if (threshold === void 0) { threshold = 0.2; }
    var maxLength = Math.max(sourceString.length, targetString.length);
    if (maxLength === 0)
        return 1.0; // If both strings are empty, return similarity of 1
    var distance = computeDistance(sourceString, targetString, threshold * maxLength);
    return 1.0 - distance / maxLength;
}
exports.getSimilarity = getSimilarity;
