import { Modal, getModalResult } from './components';

function App() {
  const handleClick = async () => {
    try {
      const result = await getModalResult();

      console.log('---result', result);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div>
      <div>app</div>
      <div>
        <button onClick={handleClick}>OPEN</button>
      </div>
      <Modal />
    </div>
  );
}

export default App;
