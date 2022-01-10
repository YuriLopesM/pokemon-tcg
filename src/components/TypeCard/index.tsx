import { useRouter } from 'next/router';
import { Card } from 'antd';
import { Tooltip } from 'antd';

//@ts-ignore
import styles from './styles.module.less';

type TypeCardProps = {
    title: string;
    icon: JSX.Element
}

export function TypeCard({
    title,
    icon
}: TypeCardProps) {
    const router = useRouter();

    function handleChangeRoute(type: string){
        router.push(`/type/${type}`);
    }

    return (
        <Card 
            className={styles.card}
            title={title} 
            extra={<Tooltip title="Lorem ipsum dolor sit amet">About</Tooltip>}
            onClick={() => handleChangeRoute(title)}
        >
            <div className={styles.iconWrapper}>
                {icon}
            </div>
        </Card>
    )
}