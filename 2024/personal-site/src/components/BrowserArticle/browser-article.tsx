import { ReactNode } from 'react';
import classes from './browser-article.module.scss';

export enum ArticleTopic {
    Home,
    Skills,
    Experience,
    Education
}

const topics = new Map<ArticleTopic, ReactNode>([
    [ArticleTopic.Home,
    <>
        <h2>
            Howdy 👋
        </h2>
        <h3>
            My name is Mike
        </h3>
        <p>
            I have 6+ years of experience as a <strong>Software Engineer</strong> with a frontend focus + 1 year of experience as a <strong>Technical PM</strong>, all in a startup/scale-up environment
        </p>
        <p className={classes.hideMobile}>
            Tab around a bit to get to know me :-)
        </p>
    </>],
    [ArticleTopic.Skills,
    <>
        <h2>
            Skills 🪄
        </h2>
        <h3>
            Languages
        </h3>
        <ul>
            <li>JavaScript</li>
            <li>TypeScript</li>
            <li>PHP</li>
            <li>C#</li>
            <li>HTML</li>
            <li>CSS</li>
            <li>SCSS</li>
        </ul>
        <h3>
            Libraries & Frameworks
        </h3>
        <ul>
            <li>React</li>
            <li>Angular</li>
            <li>ASP.NET</li>
            <li>Bootstrap</li>
            <li>Tailwind</li>
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
            <li>Figma</li>
            <li>Storybook</li>
            <li>Jira</li>
        </ul>
        <h3>
            Concepts
        </h3>
        <ul>
            <li>Accessibility</li>
            <li>Responsive Design</li>
            <li>Software Design Patterns</li>
            <li>UX/UI Fundamentals</li>
            <li>Competitor Analysis</li>
            <li>User Research</li>
            <li>Agile</li>
        </ul>
    </>],
    [ArticleTopic.Experience,
    <>
        <h2>
            Experience 🧪
        </h2>
        <h3>
            Cludo
        </h3>
        <p>
            Sep 2017 - Present
        </p>
        <p>
            Cludo offers a collection of SaaS products for building and managing site search. These include automated data source scraping, developer toolsets for creating custom search solutions, and an admin web app for configuring search indices and search relevance.
        </p>
        <ul>
            <li>
                <strong>Technical Product Manager</strong><span className={classes.hideMobile}> | </span><span className={classes.hideDesktop}><br/></span>Dec 2022 - Present
                <ul>
                    <li>Led a team of engineers focused on building developer tools</li>
                    <li>Collaborated with partner agencies to design practical component sets and APIs that meet real developer needs</li>
                    <li>Built and released a React SDK that decreased development time for search UI implementations by up to 30% (documented at: <a href="//react.cludo.com" target="_blank">react.cludo.com</a>)</li>
                    <li>Wrote public-facing technical documentation for various toolsets (cataloged at: <a href="//www.cludo.com/cludo-developer-experience-0?hs_preview=PCthItJq-87790382543" target="_blank">cludo.com/cludo-developer-experience</a>)</li>
                    <li>Continued to contribute code, code review, and consultation on software design patterns</li>
                </ul>
            </li>
            <br/>
            <li>
                <strong>Lead UX Engineer</strong><span className={classes.hideMobile}> | </span><span className={classes.hideDesktop}><br/></span>May 2021 - Dec 2022
                <ul>
                    <li>Worked jointly with the design team on a near-complete overhaul of the Cludo admin web app</li>
                    <li>Iteratively refined the most essential user journeys leading to an improvement in measured user sentiment</li>
                    <li>Maintained parity between components in Figma and components in code</li>
                </ul>
            </li>
            <br/>
            <li>
                <strong>Product Software Engineer</strong><span className={classes.hideMobile}> | </span><span className={classes.hideDesktop}><br/></span>Jun 2019 - May 2021
                <ul>
                    <li>Contributed as a core engineer for the Cludo admin web app built with Angular and TypeScript</li>
                    <li>Applied various software design patterns to keep codebase robust and maintainable</li>
                    <li>Ensured broad test coverage with Jasmine and Karma</li>
                </ul>
            </li>
            <br/>
            <li>
                <strong>Frontend Developer</strong><span className={classes.hideMobile}> | </span><span className={classes.hideDesktop}><br/></span>Sep 2017 - Jun 2019
                <ul>
                    <li>Worked with clients to create custom search implementations according to their specifications</li>
                    <li>Built re-usable search UI templates in the ASP.NET web framework</li>
                    <li>Provided ongoing technical support and consultation for clients</li>
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
            Offered freelance web development services primarily focused on CMS-backed content websites for small company clients.
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
    </>]
])
export const BrowserArticle = (props: { topic: ArticleTopic }) => {

    return (
        <article className={classes.container}>
            {topics.get(props.topic)}
        </article>
    );
};