import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import { useAppSelector } from "../../redux/hooks";

export default function ProgressMain() {
    
    const { openYn, location, message } = useAppSelector((state)=> state.progressReducer);
    return (
        <Backdrop
            sx={(theme)=> (
                {   color : '#fff', 
                    zIndex :  location === 'global' 
                        ? theme.zIndex.drawer + 1
                        : theme.zIndex.modal + 1
                })} 
            open={openYn}>
            <Box 
                display="flex"
                justifyContent="center" 
                flexDirection="column" 
                alignItems="center">
                <CircularProgress color="inherit"/>
                { message && 
                    <Typography variant="h6" sx={{ mt : 2}}>
                        {message}
                    </Typography>
                }
            </Box>    
            
        </Backdrop>
    )
}