/**
 * 控制设备DP
 */
import { useEffect, useState } from 'react';
import { Drawer, Row, Col, Button, Space, Empty, Spin } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { apiService } from '@tuya/connector';

import DefaultDP from '@/components/BDP/Default';
import InputDP from '@/components/BDP/Input';
import SelectDP from '@/components/BDP/Select';
import Slider from '@/components/BDP/Slider';
import Switcher from '@/components/BDP/Switcher';

import styles from '../index.less';

const { getDeviceInfoWithDP, modifyDeviceDP } = apiService;

interface IProps {
  onConfirm: (values: any) => void;
  visible: boolean;
  title: string;
  deviceId: string;
}

const CtrlDP = ({ title = '', visible, onConfirm, deviceId }: IProps) => {
  const { t, i18n } = useTranslation();

  const locale = i18n.language;

  // 渲染数据
  const [data, setData] = useState<any[]>([]);
  // item修改数据
  const [values, setValues] = useState<{ [propName: string]: any }>({});
  // base对比数据
  const [baseData, setBaseData] = useState<{ [propName: string]: any }>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (visible && deviceId) {
      setLoading(true);
      getDeviceInfoWithDP(deviceId)
        .then((info) => {
          setLoading(false);
          if (info) {
            const data = info.status;
            // const data = testData.status;
            setData(data);
            // 缓存dp
            const cacheDP: { [propName: string]: any } = {};
            data.forEach((item) => {
              cacheDP[item.code] = {
                code: item.code,
                value: item.value,
                editable: item.editable,
              };
            });
            setBaseData(cacheDP);
            setValues((state) => {
              return Object.assign({}, state, cacheDP);
            });
          }
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [deviceId, visible]);

  const onValidation = () => {
    const changedStatus: any[] = [];
    Object.keys(values).forEach((key) => {
      const item = values[key].value;
      // 查看是否有变更
      const baseItem = baseData[key];
      if (baseItem?.editable && baseItem?.value !== item && item != null) {
        changedStatus.push({
          code: key,
          value: item,
        });
      }
    });

    if (changedStatus.length > 0) {
      // todo loading
      return modifyDeviceDP(deviceId, changedStatus).then(() => {
        onConfirm(changedStatus);
        resetData();
      });
    }
    resetData();
  };

  const resetData = () => {
    setBaseData([]);
    setValues({});
    setData([]);
  };

  return (
    <Drawer
      title={
        <Row justify="space-between" align="middle" wrap={false}>
          <Col>
            <span className={styles.drawerTitle}>{title}</span>
          </Col>
          <Col>
            <span
              onClick={() => {
                onConfirm(values);
                resetData();
              }}
            >
              <CloseOutlined />
            </span>
          </Col>
        </Row>
      }
      footer={
        <div style={{ float: 'right' }}>
          <Space align="end">
            <Button
              onClick={() => {
                onConfirm(values);
                resetData();
              }}
            >
              {t('ctrlDP.cancel')}
            </Button>
            <Button
              type="primary"
              onClick={() => {
                onValidation();
              }}
            >
              {t('ctrlDP.confirm')}
            </Button>
          </Space>
        </div>
      }
      onClose={() => {
        onConfirm(values);
        resetData();
      }}
      destroyOnClose
      width="376"
      placement="right"
      closable={false}
      visible={visible}
    >
      {loading ? (
        <Spin spinning={loading}>
          <Empty />
        </Spin>
      ) : data.length ? (
        data.map((item, index) => {
          const props = {
            defaultValue: item.value,
            disabled: !item.editable,
            name: locale === 'zh-CN' ? item.name || item.code : item.code,
            code: item.code,
            onChange: (value: any) => {
              setValues((state) => {
                return Object.assign({}, state, {
                  [item.code]: {
                    code: item.code,
                    value,
                  },
                });
              });
            },
          };

          if (item.type === 'Integer') {
            let jsonConfig: { [propName: string]: any } = {};
            try {
              jsonConfig = JSON.parse(item.options);
            } catch (err) {
              console.error(err);
            }
            const { max, min, scale, step, unit = '' } = jsonConfig;

            const scaleFunc = (value: number) => {
              return value / Math.pow(10, scale);
            };

            return (
              <Slider
                {...props}
                key={`${item.code}${index}${item.value}`}
                unit={unit}
                max={scaleFunc(max)}
                min={scaleFunc(min)}
                step={scaleFunc(step)}
              />
            );
          }

          if (item.type === 'Boolean') {
            return (
              <Switcher key={`${item.code}${index}${item.value}`} {...props} />
            );
          }

          if (item.type === 'String') {
            let options: { [propName: string]: any } = {};
            try {
              const result = JSON.parse(item.options);
              if (!isNaN(+result.maxlen)) {
                options.maxlength = +result.maxlen;
              }
            } catch (err) {
              console.error(err);
            }
            return (
              <InputDP
                key={`${item.code}${index}${item.value}`}
                {...props}
                options={options}
              />
            );
          }

          if (item.type === 'Enum') {
            let options: Array<String> = [];
            try {
              const result = JSON.parse(item.options);
              if (result.range) {
                options = result.range;
              }
            } catch (err) {
              console.error(err);
            }
            return (
              <SelectDP
                key={`${item.code}${index}${item.value}`}
                {...props}
                data={options}
              />
            );
          }

          let jsonValue: { [propName: string]: any } = {};
          try {
            jsonValue = JSON.parse(item.value);
          } catch (err) {
            console.error(err);
          }
          return (
            <DefaultDP
              key={`${item.code}${index}${Math.random()}`}
              {...props}
              defaultValue={jsonValue}
            />
          );
        })
      ) : (
        <Empty />
      )}
    </Drawer>
  );
};

export default CtrlDP;
