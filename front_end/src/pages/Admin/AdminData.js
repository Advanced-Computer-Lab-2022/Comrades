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
import DiscountIcon from '@mui/icons-material/Discount';

export const AdminData = [
    {
        id: 0,
        icon: <PersonAddIcon />,
        text: "Add User",
        link: "/nu",
        classes: "sideitem__admin"
    },
    {
        id: 1,
        icon: <ReportIcon />,
        text: "Reported Problems",
        link: "/adminViewProblems",
        classes: "sideitem__admin"
    },
    {
        id: 2,
        icon: <PaidIcon />,
        text: "Refunds",
        link: "/adminRefundUser",
        classes: "sideitem__admin"
    },
    {
        id: 3,
        icon: <MeetingRoomIcon />,
        text: "Corporate Trainees Access",
        link: "/nu",
        classes: "sideitem__admin"
    },
    {
        id: 4,
        icon: <DiscountIcon />,
        text: "Course Promotions",
        link: "/nu",
        classes: "sideitem__admin"
    },
]