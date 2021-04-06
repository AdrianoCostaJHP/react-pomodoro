import axios from 'axios';
import Head from 'next/head';
import styles from '../styles/pages/Ranked.module.css';
import Layout from '../components/Layout';

interface userData {
_id: string;
uri_avatar: string;
level: number;
userExperience: number;
challengesCompleteds: number;
}

 export default function Ranked({data}){
     console.log(data);


    return(
        <div className={styles.container}>
            <Head>
            <title>Ranked | Pomodore </title>
            </Head>
            
            <Layout>

            <div className={styles.containerData}>
            <header>
                <strong>Ranked</strong>
            </header>
            
            <main>
                {data.map((user: userData) =>(
                        
                    <div >
                        <div className={styles.profile} key={user._id} >
                            <img src={user.uri_avatar} alt="avatar"  />
                            <div>
                                <strong>Adriano Costa</strong>
                                <p>
                                    <img src="icons/level.svg" alt="Level"/>
                                    Level {user.level}
                                </p>
                            </div>
                        </div>
                        <p>{user.challengesCompleteds} desafios concluidos</p>
                        <p>{user.userExperience} XP</p>
                    </div>

                        ))}
            </main>
            </div>
            </Layout>
        </div>
    )

}

export async function getServerSideProps() {
    const response = await axios.get('http://localhost:3000/api/rank');
    const data = response.data;
    return {
        props:{
            data
        }
    }
}



