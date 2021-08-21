import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Alert from '@material-ui/lab/Alert';


class Banner extends React.Component {

    render() {
        return (
            <Container maxWidth="xs">
                <Grid container direction={'row'} spacing={1}>
                    <Grid item xs={12}>
                        <Alert severity="error">Connection not yet established!</Alert>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default Banner;
