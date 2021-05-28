/**
 * DP区块wrapper
 * @returns
 */
import styles from './index.less';

const Block = ({ children }: { children: any }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export const Label = ({ children }: { children: any }) => {
  return <div className={styles.item}>{children}</div>;
};

export default Block;
