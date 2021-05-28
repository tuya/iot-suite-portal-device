/**
 * 未适配的类型，只读展示json
 */
import ReactJson from 'react-json-view';
import Block, { Label } from '../Block';

interface IProps {
  name: string;
  defaultValue: any;
}

const JsonView = ({ defaultValue, name }: IProps) => {
  return (
    <Block>
      <Label>{name}</Label>
      <ReactJson src={defaultValue} />;
    </Block>
  );
};

export default JsonView;
