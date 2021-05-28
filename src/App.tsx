import { ConfigProvider } from 'antd';
import { getI18n } from 'react-i18next';
import enUS from 'antd/lib/locale/en_US';
import zhCN from 'antd/lib/locale/zh_CN';

import './App.css';
import Page from './pages';
import init from '@/init';

function App() {
  init();
  const i18n = getI18n();
  const locale = i18n.language === 'zh-CN' ? zhCN : enUS;

  return (
    <ConfigProvider locale={locale}>
      <Page />
    </ConfigProvider>
  );
}

export default App;
