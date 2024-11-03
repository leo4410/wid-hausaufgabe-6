import { TextField } from "@mui/material";

function LvformComponent({ east, setEast, north, setNorth }) {
  function onEastChange(value) {
    setEast(value);
  }

  function onNorthChange(value) {
    setNorth(value);
  }

  return (
    <>
      <TextField
        id="outlined-basic"
        label="Ost-Koordinate"
        variant="outlined"
        value={east}
        onChange={(event) => onEastChange(event.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Nord-Koordinate"
        variant="outlined"
        onChange={(event) => onNorthChange(event.target.value)}
      />
    </>
  );
}

export default LvformComponent;
