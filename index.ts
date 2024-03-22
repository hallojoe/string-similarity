export function computeDistance(source: string, target: string, threshold: number = .1): number {
  const sourceLength: number = source.length;
  const targetLength: number = target.length;

  // Ensure source string is shorter or equal to target string
  if (sourceLength > targetLength) {
      return computeDistance(target, source, threshold);
  }

  if (targetLength - sourceLength > threshold * targetLength) {
      // Early exit if the difference in length exceeds the threshold
      return targetLength;
  }

  let previousRow: number[] = Array.from({ length: sourceLength + 1 }, (_, i) => i);
  let currentRow: number[] = new Array(sourceLength + 1);

  for (let j = 1; j <= targetLength; j++) {
      currentRow[0] = j;
      let minDistanceInRow = j;

      for (let i = 1; i <= sourceLength; i++) {
          const cost = target[j - 1] === source[i - 1] ? 0 : 1;
          currentRow[i] = Math.min(
              currentRow[i - 1] + 1,          // insertion
              previousRow[i] + 1,             // deletion
              previousRow[i - 1] + cost      // substitution
          );

          minDistanceInRow = Math.min(minDistanceInRow, currentRow[i]);
      }

      if (minDistanceInRow > threshold * targetLength) {
          // Early exit if the minimum distance in the current row exceeds the threshold
          return targetLength;
      }

      // Swap previousRow and currentRow
      let tempRow = previousRow;
      previousRow = currentRow;
      currentRow = tempRow;
  }

  return previousRow[sourceLength];
}

export function getSimilarity(sourceString: string, targetString: string, threshold: number = 0.1): number {
  let maxLength: number = Math.max(sourceString.length, targetString.length);

  if (maxLength === 0) return 1.0; // If both strings are empty, return similarity of 1
  
  const distance: number = computeDistance(sourceString, targetString, threshold * maxLength);
  
  return 1.0 - distance / maxLength;
}
