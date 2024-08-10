type PostRequest = {
  memberId: Id;
  diaryId: Id;
  content: string;
  parentCommentId: Id | null;
};

type PatchRequestDto = {
  commentId: Id;
  request: {
    content: string;
  };
};

type CommentResponse = {
  commentId: Id;
  memberId: Id;
  content: string;
  deleted: boolean;
  createdDate: string;
  createdAt: string;
  childcomments: CommentResponse[];
};

type CommentsProps = {
  memberId: Id;
  diaryId: Id;
  setCommentCount: React.Dispatch<React.SetStateAction<number>>;
};

type CommentSettingProps = {
  diaryId: Id;
  commentId: Id;
  setEditingId: React.Dispatch<React.SetStateAction<number>>;
};
