import { GetStaticProps } from 'next';
import Head from 'next/head';

import api from '@/services/api';
import { TypeResponse, Types } from '@/types/pokemon';

import iconByType from '@/utils/iconByType';

import { TypeCard } from '@/components/TypeCard';

// @ts-ignore
import styles from '@/styles/home.module.less';

type PokemonTypeData = {
    types: Types
}

function Home({ types }: PokemonTypeData) {    
    return (
        <main className={styles.types}>
            <Head>
                <title>Pokemon TCG | Types</title>
            </Head>
            { 
                types.map(type => (
                    <div key={type}>
                        <TypeCard 
                            title={type}
                            icon={iconByType(type, 64)} 
                        />
                    </div>
                ))
            }
        </main>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const { data }: TypeResponse = await api.get('types')

    // if (!data) {
    //   return {
    //     redirect: {
    //       destination: '/',
    //       permanent: false,
    //     },
    //   }
    // }

    return {
        props: {
            types: data.data
        },
    }
}

export default Home