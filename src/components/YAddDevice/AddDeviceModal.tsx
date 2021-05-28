/**
 * 添加设备弹窗
 */
import _JSXStyle from 'styled-jsx/style';
import { useEffect, useState } from 'react';
import { Button, Modal, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import QRCode from 'qrcode.react';
import { apiService } from '@tuya/connector';
// import qrcode from './qrcode-scan.png';

const { getProjectInfo } = apiService;

function base64Img2Blob(code) {
  var parts = code.split(';base64,');
  var contentType = parts[0].split(':')[1];
  var raw = window.atob(parts[1]);
  var rawLength = raw.length;

  var uInt8Array = new Uint8Array(rawLength);

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}
function downloadFile(canvas) {
  var aLink = document.createElement('a');
  var blob = base64Img2Blob(canvas.toDataURL('image/png')); //new Blob([content]);

  aLink.download = new Date().getTime() + '.png';
  aLink.href = URL.createObjectURL(blob);

  aLink.click();
}

const AddDeviceModal = () => {
  const { t } = useTranslation();
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>('');
  const [projectCode, setProjectCode] = useState<string>('');

  useEffect(() => {
    getProjectInfo().then((res) => {
      const { project_name, project_code } = res;
      if (project_name) {
        setProjectName(project_name);
      }
      if (project_code) {
        setProjectCode(project_code);
      }
    });
  }, []);

  return (
    <>
      <Button
        onClick={() => {
          setModalStatus(true);
        }}
        type="primary"
        icon={<PlusOutlined />}
      >
        {t('addDevice.btn')}
      </Button>

      <Modal
        width={600}
        destroyOnClose
        visible={modalStatus}
        title={t('addDevice.title')}
        onCancel={() => {
          setModalStatus(false);
        }}
        cancelText={t('addDevice.close')}
        okText={t('addDevice.downloadQrCode')}
        onOk={() => {
          var canvas = document.getElementById('qrcode');
          downloadFile(canvas);
        }}
        getContainer={false}
      >
        <Row>
          <Col span={14}>
            <Row justify="center">
              <Col className="qrTitle">
                {t('addDevice.label')}: {projectName}
              </Col>
            </Row>
            <Row justify="center">
              <Col>
                <QRCode
                  id="qrcode"
                  includeMargin
                  size={200}
                  value={`https://tuyasmart.applink.smart321.com/cloud/projects/${projectCode}`}
                />
              </Col>
            </Row>
            <Row justify="center">
              <Col className="qrHint">{t('addDevice.hint')}</Col>
            </Row>
          </Col>
          <Col span={10}>
            <img
              style={{
                width: 259,
                height: 233,
                marginLeft: -40,
              }}
              alt=""
              src={`/device-app/qrcode-scan.png`}
            />
          </Col>
        </Row>
        <style jsx scoped>{`
          .qrTitle {
            color: #262626;
            font-weight: bold;
            font-size: 16px;
          }

          .qrHint {
            color: #595959;
            font-size: 14px;
            text-align: center;
          }
        `}</style>
      </Modal>
    </>
  );
};

export default AddDeviceModal;
