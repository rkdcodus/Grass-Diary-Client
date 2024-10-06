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
  RewardPage,
  ErrorPage,
  NotFoundPage,
} from '@pages/index';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Intro /> },
      { path: '/main', element: <Main /> },
      { path: '/share', element: <Share /> },
    ],
    errorElement: <NotFoundPage />,
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/creatediary',
        element: <CreateDiary />,
        errorElement: <NotFoundPage />,
      },
      { path: '/editdiary/:diaryId', element: <EditDiary /> },
      { path: '/diary/:diaryId', element: <DiaryDetail /> },
      {
        path: '/setting',
        element: <Setting />,
        errorElement: <NotFoundPage />,
      },
      { path: '/mypage', element: <MyPage />, errorElement: <NotFoundPage /> },
      {
        path: '/errorpage',
        element: <ErrorPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: '/rewardpage',
        element: <RewardPage />,
        errorElement: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
