import React, {useState} from 'react';

import { 
  Container, 
  ToggleLabel,
  ToggleSelector
} from './styles';

// componente puro
const Toggle: React.FC = () => {
  const [checked, setChecked] = useState(false);
  // const [online, setOnline] = useState(false);
  
  return (
    <Container>
     <ToggleLabel>Light</ToggleLabel>
     <ToggleSelector 
        checked={checked}
        uncheckedIcon={false}
        checkedIcon={false}
        onChange={() => setChecked(!checked)} 
      />
    <ToggleLabel>Dark</ToggleLabel>
  </Container>
  );
}

export default Toggle;