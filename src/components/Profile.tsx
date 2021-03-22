import { useContext, useEffect } from 'react';
import { ChallengesContext } from '../contexts/Challenges';
import {getSession, signIn, useSession} from 'next-auth/client';
import styles from '../styles/components/Profile.module.css';


export function Profile(){
    const {level} = useContext(ChallengesContext);
    const [session] = useSession();

    /*useEffect( () =>{
        async function authenticationSession(){
            const session = await getSession();
            if(!session){
                signIn('github', { callbackUrl: 'http://localhost:3000'})
            }else{
                console.log(session);
            }
        }

        authenticationSession();
    },[])*/
    
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