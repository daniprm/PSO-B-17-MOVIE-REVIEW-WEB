import { render, screen } from '@testing-library/react';
import MovieList from '../MovieList';
import { MovieType } from '@/types/Movie/MovieType';
import '@testing-library/jest-dom';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

// Mock tombol Watchlist
jest.mock('@/components/Buttons/WatchlistButton/WatchlistButton', () => ({
  __esModule: true,
  default: ({ movieId }: { movieId: string }) => (
    <button>Watchlist-{movieId}</button>
  ),
}));

describe('MovieList Component', () => {
  const mockMovies: MovieType[] = [
    {
      id: '1',
      title: 'Inception',
      year: 2010,
      poster_url:
        'https://image.tmdb.org/t/p/original/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg',
      created_at: '2025-05-24 12:59:36.723082+00',
      genres_id: 1,
      rating: 8.8,
      description:
        'A thief who enters the dreams of others to steal secrets from their subconscious.',
      director: 'Christopher Nolan',
      actors_id: 1,
      genre: ['Action'],
    },
    {
      id: '2',
      title: 'BoiBoyboi',
      year: 2010,
      poster_url:
        'https://image.tmdb.org/t/p/original/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg',
      created_at: '2025-05-24 12:59:36.723082+00',
      genres_id: 1,
      rating: 8.8,
      description:
        'A thief who enters the dreams of others to steal secrets from their subconscious.',
      director: 'Christopher Nolan',
      actors_id: 1,
      genre: ['Action'],
    },
  ];

  it('renders movies correctly', () => {
    render(<MovieList movies={mockMovies} />);

    expect(screen.getByText(/BoiBoyboi/i)).toBeInTheDocument();
    expect(screen.getByAltText(/BoiBoyboi/i)).toBeInTheDocument();
  });

  it('renders "No movies available" when list is empty', () => {
    render(<MovieList movies={[]} />);
    expect(screen.getByText(/no movies available/i)).toBeInTheDocument();
  });
});
