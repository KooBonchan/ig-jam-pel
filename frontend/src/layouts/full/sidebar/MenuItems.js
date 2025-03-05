
import { uniqueId } from 'lodash';

import {
  IconCopy, IconLayoutDashboard, IconMoodHappy, IconTypography,
  IconAward,
  IconBoxMultiple,
  IconPoint,
  IconAlertCircle,
  IconNotes,
  IconCalendar,
  IconMail,
  IconTicket,
  IconEdit,
  IconCurrencyDollar,
  IconApps,
  IconFileDescription,
  IconFileDots,
  IconFiles,
  IconBan,
  IconStar,
  IconMoodSmile,
  IconBorderAll,
  IconBorderHorizontal,
  IconBorderInner,
  IconBorderVertical,
  IconBorderTop,
  IconUserCircle,
  IconPackage,
  IconMessage2,
  IconBasket,
  IconChartLine,
  IconChartArcs,
  IconChartCandle,
  IconChartArea,
  IconChartDots,
  IconChartDonut3,
  IconChartRadar,
  IconLogin,
  IconUserPlus,
  IconRotate,
  IconBox,
  IconShoppingCart,
  IconAperture,
  IconLayout,
  IconSettings,
  IconHelp,
  IconZoomCode,
  IconBoxAlignBottom,
  IconBoxAlignLeft,
  IconBorderStyle2,
  IconAppWindow,
  IconNotebook,
  IconFileCheck,
  IconChartHistogram,
  IconChartPie2,
  IconChartScatter,
  IconChartPpf,
  IconChartArcs3,
  IconListTree,
} from '@tabler/icons-react';


const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },

  
  {
    id: uniqueId(),
    title: 'eCommerce',
    icon: IconShoppingCart,
    href: 'https://modernize-react.adminmart.com/dashboards/ecommerce',
    chip: 'Pro',
  },
  {
    id: uniqueId(),
    title: 'Front',
    icon: IconAppWindow,
    href: 'https://modernize-react.adminmart.com/frontend-pages/',
    chip: 'Pro',
    children: [
      {
        id: uniqueId(),
        title: 'Homepage',
        icon: IconPoint,
        href: 'https://modernize-react.adminmart.com/frontend-pages/homepage',
        chip: 'Pro',
      },
    ],
  },
];

export default Menuitems;
