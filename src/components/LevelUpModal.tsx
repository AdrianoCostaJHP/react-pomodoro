import { useContext } from 'react';
import { ChallengesContext } from '../contexts/Challenges';
import styles from '../styles/components/LevelUpModal.module.css';

export function LevelUpModal(){
    const {level, closeModalLevelUp} = useContext(ChallengesContext);

    return(

        <div className={styles.overlay}>
            <div className={styles.container}>
                <header>{level}</header>

                <strong>Parabéns</strong>
                <p>Você conseguiu subir de level</p>
                <button type="button" onClick={closeModalLevelUp}>
                    <img src="/icons/close.svg" alt="Fechar Modal"/>
                </button>
            </div>
        </div>
    )
}