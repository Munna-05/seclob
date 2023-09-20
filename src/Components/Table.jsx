import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from '@mui/icons-material/Add';

import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import {
  Button,
  Fab,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import MessageBox from "./MessageBox";
import EditFormPopUp from "./EditFormPopUp";

export default function Table() {
  const [data, setData] = React.useState();
  const [status, setStatus] = React.useState();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [EditOpen, setEditOpen] = React.useState(false);

  const handleClickOpenEdit = () => {
    setEditOpen(true);
  };

  const handleCloseEdit = () => {
    setEditOpen(false);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      headerClassName: "super-app-theme--header",
    },
    {
      headerName: "Basic Details",
      headerClassName: "super-app-theme--header",
      width: 150,
      renderCell: (params) => (
        <>
          <Grid textAlign={"left"}>
            <Typography variant="subtitle2">
              Name : {params.row.name}
            </Typography>
            <Typography variant="subtitle2">
              Company : {params.row.companyName}
            </Typography>
          </Grid>
        </>
      ),
    },
    {
      field: "Numbers",
      headerName: "Numbers",
      headerClassName: "super-app-theme--header",
      width: 200,

      renderCell: (params) => (
        <>
          <Grid textAlign={"left"}>
            <Typography variant="subtitle2">
              Mobile : {params.row.mobileNumber}
            </Typography>
            <Typography variant="subtitle2">
              Whatsapp : {params.row.whatsapp}
            </Typography>
          </Grid>
        </>
      ),
    },
    {
      field: "Services",
      headerName: "Services",
      headerClassName: "super-app-theme--header",
      width: 150,

      renderCell: (params) => (
        <>
          <Grid textAlign={"left"}>
            <Typography variant="subtitle2">{params.row.services}</Typography>
          </Grid>
        </>
      ),
    },
    {
      field: "Comments",
      headerName: "Comments",
      headerClassName: "super-app-theme--header",
      width: 150,

      renderCell: (params) => (
        <>
          <Grid textAlign={"left"}>
            <Typography variant="subtitle2">{params.row.comments}</Typography>
          </Grid>
        </>
      ),
    },
    {
      field: "Other Details",
      headerName: "Other Details",
      headerClassName: "super-app-theme--header",
      width: 250,

      renderCell: (params) => (
        <>
          <Grid textAlign={"left"}>
            <Typography variant="subtitle2">
              Amount : {params.row.otherDetails}
            </Typography>
            <Typography variant="subtitle2">
              Created At : {moment(params.row.createdAt).format("lll")}
            </Typography>
          </Grid>
        </>
      ),
    },
    {
      field: " Status",
      headerName: "Status",
      headerClassName: "super-app-theme--header",
      width: 250,

      renderCell: (params) => (
        <>
          <select
            style={{ height: "100%", width: "100%" }}
            value={params.row.status}
            onChange={(e) => handleStatus(e, params.row._id)}
          >
            <option value={params.row.status}>{params.row.status}</option>
            <option value="follow">follow</option>
          </select>
        </>
      ),
    },
    {
      field: " actions",
      headerName: "Actions",
      headerClassName: "super-app-theme--header",
      width: 250,

      renderCell: (params) => (
        <>
          <Grid display={"flex"} gap={2}>
            <Button
              variant="contained"
              onClick={handleClickOpenEdit}
              color="warning"
            >
              Edit
            </Button>
            {params.row.status !== "new" ? (
              <Button variant="contained" color="info">
                Follow Up
              </Button>
            ) : null}
          </Grid>
        </>
      ),
    },
  ];

  React.useEffect(() => {
    axios.get(`http://localhost:5000/getAll`).then((res) => {
      setData(res?.data?.allUser);
    });
  }, []);

  const row = data?.map((res, i) => {
    return {
      ...res,
      id: i + 1,
    };
  });

  console.log(row);

  const handleStatus = (e, id) => {
    console.log(e.target.value, id);
    setStatus(e.target.value);
    handleClickOpen();
  };

  return (
    <Grid
      sx={{
        height: 400,
        padding: 5,
        width: "100%",

        width: "100%",
        "& .super-app-theme--header": {
          backgroundColor: "#215e1a",
          color: "white",
        },
      }}
    >
      <Grid padding={5} gap={2} container>
        <TextField placeholder="Search"></TextField>
        <TextField type="date"></TextField>

        <Select
          sx={{ width: 200 }}
          // value={age}
          label="Status"
          // onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>

        <Select
          sx={{ width: 200 }}
          // value={age}
          placeholder="limit"
          // onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>

        <Button variant="contained" color="primary">
          Search
        </Button>
      </Grid>

      <Grid>
        {row ? (
          <DataGrid
            rows={row}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        ) : null}
      </Grid>
      <Grid padding={3} display={"flex"} justifyContent={"end"}>
        <Fab color="success" aria-label="add">
          <AddIcon />
        </Fab>{" "}
      </Grid>

      <MessageBox open={open} handleClose={handleClose} />
      <EditFormPopUp open={EditOpen} handleClose={handleCloseEdit} />
    </Grid>
  );
}
