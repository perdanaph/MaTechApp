import { useEffect, useState } from 'react';
import Likert from 'react-likert-scale';
import { useNavigate } from 'react-router-dom';

export default function Quesioner() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [dataSubmit, setDataSubmit] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  async function getKuesioner() {
    const response = await fetch(process.env.REACT_APP_API_HOST + '/api/questioner');
    const json = await response.json();
    setData(json.data);

    let dataScore = [];

    json.data.forEach(element => {
      element.Questioners.forEach(item => {
        dataScore.push({
          id_user: user.data.user_id,
          id_questioner: item.id,
          score: 0,
        });
      });
    });
    setDataSubmit(dataScore);
  }

  async function checkResponden() {
    const checkResponden = await fetch(process.env.REACT_APP_API_HOST + '/api/questioner/check/' + user.data.user_id);
    const responseJson = await checkResponden.json();
    if (responseJson.isResponden) {
      navigate('/');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const checkInput = dataSubmit.filter(item => item.score === 0);
    if (checkInput.length !== 0) {
      alert('Semua kuesioner harus dijawab');
    } else {
      await fetch(process.env.REACT_APP_API_HOST + '/api/questioner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ questioner: dataSubmit }),
      });
      alert('Terima kasih telah melakukan pengisian kuesioner');
      navigate('/');
    }
  }

  useEffect(() => {
    getKuesioner();
    checkResponden();
  }, []);

  return (
    <div className='container mt-5'>
      <div className='col-md-12'>
        <div className='card'>
          <div className='card-body m-1'>
            {/* header card */}
            <div className='container d-block'>
              <h3>Petunjuk Pengisian</h3>
              <h6 className=''>1. Isilah setiap pertanyaan yang diminta dengan cara memilih salah satu jawaban. dengan memberi tanda check (.) pada pilihan jawaban yang tersedia berdasarkan pendapat anda sendiri.</h6>
              <h6>2. Bacalah kembali setiap pertanyaan untuk memastikan tidak ada pertanyaan yang tidak terjawab.</h6>
              <p className='m-0'>Keterangan: </p>
              <ul style={{ listStyleType: 'none' }}>
                <li>1 = Sangat Setuju </li>
                <li>2 = Setuju</li>
                <li>3 = Ragu-ragu</li>
                <li>4 = Tidak Setuju</li>
                <li>5 = Sangat Tidak Setuju</li>
              </ul>
            </div>
          </div>

          <div className='container p-3'>
            <form className='row justify-content-center  gap-2' onSubmit={handleSubmit}>
              {data.map((item, index) => {
                return (
                  <div className='col-lg-10 text-center col-sm-12'>
                    <div className='card'>
                      <div className='card-header text-start'>
                        <div className='card-title'>{item.name}</div>
                      </div>
                      <div className='card-body m-1'>
                        {item.Questioners.map(kuesioner => {
                          return (
                            <Likert
                              question={kuesioner.questioner}
                              responses={[
                                { value: 1, text: 'Sangat Setuju', id_questioner: kuesioner.id },
                                { value: 2, text: 'Setuju', id_questioner: kuesioner.id },
                                { value: 3, text: 'Ragu-ragu', id_questioner: kuesioner.id },
                                { value: 4, text: 'Tidak Setuju', id_questioner: kuesioner.id },
                                { value: 5, text: 'Sangat Tidak Setuju', id_questioner: kuesioner.id },
                              ]}
                              style={{ marginBottom: '6rem' }}
                              onChange={val => {
                                setDataSubmit(prevState => {
                                  let nextState = prevState.map(item => {
                                    if (item.id_questioner === val.id_questioner) {
                                      return {
                                        id_user: user.data.user_id,
                                        id_questioner: item.id_questioner,
                                        score: val.value,
                                      };
                                    }
                                    return item;
                                  });
                                  return nextState;
                                });
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className='col-lg-10 text-center d-flex flex-column mt-3 col-sm-12'>
                <button className='btn btn-primary'>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
