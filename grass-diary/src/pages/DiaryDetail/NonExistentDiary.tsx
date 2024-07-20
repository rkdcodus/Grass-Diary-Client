import stylex from '@stylexjs/stylex';
import { Header, BackButton, Container } from '@components/index';
import { ERROR } from '@constants/message';

const styles = stylex.create({
  wrap: {
    width: '100vw',
    padding: '80px 160px',
  },
  content: {
    marginTop: '150px',
    textAlign: 'center',
    fontSize: '28px',
    fontWeight: '600',
  },
});

const NonExistentDiary = () => {
  return (
    <Container>
      <Header />

      <div {...stylex.props(styles.wrap)}>
        <BackButton goBackTo={'/main'} />
        <div {...stylex.props(styles.content)}>
          <p>{ERROR.DIARY_NOT_FOUND_ERR}</p>
        </div>
      </div>
    </Container>
  );
};

export default NonExistentDiary;
