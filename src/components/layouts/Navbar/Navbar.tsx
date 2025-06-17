'use client';

import { Box, Typography, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Logout } from '@mui/icons-material';

import { useRef } from 'react';
import ToggleTheme from '../../theme/ToggleTheme';
import Link from 'next/link';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation';
import FilterPopper from '@/components/Buttons/FilterButton/FilterPopper';
import { useFilterContext } from '@/context/FilterContext/FilterContext';
import { logout } from '@/app/auth/actions';

// const Navbar = () => {
//   return (
//     <Box className="flex flex-row justify-between bg-[#CA3E47] px-16 py-4 items-center">
//       <Link href="/">
//         <Typography
//           variant="h4"
//           className="font-bold sm:text-[2vw] md:text-[3vw] text-[4vw]"
//         >
//           Movie List
//         </Typography>
//       </Link>
//       <Box className="flex flex-row justify-between gap-3">
//         <IconButton>
//           <FilterListIcon className="text-white" />
//         </IconButton>
//         <Link href="/watchlist">
//           <IconButton>
//             <FavoriteBorderIcon className="text-white" />
//           </IconButton>
//         </Link>
//         <ToggleTheme />
//       </Box>
//     </Box>

//   );
// };

// export default Navbar;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar() {
  const { setSelectedGenres } = useFilterContext();
  const searchRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && searchRef.current?.value === '') {
      router.push('/');
    } else if (event.key === 'Enter' || event.type === 'click') {
      event.preventDefault();
      router.push(`/search/${searchRef.current?.value}`);
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ py: 1, bgcolor: 'background.paper' }}>
        <Toolbar>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'block', fontWeight: 'bold' },
            }}
          >
            <Link href="/" onClick={() => setSelectedGenres([])}>
              Filminisme
            </Link>
          </Typography>
          <Box className="flex flex-row justify-between gap-3">
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Cari Film..."
                inputProps={{
                  'aria-label': 'search',
                  'data-cy': 'search-input',
                }}
                inputRef={searchRef}
                onKeyDown={handleSearch}
              />
            </Search>
            <FilterPopper />
            <Link href="/watchlist">
              <IconButton>
                <FavoriteBorderIcon className="text-white" />
              </IconButton>
            </Link>
            <ToggleTheme />
            <IconButton onClick={() => logout()}>
              <Logout sx={{ color: 'white' }}></Logout>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
