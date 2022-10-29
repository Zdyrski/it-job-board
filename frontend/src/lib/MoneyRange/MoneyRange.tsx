import { Salary } from './MoneyRange.styled';
import { MoneyRangeInterface } from '../../types';

function MoneyRange({ min, max, currency } : MoneyRangeInterface) {
  return (
    <Salary>
      {min !== undefined
        ? (
          <div>
            {min}
            {' - '}
            {max}
            {' '}
            {currency}
          </div>
        )
        : <div>Undisclosed salary</div>}
    </Salary>
  );
}

export default MoneyRange;
