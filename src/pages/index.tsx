import { useEffect, useState } from 'react';
import * as dayjs from 'dayjs';
import { Table, Row, Col, Space, Button, Divider } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { apiService, DeviceInfo } from '@tuya/connector';

import CtrlDP from './components/CtrlDP';
import EditDeviceModal from './components/EditDevice';

import showDelDeviceConfirmModal from '@/components/YDelDeviceModal';
import AddDeviceFlow from '@/components/YAddDevice';
import YAssetTree from '@/components/YAssetTree';

import styles from './index.less';

const { getDevicesInfoByAssetId } = apiService;

const DeviceList = () => {
  const { t, i18n } = useTranslation();
  const [list, setList] = useState<DeviceInfo[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchTableData = (
    assetId: string,
    curPage: number,
    curPageSize: number,
  ) => {
    if (!assetId) {
      return;
    }
    setLoading(true);
    getDevicesInfoByAssetId(assetId, curPage, curPageSize)
      .then((res) => {
        setLoading(false);

        setList(res?.data || []);
        setTotalCount(res?.total || 0);
      })
      .catch(() => {
        setLoading(false);
        setList([]);
        setTotalCount(0);
      });
  };

  // ctrlDP state
  const [ctrlDPVisible, setCtrlDPVisible] = useState<boolean>(false);
  const [ctrlDPTitle, setCtrlDPTitle] = useState<string>('');
  const [ctrlDPDeviceId, setCtrlDPDeviceId] = useState<string>('');

  const configCtrlDP = (show = false, title = '', id = '') => {
    setCtrlDPVisible(show);
    setCtrlDPTitle(title);
    setCtrlDPDeviceId(id);
  };

  // editDeviceModal state
  const [editDeviceModalStatus, setEditDeviceModalStatus] = useState(false);
  const [editDeviceName, setEditDeviceName] = useState('');
  const [editDeviceId, setEditDeviceId] = useState('');

  const configEditDevice = (show = false, name = '', deviceId = '') => {
    setEditDeviceModalStatus(show);
    setEditDeviceName(name);
    setEditDeviceId(deviceId);
  };

  // asset cascader state
  const [assetId, setAssetId] = useState<string>('');

  // list fresh state
  const [tableFresh, setTableFresh] = useState(0);

  const freshTable = () => {
    setTableFresh((state) => {
      return state + 1;
    });
  };

  useEffect(() => {
    fetchTableData(assetId, page, pageSize);
  }, [tableFresh, assetId, page]);

  const columns: Array<any> = [
    {
      title: t('table.column.name'),
      dataIndex: 'name',
      width: '20%',
      className: styles.tableCell,
    },
    {
      title: t('table.column.id'),
      dataIndex: 'id',
      className: styles.tableCell,
    },
    {
      title: t('table.column.online'),
      dataIndex: 'online',
      render: (text: any, record: any) => {
        if (record.online) {
          return (
            <Space>
              <span className={`${styles.cycle} ${styles.green}`}></span>
              <span className={styles.tableCell}>{t('table.row.online')}</span>
            </Space>
          );
        }
        return (
          <Space>
            <span className={`${styles.cycle} ${styles.red}`}></span>
            <span className={styles.tableCell}>{t('table.row.offline')}</span>
          </Space>
        );
      },
    },
    {
      title: t('table.column.activeTime'),
      dataIndex: 'active_time',
      className: styles.tableCell,
      render: (text: any, record: any) => {
        const time = dayjs
          .unix(record.active_time)
          .format('YYYY-MM-DD HH:mm:ss');
        return <span className={styles.tableCell}>{time}</span>;
      },
    },
    {
      title: t('table.column.opt'),
      dataIndex: 'opt',
      width: '20%',
      align: 'center',
      render: (text: any, record: any) => {
        return (
          <Space>
            <div
              onClick={() => {
                configEditDevice(true, record.name, record.id);
              }}
              className={styles.textBlue}
            >
              {t('table.row.edit')}
            </div>
            <div
              className={styles.textBlue}
              onClick={() => {
                configCtrlDP(true, record.name, record.id);
              }}
            >
              {t('table.row.ctrl')}
            </div>
            <div
              className={styles.textBlue}
              onClick={() => {
                showDelDeviceConfirmModal(record.id, t, () => {
                  freshTable();
                });
              }}
            >
              {t('table.row.remove')}
            </div>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <div className={styles.background}>
        <Row className={styles.ctrlWrapper}>
          <Col span={4} className={styles.assetTreeWrap}>
            <YAssetTree
              treeWrapProps={{
                className: styles.assetTreeHeight,
                style: { overflow: 'auto' },
              }}
              autoHoldAssetId
              autoSelectFirst
              title={t('assetTree.title')}
              onSelect={(value) => {
                if (value) {
                  setAssetId(value);
                  setPage(1);
                }
              }}
            />
          </Col>
          <Col>
            <Divider type="vertical" style={{ height: '100%' }} />
          </Col>
          <Col span={19} className={styles.tableContainerWrap}>
            <Row justify="end" className={styles.tableCtrlWrap}>
              <Space>
                <Button
                  type="primary"
                  icon={<ReloadOutlined />}
                  onClick={freshTable}
                >
                  {t('refresh')}
                </Button>
                <AddDeviceFlow />
              </Space>
            </Row>

            <Table
              loading={loading}
              columns={columns}
              rowKey={(record: any) => record.id}
              dataSource={list}
              pagination={{
                current: page,
                defaultPageSize: pageSize,
                pageSize,
                total: totalCount,
                onChange: (pageNumber) => {
                  setPage(pageNumber);
                },
                onShowSizeChange: (currentSize, nextPageSize) => {
                  setPageSize(nextPageSize);
                  // 重置分页数量
                  setPage(1);
                  freshTable();
                },
                showSizeChanger: false,
              }}
            />
          </Col>
        </Row>
      </div>
      <CtrlDP
        visible={ctrlDPVisible}
        deviceId={ctrlDPDeviceId}
        title={ctrlDPTitle}
        onConfirm={() => {
          configCtrlDP();
        }}
      />
      <EditDeviceModal
        modalStatus={editDeviceModalStatus}
        deviceId={editDeviceId}
        name={editDeviceName}
        onConfirm={(needFresh) => {
          configEditDevice();
          needFresh && freshTable();
        }}
      />
    </>
  );
};

export default DeviceList;
