import { ReactNode } from 'react';
import { IntroText } from '../IntroText';
import classes from './browser-article.module.scss';

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
        <ul className={classes.columns}>
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
        <ul className={classes.columns}>
            <li>Git</li>
            <li>GitHub</li>
            <li>NPM</li>
            <li>Webpack</li>
            <li>Vite</li>
            <li>OpenAI</li>
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
        <ul className={classes.columns}>
            <li>Accessibility</li>
            <li>Responsive Design</li>
            <li>Software Design Patterns</li>
            <li>REST Principles</li>
            <li>UX/UI Fundamentals</li>
            <li>Design Systems</li>
            <li>Prompt Design</li>
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
        <p className={classes.intro}>
            Over the past <strong className={classes.emphasize}>7+ years</strong>, I've been exposed to all stages of the PDLC/SDLC. My work has spanned from consumer-facing web implementations to SaaS app development to a recent focus of leading design and delivery of developer tools.
        </p>
        <h3>
            Cludo
        </h3>
        <p>
        A B2B SaaS provider specialized in enterprise search – data indexing, AI-enabled content discovery, and client SDKs for creating search UIs.
        </p>
        <br/>
        <br/>
        <ul>
            <li>
                <strong>Technical Product Manager</strong><span className={classes.hideMobile}> / </span><span className={classes.hideDesktop}><br/></span>JAN2023 → PRESENT
                <ul>
                    <li>Led a team of engineers to develop a React SDK for creating custom search UIs</li>
                    <li>Conducted user research and iterated on technical designs for components and APIs</li>
                    <li>Contributed code and mentored junior engineers throughout the process</li>
                    <li className={classes.featuredLinks}>
                        <div>
                            <a href="//react.cludo.com" target="_blank">React SDK Docs</a>
                        </div>
                    </li>
                    <li>Saw a transformation in how developers interface with Cludo search, with the SDK becoming the method of choice for most</li>
                    <li>Authored public-facing technical documentation for the SDK and other developer resources</li>
                    <li className={classes.featuredLinks}>
                        <div>
                            <a href="//www.cludo.com/cludo-developer-experience" target="_blank">REST API Docs</a>
                        </div>
                    </li>
                </ul>
            </li>
            <br/>
            <li>
                <strong>Software Engineer II, UX</strong><span className={classes.hideMobile}> / </span><span className={classes.hideDesktop}><br/></span>MAY2021 → JAN2023
                <ul>
                    <li>Collaborated with designers on a partial redesign of the Cludo web app</li>
                    <li>Improved critical user journeys and introduced a new onboarding process to help new users learn the app</li>
                    <li>Maintained parity between Figma-designed components and code</li>
                    <li className={classes.featuredLinks}>
                        <div>
                            <a href="//www.cludo.com/new-ui" target="_blank">Admin App Design</a>
                        </div>
                    </li>
                </ul>
            </li>
            <br/>
            <li>
                <strong>Software Engineer</strong><span className={classes.hideMobile}> / </span><span className={classes.hideDesktop}><br/></span>JUN2019 → MAY2021
                <ul>
                    <li>Contributed as a core engineer for the admin web app using Angular and TypeScript</li>
                    <li>Applied suitable software design patterns to keep the web app robust and maintainable</li>
                    <li>Ensured comprehensive test coverage with Jasmine and Karma</li>
                </ul>
            </li>
            <br/>
            <li>
                <strong>Frontend Developer</strong><span className={classes.hideMobile}> / </span><span className={classes.hideDesktop}><br/></span>SEP2017 → JUN2019
                <ul>
                    <li>Worked jointly with clients to create custom search implementations</li>
                    <li>Developed reusable, portable search UIs with ASP.NET templates and vanilla JavaScript</li>
                    <li>Offered ongoing technical support and consultation for clients</li>
                    <li className={classes.featuredLinks}>
                        <div>
                            <a href="//www.cludo.com/search-results#?cludoquery=crawlers&cludopage=1&cludoinputtype=standard" target="_blank">SERP Implementation</a>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
        <br/>
        <br/>
        <h3>
            LeeT Web Services
        </h3>
        <p>
            DEC2015 → AUG2017
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
            JAN2014 → SEP2014
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