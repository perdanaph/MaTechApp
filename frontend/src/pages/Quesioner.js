import Likert from 'react-likert-scale';

export default function Quesioner() {
  const linkertOptions = {
    question: 'Sejauh mana penggunaan forum diskusi membantu Anda menjadi lebih efektif dalam kegiatan sehari-hari?',
    responses: [
      { value: 1, text: 'Sangat Setuju' },
      { value: 2, text: 'Setuju' },
      { value: 3, text: 'Ragu-ragu', checked: true },
      { value: 4, text: 'Tidak Setuju' },
      { value: 5, text: 'Sangat Tidak Setuju' },
    ],
    onChange: val => {
      console.log(val);
    },
  };

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

          <div className='container justify-content-center'>
            <div className='col-lg-10 text-center col-sm-12'>
              <div className='card'>
                <div className='card-body m-1'>
                  <Likert {...linkertOptions} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
