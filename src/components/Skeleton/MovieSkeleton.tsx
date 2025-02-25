import { Grid2, Skeleton } from "@mui/material";

const MovieSkeleton = () => {
  return (
    <Grid2 container spacing={5} className="pt-10 pl-8 pr-12">
      {[...Array(4)].map((_, index) => (
        <Grid2 size={{ xs: 6, md: 3 }} key={index}>
          <Skeleton
            variant="rounded"
            animation="wave"
            height={200}
            width={150}
            sx={{ bgcolor: "grey.300" }}
          />
          <Skeleton height={50} sx={{ bgcolor: "grey.300" }} className="mt-2" />
        </Grid2>
      ))}
    </Grid2>
  );
};

export default MovieSkeleton;
