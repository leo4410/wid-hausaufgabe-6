import { TextField, Typography } from "@mui/material";

function wgsresultComponent({ xcoordinate, ycoordinate }) {
  return (
    <>
      <Typography variant="h2">Resultat in WGS84</Typography>
      <TextField
        id="outlined-basic"
        label="X-Koordinate - Latitude"
        variant="outlined"
        value={xcoordinate}
        disabled
      />
      <TextField
        id="outlined-basic"
        label="Y-Koordinate - Longitude"
        variant="outlined"
        value={ycoordinate}
        disabled
      />
    </>
  );
}

export default wgsresultComponent;
