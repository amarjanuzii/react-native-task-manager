export interface Quote {
  id: number;
  quote: string;
  author: string;
}

/**
 * Fetches a random quote to motivate the user on their task completion journey.
 */
export const fetchRandomQuote = async (): Promise<Quote> => {
  try {
    const response = await fetch('https://dummyjson.com/quotes/random');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return {
      id: data.id,
      quote: data.quote,
      author: data.author,
    };
  } catch (error) {
    console.error('Error fetching quote from public API', error);
    throw error;
  }
};
