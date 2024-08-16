/* eslint-disable react/prop-types */
import { TextField, Button, Box } from "@mui/material";
const SearchBar = ({ city, setCity, onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(city);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 5,
      }}
    >
      <TextField
        label="Enter City"
        variant="outlined"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        sx={{ marginRight: 2 }}
      />
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Box>
  );
};

export default SearchBar;
