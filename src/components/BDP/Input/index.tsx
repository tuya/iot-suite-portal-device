/**
 * string类型DP
 */
import React from 'react';
import { Input } from 'antd';
import Block, { Label } from '../Block';

interface IProps {
  disabled: boolean;
  defaultValue: string;
  name: string;
  onChange: (value: string) => void;
  options?: any;
}

const InputDP = ({
  disabled = false,
  defaultValue = '',
  name = '',
  options = {},
  onChange = (value: string) => {},
}: IProps) => {
  return (
    <Block>
      <Label>{name}</Label>
      <Input
        {...options}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={(e) => {
          const value = e.target.value;
          onChange(value);
        }}
      />
    </Block>
  );
};

export default InputDP;
