import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { DataNode } from 'antd/lib/tree';
import { useTranslation } from 'react-i18next';
import { apiService } from '@tuya/connector';

import AssetTree from '../BAssetTree';
import { formatAssetTreeData, getAllLeafNodeByKey } from './util';
import { useQueryParams } from '@/hooks';

interface IProps {
  autoHoldAssetId?: boolean;
  autoSelectFirst?: boolean;
  onSelect?: (key: string) => void;
  onCheck?: (key: string) => void;
  [key: string]: any;
}

const YAssetTree = (props: IProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();
  const query = useQueryParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [dataList, setDataList] = useState<DataNode[]>([]);
  const [defaultValue, setDefaultValue] = useState<string[]>([]);
  const [expandValues, setExpandValues] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true);
    apiService
      .getEntireTree()
      .then((res) => {
        const treeData = formatAssetTreeData(res);
        // 获取query中的assetId
        const assetId = query.get('assetId');
        if (props.autoHoldAssetId && assetId) {
          // 有指定assetId, 为tree赋予默认值
          // 需要展开此节点的所有子节点，及其父节点
          setDefaultValue([assetId]);
          setExpandValues([...getAllLeafNodeByKey(treeData, assetId, false)]);
          // 在列表中找到了assetId，直接使用，不关心路径
          props.onSelect && props.onSelect(assetId);
        } else if (props.autoSelectFirst && treeData.length) {
          // 需要展开此节点的所有子节点，及其父节点
          setDefaultValue([treeData[0].key]);
          setExpandValues([
            ...getAllLeafNodeByKey(treeData, treeData[0].key, false),
          ]);
          history.push({
            pathname: location.pathname,
            search: `?assetId=${treeData[0].key}`,
          } as any);
          props.onSelect && props.onSelect(treeData[0].key);
        }
        setDataList(treeData);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleSelect = (key: string) => {
    history.push({
      pathname: location.pathname,
      search: `?assetId=${key}`,
    } as any);
    props.onSelect(key);
  };

  return (
    <AssetTree
      title={t('assetTree.title')}
      loading={loading}
      dataList={dataList}
      defaultSelectedValue={defaultValue}
      defaultExpandValue={expandValues}
      {...props}
      onSelect={handleSelect}
    />
  );
};

export default YAssetTree;
