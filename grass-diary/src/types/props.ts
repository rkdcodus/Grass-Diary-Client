//Button component
interface IBackButtonProps {
  goBackTo?: string;
}

// Feed component
interface IFeedProps {
  likeCount: number;
  link: string;
  createdAt: string;
  content: string;
  name: string;
  memberId: Id;
}

// Like component
interface ILikeProps {
  diaryId: Id;
  likeCount: number;
  setLikeCount: React.Dispatch<React.SetStateAction<number>>;
  liked: boolean | undefined;
}

interface INormalLikeProps {
  likeCount: number;
  justifyContent: string;
}

//Ellipsis component
interface IBoxProps {
  onClick: () => void;
  text: string;
}

interface IIconProps {
  children: React.ReactNode;
  width: string;
  translateValue: string;
}

// Header component
interface IMenuBarProps {
  toggle: boolean;
  headerRef: React.RefObject<HTMLDivElement>;
}

interface IHeader {
  position?: string;
  margin?: string;
}
