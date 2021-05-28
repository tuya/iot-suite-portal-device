import { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Empty, Input, Spin, Typography } from 'antd';
import Tree, { DataNode } from 'antd/lib/tree';
import { useTranslation } from 'react-i18next';

import { filterTreePath, getAllExpendKeyFromFirstChild } from './util';
import { getAllLeafNodeByKey } from '../YAssetTree/util';

interface IProps {
  loading: boolean;
  title: string;
  checkable?: boolean;
  dataList?: Array<DataNode>;
  defaultSelectedValue?: Array<string>;
  defaultCheckedValue?: Array<string>;
  defaultExpandValue?: string[];
  onSelect?: (key: string) => void;
  onCheck?: (key: string) => void;
  treeWrapProps?: any;
  [key: string]: any;
}

/**
 * 资产树筛选组件
 * 默认展开一级资产的所有节点
 * 筛选后，高亮资产名，并收缩非关键路径节点
 */
const AssetTree = ({
  loading = false,
  title,
  checkable = false,
  defaultSelectedValue = [],
  defaultCheckedValue = [],
  defaultExpandValue = [],
  dataList = [],
  onSelect,
  onCheck,
  treeWrapProps = {},
  ...props
}: IProps) => {
  const { t } = useTranslation();
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [expandedKeys, setExpandedKeys] =
    useState<Array<string>>(defaultSelectedValue);
  const [treeData, setTreeData] = useState<Array<DataNode>>(dataList);
  const [selectedKeys, setSelectedKeys] =
    useState<Array<string>>(defaultSelectedValue);

  useEffect(() => {
    if (defaultExpandValue.length) {
      setExpandedKeys(defaultExpandValue);
      setSelectedKeys(defaultSelectedValue);
    } else if (dataList.length) {
      const expandedKeys = getAllExpendKeyFromFirstChild(dataList, true);
      setExpandedKeys(expandedKeys);
    }
    setTreeData(dataList);
  }, [dataList, defaultExpandValue]);

  // 重置为原始数据
  // const resetTreeData = () => {
  //   setTreeData(dataList);
  // };

  const onSearch = (e) => {
    const { value } = e.target;
    const [taggedTreeData, expandedPath] = filterTreePath(value, dataList);
    if (!value.length) {
      // 搜索被清空
      if (!selectedKeys.length) {
        // 默认展开一级所有节点
        const expandedKeys = getAllExpendKeyFromFirstChild(dataList, true);
        setExpandedKeys(expandedKeys);
      } else {
        // 展开选择节点
        setExpandedKeys(
          getAllLeafNodeByKey(taggedTreeData, selectedKeys[0], false),
        );
      }
    } else {
      setExpandedKeys(expandedPath);
    }
    setTreeData(taggedTreeData);
    setAutoExpandParent(true);
  };

  const handleExpand = (expandedKeys) => {
    setAutoExpandParent(false);
    setExpandedKeys(expandedKeys);
  };

  const handleSelect = (selectedKeys) => {
    if (selectedKeys.length) {
      const key = selectedKeys[selectedKeys.length - 1];
      setSelectedKeys([key]);
      onSelect(key);
    }
  };

  const handleCheck = () => {};

  return (
    <Spin spinning={loading}>
      <Typography.Title level={4}>{title}</Typography.Title>
      <Input
        allowClear
        maxLength={20}
        style={{ marginBottom: 15 }}
        placeholder={t('assetTree.searchPlaceholder')}
        onChange={onSearch}
        suffix={<SearchOutlined />}
      />
      {!loading && treeData.length ? (
        <div {...treeWrapProps} id="debugTree">
          <Tree
            checkable={checkable}
            onExpand={handleExpand}
            autoExpandParent={autoExpandParent}
            expandedKeys={expandedKeys}
            selectedKeys={selectedKeys}
            defaultCheckedKeys={defaultCheckedValue}
            onSelect={handleSelect}
            onCheck={handleCheck}
            treeData={treeData}
          />
        </div>
      ) : (
        <Empty />
      )}
    </Spin>
  );
};

export default AssetTree;
