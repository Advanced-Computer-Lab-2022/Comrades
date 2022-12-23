import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ReportIcon from '@mui/icons-material/Report';
import PaidIcon from '@mui/icons-material/Paid';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import DiscountIcon from '@mui/icons-material/Discount';

export const CTData = [
    {
        id: 0,
        icon: <HomeIcon />,
        text: "Home",
        link: "/cthome",
        classes: "sideitem__admin"
    },
    {
        id: 1,
        icon: <MeetingRoomIcon />,
        text: "Request Course Access",
        link: "/ctrequestcourse",
        classes: "sideitem__admin"
    },
    {
        id: 2,
        icon: <ImportContactsIcon />,
        text: "My Courses",
        link: "/CTMyCourses",
        classes: "sideitem__admin"
    },
    {
        id: 3,
        icon: <SettingsIcon />,
        text: "Settings",
        link: "/cthome",
        classes: "sideitem__admin"
    },




]