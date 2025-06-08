import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HeroSection from '../components/HeroSection';
import FeaturedPosts from '../components/FeaturedPosts';
import AboutSection from '../components/AboutSection';
import SocialLinks from '../components/SocialLinks';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  
  return (
    <Layout
      title="Home"
      description="Blog pessoal do Professor Gabriel Ramos - Compartilhando conhecimento e experiências em educação">
      <main>
        <HeroSection />
        <AboutSection />
        <FeaturedPosts />
        <SocialLinks />
      </main>
    </Layout>
  );
}

