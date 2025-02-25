import FilterListIcon from '@mui/icons-material/FilterList';
import React, { useEffect } from 'react';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import { FormControlLabel, IconButton, Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFilterContext } from '@/context/FilterContext/FilterContext';
import { supabase } from '@/db/supabaseClient';

const Filters = () => {
  const [genres, setGenres] = useState<string[]>([]);

  const { selectedGenres, setSelectedGenres } = useFilterContext();

  useEffect(() => {
    const fetchDataFilter = async () => {
      try {
        const { data: genres } = await supabase.from('genre').select('name');

        setGenres(genres!.map((genre) => genre.name));
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchDataFilter();
  }, []);

  const handleCheckboxChange = (genre: string) => {
    if (selectedGenres.includes(genre))
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    else setSelectedGenres([...selectedGenres, genre]);
  };

  const router = useRouter();
  const handleFilter = () => {
    const query = selectedGenres.map((genre) => genre).join('|');
    if (selectedGenres.length > 0) {
      router.push(`/filter/${query}`);
    } else {
      router.push('/');
    }
  };

  return (
    <FormControl component="fieldset">
      Genres
      <FormGroup aria-label="position">
        {genres.map((genre) => (
          <FormControlLabel
            key={genre}
            value={genre}
            control={
              <Checkbox
                color="default"
                checked={selectedGenres.includes(genre)}
                onChange={() => handleCheckboxChange(genre)}
              />
            }
            label={genre}
            labelPlacement="end"
          />
        ))}
        <Button
          variant="contained"
          onClick={() => handleFilter()}
          sx={{ bgcolor: 'white', color: 'background.paper' }}
        >
          Filter
        </Button>
      </FormGroup>
    </FormControl>
  );
};

const FilterPopper = () => {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  return (
    <div>
      <IconButton aria-describedby={id} type="button" onClick={handleClick}>
        <FilterListIcon className="text-white" />
      </IconButton>
      <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box
              sx={{
                border: 2,
                p: 1,
                bgcolor: 'background.paper',
                borderRadius: '5px',
                width: '300px',
                margin: 2,
              }}
            >
              <Filters />
            </Box>
          </Fade>
        )}
      </Popper>
    </div>
  );
};

export default FilterPopper;
