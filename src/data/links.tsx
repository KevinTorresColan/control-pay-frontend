import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SchoolIcon from "@mui/icons-material/School";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PaymentsIcon from "@mui/icons-material/Payments";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import BadgeIcon from "@mui/icons-material/Badge";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import {
  roleRoutes,
  studentsRoutes,
  userRoutes,
  documentTypeRoutes,
  headquarterRoutes,
  bankRoutes,
  paymentTypeRoutes,
  paymentoutes,
} from "@/routes";

export const links = [
  {
    text: "Usuarios",
    icon: <AccountBoxIcon />,
    path: userRoutes.get,
  },
  {
    text: "Roles",
    icon: <ManageAccountsIcon />,
    path: roleRoutes.get,
  },
  {
    text: "Alumnos",
    icon: <SchoolIcon />,
    path: studentsRoutes.get,
  },
  {
    text: "Pagos",
    icon: <PointOfSaleIcon />,
    path: paymentoutes.get,
  },
  {
    text: "Tipo de pago",
    icon: <PaymentsIcon />,
    path: paymentTypeRoutes.get,
  },
  {
    text: "Cuentas bancarias",
    icon: <AccountBalanceIcon />,
    path: bankRoutes.get,
  },
  {
    text: "Sedes",
    icon: <HomeWorkIcon />,
    path: headquarterRoutes.get,
  },
  {
    text: "Tipo de documentos",
    icon: <BadgeIcon />,
    path: documentTypeRoutes.get,
  },
];
