export function calculateTripScore(rating: number, nrOfRatings: number, co2: number): string {
  
    // Adjusted weightings for each factor
    const ratingWeight = 0.6; // Stronger influence of rating
    const nrOfRatingsWeight = 0.3; // Medium influence of number of ratings
    const co2Weight = 0.1; // Weaker influence of CO2 emissions
  
    // Normalization and scoring
    const normalizedRating = rating / 5; // Ratings are out of 5
    const normalizedNrOfRatings = Math.min(nrOfRatings / 50, 1); // Assume 50+ ratings is "high"
    const normalizedCo2 = co2 < 100 ? 1 : co2 < 300 ? 0.5 : 0.2; // Favor lower CO2
  
    const score =
      normalizedRating * ratingWeight +
      normalizedNrOfRatings * nrOfRatingsWeight +
      normalizedCo2 * co2Weight;

    if (score > 0.8) {
      return 'awesome';
    } else if (score > 0.5) {
      return 'good';
    } else {
      return 'average';
    }
  }