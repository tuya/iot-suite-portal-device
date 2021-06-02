<center><p align="center"><img src="./tuya_logo.png" width="28%" height="28%" /></p></center>


Tuya IoT Suite Portal, Sub-application for Device Management
===

[English](README.md) | [中文版](README_zh.md)

This topic describes the sub-application of the web management console of the Tuya IoT Suite.
You can use the sub-application to manage devices.

[Primary Application](https://github.com/tuya/iot-suite-portal)

## Directory structure

Source code location
```
iot-suite-portal-device
└── src
```

> The entry file is `src/index.tsx`.

Application directory structure
```
iot-suite-portal-device
├── README.md
├── README_zh.md
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── qrcode-scan.png
│   └── robots.txt
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── components
│   │   ├── BAssetCascader
│   │   │   └── index.tsx
│   │   ├── BAssetTree
│   │   │   ├── index.less
│   │   │   ├── index.tsx
│   │   │   └── util.tsx
│   │   ├── BDP
│   │   │   ├── Block
│   │   │   │   ├── index.less
│   │   │   │   └── index.tsx
│   │   │   ├── Default
│   │   │   │   └── index.tsx
│   │   │   ├── Input
│   │   │   │   └── index.tsx
│   │   │   ├── Select
│   │   │   │   └── index.tsx
│   │   │   ├── Slider
│   │   │   │   ├── index.less
│   │   │   │   └── index.tsx
│   │   │   └── Switcher
│   │   │       └── index.tsx
│   │   ├── BModalForm
│   │   │   └── index.tsx
│   │   ├── YAddDevice
│   │   │   ├── AddDeviceModal.tsx
│   │   │   └── index.tsx
│   │   ├── YAssetCascader
│   │   │   └── index.tsx
│   │   ├── YAssetTree
│   │   │   ├── index.tsx
│   │   │   └── util.ts
│   │   ├── YDelDeviceModal
│   │   │   ├── index.less
│   │   │   └── index.tsx
│   │   └── utils
│   │       └── index.ts
│   ├── global.d.ts
│   ├── hooks
│   │   └── index.ts
│   ├── index.css
│   ├── index.tsx
│   ├── init.ts
│   ├── lang
│   │   ├── en.ts
│   │   ├── index.ts
│   │   └── zh.ts
│   ├── pages
│   │   ├── components
│   │   │   ├── CtrlDP.tsx
│   │   │   ├── EditDevice.tsx
│   │   │   ├── Table.Device.tsx
│   │   │   ├── dp.test.ts
│   │   │   └── table.less
│   │   ├── index.less
│   │   └── index.tsx
│   ├── public-path.js
│   ├── react-app-env.d.ts
│   └── reportWebVitals.ts
├── tsconfig.extend.json
├── tsconfig.json
├── typings.d.ts
└── yarn.lock
```

## Dependency

The project adopts the [qiankun](https://qiankun.umijs.org/) micro front-end architecture.
This project is a sub-application. [Click here](https://github.com/tuya/iot-suite-portal) to view the primary application.

[CRACO](https://github.com/gsoft-inc/craco) is used to build custom configurations.
```
iot-suite-portal-device
└── .cracorc.js
```

## Deployment

[Click here](https://github.com/tuya/iot-suite-portal) to view the primary application.
On the micro front-end architecture, you can independently deploy primary applications and sub-applications. Currently, a single domain name and multiple directory structures are used to distinguish applications by default.
![network](./frontend-network.jpg)


## Debugging

Run the following command to perform local debugging. The default port number is 7002, and the default debugging address is http://localhost:7002/.

```
npm run start
```
