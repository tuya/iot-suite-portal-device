import { DataNode } from 'antd/lib/tree';

import styles from './index.less';

// 过滤资产节点，只显示有关键字的叶子节点和其关键路径上的节点
export const filterTreePath = (
  searchKey: string,
  dataList: Array<DataNode>,
) => {
  const result = [];
  const path = [];
  if (!searchKey.length) {
    return [dataList, path];
  }
  dataList.forEach((item) => {
    const newItem = {
      ...item,
    };
    const index = (newItem.title as string).indexOf(searchKey);
    if (index > -1) {
      // 记录key
      path.push(item.key);
      const beforeStr = (newItem.title as string).substr(0, index);
      const afterStr = (newItem.title as string).substr(
        index + searchKey.length,
      );
      newItem.title = (
        <span>
          {beforeStr}
          <span className={styles['tree-highlight-value']}>{searchKey}</span>
          {afterStr}
        </span>
      );

      // 叶子节点保存
      if (!newItem.children) {
        result.push(newItem);
      }
    }

    const prePathLen = path.length;
    // 继续遍历子节点
    if (newItem.children) {
      const [children, subPath] = filterTreePath(searchKey, newItem.children);
      newItem.children = children;
      path.push(...subPath);
    }

    const afterPathLen = path.length;
    // 子节点遍历完，对比前后路径长度变化，如果增加，将当前节点加入结果集
    if (afterPathLen > prePathLen) {
      result.push(newItem);
      if (index === -1) {
        // 补齐path
        path.push(newItem.key);
      }
    } else if (index > -1 && newItem.children) {
      // 非叶节点命中
      result.push(newItem);
    }
  });

  return [result, path];
};

export const getAllExpendKeyFromFirstChild = (
  dataList: Array<DataNode>,
  isFirst = false,
) => {
  const keys = [];
  if (isFirst) {
    const firstChild = dataList[0];
    keys.push(
      firstChild.key,
      ...getAllExpendKeyFromFirstChild(
        firstChild.children ? firstChild.children : [],
      ),
    );
  } else if (dataList.length) {
    dataList.forEach((item) => {
      keys.push(
        item.key,
        ...getAllExpendKeyFromFirstChild(item.children ? item.children : []),
      );
    });
  }

  return keys;
};
