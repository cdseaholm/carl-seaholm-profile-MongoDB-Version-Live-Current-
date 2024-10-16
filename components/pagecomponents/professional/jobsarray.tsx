
const jobsArray =[
{
    company: "ERP Automated",
    title: "Team Lead",
    date: {startDate: '2023-08' , endDate: '2024-04' },
    descriptions: [`Revamped site front-end to be more dynamic, user-friendly, engages users more, and pushes users to correct/trackable CTAs. This improved site speeds by 33% and 40% increase in CTA clicks.`, `Created customizable pricing sheets using JavaScript for each user to customize their own pricing plan from thousands of D365 license prices. This led to a 100% increase in speed when discussing pricing plans with potential customers.`, `Served as IT lead, navigating the team through email protection, unifying the team email system, and site protection`, `Built out entire Sales/Marketing functions for the company which are still in place today, resulting in 33% increases to revenue each quarter and nearly a dozen hours of work for leadership each week`, `Led the team through two D365 conferences as Sales and IT consultant to the team`],
    location: "Remote - Denver, CO",
    category: ['IT', 'Development', 'Sales/Marketing'],
    logo: '/images/erp.png',
    logoAlt: 'ERP Automated Logo'
},
{
    company: "Version2",
    title: "Strategic Partnerships",
    date: {startDate: '2023-02' , endDate: '2023-06' },
    descriptions: [
    "Help build out the Outbound SDR role to Brand Direct",
    "Generate 20 SQLs monthly, resulting in an average stream of $500k - $1 million",
    "Take 20 daily new leads to keep pipeline and sequences fresh and up to date",
    "Manage 1000s of accounts via Hubspot and Google Excel",
    "Take leads through a short slide deck to enhance their understanding of programmatic technology and Orion (Trade Side platform)"
    ],
    category: ['Management', 'Sales'],
    location: "Remote - Denver, CO",
    logo: '/images/v2.jpg',
    logoAlt: 'Version2 Logo'
},

{

    company: "Loom",
    title: "SDR/SDR Team Lead",
    date: {startDate: '2021-10' , endDate: '2022-11' },
    descriptions: ["Created the SDR system that is currently in place to help scale the team to a full 12 SDRs to support 20 Sales roles", "Took initiative on small accounts (less than 10 seats), to qualify and close the accounts", "Led the SDR team through meetings and trainings", "Led the SDR team through 12+ conferences that hit 100% of goals going into each Tech conference"],
    category: ['Sales', 'Management'],
    location: "Remote - Denver, CO",
    logo: '/images/loom.png',
    logoAlt: 'Loom Logo'
},

{

    company: 'WhiteSource',
    title: "Sales Development Representative",
    date: {startDate: '2021-04' , endDate: '2022-09' },
    descriptions: ["Take Inbound Leads through a 5-10 minute discovery call to qualify them for a demo.",
    "Generate 15 SQLs monthly, resulting in an average of 100k monthly",
    "Use SalesLoft to keep leads that are not ready for a demo, warm and up to date",
    "Provide AEs assistance with outbound into ten named accounts a month"],
    category: ['Sales'],
    location: "Remote - Denver, CO",
    logo: '/images/whitesource.png',
    logoAlt: 'WhiteSource Logo'
},

{
    company: 'Justworks',
    title: "Business Development Representative",
    date: {startDate: '2020-02' , endDate: '2020-12' },
    descriptions: ["Outbound to 100 leads daily",
    "Generate 10 SQLs monthly, resulting in an average of 100k monthly",
    "Reach out to old leads that might be ready to switch their HR and Payroll provider",
    "Provide AEs assistance with outbound into ten named accounts a month"],
    category: ['Sales'],
    location: "New York, New York",
    logo: '/images/justworks.png',
    logoAlt: 'Justworks Logo'
 },

{

    company: 'The Peak Beyond',
    title: "IT and Account based Manager",
    date: {startDate: '2018-03' , endDate: '2020-02' },
    descriptions: ["Manage 3 stores that use The Peak Beyond's smartboard technology",
    "Basic Technological Support and testing",
    "Hardware and Software Support"],
    category: ['IT', 'Management', 'Sales'],
    location: "Denver, CO",
    logo: '/images/peakbeyond.jpg',
    logoAlt: 'The Peak Beyond Logo'
 },

{

    company: 'Jumper Media',
    title: "Account Executive",
    date: {startDate: '2019-04' , endDate: '2020-01' },
    descriptions: ["Develop and manage a sales pipeline for existing account retention and growth",
   "Build strong rapport/relationships with key contacts and decision-makers",
    "Analyze the goals and objectives of each account to fully understand their current and future needs.",
 "Prepare written presentations and pricing proposal"],
    category: ['Sales'],
    location: "San Diego, CA",
    logo: '/images/jumper.png',
    logoAlt: 'Jumper Media Logo'
 },

{

    company: 'Vivax Pros',
    title: "Project Qualifier",
    date: {startDate: '2018-11' , endDate: '2019-04' },
    descriptions: ["Qualify leads for the Sales team to go out and give estimates for painting projects."],
    category: ['Sales'],
    location: "Denver, CO",
    logo: '/images/vivax.png',
    logoAlt: 'Vivax Pros Logo'
 },

{

    company: 'CanopyBoulder',
    title: "Internship",
    date: {startDate: '2018-01' , endDate: '2018-03' },
    descriptions: ["Assist Management with any projects needed",
    "Assist on CRM Website development",
    "Follow up on references for potential startups",
    "Slide deck creation"],
    category: ['Management'],
    location: "Boulder, CO",
    logo: '/images/canopy.jpg',
    logoAlt: 'CanopyBoulder Logo'
 },

{

    company: 'New Progress WordPress site',
    title: "Owner and Operator of New Progress Blog",
    date: {startDate: '2019-03' , endDate: '2023-02' },
    descriptions: ["Set up and managed Blog via Wordpress, creating custom templates and pages",
    "Basic Technological Support and testing",
    "HTML and CSS implementations and improvements to the site.", "Built a following of 100s of people and had 1000s of views monthly.", "I used WordPress, HTML, CSS, MailChimp, and Social Media advertising for this."],
    category: ['Development'],
    location: "Remote",
    logo: '/images/nplogo.png',
    logoAlt: 'New Progress Logo'
 },

{

    company: 'carlseaholm.com (Current)',
    title: "Developer and Creator",
    date: {startDate: '2024-01' , endDate: 'Today' },
    descriptions: ["Transitioning over my WordPress Blog to my own site using Vercel, Next.js, and React", "This blog will be combined with a Professional Profile for myself to allow others to see my personal life, professional life, as well as current projects I'm working on.", "In addition to the stack mentioned above (Vercel, Next.js, and React), I am writing this with tsx. For styling I am using Tailwind CSS. I am also using Prisma for my database and NextAuth for authentication."],
    category: ['Development'],
    location: "Remote",
    logo: '/images/carlseaholmimage.jpg',
    logoAlt: 'Carl Seaholm Logo'
 },
{
    company: 'New Progress Consulting (Current)',
    title: "CEO & Founder",
    date: {startDate: '2021-04' , endDate: 'Today' },
    descriptions: ["Led development of diverse web solutions including a static CPA/Financial site, and a modern apparel company", "Architected and implemented full-stack solutions to deliver scalable, manageable, and organized projects", "Managed complete project lifecycles from discovery through deployment, ensuring alignment between technical solutions and business objectives", "Implemented responsive front-ends using Next.js and TypeScript, focusing on performance, optimization and SEO best practices", "Tracked average increases in Site Visits by 110%, Action Clicks/Submissions by 50%, Session times by 20%, and Site load times by 15%", "Designed and built RESTful APIs integrating with MongoDB and AWS services to support scalable data management", "Maintained 100% client satisfaction rate while delivering projects on time if not 2 weeks ahead of schedule"],
    category: ['Software Engineering', 'Development'],
    location: "Remote",
    logo: '/images/nplogo.png',
    logoAlt: 'New Progress Logo'
 },

{
    company: 'New Progress Application Projects: NP Financr, NP Taskr, and NP Gamr (Current)',
    title: "Developer and Creator",
    date: {startDate: '2023-03' , endDate: 'Today' },
    descriptions: ["Have built 2 applications in 10 months for my own personal use. Planning to deploy 1 soon, then the others later.",
    "Taught myself to code building these apps with Frameworks, Libraries, and Languages such as React Native, EXPO Go, PostgreSQL, JavaScript, and Tailwind.", "All of these are still under development. I went into each application with the idea of making them free and easy to use.",
    "NP Financr is a light-weight intuitive Financial tracking application where the user gets to set up how they want to see their money. There is tons of customizability. Initially written with Flutter/Dart, I am currently rewriting this to use React Native with Expo Go.",
    "NP Trackr is a task manager for the productive individual. The issue with most Task management applications today is that they are overwhelming and are typically paid for, while not being worth the money. I hope to make it convenient, easy to use, and helpful.",
    "NP Gamr is a game application where a user can play many classic games for free. Taking lessons from Chess.com where a user can learn a host of games, track their scores against others and challenge themselves. (Yet to upload to Github as this app is still never early)."],
    category: ['Development'],
    location: "Remote",
    logo: '/images/nplogo.png',
    logoAlt: 'New Progress Logo'
 },
];

const schoolsArray = [
{

    school: "University of Colorado Boulder",
    degree: "Bachelor of Science",
    major: "Computer Science/Engineering",
    date: {startDate: '2023-02' , endDate: '2025-01' },
    location: "Boulder, CO",
    category: 'Education',
    logo: '/images/Colorado_Buffaloes_logo.svg.png',
    logoAlt: 'University of Colorado Boulder Logo'
 },

 {

    school: "University of Colorado Boulder",
    degree: "Bachelor of Science",
    major: "Marketing",
    date: {startDate: '2013-08' , endDate: '2016-12' },
    location: "Boulder, CO",
    category: 'Education',
    logo: '/images/Colorado_Buffaloes_logo.svg.png',
    logoAlt: 'University of Colorado Boulder Logo'
 },

{
    school: "Front Range Community College",
    degree: "General Education",
    major: "Associates",
    date: {startDate: '2012-08' , endDate: '2013-05' },
    location: "Wesminster, CO",
    category: 'Education',
    logo: '/images/frontrangelarge.jpg',
    logoAlt: 'Front Range Community College Logo'
 }]

export { jobsArray, schoolsArray  };