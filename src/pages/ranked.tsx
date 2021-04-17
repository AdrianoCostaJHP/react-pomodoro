import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/pages/Ranked.module.css';
import Head from 'next/head';

import Layout from '../components/Layout';
import Loading from '../components/Loading';
import WithPrivateRoutes from '../components/WithPrivateRoutes';

interface userData {
    _id: string;
    name: string;
    uri_avatar: string;
    level: number;
    userExperience: number;
    challengesCompleteds: number;
}

function Ranked() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function request() {
            const response = await axios.get('http://localhost:3000/api/rank');
            setData(response.data);
            setLoading(false);
        }
        request();
    }, [])

    return (
        <Layout>
            <Head>
                <title>Ranked | Pomodore </title>
            </Head>
            {loading ? (<Loading />) :
                (
                    <div className={styles.container}>
                        <header>
                            <strong>Ranked</strong>
                        </header>
                        <main>
                            {data.map((user: userData) => (
                                <div key={user._id}>
                                    <div className={styles.profile}  >
                                        <img src={user.uri_avatar} alt="avatar" />
                                        <div>
                                            <strong>{user.name}</strong>
                                            <p >
                                                <img src="icons/level.svg" alt="Level" className={styles.icon} />
                                                Level {user.level}
                                            </p>
                                        </div>
                                    </div>
                                    <p> <strong>{user.challengesCompleteds}</strong> desafios concluidos</p>
                                    <strong>{user.userExperience} XP</strong>
                                </div>

                            ))}
                        </main>
                    </div>
                )}
        </Layout>
    )

}

Ranked.getInitialProps = async props => {
    console.info('##### Congratulations! You are authorized! ######', props);
    return {};
};

export default WithPrivateRoutes(Ranked);



