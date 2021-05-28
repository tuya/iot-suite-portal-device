/**
 * 添加设备，中文环境提供小程序配网，其他环境提供链接地址
 */
import { useTranslation } from 'react-i18next';
import AddDeviceModal from './AddDeviceModal';

const AddDevice = () => {
  const { i18n } = useTranslation();
  if (i18n.language === 'zh-CN') {
    return <AddDeviceModal />;
  }

  return (
    <a href="https://github.com/tuya/tuya-android-iot-app-sdk-sample">
      Add Device with Tuya IoT App Sample
    </a>
  );
};

export default AddDevice;
