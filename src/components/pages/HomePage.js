import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat, faRunning, faAppleAlt, faBed, faUsers, faChartLine, faBrain, faLightbulb, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { motion, useAnimation, useViewportScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './HomePage.css';

const HomePage = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const stressLevelChart = useRef(null);
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  const testimonials = [
    {
      quote: "This revolutionary tool has completely transformed my understanding of stress. I've seen a 40% increase in my productivity!",
      author: "Sarah J., Tech Entrepreneur",
      image: "https://via.placeholder.com/100"
    },
    {
      quote: "The personalized insights have helped me manage my work-life balance effectively. I feel more in control than ever.",
      author: "Michael R., Project Manager",
      image: "https://via.placeholder.com/100"
    },
    {
      quote: "As a healthcare professional, I'm impressed by the scientific approach. It's a game-changer in stress management.",
      author: "Dr. Emily L., Psychologist",
      image: "https://via.placeholder.com/100"
    }
  ];

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  useEffect(() => {
    if (stressLevelChart.current) {
      const ctx = stressLevelChart.current.getContext('2d');
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(52, 152, 219, 0.8)');
      gradient.addColorStop(1, 'rgba(52, 152, 219, 0.2)');

      const drawChart = () => {
        ctx.clearRect(0, 0, 400, 200);
        ctx.beginPath();
        ctx.moveTo(0, 200);
        for (let i = 0; i < 400; i++) {
          ctx.lineTo(i, 200 + Math.sin(i * 0.05 + Date.now() * 0.001) * 50);
        }
        ctx.lineTo(400, 200);
        ctx.fillStyle = gradient;
        ctx.fill();
      };

      const animate = () => {
        drawChart();
        requestAnimationFrame(animate);
      };

      animate();
    }
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="home-content">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Link to="/" className="title-link">
          Stress Research Analyzer
        </Link>
      </motion.h1>
      <motion.p
        className="intro-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Track and analyze your stress levels with precision using advanced AI and machine learning algorithms
      </motion.p>

      <motion.section
        className="about-section"
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={fadeInUp}
        transition={{ duration: 0.8 }}
      >
        <h2>Revolutionizing Stress Management</h2>
        <p>
          The Stress Research Analyzer is at the forefront of mental health technology, utilizing cutting-edge AI and biometric data analysis to provide unprecedented insights into your stress patterns.
        </p>
        <p>
          Our platform goes beyond simple tracking, offering personalized strategies and real-time interventions to help you not just manage, but master your stress responses.
        </p>
      </motion.section>

      <section className="info-section">
        <h2>The Science of Stress</h2>
        <motion.div 
          className="stress-visual"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <canvas ref={stressLevelChart} width="400" height="200"></canvas>
          <p>Real-time visualization of stress levels</p>
        </motion.div>
        <p>
          Stress is more than just a feeling - it's a complex physiological response that affects every system in your body. Our analyzer uses advanced algorithms to interpret these responses, giving you a comprehensive view of your stress profile.
        </p>
      </section>

      <motion.section 
        className="tips-section"
        variants={staggerChildren}
        initial="hidden"
        animate="visible"
      >
        <h2>Holistic Stress Management</h2>
        <div className="tips-grid">
          {[
            { icon: faHeartbeat, title: "Biofeedback Training", description: "Learn to control your physiological responses with real-time feedback." },
            { icon: faRunning, title: "Adaptive Exercise Plans", description: "Personalized workout routines that adjust based on your stress levels." },
            { icon: faAppleAlt, title: "Nutrition Optimization", description: "AI-driven diet suggestions to boost resilience and energy." },
            { icon: faBed, title: "Sleep Enhancement", description: "Advanced sleep tracking and optimization techniques." },
            { icon: faUsers, title: "Social Support AI", description: "Virtual support system that adapts to your social needs." },
            { icon: faBrain, title: "Cognitive Restructuring", description: "AI-assisted techniques to reframe stressful thoughts." }
          ].map((tip, index) => (
            <motion.div
              key={index}
              className="tip-item"
              variants={fadeInUp}
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={tip.icon} size="2x" />
              <h3>{tip.title}</h3>
              <p>{tip.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <section className="animation-section">
        <h2>Our Innovative Approach</h2>
        <div className="animation-container">
          {[
            { icon: faChartLine, text: "Analyze" },
            { icon: faBrain, text: "Adapt" },
            { icon: faLightbulb, text: "Improve" }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="animated-box"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 1,
                delay: index * 0.5
              }}
            >
              <FontAwesomeIcon icon={item.icon} size="2x" />
              <span>{item.text}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <motion.section 
        className="benefits-section"
        style={{ scale }}
      >
        <h2>The Impact of Advanced Stress Management</h2>
        <div className="benefits-grid">
          {[
            { title: "Enhanced Mental Clarity", description: "Sharpen your focus and decision-making abilities." },
            { title: "Improved Physical Health", description: "Boost your immune system and overall vitality." },
            { title: "Emotional Resilience", description: "Develop stronger coping mechanisms for life's challenges." },
            { title: "Career Advancement", description: "Perform better under pressure and stand out professionally." }
          ].map((benefit, index) => (
            <motion.div
              key={index}
              className="benefit-item"
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)" }}
              initial="hidden"
              animate={controls}
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <section className="testimonials-section">
        <h2>Success Stories</h2>
        <div className="testimonial-carousel">
          <motion.div
            key={currentTestimonial}
            className="testimonial"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <img src={testimonials[currentTestimonial].image} alt="User" className="testimonial-image" />
            <blockquote>
              {testimonials[currentTestimonial].quote}
            </blockquote>
            <p className="testimonial-author">{testimonials[currentTestimonial].author}</p>
          </motion.div>
          <button className="testimonial-nav prev" onClick={prevTestimonial}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button className="testimonial-nav next" onClick={nextTestimonial}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Revolutionize Your Stress Management?</h2>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
        >
          <Link to="/signup" className="cta-button">
            Start Your Journey
            <motion.span
              className="cta-arrow"
              animate={{ x: isHovering ? 10 : 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;
