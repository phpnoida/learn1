import { Paper, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Form, Formik } from "formik";
const MemberContainer = () => {
  return (
    <Formik>
      <Form>
        <Grid container spacing={2}>
          <Grid md={8} container columnSpacing={1}>
            <Grid md={6}>
              <TextField variant="outlined" label="Name" fullWidth />
            </Grid>
            <Grid md={6}>
              <TextField variant="outlined" label="Email" fullWidth />
            </Grid>
          </Grid>

          <Grid md={4} container>
            <Grid md={4}>
              <TextField variant="outlined" label="Name" fullWidth />
            </Grid>
            <Grid md={4}>
              <TextField variant="outlined" label="Name" fullWidth />
            </Grid>
            <Grid md={4}>
              <TextField variant="outlined" label="Name" fullWidth />
            </Grid>
            <Grid md={12}>
              <TextField variant="outlined" label="Name" fullWidth />
            </Grid>
          </Grid>
          <Grid item md={12} container>
            <Grid md={8}>
              <TextField variant="outlined" label="Name" fullWidth />
            </Grid>
            <Grid md={4}>
              <TextField variant="outlined" label="Name" fullWidth />
            </Grid>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
};

export default MemberContainer;
