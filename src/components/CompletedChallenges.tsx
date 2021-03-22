import { useContext } from 'react';
import { ChallengesContext } from '../contexts/Challenges';
import styles from '../styles/components/CompletedChallenges.module.css';

export function CompletedChallenges(){

    const {challengesCompleteds} = useContext(ChallengesContext);

    return(
        <div className={styles.completedContainer}>
            <span>Desafios Completos</span>
            <span>{challengesCompleteds}</span>
        </div>
    )
}