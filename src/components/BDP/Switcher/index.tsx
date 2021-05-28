/**
 * boolean类型DP
 */
import React from 'react';
import { Switch, Space } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import Block from '../Block';

interface IProps {
  name: string;
  disabled: boolean;
  defaultValue: boolean;
  onChange: (value: boolean) => void;
}

const Switcher = ({
  name = '',
  disabled = false,
  defaultValue = false,
  onChange = (value: boolean) => {},
}: IProps) => {
  // const [checked, setChecked] = useState<boolean>(defaultValue);
  return (
    <Block>
      <Space direction="vertical">
        <label>{name}</label>
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          defaultChecked={defaultValue}
          disabled={disabled}
          // checked={checked}
          onChange={(value) => {
            // setChecked(value);
            onChange(value);
          }}
        />
      </Space>
    </Block>
  );
};

export default Switcher;
