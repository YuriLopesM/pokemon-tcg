import Colorless from '@assets/typeIcons/Colorless.svg';
import Darkness from '@assets/typeIcons/Darkness.svg';
import Dragon from '@assets/typeIcons/Dragon.svg';
import Fairy from '@assets/typeIcons/Fairy.svg';
import Fighting from '@assets/typeIcons/Fighting.svg';
import Fire from '@assets/typeIcons/Fire.svg';
import Grass from '@assets/typeIcons/Grass.svg';
import Lightning from '@assets/typeIcons/Lightning.svg';
import Metal from '@assets/typeIcons/Metal.svg';
import Psychic from '@assets/typeIcons/Psychic.svg';
import Water from '@assets/typeIcons/Water.svg';

type CardType = {
    [key: string]: JSX.Element
}

export default function iconByType(type: string, size: number) {
    const types: CardType = {
        "Colorless": <Colorless width={size}/>,
        "Darkness": <Darkness width={size} />,
        "Dragon": <Dragon width={size} />,
        "Fairy": <Fairy width={size} />,
        "Fighting": <Fighting width={size} />,
        "Fire": <Fire width={size} />,
        "Grass": <Grass width={size} />,
        "Lightning": <Lightning width={size} />,
        "Metal": <Metal width={size} />,
        "Psychic": <Psychic width={size} />,
        "Water": <Water width={size} />,
    }

    return types[type] || types.Colorless;
}