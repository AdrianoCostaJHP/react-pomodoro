import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { connectToDataBase } from '../utils/mongodb';
import axios from 'axios';
import styles from '../styles/pages/RankPage.module.css';
import { SideBar } from '../components/SideBar';

interface userData {

_id: string;
uri_avatar: string;
level: number;
userExperience: number;
challengesCompleteds: number;
}

export default function rankPage(props){
    
    const[user, setUser] = useState(props.data);
    useEffect( () =>{
        console.log(props);
    })

    

    return(
        <div className={styles.container}>
        <SideBar />
        <div className={styles.containerData}>
            <header>
                <strong>Ranked</strong>
            </header>
            
                {user.map((user: userData) =>(
                    <main>
                        
                        <div className={styles.profile}>
                            <img src={user.uri_avatar} alt="avatar" />
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

                    </main>
                ))}
            </div>
        </div>
    )
}

export const getServerSideProps : GetServerSideProps  = async () =>{

    const response = await axios.get('http://localhost:3000/api/rank');
    const data = response.data;
    
  
    return {
      props: {
        data: data
      }
    }
  }