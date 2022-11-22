import { Slider } from '@mui/material';
import { StyledTextField } from '../Inputs/Inputs.styled';
import { MainContainer, InputsContainer } from './MoneySlider.styled';

interface MoneySliderInterface {
    disabled?: boolean
    value: number[]
    setValue: React.Dispatch<React.SetStateAction<any>>
}

function MoneySlider({ disabled, value, setValue }: MoneySliderInterface) {
  const setMoney = (newValue: number[]) => {
    setValue((prev: any) => ({ ...prev, money: newValue }));
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setMoney(newValue as number[]);
  };

  const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = Math.round(Number(e.target.value) / 100) * 100;
    if (index === 0) {
      if (newValue < 0) {
        setMoney([0, value[1]] as number[]);
      } else if (newValue > value[1]) {
        setMoney([value[1], value[1]] as number[]);
      } else {
        setMoney([newValue, value[1]] as number[]);
      }
    } else if (newValue > 100000) {
      setMoney([value[0], 100000] as number[]);
    } else if (newValue < value[0]) {
      setMoney([value[0], value[0]] as number[]);
    } else {
      setMoney([value[0], newValue] as number[]);
    }
  };

  return (
    <MainContainer>
      <Slider
        disabled={disabled}
        getAriaLabel={() => 'Temperature range'}
        value={value}
        max={100000}
        step={100}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
      />
      <InputsContainer>
        <StyledTextField
          disabled={disabled}
          variant="standard"
          value={value[0]}
          inputProps={{
            step: 100,
            min: 0,
            max: 100000,
            type: 'number',
            'aria-labelledby': 'input-slider',
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, 0)}
        />
        <StyledTextField
          disabled={disabled}
          variant="standard"
          value={value[1]}
          inputProps={{
            step: 100,
            min: 0,
            max: 100000,
            type: 'number',
            'aria-labelledby': 'input-slider',
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, 1)}
        />
      </InputsContainer>
    </MainContainer>
  );
}
MoneySlider.defaultProps = {
  disabled: false,
};

export default MoneySlider;
