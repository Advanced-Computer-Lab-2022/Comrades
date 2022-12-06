import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AssignmentSharpIcon from '@mui/icons-material/AssignmentSharp';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import PasswordIcon from '@mui/icons-material/Password';




export const UserData = [
{
id: 0,
icon: <HomeIcon/>,
text: "Home",
link: "/"
},
{
id: 1,
icon: <AssignmentSharpIcon/>,
text: "My Courses",
link: "/uc"
},
{
    id: 2,
    icon: <DensitySmallIcon/>,
    text: "Show Courses",
    link: "/gc"
    },
    {
     id: 3,
        icon: <PasswordIcon/>,
        text: "Change Password",
        link: "/cp"
        },

]