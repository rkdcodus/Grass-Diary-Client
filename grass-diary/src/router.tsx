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
      { path: '/creatediary', element: <CreateDiary /> },
      { path: '/editdiary/:diaryId', element: <EditDiary /> },
      { path: '/diary/:diaryId', element: <DiaryDetail /> },
      { path: '/setting', element: <Setting /> },
      { path: '/mypage', element: <MyPage /> },
      { path: '/errorpage', element: <ErrorPage /> },
      { path: '/rewardpage', element: <RewardPage /> },
    ],
    errorElement: <NotFoundPage />,
  },
]);

export default router;
