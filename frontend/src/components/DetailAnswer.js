import 'quill/dist/quill.snow.css';
import { AiFillCaretUp, AiFillCaretDown } from 'react-icons/ai';
import useAnswerStore from '../zustand/answerStore';

const DetailAnswer = ({ answer, id, state }) => {
  const { likeAnswer, dislikeAnswer } = useAnswerStore();
  return (
    <div className='card mb-4'>
      <div className='card-body'>
        <div className='d-flex gap-3  p-3'>
          <div className='d-flex flex-column gap-4'>
            <img
              className='hidden-mb'
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
              src={answer.User.Profile.profile_picture === null ? 'https://atmos.ucla.edu/wp-content/themes/aos-child-theme/images/generic-avatar.png' : 'http://localhost:3000/' + answer.User.Profile.profile_picture}
              alt=''
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                alignItems: 'center',
              }}
            >
              <AiFillCaretUp
                className='mb-3'
                style={{
                  cursor: 'pointer',
                }}
                size={30}
                onClick={() => likeAnswer(answer.id, id, state)}
              />
              <h4>{answer.like_count ? answer.like_count : 0}</h4>
              <AiFillCaretDown
                style={{
                  cursor: 'pointer',
                }}
                size={30}
                onClick={() => dislikeAnswer(answer.id, id, state)}
              />
            </div>
          </div>
          <div
            className='w-100'
            style={{
              overflowX: 'auto',
            }}
          >
            <div className='d-flex gap-2'>
              <div
                style={{
                  fontWeight: 'bold',
                  fontSize: '18px',
                }}
              >
                {answer.User.name}
              </div>
              <div
                style={{
                  fontSize: '14px',
                }}
              >
                {' '}
                {new Date(answer.createdAt).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
                  hour12: false,
                })}
              </div>
            </div>
            <div className='mt-4 text-start'>
              {/* <p className="text-start">{parse(answer.body)}</p> */}
              <div className='text-start' dangerouslySetInnerHTML={{ __html: answer.body }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailAnswer;
