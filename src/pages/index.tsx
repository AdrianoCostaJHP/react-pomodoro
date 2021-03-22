import React from 'react';
import {GetServerSideProps} from 'next';
import Head from 'next/head';
import styles from '../styles/pages/Home.module.css';


import { ChallengesProvider } from '../contexts/Challenges';
import { CompletedChallenges } from '../components/CompletedChallenges';
import {CountdownProvider} from '../contexts/CountdownContext';
import { Countdown } from '../components/Countdown';
import {ExperienceBar} from '../components/ExperienceBar';
import {ChallengeBox} from '../components/ChallengeBox';
import { Profile } from '../components/Profile';
import { SideBar } from '../components/SideBar';


interface HomeProps{
  level: number;
  userExperience: number;
  challengesCompleteds:number;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider level={props.level} userExperience = {props.userExperience} challengesCompleteds={props.challengesCompleteds}>
      <div className={styles.container}>
        <Head>
          <title>Inicio | Pomodore </title>
        </Head>
        <SideBar/>
        <div className={styles.containerData}>
          <ExperienceBar/>
        <CountdownProvider>
          <section className={styles.containerSection}>
            <div >
              <Profile/>
              <CompletedChallenges/>
              <Countdown/>
            </div>
            <div>
              <ChallengeBox/>
            </div>
          </section>
        </CountdownProvider>
        </div>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps : GetServerSideProps  = async (ctx) =>{
  const  {level, userExperience, challengesCompleteds} = ctx.req.cookies;

  


  return {
    props: {
      level : Number(level),
      userExperience: Number(userExperience),
      challengesCompleteds: Number(challengesCompleteds)
    }
  }
}
