export interface Quote {
  id: string;
  content: string;
  author: string;
  category: string;
}

export const quotesDatabase: Quote[] = [
  {
    id: '1',
    content: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
    category: 'Inspiration',
  },
  {
    id: '2',
    content: 'Innovation distinguishes between a leader and a follower.',
    author: 'Steve Jobs',
    category: 'Innovation',
  },
  {
    id: '3',
    content: 'Life is what happens when you\'re busy making other plans.',
    author: 'John Lennon',
    category: 'Life',
  },
  {
    id: '4',
    content: 'The future belongs to those who believe in the beauty of their dreams.',
    author: 'Eleanor Roosevelt',
    category: 'Dreams',
  },
  {
    id: '5',
    content: 'It is during our darkest moments that we must focus to see the light.',
    author: 'Aristotle',
    category: 'Motivation',
  },
  {
    id: '6',
    content: 'Be yourself; everyone else is already taken.',
    author: 'Oscar Wilde',
    category: 'Individuality',
  },
  {
    id: '7',
    content: 'The best time to plant a tree was 20 years ago. The second best time is now.',
    author: 'Chinese Proverb',
    category: 'Action',
  },
  {
    id: '8',
    content: 'Success is not final, failure is not fatal: it is the courage to continue that counts.',
    author: 'Winston Churchill',
    category: 'Success',
  },
  {
    id: '9',
    content: 'You miss 100% of the shots you don\'t take.',
    author: 'Wayne Gretzky',
    category: 'Motivation',
  },
  {
    id: '10',
    content: 'Whether you think you can or you think you can\'t, you\'re right.',
    author: 'Henry Ford',
    category: 'Mindset',
  },
  {
    id: '11',
    content: 'The only impossible journey is the one you never begin.',
    author: 'Tony Robbins',
    category: 'Journey',
  },
  {
    id: '12',
    content: 'Believe you can and you\'re halfway there.',
    author: 'Theodore Roosevelt',
    category: 'Belief',
  },
  {
    id: '13',
    content: 'Don\'t watch the clock; do what it does. Keep going.',
    author: 'Sam Levenson',
    category: 'Persistence',
  },
  {
    id: '14',
    content: 'Everything you\'ve ever wanted is on the other side of fear.',
    author: 'George Addair',
    category: 'Fear',
  },
  {
    id: '15',
    content: 'Dream big and dare to fail.',
    author: 'Norman Vaughan',
    category: 'Dreams',
  },
];

export const getRandomQuote = (): Quote => {
  const randomIndex = Math.floor(Math.random() * quotesDatabase.length);
  return quotesDatabase[randomIndex];
};

export const getQuoteById = (id: string): Quote | undefined => {
  return quotesDatabase.find(quote => quote.id === id);
};