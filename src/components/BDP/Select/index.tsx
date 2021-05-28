/**
 * enum类型DP
 */
import { Select } from 'antd';
import Block, { Label } from '../Block';

const { Option } = Select;

interface IProps {
  disabled: boolean;
  defaultValue: string;
  name: string;
  data: Array<any>;
  onChange: (value: string) => void;
}

const SelectDP = ({
  name = '',
  defaultValue,
  disabled,
  onChange,
  data,
}: IProps) => {
  return (
    <Block>
      <Label>{name}</Label>
      <Select
        style={{
          width: '100%',
        }}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={onChange}
      >
        {data.map((item) => {
          return (
            <Option value={item} key={item}>
              {item}
            </Option>
          );
        })}
      </Select>
    </Block>
  );
};

export default SelectDP;
