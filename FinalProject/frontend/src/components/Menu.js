import * as React from 'react';
import '../AppHeemin.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;


// import { NavLink } from 'react-router-dom';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Divider from '@mui/material/Divider';
// import Drawer from '@mui/material/Drawer';
// import IconButton from '@mui/material/IconButton';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import MenuIcon from '@mui/icons-material/Menu';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';




//     interface Props {
//         /**
//          * Injected by the documentation to work in an iframe.
//          * You won't need it on your project.
//          */
//         window?: () => Window;
//       }
      
//       const drawerWidth = 1348;
//       const navItems = [ <div style={{margin:'auto'}}>

//                             <NavLink to='/'>Home</NavLink>
//                             <NavLink to ='/memo'>Memo</NavLink>
//                             <NavLink to='/member/form'>Member</NavLink>
//                             <NavLink to='/shop/list'>Shop</NavLink>
//                             <NavLink to='/board/list/1'>Board</NavLink>
//                             <NavLink to='/about'>about</NavLink>
//                             <NavLink to='/login'>Login</NavLink>
                          
//                         </div> 

//                             ];
    

      
//       export default function DrawerAppBar(props: Props) {
//         const { window } = props;
//         const [mobileOpen, setMobileOpen] = React.useState(false);
      
//         const handleDrawerToggle = () => {
//           setMobileOpen(!mobileOpen);
//         };
      
//         const drawer = (
//           <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
//             <Typography variant="h6" sx={{ my: 2 }}>
//               MUI
//             </Typography>
//             <Divider />
//             <List className='menu'>
//               {navItems.map((item) => (
//                 <ListItem key={item} disablePadding>
//                   <ListItemButton sx={{ textAlign: 'center' }}>
//                     <ListItemText primary={item} />
//                   </ListItemButton>
//                 </ListItem>
//               ))}
//             </List>
//           </Box>
//         );
      
//         const container = window !== undefined ? () => window().document.body : undefined;
      
//         return (
//           <Box sx={{ display: 'flex'}}>
//             <AppBar component="nav" >
//               <Toolbar>
//                 <IconButton
//                   color="inherit"
//                   aria-label="open drawer"
//                   edge="start"
//                   onClick={handleDrawerToggle}
//                   sx={{ mr: 2, display: { sm: 'none' } }}
//                 >
//                   <MenuIcon />
//                 </IconButton>
//                 <Typography style={{fontSize:'20px'} }
//                   variant="h6"
//                   component="div"
//                   sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
//                   Trip Us
//                 </Typography>
//                 <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
//                   {navItems.map((item) => (
//                     <Button key={item} sx={{ color: '#fff' }}>
//                       {item}
//                     </Button>
//                   ))}
//                 </Box>
//               </Toolbar>
//             </AppBar>
//             <Box component="nav">
//               <Drawer
//                 container={container}
//                 variant="temporary"
//                 open={mobileOpen}
//                 onClose={handleDrawerToggle}
//                 ModalProps={{
//                   keepMounted: true, // Better open performance on mobile.
//                 }}
//                 sx={{
//                   display: { xs: 'block', sm: 'none' },
//                   '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
//                 }}
//               >
//                 {drawer}
//               </Drawer>
//             </Box>
//             <Box component="main" sx={{ p: 3 }}>
//               <Toolbar />
//               <Typography>
                
            
//               </Typography>
//             </Box>
//           </Box>
//         );
//       }


    