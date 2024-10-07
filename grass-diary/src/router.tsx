import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from '@components/index';
import Layout from '@components/Layout/Layout';
import {
  Intro,
  Main,
  CreateDiary,
  EditDiary,
  DiaryDetail,
  Share,
  Setting,
  MyPage,
  ErrorPage,
  RewardPage,
  ThemeStorePage,
  ThemeSettingPage,
} from '@pages/index';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Intro /> },
      { path: '/main', element: <Main /> },
      { path: '/share', element: <Share /> },
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [
      { path: '/creatediary', element: <CreateDiary /> },
      { path: '/editdiary/:diaryId', element: <EditDiary /> },
      { path: '/diary/:diaryId', element: <DiaryDetail /> },
      { path: '/setting', element: <Setting /> },
      { path: '/mypage', element: <MyPage /> },
      { path: '/errorpage', element: <ErrorPage /> },
      { path: '/rewardpage', element: <RewardPage /> },
      { path: '/themepage', element: <ThemeStorePage /> },
      { path: '/themesetting', element: <ThemeSettingPage /> },
    ],
  },
]);

export default router;
