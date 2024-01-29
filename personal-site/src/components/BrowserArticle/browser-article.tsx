import { ReactNode } from 'react';
import classes from './browser-article.module.scss';
import { IntroText } from '../IntroText';

export enum ArticleTopic {
    Home,
    Skills,
    Experience,
    Education
}

const topics = new Map<ArticleTopic, ReactNode>([
    [ArticleTopic.Home, <IntroText/>],
    [ArticleTopic.Skills,
    <>
        <h2>
            Skills 🪄
        </h2>
        <h3>
            Languages & Frameworks
        </h3>
        <ul>
            <li>JavaScript</li>
            <li>TypeScript</li>
            <li>React</li>
            <li>Angular</li>
            <li>Node.js</li>
            <li>PHP</li>
            <li>HTML</li>
            <li>CSS</li>
            <li>SCSS</li>
            <li>Bootstrap</li>
            <li>Tailwind</li>
            <li>C#</li>
            <li>ASP.NET</li>
        </ul>
        <h3>
            Tools & Platforms
        </h3>
        <ul>
            <li>Git</li>
            <li>GitHub</li>
            <li>NPM</li>
            <li>Webpack</li>
            <li>Vite</li>
            <li>Jest</li>
            <li>Jasmine + Karma</li>
            <li>Swagger</li>
            <li>Figma</li>
            <li>Storybook</li>
            <li>Jira</li>
            <li>TeamCity</li>
        </ul>
        <h3>
            Concepts
        </h3>
        <ul>
            <li>Accessibility</li>
            <li>Responsive Design</li>
            <li>Software Design Patterns</li>
            <li>REST Principles</li>
            <li>UX/UI Fundamentals</li>
            <li>Design Systems</li>
            <li>Competitor Analysis</li>
            <li>User Research</li>
            <li>CI/CD</li>
            <li>Agile</li>
        </ul>
        <br/>
        <br/>
        <h3 className={classes.hideMobile}>
            <a href="./resume.pdf" target="_blank">
                Full resume &#8594;
            </a>
        </h3>
    </>],
    [ArticleTopic.Experience,
    <>
        <h2>
            Experience 🔧
        </h2>
        <h3>
            Cludo
        </h3>
        <p>
            Sep 2017 - Present
        </p>
        <p>
            Cludo provides B2B SaaS products for enterprise-level site search, offering automated data source scraping, developer toolsets, and an admin web app for configuring search indices and relevance.
        </p>
        <ul>
            <li>
                <strong>Technical Product Manager</strong><span className={classes.hideMobile}> | </span><span className={classes.hideDesktop}><br/></span>Dec 2022 - Present
                <ul>
                    <li>Led a team of engineers focused on creating developer tools</li>
                    <li>Collaborated with partner agencies to design practical component sets and APIs</li>
                    <li>Developed and launched a React SDK reducing search UI implementation time by up to 30% (documented at: <a href="//react.cludo.com" target="_blank">react.cludo.com</a>)</li>
                    <li>Authored public-facing technical documentation for developer toolsets (cataloged at: <a href="//www.cludo.com/cludo-developer-experience-0?hs_preview=PCthItJq-87790382543" target="_blank">cludo.com/cludo-developer-experience</a>)</li>
                    <li>Continued code contributions, code reviews, and software design consultations</li>
                </ul>
            </li>
            <br/>
            <li>
                <strong>Lead UX Engineer</strong><span className={classes.hideMobile}> | </span><span className={classes.hideDesktop}><br/></span>May 2021 - Dec 2022
                <ul>
                    <li>Collaborated on revamping the Cludo admin web app with the design team</li>
                    <li>Improved critical user journeys, positively impacting measured user sentiment</li>
                    <li>Maintained parity between Figma-designed components and code</li>
                </ul>
            </li>
            <br/>
            <li>
                <strong>Product Software Engineer</strong><span className={classes.hideMobile}> | </span><span className={classes.hideDesktop}><br/></span>Jun 2019 - May 2021
                <ul>
                    <li>Contributed as a core engineer for the Cludo admin web app using Angular and TypeScript</li>
                    <li>Applied software design patterns for code robustness and maintainability</li>
                    <li>Ensured comprehensive test coverage with Jasmine and Karma</li>
                </ul>
            </li>
            <br/>
            <li>
                <strong>Frontend Developer</strong><span className={classes.hideMobile}> | </span><span className={classes.hideDesktop}><br/></span>Sep 2017 - Jun 2019
                <ul>
                    <li>Worked jointly with clients to create tailored search implementations</li>
                    <li>Developed reusable, portable search UIs with ASP.NET templates and vanilla JavaScript</li>
                    <li>Offered ongoing technical support and consultation for clients</li>
                </ul>
            </li>
        </ul>
        <br/>
        <br/>
        <h3>
            LeeT Web Services
        </h3>
        <p>
            Dec 2015 - Aug 2017
        </p>
        <p>
            Provided freelance web development services primarily focused on CMS-backed content websites for small company clients.
        </p>
        <br/>
        <br/>
        <h3>
            Siemens | SysAdmin/Integrations Internship
        </h3>
        <p>
            Jan 2014 - Sep 2014
        </p>
        <p>
            Helped maintain development servers and assisted in hardware migrations. Wrote and managed build scripts for various developer environments.
        </p>
        <br/>
        <br/>
        <h3 className={classes.hideMobile}>
            <a href="./resume.pdf" target="_blank">
                Full resume &#8594;
            </a>
        </h3>
    </>],
    [ArticleTopic.Education,
    <>
        <h2>
            Education 🎓
        </h2>
        <h3>
            Computer Science, B.A.
        </h3>
        <p>
            University of Minnesota<br/>
            Class of 2015<br/>
            Minor: New Media Studies
        </p>
        <br/>
        <br/>
        <h3>
            <a href="./resume.pdf" target="_blank">
                Full resume &#8594;
            </a>
        </h3>
    </>]
])

export const BrowserArticle = (props: { topic: ArticleTopic }) => {
    return (
        <article className={classes.container}>
            { topics.get(props.topic) }
        </article>
    );
};