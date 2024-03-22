import { computeDistance, getSimilarity } from "./index"

describe("String similarity functions", () => {
    
  // Test cases for computeDistance function
  describe("computeDistance", () => {
    it("should return 0 for identical strings", () => {
      expect(computeDistance("hello", "hello")).toBe(0)
    })

    it("should return the length of target string for empty source string", () => {
      expect(computeDistance("", "hello")).toBe(5)
    })

    it("should return the length of source string for empty target string", () => {
      expect(computeDistance("hello", "")).toBe(5)
    })

    it("should return the edit distance between two strings", () => {
      expect(computeDistance("kitten", "sitting")).toBe(3)
    })

    it("should apply threshold and return target length if exceeded", () => {
      // Assuming threshold = 0.2 and target length = 10
      expect(computeDistance("hello", "world", 0.2)).toBe(10)
    })
  })

  // Test cases for getSimilarity function
  describe("getSimilarity", () => {
    it("should return 1.0 for identical strings", () => {
      expect(getSimilarity("hello", "hello")).toBe(1.0)
    })

    it("should return 1.0 for both empty strings", () => {
      expect(getSimilarity("", "")).toBe(1.0)
    })

    it("should return similarity score between two strings", () => {
      expect(getSimilarity("kitten", "sitting")).toBeCloseTo(0.571, 3)
    })

    it("should apply threshold and return 1.0 if exceeded", () => {
      // Assuming threshold = 0.2 and target length = 10
      expect(getSimilarity("hello", "world", 0.2)).toBe(1.0)
    })
  })
})
