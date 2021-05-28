/**
 * 资产级联选择
 */
import { useEffect, useState } from 'react';
import { Cascader, Space, Spin } from 'antd';
import { CascaderValueType, CascaderOptionType } from 'antd/lib/cascader';
import { Asset } from '@tuya/connector';
import { useTranslation } from 'react-i18next';

interface IProps {
  defaultValue: string[];
  loading: boolean;
  title: string;
  options: Asset[];
  onChange?: (
    value: CascaderValueType,
    selectedOptions?: CascaderOptionType[],
  ) => void;
}

const BAssetCascader = ({
  defaultValue,
  loading,
  title = '',
  options = [],
  onChange,
}: IProps) => {
  const { t } = useTranslation();
  const [value, setValue] = useState<CascaderValueType>([]);

  const props: { [key: string]: any } = {};
  if (defaultValue.length) {
    props.defaultValue = defaultValue;
  }

  const handleChange = (
    value: CascaderValueType,
    selectedOptions: CascaderOptionType[],
  ) => {
    setValue(value);
    onChange && onChange(value, selectedOptions);
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  if (title) {
    return (
      <Space>
        <span style={{ marginLeft: 15 }}>{title}</span>
        <Spin spinning={loading}>
          <Cascader
            value={value}
            style={{ width: '100%' }}
            placeholder={t('assetCascader.placeholder')}
            options={options}
            onChange={handleChange}
            expandTrigger="hover"
            changeOnSelect
            dropdownRender={(menus) => {
              return <Spin spinning={loading}>{menus}</Spin>;
            }}
            allowClear={false}
          />
        </Spin>
      </Space>
    );
  }
  return (
    <Spin spinning={loading}>
      <Cascader
        {...props}
        style={{ width: '100%' }}
        placeholder={t('assetCascader.placeholder')}
        options={options}
        onChange={handleChange}
        expandTrigger="hover"
        changeOnSelect
        dropdownRender={(menus) => {
          return <Spin spinning={loading}>{menus}</Spin>;
        }}
        allowClear={false}
      />
    </Spin>
  );
};

export default BAssetCascader;
