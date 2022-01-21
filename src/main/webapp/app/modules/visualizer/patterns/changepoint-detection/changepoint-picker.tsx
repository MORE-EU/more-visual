import React, {Dispatch, SetStateAction, useState} from 'react';
import {IDataset} from "app/shared/model/dataset.model";
import {
  Button,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { DateObject, Calendar} from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import ModalStyles from "app/shared/layout/ModalStyle";


export interface IChaingepointPickerProps {
  from: Date,
  to: Date,
  selectedDates: any[],
  setSelectedDates: Dispatch<SetStateAction<any[]>>,

}


export const ChaingepointPicker = (props: IChaingepointPickerProps) => {
  const {from, to, selectedDates, setSelectedDates} = props;
  const [windowSize, setWindowSize] = useState(10);

  return (
    <Grid container>

      <Grid item xs={4}>
        <Typography variant="h6" gutterBottom>
          Choose Dates
        </Typography>
      </Grid>
      <Grid item container xs={12}>
        <Grid item xs ={6}>

          <Calendar
            multiple

            value={selectedDates}
            onChange={e => setSelectedDates(e as DateObject[])}
            plugins={[
              <DatePanel sort="date" key={0}/>
            ]}/>
        </Grid>
        <Grid
          item xs ={3}
          container
          style={{ border: "1px solid grey" ,boxShadow: "0 0 5px #8798ad", borderRadius:5, borderColor: "#8798ad"}}
        >
          <div style={{textAlign: "center"}}>
            <p >
              Date Parameters
            </p>
            <div>
              <TextField
                style = {{width: "60%"}}
                value = {windowSize}
                label={"Window"}
                onChange={val => setWindowSize(parseInt(val.target.value, 10))}
                type="number"
              />
            </div>
          </div>

        </Grid>
      </Grid>
    </Grid>
    );

}

export default ChaingepointPicker;
