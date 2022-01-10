import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import api from '@/services/api';
import { Card, CardResponse, TypeResponse } from '@/types/pokemon';

import { Button, Modal, Input } from 'antd';

import iconByType from '@/utils/iconByType';
import colorByType from '@/utils/colorByType';

// @ts-ignore 
import styles from '@/styles/type.module.less'

type PokemonCardData = {
    cards: Card[]
}

const { Search } = Input;

export default function Type({ cards }: PokemonCardData) {
    const [pokemonCards, setPokemonCards] = useState<Card[]>(cards);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState<Card>();

    const router = useRouter();
    const { type } = router.query;

    function openModal(pokemon: Card) {
        setSelectedPokemon(pokemon);
        setModalVisible(true)
    }

    function handleSearch(text: string) {
        console.log(text)
        const newCards = cards.filter(card => {
            return card.name.toUpperCase().includes(text.toUpperCase());
        })

        console.log(newCards)
        setPokemonCards(newCards)
    }


    return (
        <div className={styles.wrapper}>
            <Head>
                <title>Pokemon TCG | {type} Cards</title>
            </Head>
            <header className={styles.header}>
                <h1>{ iconByType(String(type), 40)} { type } Pokemons</h1>
                <Search placeholder="Search a card" onSearch={(e) => handleSearch(e)} allowClear/>
            </header>
            <main className={styles.cards}>
                {
                    pokemonCards.map(({
                        id,
                        name,
                        subtypes,
                        images,
                        attacks,
                        weaknesses
                    }) => (
                        <section key={id}>
                            <h2>{name}</h2>
                            <div className={styles.innerCard}>
                                <figure>
                                    <Image
                                        src={images.small}
                                        width={215}
                                        height={300}
                                        alt={name}
                                    />
                                </figure>
                                <article
                                    style={{ borderColor: `${colorByType(String(type))}`}}
                                >
                                    <p>
                                        <strong>Subtypes: </strong>
                                        {subtypes.join(', ')}
                                    </p>
                                    <p>
                                        <strong>Weaknesses: </strong>
                                        {weaknesses?.map(weakness => weakness.type).join(', ')}
                                    </p>
                                    <p>
                                        <strong>Attacks: </strong>
                                        {attacks?.map(attack => attack.name).join(', ')}
                                    </p>
                                    <Button
                                        type="primary"
                                        onClick={
                                            () => openModal({
                                                id,
                                                name,
                                                subtypes,
                                                images,
                                                attacks,
                                                weaknesses
                                            })
                                        }
                                        style={{ 
                                            background: `${colorByType(String(type))}`,
                                            borderColor: `${colorByType(String(type))}`
                                        }}
                                    >
                                        View Attacks
                                    </Button>
                                </article>
                            </div>
                        </section>
                    ))
                }
                <Modal
                    title={`${selectedPokemon?.name} Attacks`}
                    visible={isModalVisible}
                    onCancel={() => setModalVisible(false)}
                    footer={null}
                    className="modalStyle"
                >
                    {
                        selectedPokemon?.attacks.map(({ name, text, cost, damage }, index) => (
                            <div key={index}>
                                <h1>{name}</h1>
                                <p>{text}</p>
                                <p>
                                    {cost.map((type, index) => (
                                        <span key={index}>{iconByType(type, 16)} </span>
                                    ))}
                                    | {damage ? damage : 0} Damage
                                </p>
                            </div>
                        ))
                    }
                </Modal>
            </main>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { data }: CardResponse = await api.get('cards', {
        params: {
            q: `types:${params?.type}`,
            page: 1,
            pageSize: 40,
        }
    });

    return {
        props: {
            cards: data.data
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const { data }: TypeResponse = await api.get('types');

    const paths = data.data.map(type => {
        return {
            params: {
                type
            }
        }
    })

    return {
        paths,
        fallback: false
    }
}