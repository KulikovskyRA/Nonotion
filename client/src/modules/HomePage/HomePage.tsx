import { useState } from 'react';
import { createPortal } from 'react-dom';

const HomePage = () => {
  const [count, setCount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count: number) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <button onClick={() => setShowModal(true)}>Click</button>
      <div style={{ height: '35px', width: '35px', overflow: 'hidden' }}>
        {showModal &&
          createPortal(
            //! Без портала div обрезает внутреннюю часть
            <div
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div>I'm a modal dialog</div>
              <button onClick={() => setShowModal(false)}>Close</button>
            </div>,
            document.body
          )}
      </div>
    </>
  );
};

export default HomePage;
