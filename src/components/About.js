    import '../css/About.css';
    import { Link } from 'react-router-dom';

    const About = () => {
    return (
        <div className="about-page-container">
        <h2 className="about-thankyou">
            Thank you for visiting our site. If you have items you are looking to
            donate, you can post them <Link to="/donate">HERE</Link>.
        </h2>
        <img
            className="about-image"
            src="https://i.imgur.com/hi9oecr.jpg"
            alt="about"
        />
        </div>
    );
    };

    export default About;
