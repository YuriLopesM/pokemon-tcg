import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Layout, Menu, PageHeader, Spin} from 'antd';
import {
    TagOutlined,
    SettingOutlined,
    QuestionCircleOutlined
} from '@ant-design/icons';

import PokeballLogo from '@assets/Pokeball.svg';

// @ts-ignore
import styles from './styles.module.less';


type LayoutProps = {
    children: React.ReactNode;
}

const { Header, Sider, Content } = Layout;

export function LayoutWrapper({ children }: LayoutProps) {
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const start = () => setLoading(true);
        const end = () => setLoading(false);

        router.events.on("routeChangeStart", start);
        router.events.on("routeChangeComplete", end);
        router.events.on("routeChangeError", end);

        return () => {
          router.events.off("routeChangeStart", start);
          router.events.off("routeChangeComplete", end);
          router.events.off("routeChangeError", end);
        };
    }, [router.events]);
    
    return (
        <Layout>
            <Sider
                className={styles.sider}
                trigger={null}
                collapsed={true}
            >
                <div className={styles.logo}>
                    <PokeballLogo 
                        width={32} 
                        height={32} 
                        onClick={() => router.push('/')}
                    />
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['types']}
                >
                    <Menu.Item key="types" icon={<TagOutlined />}>
                        <Link href="/">
                            <a>Types</a>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="settings" icon={<SettingOutlined />}>
                        <Link href="#">
                            <a>Settings</a>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="help" icon={<QuestionCircleOutlined />}>
                        <Link href="#">
                            <a>Help</a>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className={styles.layout}>
                <Header
                    className={styles.header}
                >
                    <PageHeader
                        title="Pokemon TCG"
                        subTitle="The first card game fan wiki"
                        onBack={() => window.history.back()}
                    />
                    {!!isLoading && <Spin /> }
                </Header>
                <Content
                    className={styles.content}
                >
                    {children}
                    <footer>
                        <p>
                            Made with 💙 by  
                            <Link href="https://www.linkedin.com/in/yuri-lopes-machado/">
                                <a> Yuri Lopes</a>
                            </Link> •
                            <Link href="https://github.com/YuriLopesM">
                                <a> GitHub</a>
                            </Link>
                        </p>
                    </footer>
                </Content>
            </Layout>
        </Layout>
    )
}