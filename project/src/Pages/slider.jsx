import './slider.css';
import banner1 from '../assets/banner-1.jpg';
import banner2 from '../assets/banner-2.jpg';

const slides = [banner1, banner2];
let current = 0;

function updateSlider() {
  document.getElementById('slide-img').src = slides[current];
  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === current);
  });
}

setInterval(() => {
  current = (current + 1) % slides.length;
  updateSlider();
}, 3000);

function Slider() {
  return (
    <div className="slider-wrapper">

      <div className="slider-track">
        <img id="slide-img" src={slides[0]} className="slide-img" alt="banner" />

        <button className="slider-btn left" onClick={() => { current = (current - 1 + slides.length) % slides.length; updateSlider(); }}>
          ‹
        </button>
        <button className="slider-btn right" onClick={() => { current = (current + 1) % slides.length; updateSlider(); }}>
          ›
        </button>
      </div>

      <div className="dots">
        {slides.map((_, i) => (
          <span key={i} className={`dot ${i === 0 ? 'active' : ''}`} onClick={() => { current = i; updateSlider(); }} />
        ))}
      </div>

    </div>
  );
}

export default Slider;
