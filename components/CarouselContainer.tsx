import Carousel from 'react-bootstrap/Carousel';
import './CarouselContainer.scss';

const CarouselContainer = () => {
  return (
    <Carousel className="carousel">
      <Carousel.Item className="carouselItem">
        <img
          className="d-block w-100"
          src="/static/episode1.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item className="carouselItem">
        <img
          className="d-block w-100"
          src="/static/episode2.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item className="carouselItem">
        <img
          className="d-block w-100"
          src="/static/episode3.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item className="carouselItem">
        <img
          className="d-block w-100"
          src="/static/episode4.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item className="carouselItem">
        <img
          className="d-block w-100"
          src="/static/episode5.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item className="carouselItem">
        <img
          className="d-block w-100"
          src="/static/episode6.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item className="carouselItem">
        <img
          className="d-block w-100"
          src="/static/episode7.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item className="carouselItem">
        <img
          className="d-block w-100"
          src="/static/episode8.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item className="carouselItem">
        <img
          className="d-block w-100"
          src="/static/episode9.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselContainer;
