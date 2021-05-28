/**
 * DP Integer类型
 */
import { Slider } from 'antd';

import Block from '../Block';
import styles from './index.less';

interface IProps {
  defaultValue: number;
  disabled: boolean;
  name: string;
  max: number;
  min: number;
  step: number;
  unit: string;
  onChange: (value: number | [number, number]) => void;
}

const DPSlider = ({
  disabled,
  max,
  min,
  unit,
  defaultValue,
  step,
  onChange,
  name,
}: IProps) => {
  const marks = {
    [min]: `${min}${unit}`,
    [max]: `${max}${unit}`,
  };
  return (
    <Block>
      <label>{name}</label>
      <div className={styles.styled}>
        <Slider
          tooltipVisible
          getTooltipPopupContainer={(triggerNode) => triggerNode}
          marks={marks}
          defaultValue={defaultValue}
          disabled={disabled}
          step={step}
          max={max}
          min={min}
          onChange={onChange}
        />
      </div>
    </Block>
  );
};

export default DPSlider;
