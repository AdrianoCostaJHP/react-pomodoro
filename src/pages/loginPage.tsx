import { signIn, signOut, useSession } from 'next-auth/client';
import styles from '../styles/pages/LoginPage.module.css';
import { FaArrowRight, FaGithub } from 'react-icons/fa';
import Head from 'next/head';


export default function LoginPage() {
    const [session, loading] = useSession();
    return (
        <div className={styles.container}>
            <Head>
            <title>Login | Pomodore </title>
            </Head>

            <main className={styles.containerMain}>
                <strong>Bem-vindo</strong>

                <div className={styles.Git} >
                    <FaGithub color="#dcdde0" size={29}/>
                    <p>Faça login com seu GitHub para começar</p>
                </div>
                    <button type="button" onClick={() => signIn('github', { callbackUrl: 'http://localhost:3000' })}>
                        <p>Fazer login</p>
                        <FaArrowRight color="#FFF" size={24}/>
                    </button>

            </main>
        </div>
        
    )
}
