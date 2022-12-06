import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

export const navData = [
{
id: 0,
icon: <HomeIcon/>,
text: "Home",
link: "/"
},
{
id: 1,
icon: <AdminPanelSettingsIcon/>,
text: "Admin",
link: "/admin"
},
{
id: 2,
icon: <SupervisorAccountIcon/>,
text: "Instructor",
link: "/inst"
},
{
id: 3,
icon: <PermIdentityIcon/>,
text: "User",
link: "/user"
}
]