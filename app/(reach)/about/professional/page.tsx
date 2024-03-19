'use client'

import React, { useState } from 'react';
import Image from 'next/image';

const openInNewTab = (url: string) => {
  const win = window.open(url, '_blank');
  win?.focus();
};

export default function Professional() {
  const [isHovered, setIsHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [category, setCategory] = useState(0);

  const imageClick = () => {
    setIsHovered(!isHovered);
    setClicked(!clicked);
  };

  const style = {
    profilepicture: {
      large: `absolute z-20 top-25 left-10 rounded-full overflow-x-hidden transition-all ease duration-200 ${isHovered ? 'cursor-pointer' : ''}`,
      small: `absolute z-20 top-25 left-10 rounded-full overflow-x-hidden transition-all ease duration-200 ${isHovered ? 'cursor-pointer' : ''}`
    },
  };

  const categories = [
    { index: 1, name: 'Timeline' },
    { index: 2, name: 'Developing' },
    { index: 3, name: 'Management' },
    { index: 4, name: 'Sales' },
  ];

  return (
    <main>
              <Image
                onClick={imageClick}
                priority
                src="/images/carlseaholmimage.jpg"
                className={`${clicked ? style.profilepicture.large : style.profilepicture.small}`}
                height={clicked ? 200 : 100}
                width={clicked ? 200 : 100}
                alt="Carl Seaholm Profile Photo"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
          <h1 className="flex text-6xl font-bold pt-5 pr-5 justify-end">Carl Seaholm</h1>
          <div className='flex flex-row justify-evenly pt-10'>
            {categories.map((category, index) => (
              <div key={index} className='flex flex-col justify-center' onClick={() => setCategory(index)}>
                <h2 className='text-2xl underline hover:text-slate-300'>{category.name}</h2>
                </div>
            ))}
          </div>
          <div className='flex flex-col justify-center'>
            {category === 1 && 
              'I have been developing software for over 20 years. I have worked with a variety of languages and platforms. I have worked with C#, Java, Python, and JavaScript. I have worked with a variety of platforms including Windows, Linux, and Android. I have worked with a variety of databases including SQL Server, MySQL, and SQLite. I have worked with a variety of web technologies including HTML, CSS, and JavaScript. I have worked with a variety of web frameworks including React, Angular, and Vue. I have worked with a variety of cloud platforms including AWS, Azure, and Google Cloud. I have worked with a variety of DevOps tools including Docker, Kubernetes, and Jenkins. I have worked with a variety of CI/CD tools including Travis CI, Circle CI, and GitHub Actions. I have worked with a variety of testing tools including JUnit, TestNG, and Selenium. I have worked with a variety of monitoring tools including New Relic, Datadog, and AppDynamics. I have worked with a variety of security tools including OWASP, Snyk, and Veracode. I have worked with a variety of performance tools including JMeter, LoadRunner, and BlazeMeter. I have worked with a variety of logging tools including Splunk, Loggly, and Logz.io. I have worked with a variety of APM tools including AppDynamics, Dynatrace, and New Relic. I have worked with a variety of observability tools including Honeycomb, Lightstep, and Instana. I have worked with a variety of incident management tools including PagerDuty, OpsGenie, and VictorOps. I have worked with a variety of collaboration tools including Slack, Microsoft Teams, and Zoom. I have worked with a variety of project management tools including Jira, Trello, and Asana. I have worked with a variety of version control tools including Git, Subversion, and Mercurial. I have worked with a variety of code review tools including GitHub, GitLab, and Bitbucket. I have worked with a variety of documentation tools including Confluence, Notion, and Google Docs. I have worked with a variety of knowledge management tools including Guru, Slab, and Tettra. I have worked with a variety of communication tools including Zoom, Slack, and Microsoft Teams. I have worked with a variety of training tools including Coursera, Udemy, and Pluralsight. I have worked with'}
            {category === 2 &&
              'I have been developing software for over 20 years. I have worked with a variety of languages and platforms. I have worked with C#, Java, Python, and JavaScript. I have worked with a variety of platforms including Windows, Linux, and Android. I have worked with a variety of databases including SQL Server, MySQL, and SQLite. I have worked with a variety of web technologies including HTML, CSS, and JavaScript. I have worked with a variety of web frameworks including React, Angular, and Vue. I have worked with a variety of cloud platforms including AWS, Azure, and Google Cloud. I have worked with a variety of DevOps tools including Docker, Kubernetes, and Jenkins. I have worked with a variety of CI/CD tools including Travis CI, Circle CI, and GitHub Actions. I have worked with a variety of testing tools including JUnit, TestNG, and Selenium. I have worked with a variety of monitoring tools including New Relic, Datadog, and AppDynamics. I have worked with a variety of security tools including OWASP, Snyk, and Veracode. I have worked with a variety of performance tools including JMeter, LoadRunner, and BlazeMeter. I have worked with a variety of logging tools including Splunk, Loggly, and Logz.io. I have worked with a variety of APM tools including AppDynamics, Dynatrace, and New Relic. I have worked with a variety of observability tools including Honeycomb, Lightstep, and Instana. I have worked with a variety of incident management tools including PagerDuty, OpsGenie, and VictorOps. I have worked with a variety of collaboration tools including Slack, Microsoft Teams, and Zoom. I have worked with a variety of project management tools including Jira, Trello, and Asana. I have worked with a variety of version control tools including Git, Subversion, and Mercurial. I have worked with a variety of code review tools including GitHub, GitLab, and Bitbucket. I have worked with a variety of documentation tools including Confluence, Notion, and Google Docs. I have worked with a variety of knowledge management tools including Guru, Slab, and Tettra. I have worked with a variety of communication tools including Zoom, Slack, and Microsoft Teams. I have worked with a variety of training tools including Coursera, Udemy, and Pluralsight. I have worked with'}
            {category === 3 &&
              'I have been developing software for over 20 years. I have worked with a variety of languages and platforms. I have worked with C#, Java, Python, and JavaScript. I have worked with a variety of platforms including Windows, Linux, and Android. I have worked with a variety of databases including SQL Server, MySQL, and SQLite. I have worked with a variety of web technologies including HTML, CSS, and JavaScript. I have worked with a variety of web frameworks including React, Angular, and Vue. I have worked with a variety of cloud platforms including AWS, Azure, and Google Cloud. I have worked with a variety of DevOps tools including Docker, Kubernetes, and Jenkins. I have worked with a variety of CI/CD tools including Travis CI, Circle CI, and GitHub Actions. I have worked with a variety of testing tools including JUnit, TestNG, and Selenium. I have worked with a variety of monitoring tools including New Relic, Datadog, and AppDynamics. I have worked with a variety of security tools including OWASP, Snyk, and Veracode. I have worked with a variety of performance tools including JMeter, LoadRunner, and BlazeMeter. I have worked with a variety of logging tools including Splunk, Loggly, and Logz.io. I have worked with a variety of APM tools including AppDynamics, Dynatrace, and New Relic. I have worked with a variety of observability tools including Honeycomb, Lightstep, and Instana. I have worked with a variety of incident management tools including PagerDuty, OpsGenie, and VictorOps. I have worked with a variety of collaboration tools including Slack, Microsoft Teams, and Zoom. I have worked with a variety of project management tools including Jira, Trello, and Asana. I have worked with a variety of version control tools including Git, Subversion, and Mercurial. I have worked with a variety of code review tools including GitHub, GitLab, and Bitbucket. I have worked with a variety of documentation tools including Confluence, Notion, and Google Docs. I have worked with a variety of knowledge management tools including Guru, Slab, and Tettra. I have worked with a variety of communication tools including Zoom, Slack, and Microsoft Teams. I have worked with a variety of training tools including Coursera, Udemy, and Pluralsight. I have worked with'}
            {category === 4 &&
              'I have been developing software for over 20 years. I have worked with a variety of languages and platforms. I have worked with C#, Java, Python, and JavaScript. I have worked with a variety of platforms including Windows, Linux, and Android. I have worked with a variety of databases including SQL Server, MySQL, and SQLite. I have worked with a variety of web technologies including HTML, CSS, and JavaScript. I have worked with a variety of web frameworks including React, Angular, and Vue. I have worked with a variety of cloud platforms including AWS, Azure, and Google Cloud. I have worked with a variety of DevOps tools including Docker, Kubernetes, and Jenkins. I have worked with a variety of CI/CD tools including Travis CI, Circle CI, and GitHub Actions. I have worked with a variety of testing tools including JUnit, TestNG, and Selenium. I have worked with a variety of monitoring tools including New Relic, Datadog, and AppDynamics. I have worked with a variety of security tools including OWASP, Snyk, and Veracode. I have worked with a variety of performance tools including JMeter, LoadRunner, and BlazeMeter. I have worked with a variety of logging tools including Splunk, Loggly, and Logz.io. I have worked with a variety of APM tools including AppDynamics, Dynatrace, and New Relic. I have worked with a variety of observability tools including Honeycomb, Lightstep, and Instana. I have worked with a variety of incident management tools including PagerDuty, OpsGenie, and VictorOps. I have worked with a variety of collaboration tools including Slack, Microsoft Teams, and Zoom. I have worked with a variety of project management tools including Jira, Trello, and Asana. I have worked with a variety of version control tools including Git, Subversion, and Mercurial. I have worked with a variety of code review tools including GitHub, GitLab, and Bitbucket. I have worked with a variety of documentation tools including Confluence, Notion, and Google Docs. I have worked with a variety of knowledge management tools including Guru, Slab, and Tettra. I have worked with a variety of communication tools including Zoom, Slack, and Microsoft Teams. I have worked with a variety of training tools including Coursera, Udemy, and Pluralsight. I have worked with'}
          </div>
            
    </main>
  );
}