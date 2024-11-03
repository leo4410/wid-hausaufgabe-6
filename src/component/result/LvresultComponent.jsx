import { TextField, Typography } from "@mui/material";

function LvresultComponent({ easting, northing }) {
  return (
    <>
      <Typography variant="h2">Resultat in LV95</Typography>
      <TextField
        id="outlined-basic"
        label="Ost-Koordinate"
        variant="outlined"
        value={easting}
        disabled
      />
      <TextField
        id="outlined-basic"
        label="Nord-Koordinate"
        variant="outlined"
        value={northing}
        disabled
      />
    </>
  );
}

export default LvresultComponent;
