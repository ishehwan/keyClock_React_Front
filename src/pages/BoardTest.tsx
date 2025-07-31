import React from 'react';

import { 
    Button,
    Box,
    Container, 
    Paper,
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Typography } from "@mui/material";

import { api } from "../apis/apiClient";
import type { AxiosResponse } from 'axios';
import { useAppDispatch } from '../redux/hooks';
import { onOpenDialog } from '../redux/features/dialogSlice';
import { onCloseProgress, onOpenProgress } from '../redux/features/progressSlice';

type Board = {
    id : string,
    title : string,
    content : string,
    createdBy : string,
    createdAt : Date,
    modifiedBy : string,
    modifiedAt : Date
}

export default function BoardTest() {
    const [ columns, setColumns ] = React.useState<string[]>([]);
    const [ boardList, setBoardList] = React.useState<Board[]>([]);
    const dispatch = useAppDispatch();

    React.useEffect(()=> {
        initGetBoardList()
    },[])

    const initGetBoardList = async()=> {
        dispatch(onOpenProgress({ location : 'global', message : 'Now Loading...'}))
        try {
            // set Timeout for Test 
            await new Promise(resolve=> setTimeout(resolve, 1000))
            
            const response : AxiosResponse<Board[]>  = await api.get('/board/selectBoardList');
            const data = response.data;
            if(data.length > 0) {
                setColumns(()=> { 
                    const sortKey = ["id", "title", "content"];
                    const allKeys = Object.keys(data[0] || {});
                    const remineKey = allKeys.filter(item => !sortKey.includes(item))
                    remineKey.sort();
                    const aKeys = [...sortKey, ...remineKey];
                    return aKeys;
                })
            }
            if (data.length > 0) setBoardList(data);
            dispatch(onCloseProgress())
        } catch(error) {
            console.log(error)
        }
    }

    const onClickTable = (board : Board)=> {
        dispatch(onOpenDialog({ title : "Detail", content : "BoardTestDetail", data : [board]}))
    }

    const onClickNewButton = ()=> {
        dispatch(onOpenDialog({ title : "Create New Post", content : "BoardTestCreate", data : []}))
    }

    return (
            <Container maxWidth="lg">
      <Box sx={{ mt: 2, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
         Board Test
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Board Test 페이지입니다.
        </Typography>
                <Button variant='contained' onClick={onClickNewButton}>
            <Typography>
                New
            </Typography>
        </Button>
      </Box>
      
      <Paper sx={{ p: 3 }}>
        <TableContainer component={Paper} sx={{ overflowX : 'auto'}}>
            <Table sx={{ minWidth : 650}}>
                <TableHead>
                    <TableRow>
                        { columns.length > 0 &&
                            columns.map((column)=> {
                                return <TableCell key={column} align='center'>
                                            <Typography fontWeight="Bold">
                                                {column}
                                            </Typography>
                                        </TableCell>
                            })
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    { boardList.length > 0 && 
                        boardList.map((board)=> (
                            <TableRow key={board.id} hover onClick={()=> onClickTable(board)}>
                                <TableCell align='center'>{board.id}</TableCell>
                                <TableCell align='center'>{board.title}</TableCell>
                                <TableCell align='center'>{board.content}</TableCell>
                                <TableCell align='center'>{board.createdAt.toLocaleString()}</TableCell>
                                <TableCell align='center'>{board.createdBy}</TableCell>
                                <TableCell align='center'>{board.modifiedAt.toLocaleString()}</TableCell>
                                <TableCell align='center'>{board.modifiedBy}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
      </Paper>
    </Container>
        
    )
}