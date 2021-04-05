import { useContext} from 'react';
import { ChallengesContext } from '../contexts/Challenges';
import {useSession} from 'next-auth/client';
import styles from '../styles/components/Profile.module.css';


export function Profile(){
    const {level} = useContext(ChallengesContext);
    const [session] = useSession();
    
    return(
        <div className={styles.profileContainer}>
            {session && <>
                <img src= {session.user.image} alt="perfil GitHub"/>
            </>}
            <div>
            {session && <>
                <strong>{session.user.name}</strong>
            </>}
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level {level}
                </p>
            </div>
        </div>
    )
}