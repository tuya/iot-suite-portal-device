/**
 * 编辑设备弹窗
 */
import { Form, Input } from 'antd';
import { apiService } from '@tuya/connector';
import { useTranslation } from 'react-i18next';
import ModalForm from '@/components/BModalForm';

const { modifyDeviceInfo } = apiService;

const { Item } = Form;

interface IProps {
  modalStatus: boolean;
  deviceId: string;
  name: string;
  onConfirm: (needFresh: boolean) => void;
}

const EditDeviceModal = ({
  modalStatus = false,
  onConfirm = () => {},
  deviceId,
  name,
}: IProps) => {
  const { t } = useTranslation();

  return (
    <ModalForm
      title={t('editDevice.title')}
      modalStatus={modalStatus}
      onConfirm={(values) => {
        const { deviceName } = values;
        return modifyDeviceInfo(deviceId, deviceName)
          .then(() => {
            onConfirm(true);
            return true;
          })
          .catch((err) => {
            console.error(err);
            return true;
          });
      }}
      onCancel={() => {
        onConfirm(false);
      }}
    >
      <Item
        initialValue={name}
        label={t('editDevice.label')}
        name="deviceName"
        rules={[
          { required: true },
          {
            max: 20,
            message: t('editDevice.errorMax'),
          },
        ]}
      >
        <Input />
      </Item>
    </ModalForm>
  );
};

export default EditDeviceModal;
