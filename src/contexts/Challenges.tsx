import {createContext, useState, ReactNode, useEffect} from 'react';
import axios from 'axios';
import {getSession, signIn} from 'next-auth/client';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';


interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    userExperience: number;
    challengesCompleteds:number;

}
interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}
interface ChallengesDataType {
    level: number;
    userExperience: number;
    experienceToNextLevel: number;
    challengesCompleteds: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeModalLevelUp: () => void;
    
}


    

export const ChallengesContext = createContext({} as ChallengesDataType);

export function ChallengesProvider({children, ...rest}: ChallengesProviderProps){

    const [level, setLevel] = useState(rest.level ?? 1);
    const [userExperience, setUserExperience] = useState(rest.userExperience ?? 0);
    const [challengesCompleteds, setChallengesCompleteds] = useState(rest.challengesCompleteds ?? 0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [levelUpOpenModal, setLevelUpOpenModal] = useState(false);

    const experienceToNextLevel = Math.pow((level+1)*4,2)

    useEffect( () =>{
        Notification.requestPermission();
        
    },[])

    useEffect( () =>{
        async function authenticationSession(){
            const session = await getSession();
            if(!session){
                signIn('github', { callbackUrl: 'http://localhost:3000'})
            }else{
                console.log(session);
            }
        }
        authenticationSession();
        Cookies.set('level', String(level));
        Cookies.set('userExperience', String(userExperience));
        Cookies.set('challengesCompleteds', String(challengesCompleteds));

    }, [level, userExperience, challengesCompleteds])


    function levelUp(){
        setLevel(level+1);
        setLevelUpOpenModal(true);
        saveUserData();
    }

    function closeModalLevelUp(){
        setLevelUpOpenModal(false);
    }

    function startNewChallenge(){
        const randomChallenge = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallenge];

        setActiveChallenge(challenge);
        new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted'){
            new Notification('Novo desafio!', { 
                body: `Valendo ${challenge.amount}xp!`
            });
        }
    }

    async function saveUserData(){
        const session = await getSession();
        await axios.post('/api/rank', {
            email: session.user.email,
            uri_avatar: session.user.image,
            level: level,
            userExperience: userExperience,
            challengesCompleteds: challengesCompleteds

        })
    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    function completeChallenge(){
        if(!activeChallenge){
            return;
        }

        const {amount} = activeChallenge;
        let finalExperience = userExperience + amount;


        if(finalExperience > experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }
        
        setUserExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleteds(challengesCompleteds+1)
    }

    return(
        <ChallengesContext.Provider value={{
            level, 
            userExperience, 
            challengesCompleteds, 
            activeChallenge,
            experienceToNextLevel,
            levelUp,
            startNewChallenge,
            resetChallenge,
            completeChallenge,
            closeModalLevelUp
            }}>
            {children}

            {levelUpOpenModal && <LevelUpModal/>}
        </ChallengesContext.Provider>

    )
}