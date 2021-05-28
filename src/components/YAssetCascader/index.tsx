/**
 * 资产级联业务
 */
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { CascaderValueType, CascaderOptionType } from 'antd/lib/cascader';
import { apiService, AssetDeep } from '@tuya/connector';
import BAssetCascader from '../BAssetCascader';

const { getEntireTree } = apiService;

interface IProps {
  autoHoldAssetId?: boolean;
  autoSelectFirst?: boolean;
  title: string;
  onChange?: (
    value: CascaderValueType,
    selectedOptions?: CascaderOptionType[],
  ) => void;
  maxDeepth: number;
}

const formatData2CascaderOptions = (
  data: Array<AssetDeep>,
  level: number,
  maxDeepth: number,
) => {
  if (!Array.isArray(data)) {
    return [];
  }
  const result: any[] = [];
  data.forEach((item) => {
    result.push({
      value: item.asset_id,
      label: item.asset_name,
      children:
        item?.subAssets.length && level < maxDeepth
          ? formatData2CascaderOptions(item.subAssets, level + 1, maxDeepth)
          : undefined,
    });
  });

  return result;
};

const getAssetPathByAssetId = (assetList: any[], assetId: string) => {
  const path: string[] = [];

  for (let i = 0; i < assetList.length; i++) {
    const item = assetList[i];
    if (item.value === assetId) {
      return [item.value];
    }
    if (item.children) {
      const subResult = getAssetPathByAssetId(item.children, assetId);
      if (subResult.length) {
        path.push(item.value, ...subResult);
      }
    }
  }

  return path;
};

const YAssetCascader = (props: IProps) => {
  const [options, setOptions] = useState<AssetDeep[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [defaultValue, setDefaultValue] = useState<string[]>([]);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    // 拉取整棵树
    getEntireTree()
      .then((result) => {
        setLoading(false);
        const list = formatData2CascaderOptions(result, 1, props.maxDeepth);
        setOptions(list);
        // 获取query中的assetId
        const { assetId } = (location as any).query;
        if (props.autoHoldAssetId && assetId) {
          // 有指定assetId, 为级联赋予默认值
          const path = getAssetPathByAssetId(list, assetId);
          if (path.length) {
            setDefaultValue(path);
            // 在列表中找到了assetId，直接使用，不关心路径
            props.onChange && props.onChange([assetId]);
          }
        } else if (props.autoSelectFirst && list.length) {
          setDefaultValue([list[0].value]);
          history.push({
            pathname: location.pathname,
            search: `?assetId=${list[0].value}`,
          } as any);
          props.onChange && props.onChange([list[0].value]);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <BAssetCascader
      defaultValue={defaultValue}
      loading={loading}
      {...props}
      options={options}
      onChange={(value: any) => {
        if (value?.length) {
          if (props.autoHoldAssetId) {
            const id = value[value.length - 1];
            history.push({
              pathname: location.pathname,
              search: `?assetId=${id}`,
            } as any);
          }
          props.onChange && props.onChange(value);
        }
      }}
    />
  );
};

export default YAssetCascader;
