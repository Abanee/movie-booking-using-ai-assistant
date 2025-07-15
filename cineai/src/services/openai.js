import OpenAI from 'openai';

/**
 * OpenAI client configuration
 */
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

/**
 * Generate movie recommendations based on user preferences
 */
export async function getMovieRecommendations(userPreferences) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a movie recommendation AI. Generate personalized movie recommendations based on user preferences and viewing history. Return structured data.'
        },
        {
          role: 'user',
          content: `Based on these preferences: ${JSON.stringify(userPreferences)}, recommend 6 movies with detailed information including title, genre, rating, description, cast, and reason for recommendation.`
        }
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'movie_recommendations',
          schema: {
            type: 'object',
            properties: {
              recommendations: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    title: { type: 'string' },
                    genre: { type: 'array', items: { type: 'string' } },
                    rating: { type: 'number' },
                    description: { type: 'string' },
                    cast: { type: 'array', items: { type: 'string' } },
                    aiReason: { type: 'string' },
                    poster: { type: 'string' },
                    runtime: { type: 'number' },
                    year: { type: 'number' }
                  },
                  required: ['title', 'genre', 'rating', 'description', 'cast', 'aiReason']
                }
              }
            },
            required: ['recommendations']
          }
        }
      }
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('Error getting movie recommendations:', error);
    throw error;
  }
}

/**
 * Generate mood-based movie suggestions
 */
export async function getMoodBasedMovies(mood, genre) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a movie mood analyzer. Generate movie suggestions based on user mood and preferred genre.'
        },
        {
          role: 'user',
          content: `Suggest movies for someone feeling ${mood} and interested in ${genre} genre. Include 4 movies with detailed information.`
        }
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'mood_movies',
          schema: {
            type: 'object',
            properties: {
              movies: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    title: { type: 'string' },
                    description: { type: 'string' },
                    moodMatch: { type: 'string' },
                    rating: { type: 'number' },
                    genres: { type: 'array', items: { type: 'string' } }
                  },
                  required: ['title', 'description', 'moodMatch', 'rating']
                }
              }
            },
            required: ['movies']
          }
        }
      }
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('Error getting mood-based movies:', error);
    throw error;
  }
}

/**
 * Generate movie review analysis
 */
export async function analyzeMovieReview(movieTitle, userReview) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a movie review analyzer. Analyze user reviews and provide insights about their preferences.'
        },
        {
          role: 'user',
          content: `Analyze this review for "${movieTitle}": ${userReview}. Provide sentiment analysis and preference insights.`
        }
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'review_analysis',
          schema: {
            type: 'object',
            properties: {
              sentiment: { type: 'string' },
              score: { type: 'number' },
              preferences: { type: 'array', items: { type: 'string' } },
              recommendations: { type: 'array', items: { type: 'string' } }
            },
            required: ['sentiment', 'score']
          }
        }
      }
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('Error analyzing movie review:', error);
    throw error;
  }
}

/**
 * Generate personalized movie explanations
 */
export async function explainRecommendation(movieTitle, userPreferences) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a movie recommendation explainer. Explain why a specific movie matches user preferences.'
        },
        {
          role: 'user',
          content: `Explain why "${movieTitle}" is recommended for someone with these preferences: ${JSON.stringify(userPreferences)}`
        }
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'recommendation_explanation',
          schema: {
            type: 'object',
            properties: {
              explanation: { type: 'string' },
              matchingFactors: { type: 'array', items: { type: 'string' } },
              confidence: { type: 'number' }
            },
            required: ['explanation', 'matchingFactors', 'confidence']
          }
        }
      }
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('Error explaining recommendation:', error);
    throw error;
  }
}

export default openai;