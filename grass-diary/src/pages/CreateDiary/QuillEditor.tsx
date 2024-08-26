import { useState, useEffect, useMemo } from 'react';
import API from '@services/index';
import { END_POINT } from '@constants/api';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CONSOLE_ERROR } from '@constants/message';

type QuillEditorProps = {
  onContentChange: (content: string) => void;
  handleImageChange: (file: File) => void;
  quillContent: string;
  setImage: React.Dispatch<React.SetStateAction<DiaryImage>>;
  setFile: React.Dispatch<React.SetStateAction<FormData | undefined>>;
};

type QuestionResponse = {
  question: string;
};

const QuillEditor = ({
  onContentChange,
  quillContent,
  setImage,
  setFile,
  handleImageChange,
}: QuillEditorProps) => {
  const handleChange = (
    content: string,
    delta: any,
    source: any,
    editor: any,
  ) => {
    onContentChange(editor.getHTML());
  };

  const [todayQuestion, setTodayQuestion] = useState<string>();

  const ImageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click(); // image icon 누르면 실행

    input.onchange = () => {
      const file = input.files ? input.files[0] : null;

      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        setFile(formData);

        handleImageChange(file);

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setImage({
            imageId: 0,
            imageURL: reader.result as string,
          });
        };
      }
    };
  };

  useEffect(() => {
    API.get<QuestionResponse>(END_POINT.today_question)
      .then(response => {
        setTodayQuestion(response.data.question);
      })
      .catch(error => {
        console.error(CONSOLE_ERROR.question.get + error);
      });
  }, []);

  const toolbarOptions = [
    ['image'],
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
  ];

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'align',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'background',
    'color',
    'image',
    'width',
  ];

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: toolbarOptions,
        handlers: {
          image: ImageHandler,
        },
      },
    };
  }, []);

  return (
    <>
      <ReactQuill
        theme="snow"
        placeholder={todayQuestion ? todayQuestion : 'todayQuestion Loading...'}
        modules={modules}
        formats={formats}
        onChange={handleChange}
        value={quillContent}
        style={{ height: '70vh' }}
      />
    </>
  );
};

export default QuillEditor;
