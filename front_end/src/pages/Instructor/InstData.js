import HomeIcon from '@mui/icons-material/Home';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import AssignmentSharpIcon from '@mui/icons-material/AssignmentSharp';
import GavelSharpIcon from '@mui/icons-material/GavelSharp';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import DiscountIcon from '@mui/icons-material/Discount';


export const InstData = [
    {
        id: 0,
        icon: <HomeIcon />,
        text: "Home",
        link: "/inst"
    },
    {
        id: 1,
        icon: <AssignmentSharpIcon />,
        text: "My Courses",
        link: "/gci"
    },
    {
        id: 2,
        icon: <AddSharpIcon />,
        text: "Add Course",
        link: "/nc"
    },
    {
        id: 3,
        icon: <ReportProblemIcon />,
        text: "Reported Problems",
        link: "/instreport",
        classes: "sideitem__admin"
    },
    {
        id: 3,
        icon: <DiscountIcon />,
        text: "Define Promotion",
        link: "/instpromo",
        classes: "sideitem__admin"
    },




]