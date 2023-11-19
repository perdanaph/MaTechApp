import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../zustand/authStore';

const AddQuestion = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState([]);
  const { isLogin } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));

    if (user && isLogin) {
      const question = {
        tags: selected,
        title,
        body,
        user_id: user.data.user_id,
      };
      const response = await fetch('/api/questions', {
        method: 'POST',
        body: JSON.stringify(question),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.data.token}`,
        },
      });
      const json = await response.json();
      if (json.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    } else {
      setError('Please Login first!');
    }
  };

  return (
    <div className='row mt-4 gap-2 justify-content-center'>
      <div className='col-md-1'>
        <Link to={'/'} className='btn btn-primary'>
          Back
        </Link>
      </div>
      <div className='col-md-10'>
        <div className='card'>
          <div className='card-body px-5'>
            {error !== '' && <div className='alert alert-danger'>{error}</div>}
            {success === true ? (
              <div className='alert alert-success'>
                Successfully sent the question!
              </div>
            ) : (
              ''
            )}
            <form className='formQuestion' onSubmit={(e) => handleSubmit(e)}>
              {/* <input type="text" /> */}
              <label htmlFor=''>Title</label>
              <input
                type='text'
                placeholder='Title'
                style={{ borderRadius: '5px', width: '100%' }}
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className='mb-3'
              />
              {/* Tag Input */}
              <label htmlFor=''>Tag</label>
              <TagsInput value={selected} onChange={setSelected} />
              <label htmlFor='' className='mt-3'>
                Isi
              </label>

              <ReactQuill
                value={body}
                onChange={(value) => setBody(value)}
                modules={{
                  toolbar: [
                    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    [{ font: [] }],
                    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
                    ['blockquote', 'code-block'],
                    [{ header: 1 }, { header: 2 }], // custom button values
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
                    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
                    [
                      { align: 'justify' },
                      { align: '' },
                      { align: 'center' },
                      { align: 'right' },
                      { direction: 'rtl' },
                      { color: [] },
                      { background: [] },
                    ], // text direction // dropdown with defaults from theme
                    ['link', 'image', 'video'],
                  ],
                }}
                theme='snow'
                className='text-editor'
              />

              <button
                style={{
                  width: '100px',
                  marginTop: '10px',
                  borderRadius: '10px',
                  border: 'none',
                }}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;
