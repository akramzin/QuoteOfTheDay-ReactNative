const API_URL = 'https://api.quotable.io';

export interface Quote {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  authorSlug: string;
  length: number;
}

export const getRandomQuote = async (): Promise<Quote> => {
  try {
    const response = await fetch(`${API_URL}/random`);
    if (!response.ok) {
      throw new Error('Failed to fetch quote');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching quote:', error);
    throw error;
  }
};

export const getQuoteById = async (id: string): Promise<Quote> => {
  try {
    const response = await fetch(`${API_URL}/quotes/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch quote');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching quote by ID:', error);
    throw error;
  }
};