/**
 * Calculate the edit distance between two strings, considering an early exit if the difference in length exceeds a threshold.
 * @param source The source string.
 * @param target The target string.
 * @param threshold The threshold for early exit, as a fraction of the maximum string length. Defaults to 0.2.
 * @returns The edit distance between the source and target strings.
 */
export function computeDistance(source: string, target: string, threshold: number = .2): number {

  // Read lengths    
  const sourceLength: number = source.length
  const targetLength: number = target.length

  // Ensure source string is shorter or equal to target string
  if (sourceLength > targetLength) return computeDistance(target, source, threshold)

  // Exit if the difference in length exceeds the threshold
  if (targetLength - sourceLength > threshold * targetLength) return targetLength

  // Initialize previous row
  let previousRow: number[] = Array.from({ length: sourceLength + 1 }, (_, index) => index)
  let currentRow: number[] = new Array(sourceLength + 1)

  // Iterate through each character in the target string
  for (let j = 1; j <= targetLength; j++) {

    // Initialize the first element of the current row
    currentRow[0] = j
    let minDistanceInRow = j

    // Iterate through each character in the source string
    for (let i = 1; i <= sourceLength; i++) {

      // Calculate the cost of transformation
      const cost = target[j - 1] === source[i - 1] ? 0 : 1

      // Compute the minimum of three possible transformations: insertion, deletion, or substitution
      currentRow[i] = Math.min(
        currentRow[i - 1] + 1, // insertion
        previousRow[i] + 1, // deletion
        previousRow[i - 1] + cost // substitution
      )

      // Update the minimum distance in the current row
      minDistanceInRow = Math.min(minDistanceInRow, currentRow[i])
    }

    // Early exit if the minimum distance in the current row exceeds the threshold
    if (minDistanceInRow > threshold * targetLength) return targetLength

    // Swap previousRow and currentRow
    let tempRow = previousRow
    previousRow = currentRow
    currentRow = tempRow
  }

  // Return the edit distance between the source and target strings
  return previousRow[sourceLength]
}

/**
 * Calculate the similarity between two strings, considering an early exit if the difference in length exceeds a threshold.
 * @param sourceString The source string.
 * @param targetString The target string.
 * @param threshold The threshold for early exit, as a fraction of the maximum string length. Defaults to 0.2.
 * @returns The similarity score between the source and target strings.
 */
export function getSimilarity(sourceString: string, targetString: string, threshold: number = .2): number {

  // Calculate the maximum length of the strings
  let maxLength: number = Math.max(sourceString.length, targetString.length)

  // Early exit if both strings are empty
  if (maxLength === 0) return 1.0

  // Calculate the edit distance between the strings
  const distance: number = computeDistance(sourceString.toLowerCase(), targetString.toLowerCase(), threshold * maxLength)

  // Return the similarity score between the strings
  return 1.0 - distance / maxLength
}
