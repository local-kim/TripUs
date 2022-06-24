import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import axios from "axios";

const CityInfoMain = () => {

    //////////////////////////////// MUi 메뉴 탭
    const [value, setValue] = useState(1);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    ///////////////////////////////////////////

    // url
    let url

    const [data,setData]=useState([]);
    const [list,setList]=useState('');

    const infoList=()=>{
        axios.get(url)
        .then(res=>{
            setList(res.data);
        })
    }

    useEffect(()=>{
        infoList();
    },[])


    return (
        <div id='cityinfo'>
            {/* {
                list && list.map((item)=>{

                })
            } */}
            <Box  sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="관광명소" value="1" />
                            <Tab label="음식점" value="2" />
                            <Tab label="식 당" value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <Card sx={{ maxWidth: 220, maxHeight: 220 }}>
                            <CardActionArea>
                                <CardMedia
                                component="img"
                                height="150"
                                image="/static/images/cards/contemplative-reptile.jpg"
                                alt=""
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h7" component="div">
                                    Liz
                                </Typography>
                                <Typography variant="h7" color="red">
                                    Lizards 
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Clip
                                </Button>
                            </CardActions>
                        </Card>
                    </TabPanel>
                    <TabPanel value="2">음식점</TabPanel>
                    <TabPanel value="3">식 당</TabPanel>
                </TabContext>
            </Box>

        </div>

    );
};

export default CityInfoMain;