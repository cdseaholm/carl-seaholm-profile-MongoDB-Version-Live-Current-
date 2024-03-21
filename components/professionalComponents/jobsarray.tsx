import React from 'react';
import JobBite from './jobBite';

const jobOne = {
    id: 1,
    company: "ERP Automated",
    title: "Sales Devlopment Team Lead / Stand In IT Manager / Website Developer",
    date: "Aug 2023 - Jan 2024",
    descriptions: ["Set up, implement, and deploy an entire Sales/Marketing Function", "Filled in for IT in my most previous role (Email set-up and permissions, website debugging, API access/integrations, and virus protection)", "Enhance the teams Marketing capabilities and Web Presence", "Build custom tables and worksheets with HTML and Javascript. These were for the Sales team to send out and implemented into Landing Pages", "Re-work and enhance the company website from the ground up"],
    location: "Remote - Denver, CO",
    category: 'Engineering'
};

const jobTwo = {
    id: 2,
    company: "Version2",
    title: "Strategic Partnerships",
    date: "Feb 2023 - Jun 2023",
    descriptions: [
        "Help build out the Outbound SDR role to Brand Direct",
        "Generate 20 SQLs monthly, resulting in an average stream of $500k - $1 million",
        "Take 20 daily new leads to keep pipeline and sequences fresh and up to date",
        "Manage 1000s of accounts via Hubspot and Google Excel",
        "Take leads through a short slide deck to enhance their understanding of programmatic technology and Orion (Trade Side platform)"
    ],
    category: 'Management',
    location: "Remote - Denver, CO"
};

const jobThree = {
    id: 3,
    company: "Loom",
    title: "Sales Development Representative",
    date: "Sept 2021 - Oct 2022",
    descriptions: ["Help build out the Inbound and Outbound SDR role", "Generate 20 SQLs monthly, resulting in an average of 250k-400k monthly",
   "Use Outreach to keep pipeline and sequences fresh and up to date",
   "Provide AEs assistance with outbound into ten named accounts a month"],
    category: 'Sales',
    location: "Remote - Denver, CO"
};

const jobFour = {
    id: 4,
    company: 'WhiteSource',
    title: "Sales Development Representative",
    date: "Apr 2021 - Sept 2022",
    descriptions: ["Take Inbound Leads through a 5-10 minute discovery call to qualify them for a demo.",
    "Generate 15 SQLs monthly, resulting in an average of 100k monthly",
    "Use SalesLoft to keep leads that are not ready for a demo, warm and up to date",
    "Provide AEs assistance with outbound into ten named accounts a month"],
    category: 'Sales',
    location: "Remote - Denver, CO"
};

const jobFive = {
    id: 5,
    company: 'Justworks',
    title: "Business Development Representative",
    date: "Feb 2020 - Dec 2020",
    descriptions: ["Outbound to 100 leads daily",
    "Generate 10 SQLs monthly, resulting in an average of 100k monthly",
    "Reach out to old leads that might be ready to switch their HR and Payroll provider",
    "Provide AEs assistance with outbound into ten named accounts a month"],
    category: 'Sales',
    location: "New York, New York"
};

const jobSix = {
    id: 6,
    company: 'The Peak Beyond',
    title: "IT and Account based Manager",
    date: "Mar 2018 - Feb 2020",
    descriptions: ["Manage 3 stores that use The Peak Beyond's smartboard technology",
    "Basic Technological Support and testing",
    "Hardware and Software Support"],
    category: 'IT',
    location: "Denver, CO"
};

const jobSeven = {
    id: 7,
    company: 'Jumper Media',
    title: "Account Executive",
    date: "Apr 2019 - Jan 2020",
    descriptions: ["Develop and manage a sales pipeline for existing account retention and growth",
   "Build strong rapport/relationships with key contacts and decision-makers",
    "Analyze the goals and objectives of each account to fully understand their current and future needs.",
     "Prepare written presentations and pricing proposal"],
    category: 'Sales',
    location: "San Diego, CA"
};

const jobEight = {
    id: 8,
    company: 'Vivax Pros',
    title: "Project Qualifier",
    date: "Nov 2018 - Apr 2019",
    descriptions: ["Qualify leads for the Sales team to go out and give estimates for painting projects."],
    category: 'Sales',
    location: "Denver, CO"
};

const jobNine = {
    id: 9,
    company: 'CanopyBoulder',
    title: "Internship",
    date: "Jan 2018 - Mar 2018",
    descriptions: ["Assist Management with any projects needed",
    "Assist on CRM Website development",
    "Follow up on references for potential startups",
    "Slide deck creation"],
    category: 'Management',
    location: "Boulder, CO"
};

const jobTen = {
    id: 10,
    company: 'New Progress',
    title: "Owner/Operator of New Progress Blog",
    date: "Mar 2019 - Feb 2023",
    descriptions: ["Set up and managed Blog via Wordpress, creating custom templates and pages",
    "Basic Technological Support and testing",
    "HTML and CSS implementations and improvements to the site"],
    category: 'Engineering/Web Development',
    location: "Remote"
};

const jobEleven = {
    id: 11,
    company: 'New Progress',
    title: "Owner/Operator of New Progress Blog",
    date: "Mar 2019 - Feb 2023",
    descriptions: ["Set up and managed Blog via Wordpress, creating custom templates and pages",
    "Basic Technological Support and testing",
    "HTML and CSS implementations and improvements to the site"],
    category: 'Engineering/Web Development',
    location: "Remote"
};

const jobTwelve = {
    id: 12,
    company: 'New Progress',
    title: "Owner/Operator of New Progress Blog",
    date: "Mar 2019 - Feb 2023",
    descriptions: ["Have built 2 applications in 10 months for my own personal use. Planning to deploy 1 soon, then the others later.",
    "Taught myself to code building these apps with Frameworks, Libraries, Languages, and more written above. All of these are still under development. I went into each application with the idea of making the free and easy to use.",
    "NP Financr is a light-weight intuitive Financial tracking application where the user gets to set up how they want to see their money. There is tons of customizability. I am currently rewriting this to use React Native with Expo Go.",
    "NP Taskr is a task manager for the productive individual. The issue with most Task management applications today is that they are overwhelming and are typically paid for, while not being worth the money. I hope to make it convenient, easy to use, and helpful.",
    "NP Gamr is a game application where a user can play many classic games for free. Taking lessons from Chess.com where a user can learn a host of games, track their scores against others and challenge themselves. (Yet to upload to Github as this app is still never early)."],
    category: 'Engineering/Web Development',
    location: "Remote"
};

const jobsArray = [jobOne, jobTwo, jobThree, jobFour, jobFive, jobSix, jobSeven, jobEight, jobNine, jobTen, jobEleven, jobTwelve];

export default jobsArray;