import { render, screen, waitFor } from '@testing-library/react';
import MovieCast from '../Actors/MovieCast';
import '@testing-library/jest-dom';

// Mock Supabase dengan implementasi yang sesuai dengan komponen async
jest.mock('@/db/supabaseClient', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        in: jest.fn(() => 
          Promise.resolve({
            data: [{ name: 'Actor One' }, { name: 'Actor Two' }],
            error: null,
          })
        ),
      })),
    })),
  },
}));

// Mock MUI Typography untuk menyederhanakan testing
jest.mock('@mui/material', () => ({
  Typography: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

describe('MovieCast component', () => {
  it('renders cast names correctly', async () => {
    // Karena komponen async, kita perlu render dalam async wrapper
    const AsyncWrapper = async () => {
      return await MovieCast({ castId: [1, 2] });
    };

    const result = await AsyncWrapper();
    
    // Render hasil dari async component
    render(result);

    // Verifikasi output
    expect(screen.getByText(/Cast:/)).toBeInTheDocument();
    expect(screen.getByText(/Actor One, Actor Two/)).toBeInTheDocument();
  });

  it('handles empty cast array', async () => {
    // Mock untuk array kosong
    const mockSupabase = require('@/db/supabaseClient');
    mockSupabase.supabase.from.mockReturnValue({
      select: jest.fn(() => ({
        in: jest.fn(() => 
          Promise.resolve({
            data: [],
            error: null,
          })
        ),
      })),
    });

    const AsyncWrapper = async () => {
      return await MovieCast({ castId: [] });
    };

    const result = await AsyncWrapper();
    render(result);

    expect(screen.getByText(/Cast:/)).toBeInTheDocument();
    expect(screen.getByText('Cast:')).toBeInTheDocument();
  });

  it('handles supabase error', async () => {
    // Mock error case
    const mockSupabase = require('@/db/supabaseClient');
    mockSupabase.supabase.from.mockReturnValue({
      select: jest.fn(() => ({
        in: jest.fn(() => 
          Promise.resolve({
            data: null,
            error: { message: 'Database error' },
          })
        ),
      })),
    });

    const AsyncWrapper = async () => {
      try {
        return await MovieCast({ castId: [1, 2] });
      } catch (error) {
        throw error;
      }
    };

    await expect(AsyncWrapper()).rejects.toMatchObject({
      message: 'Database error'
    });
  });
});