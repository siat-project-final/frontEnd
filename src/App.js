import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './assets/css/main.css'; // ✅ 경로도 다시 확인

import AppRouter from './routes/AppRouter';

function App() {
  useEffect(() => {
    AOS.init();

    // ✅ preloader 제거
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.style.display = 'none';
    }
  }, []);

  return (
    <>
      <AppRouter />
      <a
        href="#"
        id="scroll-top"
        className="scroll-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
      <div id="preloader"></div>
    </>
  );
}

export default App;