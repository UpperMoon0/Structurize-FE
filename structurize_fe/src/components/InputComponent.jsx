import { useState } from 'react';
import StructureService from '../api/StructureService';

function InputComponent() {
  const [inputValue, setInputValue] = useState('');
  const structureService = new StructureService();

  const handleButtonClick = async () => {
    try {
      const response = await structureService.getStructureById(inputValue);
      console.log(response);
    } catch (error) {
      console.error('Error fetching structure:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter text"
      />
      <button onClick={handleButtonClick}>Submit</button>
    </div>
  );
}

export default InputComponent;