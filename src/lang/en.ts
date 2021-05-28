const en = {
  translation: {
    title: 'Device Management',
    refresh: 'refresh',
    table: {
      column: {
        name: 'Device name',
        id: 'Device ID',
        online: 'Online status',
        activeTime: 'Activation time',
        opt: 'Operations',
      },
      row: {
        online: 'Online',
        offline: 'Offline',
        edit: 'Edit',
        ctrl: 'Control',
        remove: 'Remove',
      },
    },
    assetCascader: {
      title: 'Asset Filter',
      placeholder: 'Select an asset',
    },
    addDevice: {
      btn: 'Add device',
      title: 'Scan the QR code with WeChat App to start device paring',
      close: 'Close',
      downloadQrCode: 'Download QR Code',
      label: 'Project Name',
      hint: 'Scan the code with WeChat, add device to the asset under your project on the Mini Program',
    },
    ctrlDP: {
      cancel: 'Cancel',
      confirm: 'Confirm',
      error: 'Need to fill in',
    },
    removeDevice: {
      title: 'Are you sure you want to remove this device?',
      content:
        'After the device is removed, you will not be able to manage and control the device. ',
      confirm: 'Sure to remove',
      cancel: 'Cancel',
      error: 'Failed to remove the device!',
    },
    editDevice: {
      title: 'Edit Device',
      label: 'Device name',
      error: 'Failed to edit the name!',
      errorMax: 'Device name support up to 20 characters',
    },
    assetTree: {
      title: 'Asset View',
      searchPlaceholder: 'Asset name',
    },
  },
};

export default en;
