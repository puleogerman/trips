// export function calculateTripScore(rating: number, nrOfRatings: number, co2: number): string {
//     // Normalize and weight components
//     const normalizedNrOfRatings = Math.min(nrOfRatings / 100, 1) * 10; // Max weight of 10
//     const normalizedCo2 = Math.max(10 - co2 / 10, 0); // Higher CO2 reduces score
    
//     // Final score calculation
//     const score = rating * 0.5 + normalizedNrOfRatings * 0.3 + normalizedCo2 * 0.2;
  
//     // Tier assignment based on score
//     if (score >= 8) {
//       return 'awesome';
//     } else if (score >= 5) {
//       return 'good';
//     } else {
//       return 'average';
//     }
//   }

export function calculateTripScore(rating: number, nrOfRatings: number, co2: number): string {
  
    // Adjusted weightings for each factor
    const ratingWeight = 0.6; // Stronger influence of rating
    const nrOfRatingsWeight = 0.3; // Medium influence of number of ratings
    const co2Weight = 0.1; // Weaker influence of CO2 emissions (assumes lower is better)
  
    // Normalization and scoring
    const normalizedRating = rating / 5; // Ratings are out of 5
    const normalizedNrOfRatings = Math.min(nrOfRatings / 50, 1); // Assume 50+ ratings is "high"
    const normalizedCo2 = co2 < 100 ? 1 : co2 < 300 ? 0.5 : 0.2; // Favor lower CO2
  
    const score =
      normalizedRating * ratingWeight +
      normalizedNrOfRatings * nrOfRatingsWeight +
      normalizedCo2 * co2Weight;
  
    // Adjusted thresholds
    if (score > 0.8) {
      return 'awesome';
    } else if (score > 0.5) {
      return 'good';
    } else {
      return 'average';
    }
  }