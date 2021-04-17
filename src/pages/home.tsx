import React, { useEffect, useState } from 'react';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import styles from '../styles/pages/Home.module.css';
import axios from 'axios';

import Layout from '../components/Layout';
import Loading from '../components/Loading';
import WithPrivateRoutes from '../components/WithPrivateRoutes';

import { ChallengesProvider } from '../contexts/Challenges';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { CountdownProvider } from '../contexts/CountdownContext';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { ChallengeBox } from '../components/ChallengeBox';
import { Profile } from '../components/Profile';

function Home(props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (props) {
      setLoading(false);
    }
  }, [])


  return (
    <ChallengesProvider level={props.props.level} userExperience={props.props.userExperience} challengesCompleteds={props.props.challengesCompleteds}>
      {loading ? (<Loading />) : (
        <Layout>
          <div className={styles.container}>
            <Head>
              <title>Inicio | Pomodore </title>
            </Head>
            <div className={styles.expContainer}>
              <ExperienceBar />
            </div>
            <CountdownProvider>
              <section className={styles.containerSection}>
                <div >
                  <Profile />
                  <CompletedChallenges />
                  <Countdown />
                </div>
                <div>
                  <ChallengeBox />
                </div>
              </section>
            </CountdownProvider>
          </div>
        </Layout>
      )}
    </ChallengesProvider>

  )
}

Home.getInitialProps = async context => {
  console.info('##### Congratulations! You are authorized! ######', context);
  return await getServerProps(context)
};

export default WithPrivateRoutes(Home);

export async function getServerProps(context) {
  const session = await getSession(context)
  if (!session.user.email) {
    const { level, userExperience, challengesCompleteds } = context.req.cookies;
    return {
      props: {
        level: Number(level),
        userExperience: Number(userExperience),
        challengesCompleteds: Number(challengesCompleteds)
      }
    }
  }

  const response = await axios.get('http://localhost:3000/api/user', {
    params: { email: session.user.email }
  });

  const data = response.data;

  if (data === '') {
    await axios.post('http://localhost:3000/api/rank', {
      email: session.user.email,
      name: session.user.name,
      uri_avatar: session.user.image,
      level: 1,
      userExperience: 0,
      challengesCompleteds: 0
    })
  }

  return {
    props: {
      level: data.level,
      userExperience: data.userExperience,
      challengesCompleteds: data.challengesCompleteds
    }
  }

}

