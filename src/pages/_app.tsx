import type { AppProps } from 'next/app';
import { ConfigProvider } from 'antd';

import ptBR from 'antd/lib/locale/pt_BR';

import 'antd/dist/antd.less';
import '@/styles/global.less'
import { LayoutWrapper } from '@/components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ConfigProvider locale={ptBR}>
            <LayoutWrapper>
                <Component {...pageProps} />
            </LayoutWrapper>
        </ConfigProvider>
    );
}

export default MyApp
