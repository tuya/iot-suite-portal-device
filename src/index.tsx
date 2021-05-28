import React from 'react';
import './public-path';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { getI18n } from 'react-i18next';
import App from './App';
import './index.css';
import './lang';

interface IProps {
  base?: string;
  container?: any;
  onGlobalStateChange?: any;
  setGlobalState?: (state) => void;
  mainHistory?: any;
  lang?: string;
}

function render(props: IProps) {
  const { base, container } = props;
  ReactDOM.render(
    <BrowserRouter basename={window.__POWERED_BY_QIANKUN__ ? base : '/'}>
      <App />
    </BrowserRouter>,
    container
      ? container.querySelector('#root')
      : document.querySelector('#root'),
  );
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  // console.log('设备微应用启动');
}

export let setGlobalState;
export let micState;
export let mainHistory: any;

export async function mount(props: IProps) {
  // console.log('挂载设备微应用', props);
  getI18n().changeLanguage(props.lang);
  mainHistory = props.mainHistory;
  render(props);
  props.onGlobalStateChange((state, prev) => {
    // console.log(state, prev);
    micState = state;
  }, true);
  setGlobalState = (state) => {
    props.setGlobalState({ ...micState, ...state });
  };
}

export async function unmount(props: IProps) {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(
    container
      ? container.querySelector('#root')
      : document.querySelector('#root'),
  );
}
