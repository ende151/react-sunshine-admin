import { Button, Card } from 'antd';

import { sessionTimeoutApi, tokenExpiredApi } from '@/api/demo/account';
import { PageWrapper } from '@/components/Page';
import { useUserStoreActions } from '@/stores/modules/user';
import { isProdMode } from '@/utils/env';

const Index = () => {
  const { setToken, setSessionTimeout } = useUserStoreActions();

  const test1 = async () => {
    // 示例网站生产环境用的是mock数据，不能返回Http状态码，
    // 所以在生产环境直接改变状态来达到测试效果
    if (isProdMode()) {
      setToken(undefined);
      setSessionTimeout(true);
    } else {
      // 这个api会返回状态码为401的响应
      await sessionTimeoutApi();
    }
  };

  const test2 = async () => {
    // 这个api会返回code为401的json数据，Http状态码为200
    try {
      await tokenExpiredApi();
    } catch (err) {
      console.log('接口访问错误：', (err as Error).message || '错误');
    }
  };

  return (
    <PageWrapper
      title="登录过期示例"
      content="用户登录过期示例，不再跳转登录页，直接生成页面覆盖当前页面，方便保持过期前的用户状态！"
    >
      <Card title="请点击下面的按钮访问测试接口" extra="所访问的接口会返回Token过期响应">
        <Card.Grid style={{ width: '50%', textAlign: 'center' }}>
          <Button type="primary" onClick={test1}>
            HttpStatus == 401
          </Button>
        </Card.Grid>
        <Card.Grid style={{ width: '50%', textAlign: 'center' }}>
          <span></span>
          <Button className="ml-4" type="primary" onClick={test2}>
            Response.code == 401
          </Button>
        </Card.Grid>
      </Card>
    </PageWrapper>
  );
};

export default Index;
