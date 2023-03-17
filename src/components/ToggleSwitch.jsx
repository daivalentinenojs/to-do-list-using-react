import { useState } from 'react';
import ReactSwitch from 'react-switch';

const ToggleSwitch = ({ sortTask }) => {
  const [checked, setChecked] = useState(true);

  const handleChange = val => {
    sortTask(val);
    setChecked(val);
  }

  return (
    <div style={{textAlign: "right"}}>
      <h4>Move done things to end?</h4>
      <ReactSwitch
        checked={checked}
        onChange={handleChange}
      />
    </div>
  );
}
export default ToggleSwitch