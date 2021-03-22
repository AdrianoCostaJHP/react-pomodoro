import { useContext, useState } from 'react';
import { ChallengesContext } from '../contexts/Challenges';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox(){

    const {activeChallenge, resetChallenge, completeChallenge} = useContext(ChallengesContext);
    const {resetCountdown} = useContext(CountdownContext);

    function handleChallengeSucesso(){
        completeChallenge();
        resetCountdown();
    }

    function handleChallengeFailed(){
        resetCountdown();
        resetChallenge(); 
    }

    return(
        <div className={styles.challengeBoxContainer}>
            {activeChallenge? (
                <div className={styles.challengeActive}>
                    <header> Ganhe {activeChallenge.amount} xp</header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} />
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button
                        type="button"
                        className={styles.buttonFalha}
                        onClick={handleChallengeFailed}
                        >Falhei</button>

                        <button
                        type="button"
                        className={styles.buttonSucesso}
                        onClick={handleChallengeSucesso}
                        >Completei</button>
                    </footer>
                </div>
            ):(
                <>
                    <div className={styles.challengeNotActive}>
                        <strong>Inicie um ciclo para receber desafios a serem completados</strong>
                        <p>
                            <img src="icons/level-up.svg" alt="Level Up"/>
                            Avance de level completando desafios
                        </p>
                    </div>
                </>
            )}
            
        </div>

        
    )
}