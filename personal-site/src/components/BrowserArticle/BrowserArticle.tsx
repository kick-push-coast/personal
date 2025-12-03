import { ReactNode } from 'react';
import { IntroText } from '../IntroText';
import { ProjectDetails } from '../ProjectDetails';
import classes from './browser-article.module.scss';

export enum ArticleTopic {
    Home,
    Skills,
    Experience
}

const topics = new Map<ArticleTopic, ReactNode>([
    [ArticleTopic.Home, <IntroText/>],
    [ArticleTopic.Skills,
    <>
        <h2>
            Skills 🪄
        </h2>
        <section>
            <h3>
                Languages & Frameworks
            </h3>
            <ul className={classes.columns}>
                <li>JavaScript</li>
                <li>TypeScript</li>
                <li>React</li>
                <li>Next.js</li>
                <li>Node.js</li>
                <li>Angular</li>
                <li>HTML</li>
                <li>CSS</li>
                <li>SASS/SCSS</li>
                <li>CSS Module</li>
                <li>Bootstrap</li>
                <li>Tailwind</li>
                <li>styled-components</li>
                <li>Emotion</li>
            </ul>
        </section>
        <section>
            <h3>
                Tooling, Testing, & Platforms
            </h3>
            <ul className={classes.columns}>
                <li>Git</li>
                <li>GitHub Actions</li>
                <li>AWS</li>
                <li>NPM</li>
                <li>Webpack</li>
                <li>Vite</li>
                <li>Jest + RTL</li>
                <li>Storybook</li>
                <li>Figma</li>
                <li>Jira</li>
                <li>Kibana</li>
                <li>Claude Code</li>

            </ul>
        </section>
        <section>
            <h3>
                Data & State
            </h3>
            <ul className={classes.columns}>
                <li>TanStack Query</li>
                <li>Redux</li>
                <li>RxJS</li>
                <li>Zod</li>
                <li>GraphQL</li>
                <li>REST Principles</li>
            </ul>
        </section>
        <section>
            <h3>
                Engineering Practices
            </h3>
            <ul className={classes.columns}>
                <li>Accessibility (WCAG)</li>
                <li>Performance Optimization</li>
                <li>SSR</li>
                <li>Design Systems</li>
                <li>UX/UI Fundamentals</li>
                <li>CI/CD</li>
                <li>Agile</li>
                <li>GDPR</li>
            </ul>
        </section>
        <br/>
        <br/>
        <h2>
            Education 🎓
        </h2>
        <section>
            <h3>
                Computer Science, B.A.
            </h3>
            <p>
                University of Minnesota<br/>
                Class of 2015<br/>
                Minor: New Media Studies
            </p>
        </section>
    </>],
    [ArticleTopic.Experience,
    <>
        <h2>
            Experience 🛠️
        </h2>
        <p className={classes.intro}>
            For <strong className={classes.emphasize}>8+ years</strong>, I've been fortunate to contribute in all stages of the product and software dev lifecycles. My work has spanned from end user-facing web implementations to admin web app development to a recent focus on leading design and delivery of developer tools.
        </p>
        <section>
            <h3>
                Cludo
            </h3>
            <p>
            A B2B SaaS provider specialized in enterprise search – data indexing, AI-enabled content discovery, and client SDKs for creating search UIs.
            </p>
            <br/>
            <br/>
            <ul className={classes.spaced}>
                <li>
                    <strong className={classes.emphasize}>Senior Software Engineer</strong><span className={classes.hideMobile}> / </span><span className={classes.hideDesktop}><br/></span>Jan 2023 → Present
                    <ul>
                        <li>Architected and built a React component library powering 40% of customer search traffic.</li>
                        <li>Maintained core JavaScript client services used by millions of users daily.</li>
                        <li>Developed internal Node.js services (scraping, analytics pipelines, revenue attribution).</li>
                        <li>Collaborated with backend teams on API design using TypeScript & Zod.</li>
                        <li>Owned accessibility (WCAG 2.2), privacy (GDPR), performance, and CI/CD initiatives.</li>
                        <li>Delivered tailored technical demos and proof-of-concept integrations for enterprise prospects.</li>
                        <li>Conducted technical feasibility assessments and translated requirements into integration plans.</li>
                        <li>Built pre-built templates and onboarding workflows that reduced integration time from weeks to days.</li>
                        <li>Partnered with sales, product, and implementation teams to influence roadmap and close deals.</li>
                        <li>Authored integration guides, RFP documentation, and architecture proposals.</li>
                        <li className={classes.featuredLinks}>
                            <div>
                                <a href="//react.cludo.com" target="_blank">React SDK Docs</a>
                            </div>
                        </li>
                        <li className={classes.featuredLinks}>
                            <div>
                                <a href="//www.cludo.com/cludo-developer-experience" target="_blank">REST API Docs</a>
                            </div>
                        </li>
                    </ul>
                </li>
                <br/>
                <li>
                    <strong className={classes.emphasize}>Software Engineer II, UX</strong><span className={classes.hideMobile}> / </span><span className={classes.hideDesktop}><br/></span>May 2021 → Jan 2023
                    <ul>
                        <li>Collaborated with designers on a partial redesign of the Cludo admin web app</li>
                        <li>Improved critical user journeys and introduced a new onboarding process to help new users learn the app</li>
                        <li>Maintained parity between Figma components and code</li>
                        <li className={classes.featuredLinks}>
                            <div>
                                <a href="//www.cludo.com/new-ui" target="_blank">Admin App Design</a>
                            </div>
                        </li>
                    </ul>
                </li>
                <br/>
                <li>
                    <strong className={classes.emphasize}>Software Engineer</strong><span className={classes.hideMobile}> / </span><span className={classes.hideDesktop}><br/></span>Jun 2019 → May 2021
                    <ul>
                        <li>Contributed as a core engineer for the admin web app using Angular and TypeScript</li>
                        <li>Applied suitable software design patterns to keep the web app robust and maintainable</li>
                        <li>Ensured comprehensive test coverage with Jasmine and Karma</li>
                    </ul>
                </li>
                <br/>
                <li>
                    <strong className={classes.emphasize}>Implementations Developer</strong><span className={classes.hideMobile}> / </span><span className={classes.hideDesktop}><br/></span>Sep 2017 → Jun 2019
                    <ul>
                        <li>Worked jointly with clients to create custom search implementations</li>
                        <li>Developed reusable, portable search UIs with ASP.NET templates and vanilla JavaScript</li>
                        <li>Offered ongoing technical support and consultation for clients</li>
                        {/* <li className={classes.featuredLinks}>
                            <div>
                                <a href="//www.cludo.com/search-results#?cludoquery=crawlers&cludopage=1&cludoinputtype=standard" target="_blank">SERP Implementation</a>
                            </div>
                        </li> */}
                    </ul>
                </li>
            </ul>
        </section>
        <section>
            <h3>
                LeeT Web Services
            </h3>
            <p>
                Dec 2015 → Aug 2017
            </p>
            <p>
                Provided freelance web development services primarily focused on CMS-backed content websites for small company clients.
            </p>
        </section>
        <section>
            <h3>
                Siemens | SysAdmin/Integrations Internship
            </h3>
            <p>
                Jan 2014 → Sep 2014
            </p>
            <p>
                Helped maintain development servers and assisted in hardware migrations. Wrote and managed build scripts for various developer environments.
            </p>
        </section>
    </>]
])

export const BrowserArticle = (props: { topic: ArticleTopic }) => {
    return (
        <>
            <article className={classes.container}>
                { topics.get(props.topic) }
            </article>
            { props.topic !== ArticleTopic.Home && 
                <ProjectDetails link='./resume.pdf' linkLabel='View full resume' /> }
        </>
    );
};