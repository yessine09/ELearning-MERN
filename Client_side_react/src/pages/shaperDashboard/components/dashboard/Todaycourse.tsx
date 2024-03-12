import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import { useRef, useEffect } from 'react';
import TodayCourseSwipper from './TodayCourseSwipper';
import { Card } from '@material-tailwind/react';

type Props = {
  className: string;
};

const TodayCourse: React.FC<Props> = ({ className }) => {
  const swiperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (swiperRef.current) {
      const mySwiper = new Swiper(swiperRef.current, {
        slidesPerView: 'auto',
        spaceBetween: 8,
        observer: true,
        observeParents: true,
      });
    }
  }, []);

  const numberOfSlides = 2;
  const slides = Array.from({ length: numberOfSlides }).map((_, index) => (
    <div key={index} className="swiper-slide">
      <TodayCourseSwipper className="card-xl-stretch mb-5 mb-xl-2" />
    </div>
  ));

  return (
    <Card
      style={{
        boxShadow: '1px 2px 9px #0000003D',
        backgroundColor: 'white',
        width: '380px',
        height: '250px',
        overflow: 'hidden', // ajout de la propriété overflow:hidden pour masquer les slides dépassants la carte
      }}
    >
      {/* begin::Header */}
      <div className="border-0 pt-4">
        <h3
          className="card-title align-items-start flex-column"
          style={{ marginLeft: '35px' }}
        >
          <span
            className="card-label fw-bold "
            style={{ color: '#3699ff', fontSize: '20px' }}
          >
            Today's Courses <br />
          </span>
          <span className="mt-1 fw-semibold fs-6" style={{ color: '#6b909e' }}>
            2 Lessons, 5 hours
          </span>
        </h3>
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div
        ref={swiperRef}
        className="swiper-container"
        style={{ width: '100%', height: '100%', marginLeft: '25px' }} // ajout de width et height à 100% pour que la div parente occupe la totalité de la carte
      >
        <div className="swiper-wrapper">{slides}</div>
      </div>
      {/* end::Body */}
    </Card>
  );
};

export default TodayCourse;
