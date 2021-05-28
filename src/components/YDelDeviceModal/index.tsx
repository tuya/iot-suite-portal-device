/**
 * 删除设备
 */
import { Modal } from 'antd';
import { apiService } from '@tuya/connector';
import styles from './index.less';

export const showDelDeviceConfirmModal = (
  deviceId: string,
  t: any,
  onOk?: () => void,
) => {
  const { removeDeviceById } = apiService;
  Modal.confirm({
    title: t('removeDevice.title'),
    content: (
      <span className={styles['modal-content']}>
        {t('removeDevice.content')}
      </span>
    ),
    okText: t('removeDevice.confirm'),
    cancelText: t('removeDevice.cancel'),
    onOk: () => {
      return removeDeviceById(deviceId).then(() => {
        onOk && onOk();
      });
    },
  });
};

export default showDelDeviceConfirmModal;
