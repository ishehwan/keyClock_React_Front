import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Paper';
import { Button } from '@mui/material';
import { api } from '../apis/apiClient';

export default function Dashboard() {

    const handleClick = async () => {
        try {
        const response = await api.get('/test'); // 예시용 GET 요청
        console.log('응답 데이터:', response.data);
        } catch (error) {
        console.error('요청 실패:', error);
        }
    };
    return (
        <Grid container spacing={2}>
            <Grid size={12}>
                <Typography variant="h4">Dashboard</Typography>
            </Grid>
            <Grid size={12}>
                <Button onClick={()=>{handleClick()}}>서버요청</Button>
            </Grid>
            <Grid size={4}>
                <Item>size=4</Item>
            </Grid>
            <Grid size={8}>
                <Item>size=8</Item>
            </Grid>

        </Grid>
    );
}