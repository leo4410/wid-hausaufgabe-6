import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
import WgsformComponent from "./WgsformComponent";
import WgsresultComponent from "../result/WgsresultComponent";
import LvformComponent from "./LvformComponent";
import LvresultComponent from "../result/LvresultComponent";

const SWISSTOPO_URL = "https://geodesy.geo.admin.ch/reframe/";

function MainformComponent() {
  const [transformation, setTransformation] = useState(1);
  const [result, setResult] = useState([]);
  const [error, setError] = useState("");
  const [east, setEast] = useState("");
  const [north, setNorth] = useState("");
  const [xcoord, setXcoord] = useState("");
  const [ycoord, setYcoord] = useState("");

  function onTransformationChange(value) {
    setTransformation(value);
    setResult([]);
    setError([]);
    setEast("");
    setNorth("");
    setYcoord("");
    setXcoord("");
  }

  async function fetchResult() {
    var query = SWISSTOPO_URL;

    if (transformation === 1) {
      query = query + "lv95towgs84?easting=" + east + "&northing=" + north;
    } else if (transformation === 2) {
      query = query + "wgs84tolv95?easting=" + ycoord + "&northing=" + xcoord;
    }

    var responsedata = await fetch(query);

    if (responsedata.status === 200) {
      var jsondata = await responsedata.json();
      setResult(jsondata.coordinates);
    } else {
      setError([responsedata.status]);
    }
  }

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="transformation-label">Transformation</InputLabel>
        <Select
          labelId="transformation-label"
          id="transformation-select"
          value={transformation}
          label="Age"
          onChange={(event) => {
            onTransformationChange(event.target.value);
          }}
        >
          <MenuItem value={1}>LV95 to WGS84</MenuItem>
          <MenuItem value={2}>WGS84 to LV95</MenuItem>
        </Select>
      </FormControl>

      {transformation === 1 && (
        <LvformComponent
          east={east}
          setEast={setEast}
          north={north}
          setNorth={setNorth}
        ></LvformComponent>
      )}
      {transformation === 2 && (
        <WgsformComponent
          xcoord={xcoord}
          setXcoord={setXcoord}
          ycoord={ycoord}
          setYcoord={setYcoord}
        ></WgsformComponent>
      )}

      <div>
        <Button
          variant="contained"
          disabled={
            (transformation === 1 && east !== "" && north !== "") ||
            (transformation === 2 && xcoord !== "" && ycoord !== "")
              ? false
              : true
          }
          onClick={() => {
            fetchResult();
          }}
        >
          Transformieren
        </Button>
      </div>

      {transformation === 2 && result.length > 0 && (
        <LvresultComponent
          easting={result[0]}
          northing={result[1]}
        ></LvresultComponent>
      )}

      {transformation === 1 && result.length > 0 && (
        <WgsresultComponent
          xcoordinate={result[1]}
          ycoordinate={result[0]}
        ></WgsresultComponent>
      )}

      {error.length > 0 && (
        <Alert variant="outlined" severity="error">
          Status Code {error} occured!.
        </Alert>
      )}
    </>
  );
}

export default MainformComponent;
