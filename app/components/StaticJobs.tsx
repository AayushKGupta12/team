'use client';

import { useState } from 'react';
import { ExternalLink, MapPin, Users, ChevronDown, ChevronUp } from 'lucide-react';

type Company = {
  name: string;
  website: string;
  description: string;
  tags: string[];
  employees: string;
  location: string;
};

type Section = {
  id: string;
  title: string;
  subtitle: string;
  accent: string;
  tagBg: string;
  tagText: string;
  iconBg: string;
  iconText: string;
  borderHover: string;
  companies: Company[];
};

// ─── MAANG / Big Tech (40+) ───────────────────────────────────────────────────
const maangCompanies: Company[] = [
  { name: 'Google', website: 'https://careers.google.com/', description: 'Multinational technology company specializing in search, advertising, cloud computing, and AI.', tags: ['SaaS', 'AI/ML', 'Cloud'], employees: '~200,000', location: 'Mountain View, CA' },
  { name: 'Microsoft', website: 'https://careers.microsoft.com/', description: 'Develops software, hardware, and cloud services including Windows, Office, Azure, and AI.', tags: ['SaaS', 'PaaS', 'AI'], employees: '~230,000', location: 'Redmond, WA' },
  { name: 'Meta', website: 'https://www.metacareers.com/', description: 'Operates Facebook and Instagram, expanding into VR, AR, and artificial intelligence.', tags: ['Social Media', 'AI', 'VR/AR'], employees: '~70,000', location: 'Menlo Park, CA' },
  { name: 'Amazon', website: 'https://www.amazon.jobs/', description: 'Leader in e-commerce, cloud computing via AWS, digital streaming, and AI technologies.', tags: ['E-commerce', 'IaaS', 'AI'], employees: '~1,600,000', location: 'Seattle, WA' },
  { name: 'Apple', website: 'https://jobs.apple.com/', description: 'Designs consumer electronics, software, and services including iPhone, Mac, and iCloud.', tags: ['Consumer Tech', 'Software'], employees: '~165,000', location: 'Cupertino, CA' },
  { name: 'Netflix', website: 'https://jobs.netflix.com/', description: 'Subscription-based streaming service offering films, TV shows, and original content.', tags: ['Streaming', 'SaaS'], employees: '~15,000', location: 'Los Gatos, CA' },
  { name: 'NVIDIA', website: 'https://www.nvidia.com/en-us/about-nvidia/careers/', description: 'Develops GPUs and SoCs for gaming, AI, high-performance computing, and automotive.', tags: ['GPUs', 'AI', 'HPC'], employees: '~40,000', location: 'Santa Clara, CA' },
  { name: 'Tesla', website: 'https://www.tesla.com/careers', description: 'Designs electric vehicles, energy storage, and solar energy products worldwide.', tags: ['EV', 'Energy', 'AI'], employees: '~140,000', location: 'Austin, TX' },
  { name: 'Salesforce', website: 'https://www.salesforce.com/company/careers/', description: 'World leading CRM platform with cloud applications for sales, service, and marketing.', tags: ['SaaS', 'CRM', 'Cloud'], employees: '~78,000', location: 'San Francisco, CA' },
  { name: 'Adobe', website: 'https://www.adobe.com/careers.html', description: 'Provides creative and digital experience software including Photoshop and Creative Cloud.', tags: ['SaaS', 'Creative', 'AI'], employees: '~32,000', location: 'San Jose, CA' },
  { name: 'Intel', website: 'https://jobs.intel.com/', description: 'Semiconductor company designing and manufacturing CPUs, GPUs, and AI accelerators.', tags: ['Semiconductors', 'AI', 'HPC'], employees: '~124,000', location: 'Santa Clara, CA' },
  { name: 'AMD', website: 'https://careers.amd.com/', description: 'Designs high-performance CPUs and GPUs for gaming, data center, and AI workloads.', tags: ['Semiconductors', 'GPUs', 'AI'], employees: '~26,000', location: 'Santa Clara, CA' },
  { name: 'Qualcomm', website: 'https://www.qualcomm.com/company/careers', description: 'Designs wireless technology and semiconductors powering smartphones and IoT devices.', tags: ['Semiconductors', '5G', 'IoT'], employees: '~51,000', location: 'San Diego, CA' },
  { name: 'Twitter / X', website: 'https://careers.x.com/', description: 'Global social media and microblogging platform being rebuilt as an everything app.', tags: ['Social Media', 'AI', 'Ads'], employees: '~1,500', location: 'San Francisco, CA' },
  { name: 'Spotify', website: 'https://www.lifeatspotify.com/', description: 'World\'s largest music streaming platform with podcasts, audiobooks, and AI recommendations.', tags: ['Streaming', 'AI', 'SaaS'], employees: '~9,000', location: 'Stockholm, Sweden' },
  { name: 'Uber', website: 'https://www.uber.com/careers/', description: 'Global platform for ride-hailing, food delivery, and freight logistics.', tags: ['Mobility', 'Marketplace'], employees: '~35,000', location: 'San Francisco, CA' },
  { name: 'Airbnb', website: 'https://careers.airbnb.com/', description: 'Online marketplace for short-term home rentals and travel experiences worldwide.', tags: ['Marketplace', 'Travel'], employees: '~6,900', location: 'San Francisco, CA' },
  { name: 'LinkedIn', website: 'https://careers.linkedin.com/', description: 'Professional networking platform and job marketplace owned by Microsoft.', tags: ['SaaS', 'Recruiting', 'Social'], employees: '~20,000', location: 'Sunnyvale, CA' },
  { name: 'PayPal', website: 'https://careers.pypl.com/', description: 'Global digital payments platform enabling online money transfers and commerce.', tags: ['Fintech', 'Payments'], employees: '~27,000', location: 'San Jose, CA' },
  { name: 'Snap', website: 'https://careers.snap.com/', description: 'Camera and social media company behind Snapchat and augmented reality technology.', tags: ['Social Media', 'AR', 'Ads'], employees: '~5,300', location: 'Santa Monica, CA' },
  { name: 'Pinterest', website: 'https://www.pinterestcareers.com/', description: 'Visual discovery platform connecting people with ideas for fashion, home, and more.', tags: ['Social Media', 'E-commerce'], employees: '~3,000', location: 'San Francisco, CA' },
  { name: 'Shopify', website: 'https://www.shopify.com/careers', description: 'E-commerce platform empowering millions of merchants to sell online and offline.', tags: ['E-commerce', 'SaaS', 'Payments'], employees: '~12,000', location: 'Ottawa, Canada' },
  { name: 'Stripe', website: 'https://stripe.com/jobs', description: 'Financial infrastructure for the internet, powering payments for millions of businesses.', tags: ['Fintech', 'Payments', 'API'], employees: '~8,000', location: 'San Francisco, CA' },
  { name: 'Atlassian', website: 'https://www.atlassian.com/company/careers', description: 'Builds collaboration tools like Jira, Confluence, and Trello for software teams.', tags: ['SaaS', 'DevTools'], employees: '~14,000', location: 'Sydney, Australia' },
  { name: 'Zoom', website: 'https://careers.zoom.us/', description: 'Video communications platform powering meetings, webinars, and team chat globally.', tags: ['SaaS', 'Video', 'Collaboration'], employees: '~7,400', location: 'San Jose, CA' },
  { name: 'Twilio', website: 'https://careers.twilio.com/', description: 'Cloud communications platform providing APIs for voice, SMS, and messaging.', tags: ['SaaS', 'API', 'CPaaS'], employees: '~6,000', location: 'San Francisco, CA' },
  { name: 'Databricks', website: 'https://www.databricks.com/company/careers', description: 'Unified data analytics platform combining data engineering, science, and AI.', tags: ['Data', 'AI/ML', 'Cloud'], employees: '~6,000', location: 'San Francisco, CA' },
  { name: 'Snowflake', website: 'https://careers.snowflake.com/', description: 'Cloud data platform enabling data sharing and analytics across organizations.', tags: ['Data', 'Cloud', 'SaaS'], employees: '~7,000', location: 'Bozeman, MT' },
  { name: 'Cloudflare', website: 'https://www.cloudflare.com/careers/', description: 'Global network security and performance platform protecting millions of websites.', tags: ['Security', 'CDN', 'Cloud'], employees: '~4,000', location: 'San Francisco, CA' },
  { name: 'GitHub', website: 'https://github.com/about/careers', description: 'World leading code hosting and collaboration platform owned by Microsoft.', tags: ['DevTools', 'SaaS', 'AI'], employees: '~3,000', location: 'San Francisco, CA' },
  { name: 'HubSpot', website: 'https://www.hubspot.com/jobs', description: 'Inbound marketing, sales, and CRM software for businesses of all sizes.', tags: ['SaaS', 'CRM', 'Marketing'], employees: '~7,400', location: 'Cambridge, MA' },
  { name: 'ServiceNow', website: 'https://careers.servicenow.com/', description: 'Cloud-based workflow automation platform for IT, HR, and customer service.', tags: ['SaaS', 'ITSM', 'Automation'], employees: '~22,000', location: 'Santa Clara, CA' },
  { name: 'Workday', website: 'https://www.workday.com/en-us/company/careers.html', description: 'Enterprise cloud applications for finance, HR, and planning.', tags: ['SaaS', 'HRM', 'ERP'], employees: '~19,000', location: 'Pleasanton, CA' },
  { name: 'Palantir', website: 'https://www.palantir.com/careers/', description: 'Data analytics and AI platforms for defense, intelligence, and commercial sectors.', tags: ['AI', 'Data', 'Analytics'], employees: '~3,800', location: 'Denver, CO' },
  { name: 'DoorDash', website: 'https://careers.doordash.com/', description: 'Food delivery and local commerce platform operating across the US and internationally.', tags: ['Delivery', 'Marketplace'], employees: '~21,000', location: 'San Francisco, CA' },
  { name: 'Lyft', website: 'https://www.lyft.com/careers', description: 'Ride-sharing platform connecting passengers and drivers across North America.', tags: ['Mobility', 'Marketplace'], employees: '~4,000', location: 'San Francisco, CA' },
  { name: 'Block (Square)', website: 'https://careers.block.xyz/', description: 'Financial services and payments company including Square, Cash App, and Afterpay.', tags: ['Fintech', 'Payments', 'Crypto'], employees: '~13,000', location: 'San Francisco, CA' },
  { name: 'Coinbase', website: 'https://www.coinbase.com/careers', description: 'Cryptocurrency exchange platform offering trading, staking, and Web3 infrastructure.', tags: ['Crypto', 'Fintech', 'Web3'], employees: '~3,500', location: 'San Francisco, CA' },
  { name: 'Intuit', website: 'https://www.intuit.com/careers/', description: 'Financial software company behind TurboTax, QuickBooks, and Mint.', tags: ['Fintech', 'SaaS'], employees: '~19,000', location: 'Mountain View, CA' },
  { name: 'Oracle', website: 'https://www.oracle.com/corporate/careers/', description: 'Provides database software, cloud infrastructure, and enterprise applications globally.', tags: ['IaaS', 'PaaS', 'Database'], employees: '~165,000', location: 'Austin, TX' },
  { name: 'SAP', website: 'https://jobs.sap.com/', description: 'Enterprise software company powering business operations across 180 countries.', tags: ['ERP', 'SaaS', 'Cloud'], employees: '~105,000', location: 'Walldorf, Germany' },
];

// ─── Product Based (40+) ─────────────────────────────────────────────────────
const productCompanies: Company[] = [
  { name: 'Zoho', website: 'https://www.zoho.com/careers/', description: 'Cloud-based business software suite including CRM, productivity, and collaboration tools.', tags: ['SaaS', 'CRM'], employees: '~16,000', location: 'Chennai, India' },
  { name: 'Flipkart', website: 'https://www.flipkartcareers.com/', description: 'India\'s leading e-commerce platform offering electronics, fashion, and lifestyle products.', tags: ['E-commerce', 'Marketplace'], employees: '~25,000', location: 'Bengaluru, India' },
  { name: 'Notion', website: 'https://www.notion.so/careers', description: 'All-in-one workspace for notes, wikis, and project management used by millions globally.', tags: ['SaaS', 'Productivity'], employees: '~500', location: 'San Francisco, CA' },
  { name: 'Figma', website: 'https://www.figma.com/careers/', description: 'Collaborative interface design tool used by designers and product teams worldwide.', tags: ['SaaS', 'Design', 'Collaboration'], employees: '~1,200', location: 'San Francisco, CA' },
  { name: 'Canva', website: 'https://www.canva.com/careers/', description: 'Online graphic design platform with AI tools used by 170 million people globally.', tags: ['SaaS', 'Design', 'AI'], employees: '~4,000', location: 'Sydney, Australia' },
  { name: 'Asana', website: 'https://asana.com/jobs', description: 'Work management platform helping teams organize, track, and manage their work.', tags: ['SaaS', 'Project Mgmt'], employees: '~1,700', location: 'San Francisco, CA' },
  { name: 'Monday.com', website: 'https://monday.com/careers', description: 'Work OS platform enabling teams to build custom workflow apps and track projects.', tags: ['SaaS', 'No-Code', 'PM'], employees: '~2,300', location: 'Tel Aviv, Israel' },
  { name: 'Intercom', website: 'https://www.intercom.com/careers', description: 'Customer messaging platform for sales, marketing, and support teams with AI agents.', tags: ['SaaS', 'CX', 'AI'], employees: '~800', location: 'San Francisco, CA' },
  { name: 'Zendesk', website: 'https://jobs.zendesk.com/', description: 'Customer service platform providing CRM, support ticketing, and help desk solutions.', tags: ['SaaS', 'CRM', 'CX'], employees: '~5,700', location: 'San Francisco, CA' },
  { name: 'Freshworks', website: 'https://careers.freshworks.com/', description: 'SaaS company building easy-to-use CRM and customer support software for businesses.', tags: ['SaaS', 'CRM', 'ITSM'], employees: '~7,500', location: 'San Mateo, CA' },
  { name: 'Postman', website: 'https://www.postman.com/careers/', description: 'API platform for building and testing APIs used by 30 million developers globally.', tags: ['DevTools', 'API', 'SaaS'], employees: '~500', location: 'San Francisco, CA' },
  { name: 'HashiCorp', website: 'https://www.hashicorp.com/careers', description: 'Infrastructure automation software for cloud provisioning, security, and networking.', tags: ['DevOps', 'Cloud', 'Security'], employees: '~2,200', location: 'San Francisco, CA' },
  { name: 'Elastic', website: 'https://www.elastic.co/careers', description: 'Search-powered solutions company behind Elasticsearch, Kibana, and the ELK stack.', tags: ['Data', 'Search', 'Observability'], employees: '~3,500', location: 'Mountain View, CA' },
  { name: 'MongoDB', website: 'https://www.mongodb.com/careers', description: 'Developer data platform built around MongoDB, Atlas, and data services for modern apps.', tags: ['Database', 'Cloud', 'Developer'], employees: '~5,000', location: 'New York, NY' },
  { name: 'Confluent', website: 'https://www.confluent.io/careers/', description: 'Data streaming platform built on Apache Kafka for real-time event-driven applications.', tags: ['Data Streaming', 'Cloud'], employees: '~3,000', location: 'Mountain View, CA' },
  { name: 'Datadog', website: 'https://careers.datadoghq.com/', description: 'Monitoring and analytics platform for cloud-scale applications, infrastructure, and security.', tags: ['Observability', 'SaaS', 'DevOps'], employees: '~6,000', location: 'New York, NY' },
  { name: 'PagerDuty', website: 'https://www.pagerduty.com/careers/', description: 'Digital operations management platform for incident response and AIOps automation.', tags: ['SaaS', 'DevOps', 'AIOps'], employees: '~1,000', location: 'San Francisco, CA' },
  { name: 'GitLab', website: 'https://about.gitlab.com/jobs/', description: 'Complete DevSecOps platform for software development from planning to production.', tags: ['DevOps', 'SaaS', 'Security'], employees: '~2,200', location: 'Remote' },
  { name: 'Vercel', website: 'https://vercel.com/careers', description: 'Frontend cloud platform for deploying web applications with Next.js and CI/CD.', tags: ['Cloud', 'DevTools', 'PaaS'], employees: '~500', location: 'San Francisco, CA' },
  { name: 'Netlify', website: 'https://www.netlify.com/careers/', description: 'Web hosting and automation platform for modern web projects and composable architectures.', tags: ['Cloud', 'DevTools', 'JAMstack'], employees: '~400', location: 'San Francisco, CA' },
  { name: 'Contentful', website: 'https://www.contentful.com/careers/', description: 'Headless CMS platform for creating and managing digital content across all channels.', tags: ['SaaS', 'CMS', 'API'], employees: '~900', location: 'Berlin, Germany' },
  { name: 'Amplitude', website: 'https://amplitude.com/careers', description: 'Digital analytics platform helping product teams understand user behavior and journeys.', tags: ['Analytics', 'SaaS', 'Product'], employees: '~700', location: 'San Francisco, CA' },
  { name: 'Segment', website: 'https://www.twilio.com/en-us/segment/careers', description: 'Customer data platform for collecting, cleaning, and routing data across the stack.', tags: ['CDP', 'Data', 'SaaS'], employees: '~600', location: 'San Francisco, CA' },
  { name: 'Brex', website: 'https://www.brex.com/company/careers', description: 'Financial software and corporate cards platform built for startups and modern businesses.', tags: ['Fintech', 'SaaS', 'Cards'], employees: '~1,100', location: 'San Francisco, CA' },
  { name: 'Plaid', website: 'https://plaid.com/careers/', description: 'Financial data network connecting banks and fintech apps via open banking APIs.', tags: ['Fintech', 'API', 'Open Banking'], employees: '~1,500', location: 'San Francisco, CA' },
  { name: 'Rippling', website: 'https://www.rippling.com/careers', description: 'HR, IT, and finance platform managing the entire employee lifecycle in one system.', tags: ['HRTech', 'SaaS', 'IT'], employees: '~3,000', location: 'San Francisco, CA' },
  { name: 'Gusto', website: 'https://gusto.com/about/careers', description: 'People platform for payroll, benefits, and HR management for small and medium businesses.', tags: ['HRTech', 'SaaS', 'Payroll'], employees: '~2,800', location: 'San Francisco, CA' },
  { name: 'Carta', website: 'https://carta.com/about/jobs/', description: 'Equity management platform for startups, investors, and employees to manage cap tables.', tags: ['Fintech', 'SaaS', 'Equity'], employees: '~1,800', location: 'San Francisco, CA' },
  { name: 'Miro', website: 'https://miro.com/careers/', description: 'Online visual collaboration platform for teams to brainstorm, design, and plan together.', tags: ['SaaS', 'Collaboration', 'Design'], employees: '~1,800', location: 'San Francisco, CA' },
  { name: 'Webflow', website: 'https://webflow.com/about/careers', description: 'No-code website builder enabling designers to build production-ready sites visually.', tags: ['SaaS', 'No-Code', 'Design'], employees: '~900', location: 'San Francisco, CA' },
  { name: 'Airtable', website: 'https://airtable.com/careers', description: 'Low-code platform for building collaborative apps and databases without engineering.', tags: ['SaaS', 'No-Code', 'Database'], employees: '~900', location: 'San Francisco, CA' },
  { name: 'Retool', website: 'https://retool.com/careers', description: 'Low-code platform for building internal tools, dashboards, and admin panels quickly.', tags: ['SaaS', 'Low-Code', 'DevTools'], employees: '~400', location: 'San Francisco, CA' },
  { name: 'Linear', website: 'https://linear.app/careers', description: 'Issue tracking and project management tool built for high-performance engineering teams.', tags: ['SaaS', 'DevTools', 'PM'], employees: '~100', location: 'San Francisco, CA' },
  { name: 'Sentry', website: 'https://sentry.io/careers/', description: 'Application monitoring platform for error tracking and performance monitoring for devs.', tags: ['DevTools', 'Observability', 'SaaS'], employees: '~600', location: 'San Francisco, CA' },
  { name: 'Supabase', website: 'https://supabase.com/careers', description: 'Open source Firebase alternative offering Postgres database, auth, and storage APIs.', tags: ['Open Source', 'Database', 'BaaS'], employees: '~150', location: 'Remote' },
  { name: 'Navan (TripActions)', website: 'https://navan.com/careers', description: 'Corporate travel and expense management platform powered by AI and automation.', tags: ['SaaS', 'Travel', 'Fintech'], employees: '~3,000', location: 'Palo Alto, CA' },
  { name: 'Loom', website: 'https://www.loom.com/careers', description: 'Asynchronous video messaging platform for teams to communicate and collaborate faster.', tags: ['SaaS', 'Video', 'Collaboration'], employees: '~350', location: 'San Francisco, CA' },
  { name: 'New Relic', website: 'https://newrelic.com/about/careers', description: 'Observability platform helping engineers plan, build, deploy, and run software reliably.', tags: ['Observability', 'SaaS'], employees: '~2,000', location: 'San Francisco, CA' },
  { name: 'Chargebee', website: 'https://www.chargebee.com/jobs/', description: 'Subscription billing and revenue management platform for SaaS and e-commerce businesses.', tags: ['SaaS', 'Billing', 'Fintech'], employees: '~1,000', location: 'San Francisco, CA' },
  { name: 'Whatfix', website: 'https://whatfix.com/careers/', description: 'Digital adoption platform helping users learn and use software applications faster.', tags: ['SaaS', 'DAP', 'EdTech'], employees: '~1,000', location: 'San Jose, CA' },
  { name: 'LeadSquared', website: 'https://www.leadsquared.com/careers/', description: 'Sales execution and marketing automation platform for high-velocity sales teams.', tags: ['SaaS', 'CRM', 'Marketing'], employees: '~1,500', location: 'Bengaluru, India' },
];

// ─── Service Based (40+) ─────────────────────────────────────────────────────
const serviceCompanies: Company[] = [
  { name: 'TCS', website: 'https://www.tcs.com/careers', description: 'Tata Consultancy Services — IT services, consulting, and business solutions across 46 countries.', tags: ['IT Services', 'Consulting', 'BPO'], employees: '~600,000', location: 'Mumbai, India' },
  { name: 'Infosys', website: 'https://www.infosys.com/careers/', description: 'Global leader in digital services and consulting with presence in 50+ countries.', tags: ['IT Services', 'Consulting'], employees: '~340,000', location: 'Bengaluru, India' },
  { name: 'Wipro', website: 'https://careers.wipro.com/', description: 'Technology services firm delivering cloud, AI, and engineering solutions globally.', tags: ['IT Services', 'Cloud', 'AI'], employees: '~250,000', location: 'Bengaluru, India' },
  { name: 'Accenture', website: 'https://www.accenture.com/us-en/careers', description: 'Global professional services company in strategy, consulting, technology, and operations.', tags: ['Consulting', 'Digital', 'Strategy'], employees: '~750,000', location: 'Dublin, Ireland' },
  { name: 'Cognizant', website: 'https://careers.cognizant.com/', description: 'IT services and consulting company helping clients transform their business operations.', tags: ['IT Services', 'Consulting'], employees: '~350,000', location: 'Teaneck, NJ' },
  { name: 'HCL Tech', website: 'https://www.hcltech.com/careers', description: 'Global technology company helping enterprises reimagine their businesses for the digital age.', tags: ['IT Services', 'Engineering'], employees: '~225,000', location: 'Noida, India' },
  { name: 'IBM', website: 'https://www.ibm.com/employment/', description: 'Technology and consulting company known for cloud, AI, and enterprise computing solutions.', tags: ['Cloud', 'AI', 'Consulting'], employees: '~282,000', location: 'Armonk, NY' },
  { name: 'Capgemini', website: 'https://www.capgemini.com/careers/', description: 'Global leader in consulting, digital transformation, technology, and engineering services.', tags: ['Consulting', 'Digital', 'Tech'], employees: '~360,000', location: 'Paris, France' },
  { name: 'Tech Mahindra', website: 'https://careers.techmahindra.com/', description: 'IT services company specializing in telecom, digital transformation, and consulting.', tags: ['IT Services', 'Telecom', 'AI'], employees: '~160,000', location: 'Pune, India' },
  { name: 'Mphasis', website: 'https://www.mphasis.com/careers.html', description: 'IT services company specializing in cloud, cognitive, and digital solutions for enterprises.', tags: ['IT Services', 'Cloud', 'AI'], employees: '~35,000', location: 'Bengaluru, India' },
  { name: 'L&T Technology', website: 'https://www.ltts.com/careers', description: 'Engineering services company offering product, process, and infrastructure digitalization.', tags: ['Engineering', 'R&D', 'IoT'], employees: '~23,000', location: 'Vadodara, India' },
  { name: 'DXC Technology', website: 'https://careers.dxc.com/', description: 'IT services company offering analytics, cloud, and cybersecurity solutions to enterprises.', tags: ['IT Services', 'Cloud', 'Security'], employees: '~130,000', location: 'Tysons, VA' },
  { name: 'Fujitsu', website: 'https://www.fujitsu.com/global/about/careers/', description: 'Japanese IT giant providing digital transformation, cloud, and AI services globally.', tags: ['IT Services', 'Cloud', 'AI'], employees: '~124,000', location: 'Tokyo, Japan' },
  { name: 'NTT Data', website: 'https://www.nttdata.com/global/en/about-us/careers', description: 'Global IT services and consulting company with expertise in managed services and cloud.', tags: ['IT Services', 'Consulting'], employees: '~190,000', location: 'Tokyo, Japan' },
  { name: 'Atos', website: 'https://atos.net/en/careers', description: 'Digital transformation company providing managed services, cloud, and cybersecurity.', tags: ['IT Services', 'Cloud', 'Security'], employees: '~110,000', location: 'Bezons, France' },
  { name: 'CGI Group', website: 'https://www.cgi.com/en/careers', description: 'IT services and consulting firm serving government and commercial clients globally.', tags: ['IT Services', 'Consulting', 'Gov-Tech'], employees: '~90,000', location: 'Montreal, Canada' },
  { name: 'Leidos', website: 'https://www.leidos.com/careers', description: 'Defense and technology solutions company specializing in IT, intelligence, and health.', tags: ['Defense', 'IT Services', 'Gov-Tech'], employees: '~47,000', location: 'Reston, VA' },
  { name: 'EPAM Systems', website: 'https://www.epam.com/careers', description: 'Software engineering and digital platform engineering services company.', tags: ['IT Services', 'Engineering'], employees: '~52,000', location: 'Newtown, PA' },
  { name: 'Luxoft', website: 'https://career.luxoft.com/', description: 'Technology services company specializing in automotive, finance, and telecom software.', tags: ['IT Services', 'Automotive', 'Finance'], employees: '~18,000', location: 'Zug, Switzerland' },
  { name: 'GlobalLogic', website: 'https://www.globallogic.com/careers/', description: 'Digital engineering services company offering product design and development globally.', tags: ['Engineering', 'Product Design'], employees: '~27,000', location: 'San Jose, CA' },
  { name: 'Mindtree', website: 'https://www.mindtree.com/careers', description: 'Digital transformation and technology services company, now part of the L&T group.', tags: ['IT Services', 'Digital', 'Cloud'], employees: '~37,000', location: 'Bengaluru, India' },
  { name: 'Hexaware', website: 'https://hexaware.com/careers/', description: 'IT services and business process outsourcing company serving global enterprises.', tags: ['IT Services', 'BPO', 'Cloud'], employees: '~30,000', location: 'Mumbai, India' },
  { name: 'Persistent Systems', website: 'https://www.persistent.com/careers/', description: 'Software services company focused on healthcare, financial services, and AI-driven products.', tags: ['IT Services', 'Healthcare', 'AI'], employees: '~23,000', location: 'Pune, India' },
  { name: 'Cyient', website: 'https://www.cyient.com/careers', description: 'Engineering and technology solutions company serving aerospace, rail, and utilities sectors.', tags: ['Engineering', 'Aerospace', 'Utilities'], employees: '~14,000', location: 'Hyderabad, India' },
  { name: 'Zensar Technologies', website: 'https://www.zensar.com/careers', description: 'Digital and technology solutions provider serving retail, manufacturing, and services.', tags: ['IT Services', 'Digital', 'Analytics'], employees: '~10,000', location: 'Pune, India' },
  { name: 'Coforge', website: 'https://www.coforge.com/careers', description: 'IT services company specializing in BFS, insurance, and travel digital solutions.', tags: ['IT Services', 'BFS', 'Insurance'], employees: '~23,000', location: 'Noida, India' },
  { name: 'Mastech Digital', website: 'https://www.mastechdigital.com/careers/', description: 'Digital transformation IT staffing and services firm serving Fortune 500 clients.', tags: ['IT Staffing', 'Digital', 'Analytics'], employees: '~6,000', location: 'Pittsburgh, PA' },
  { name: 'Deloitte Tech', website: 'https://www2.deloitte.com/global/en/careers.html', description: 'Consulting and technology arm of the Big Four providing digital and cloud services.', tags: ['Consulting', 'Cloud', 'AI'], employees: '~415,000', location: 'New York, NY' },
  { name: 'PwC Technology', website: 'https://www.pwc.com/gx/en/careers.html', description: 'Technology consulting arm of PwC focused on digital transformation and risk management.', tags: ['Consulting', 'Digital', 'Risk'], employees: '~364,000', location: 'London, UK' },
  { name: 'EY Technology', website: 'https://www.ey.com/en_gl/careers', description: 'Technology services division of Ernst & Young providing digital and advisory solutions.', tags: ['Consulting', 'Digital', 'AI'], employees: '~395,000', location: 'London, UK' },
  { name: 'KPMG Tech', website: 'https://home.kpmg/xx/en/home/careers.html', description: 'Digital and technology advisory services from one of the Big Four consulting firms.', tags: ['Consulting', 'Digital', 'Risk'], employees: '~265,000', location: 'Amsterdam, Netherlands' },
  { name: 'UST Global', website: 'https://www.ust.com/en/careers', description: 'Digital technology solutions company specializing in cloud, AI, and digital engineering.', tags: ['IT Services', 'Cloud', 'AI'], employees: '~30,000', location: 'Aliso Viejo, CA' },
  { name: 'Birlasoft', website: 'https://www.birlasoft.com/careers', description: 'IT services company providing ERP, cloud, and digital transformation services.', tags: ['IT Services', 'ERP', 'Cloud'], employees: '~12,500', location: 'Noida, India' },
  { name: 'Rackspace', website: 'https://www.rackspace.com/talent', description: 'Multicloud managed services provider offering expert cloud advisory and operations.', tags: ['Cloud', 'Managed Services'], employees: '~7,000', location: 'San Antonio, TX' },
  { name: 'Conduent', website: 'https://jobs.conduent.com/', description: 'Business process services company delivering technology-driven solutions to government and industry.', tags: ['BPO', 'IT Services', 'Gov-Tech'], employees: '~60,000', location: 'Florham Park, NJ' },
  { name: 'Stefanini', website: 'https://stefanini.com/en/careers/', description: 'Global IT services company specializing in digital workplace and managed services.', tags: ['IT Services', 'Digital', 'Managed'], employees: '~30,000', location: 'Southfield, MI' },
  { name: 'Sigmoid', website: 'https://www.sigmoid.com/careers/', description: 'Data engineering and analytics consulting firm specializing in big data solutions.', tags: ['Data Engineering', 'Analytics', 'AI'], employees: '~1,500', location: 'San Francisco, CA' },
  { name: 'Amdocs', website: 'https://www.amdocs.com/careers', description: 'Software and services provider for media and telecom companies around the world.', tags: ['IT Services', 'Telecom', 'Cloud'], employees: '~30,000', location: 'Chesterfield, MO' },
  { name: 'Unisys', website: 'https://www.unisys.com/careers/', description: 'IT company offering IT solutions and services for enterprises and governments globally.', tags: ['IT Services', 'Gov-Tech', 'Security'], employees: '~24,000', location: 'Blue Bell, PA' },
  { name: 'Kyndryl', website: 'https://www.kyndryl.com/careers', description: 'IT infrastructure services company spun off from IBM, serving enterprises globally.', tags: ['IT Services', 'Infrastructure', 'Cloud'], employees: '~90,000', location: 'New York, NY' },
];

// ─── Unicorns (40+) ──────────────────────────────────────────────────────────
const unicornCompanies: Company[] = [
  { name: 'Razorpay', website: 'https://razorpay.com/careers/', description: 'India\'s leading fintech company providing payment gateway and financial services.', tags: ['Fintech', 'Payments'], employees: '~3,000', location: 'Bengaluru, India' },
  { name: 'PhonePe', website: 'https://www.phonepe.com/careers/', description: 'Digital payments platform enabling UPI transactions and comprehensive financial services.', tags: ['Fintech', 'UPI', 'Payments'], employees: '~3,000', location: 'Bengaluru, India' },
  { name: 'Meesho', website: 'https://meesho.io/careers', description: 'Social commerce platform empowering small businesses and entrepreneurs across India.', tags: ['E-commerce', 'Social'], employees: '~3,000', location: 'Bengaluru, India' },
  { name: 'CRED', website: 'https://careers.cred.club/', description: 'Members-only credit card payments platform with exclusive rewards and financial products.', tags: ['Fintech', 'Credit', 'Rewards'], employees: '~1,500', location: 'Bengaluru, India' },
  { name: 'Zepto', website: 'https://www.zepto.team/careers', description: '10-minute grocery delivery startup revolutionizing quick commerce across Indian cities.', tags: ['Quick Commerce', 'Delivery'], employees: '~2,000', location: 'Mumbai, India' },
  { name: 'Groww', website: 'https://groww.in/p/careers', description: 'Investment platform making financial investments simple, transparent, and accessible for all.', tags: ['Fintech', 'Investment'], employees: '~2,000', location: 'Bengaluru, India' },
  { name: 'BharatPe', website: 'https://bharatpe.com/careers', description: 'Fintech company offering payment acceptance and small business lending across India.', tags: ['Fintech', 'Payments', 'Lending'], employees: '~1,500', location: 'New Delhi, India' },
  { name: 'ShareChat', website: 'https://sharechat.com/careers', description: 'Indian social media platform in 15 languages serving 400 million monthly users.', tags: ['Social Media', 'Content'], employees: '~1,500', location: 'Bengaluru, India' },
  { name: 'Nykaa', website: 'https://careers.nykaa.com/', description: 'Omnichannel beauty and fashion e-commerce marketplace with private label brands.', tags: ['E-commerce', 'Beauty', 'D2C'], employees: '~3,000', location: 'Mumbai, India' },
  { name: 'Delhivery', website: 'https://www.delhivery.com/careers/', description: 'Supply chain and logistics platform serving e-commerce and enterprise clients across India.', tags: ['Logistics', 'Supply Chain'], employees: '~25,000', location: 'Gurugram, India' },
  { name: 'Swiggy', website: 'https://careers.swiggy.com/', description: 'Food delivery and quick commerce platform serving 500+ cities across India.', tags: ['Food Delivery', 'Quick Commerce'], employees: '~5,000', location: 'Bengaluru, India' },
  { name: 'Lenskart', website: 'https://www.lenskart.com/careers/', description: 'Omnichannel eyewear brand with AI-powered virtual try-on and thousands of stores.', tags: ['D2C', 'E-commerce', 'AI'], employees: '~10,000', location: 'New Delhi, India' },
  { name: 'Moglix', website: 'https://www.moglix.com/careers', description: 'B2B commerce platform for industrial and manufacturing procurement across Asia.', tags: ['B2B', 'Manufacturing', 'Supply Chain'], employees: '~3,000', location: 'Noida, India' },
  { name: 'Darwinbox', website: 'https://darwinbox.com/careers', description: 'Cloud-based HR platform for large enterprises managing talent across Asia-Pacific.', tags: ['HRTech', 'SaaS', 'Cloud'], employees: '~1,000', location: 'Hyderabad, India' },
  { name: 'InMobi', website: 'https://www.inmobi.com/company/careers/', description: 'Global mobile advertising and app marketing platform reaching 2.5 billion devices.', tags: ['AdTech', 'Mobile', 'AI'], employees: '~3,000', location: 'Bengaluru, India' },
  { name: 'Unacademy', website: 'https://unacademy.com/careers', description: 'India\'s largest online learning platform for competitive exams and skill development.', tags: ['EdTech', 'E-learning'], employees: '~10,000', location: 'Bengaluru, India' },
  { name: 'UpGrad', website: 'https://www.upgrad.com/career/', description: 'Online higher education and upskilling platform serving learners in 100+ countries.', tags: ['EdTech', 'Higher Ed', 'Upskilling'], employees: '~4,000', location: 'Mumbai, India' },
  { name: 'Pine Labs', website: 'https://www.pinelabs.com/careers', description: 'Merchant platform offering payment acceptance, analytics, and buy-now-pay-later solutions.', tags: ['Fintech', 'Payments', 'BNPL'], employees: '~3,000', location: 'Noida, India' },
  { name: 'Vedantu', website: 'https://www.vedantu.com/careers', description: 'Live online tutoring platform for K-12 students with AI-powered personalized learning.', tags: ['EdTech', 'K-12', 'AI'], employees: '~4,000', location: 'Bengaluru, India' },
  { name: 'OfBusiness', website: 'https://www.ofbusiness.com/careers', description: 'B2B commerce and fintech platform for raw materials procurement and business lending.', tags: ['B2B', 'Fintech', 'Manufacturing'], employees: '~3,000', location: 'Gurugram, India' },
  { name: 'Acko', website: 'https://www.acko.com/careers/', description: 'Digital insurance company offering car, bike, and health insurance via a mobile app.', tags: ['Insurtech', 'Fintech'], employees: '~2,500', location: 'Bengaluru, India' },
  { name: 'Zetwerk', website: 'https://www.zetwerk.com/careers/', description: 'B2B manufacturing network connecting buyers with suppliers for custom parts globally.', tags: ['Manufacturing', 'B2B', 'Supply Chain'], employees: '~3,000', location: 'Bengaluru, India' },
  { name: 'Urban Company', website: 'https://www.urbancompany.com/careers', description: 'Home services marketplace connecting customers with verified professionals for repairs and beauty.', tags: ['Marketplace', 'Services', 'D2C'], employees: '~4,000', location: 'Gurugram, India' },
  { name: 'Rebel Foods', website: 'https://www.rebelfoods.com/careers', description: 'World\'s largest internet restaurant company operating cloud kitchen brands globally.', tags: ['FoodTech', 'Cloud Kitchen'], employees: '~4,000', location: 'Mumbai, India' },
  { name: 'Innovaccer', website: 'https://innovaccer.com/company/careers/', description: 'Healthcare AI platform unifying patient data and enabling value-based care delivery.', tags: ['HealthTech', 'AI', 'Data'], employees: '~1,500', location: 'San Francisco, CA' },
  { name: 'Slice', website: 'https://www.sliceit.com/careers', description: 'Fintech neobank redefining credit and payments for the next generation of consumers.', tags: ['Fintech', 'Neobank', 'Credit'], employees: '~1,000', location: 'Bengaluru, India' },
  { name: 'Cashfree Payments', website: 'https://www.cashfree.com/careers/', description: 'API-first payment gateway and banking infrastructure for Indian businesses.', tags: ['Fintech', 'Payments', 'API'], employees: '~800', location: 'Bengaluru, India' },
  { name: 'Yellow.ai', website: 'https://yellow.ai/careers/', description: 'Conversational AI platform for automating customer service across chat, email, and voice.', tags: ['AI', 'Conversational', 'CX'], employees: '~1,000', location: 'San Mateo, CA' },
  { name: 'Exotel', website: 'https://exotel.com/careers/', description: 'Cloud communications platform powering voice, SMS, and WhatsApp for enterprises.', tags: ['CPaaS', 'Cloud', 'Telecom'], employees: '~800', location: 'Bengaluru, India' },
  { name: 'Jupiter', website: 'https://jupiter.money/careers/', description: 'Modern neobank offering smart savings, insights, and rewards for millennials in India.', tags: ['Neobank', 'Fintech', 'Savings'], employees: '~500', location: 'Mumbai, India' },
  { name: 'Mensa Brands', website: 'https://mensabrands.com/careers', description: 'House of brands platform acquiring and scaling D2C brands across fashion, beauty, and home.', tags: ['D2C', 'E-commerce', 'Brands'], employees: '~1,000', location: 'Bengaluru, India' },
  { name: 'Hasura', website: 'https://hasura.io/careers/', description: 'Instant GraphQL and REST APIs over existing databases and microservices at scale.', tags: ['DevTools', 'API', 'Open Source'], employees: '~200', location: 'San Francisco, CA' },
  { name: 'Fyle', website: 'https://www.fylehq.com/careers', description: 'AI-powered expense management platform integrated with credit cards and accounting tools.', tags: ['Fintech', 'SaaS', 'Expense Mgmt'], employees: '~300', location: 'Bengaluru, India' },
  { name: 'Chargebee', website: 'https://www.chargebee.com/jobs/', description: 'Subscription billing and revenue management platform for SaaS and e-commerce companies.', tags: ['SaaS', 'Billing', 'Fintech'], employees: '~1,000', location: 'San Francisco, CA' },
  { name: 'Postman', website: 'https://www.postman.com/careers/', description: 'API platform with 30 million developers for building, testing, and documenting APIs.', tags: ['DevTools', 'API', 'SaaS'], employees: '~500', location: 'San Francisco, CA' },
  { name: 'Freshworks', website: 'https://careers.freshworks.com/', description: 'SaaS company building intuitive CRM and support software for businesses of all sizes.', tags: ['SaaS', 'CRM', 'ITSM'], employees: '~7,500', location: 'San Mateo, CA' },
  { name: 'Whatfix', website: 'https://whatfix.com/careers/', description: 'Digital adoption platform helping users learn and use enterprise software applications.', tags: ['SaaS', 'DAP'], employees: '~1,000', location: 'San Jose, CA' },
  { name: 'Browserstack', website: 'https://www.browserstack.com/careers', description: 'Cloud web and mobile testing platform used by 50,000+ organizations globally.', tags: ['DevTools', 'Testing', 'Cloud'], employees: '~1,500', location: 'Mumbai, India' },
  { name: 'Druva', website: 'https://www.druva.com/about/careers/', description: 'Cloud data protection platform for backup, disaster recovery, and governance.', tags: ['Cloud', 'Security', 'SaaS'], employees: '~1,500', location: 'Sunnyvale, CA' },
  { name: 'Icertis', website: 'https://www.icertis.com/company/careers/', description: 'AI-powered contract lifecycle management platform for enterprise digital transformation.', tags: ['AI', 'Legal', 'SaaS'], employees: '~2,000', location: 'Bellevue, WA' },
];

// ─── Startups (40+) ──────────────────────────────────────────────────────────
const startupCompanies: Company[] = [
  { name: 'Perplexity AI', website: 'https://www.perplexity.ai/hub/careers', description: 'AI-powered search engine delivering direct, cited answers to complex questions in real time.', tags: ['AI', 'Search', 'LLM'], employees: '~100', location: 'San Francisco, CA' },
  { name: 'Harvey AI', website: 'https://www.harvey.ai/careers', description: 'AI platform built for legal professionals to automate research, drafting, and analysis.', tags: ['AI', 'LegalTech'], employees: '~200', location: 'San Francisco, CA' },
  { name: 'Sarvam AI', website: 'https://www.sarvam.ai/careers', description: 'Building full-stack generative AI solutions for India, focused on Indian languages.', tags: ['AI', 'GenAI', 'India'], employees: '~100', location: 'Bengaluru, India' },
  { name: 'Krutrim', website: 'https://olakrutrim.com/careers', description: 'India\'s first AI unicorn, building foundational LLMs and AI infrastructure for India.', tags: ['AI', 'LLM', 'India'], employees: '~200', location: 'Bengaluru, India' },
  { name: 'Ola Electric', website: 'https://olaelectric.com/careers', description: 'Building the future of sustainable mobility with electric vehicles and charging infrastructure.', tags: ['EV', 'Clean Tech'], employees: '~4,000', location: 'Bengaluru, India' },
  { name: 'Glean', website: 'https://www.glean.com/careers', description: 'AI-powered work assistant that searches all enterprise apps to surface relevant knowledge instantly.', tags: ['AI', 'Enterprise Search', 'Productivity'], employees: '~500', location: 'Palo Alto, CA' },
  { name: 'Cohere', website: 'https://cohere.com/careers', description: 'Enterprise AI platform offering large language models and NLP tools for businesses.', tags: ['AI', 'LLM', 'NLP'], employees: '~500', location: 'Toronto, Canada' },
  { name: 'Mistral AI', website: 'https://mistral.ai/careers/', description: 'European AI startup building open and efficient large language models for enterprises.', tags: ['AI', 'LLM', 'Open Source'], employees: '~200', location: 'Paris, France' },
  { name: 'Poolside AI', website: 'https://poolside.ai/careers', description: 'Building AI models specifically trained for software engineering and code generation.', tags: ['AI', 'Code Gen', 'LLM'], employees: '~100', location: 'San Francisco, CA' },
  { name: 'Waymo', website: 'https://waymo.com/careers/', description: 'Autonomous driving technology company developing self-driving cars and robotaxis.', tags: ['Autonomous', 'AI', 'Robotics'], employees: '~3,500', location: 'Mountain View, CA' },
  { name: 'Pika Labs', website: 'https://pika.art/careers', description: 'AI video generation startup letting anyone create and edit stunning videos with natural language.', tags: ['AI', 'Video Gen', 'GenAI'], employees: '~50', location: 'Palo Alto, CA' },
  { name: 'Runway ML', website: 'https://runwayml.com/careers/', description: 'Creative AI tools for video editing, generation, and visual effects used by creators.', tags: ['AI', 'Video Gen', 'Creative'], employees: '~150', location: 'New York, NY' },
  { name: 'ElevenLabs', website: 'https://elevenlabs.io/careers', description: 'AI voice cloning and text-to-speech platform creating realistic voices in 29 languages.', tags: ['AI', 'Voice', 'GenAI'], employees: '~200', location: 'New York, NY' },
  { name: 'Stability AI', website: 'https://stability.ai/careers', description: 'Open-source AI company behind Stable Diffusion for image, audio, and video generation.', tags: ['AI', 'Open Source', 'GenAI'], employees: '~150', location: 'London, UK' },
  { name: 'Together AI', website: 'https://www.together.ai/careers', description: 'Cloud platform for running and fine-tuning open-source AI models at scale.', tags: ['AI', 'Cloud', 'MLOps'], employees: '~100', location: 'San Francisco, CA' },
  { name: 'Anyscale', website: 'https://www.anyscale.com/careers', description: 'Platform for developing and deploying distributed AI applications built on Ray framework.', tags: ['AI', 'MLOps', 'Distributed'], employees: '~200', location: 'San Francisco, CA' },
  { name: 'Modal Labs', website: 'https://modal.com/careers', description: 'Cloud compute platform for running AI models and data pipelines with serverless infrastructure.', tags: ['AI', 'Cloud', 'Serverless'], employees: '~50', location: 'New York, NY' },
  { name: 'Writer', website: 'https://writer.com/careers/', description: 'Full-stack generative AI platform for enterprises to deploy AI across their entire business.', tags: ['AI', 'Enterprise', 'LLM'], employees: '~200', location: 'San Francisco, CA' },
  { name: 'Otter.ai', website: 'https://otter.ai/company/careers', description: 'AI meeting assistant that records, transcribes, and summarizes conversations in real time.', tags: ['AI', 'Productivity', 'Voice'], employees: '~150', location: 'Mountain View, CA' },
  { name: 'Descript', website: 'https://www.descript.com/jobs', description: 'AI-powered video and podcast editing platform treating media like a text document.', tags: ['AI', 'Video', 'Creator Tools'], employees: '~150', location: 'San Francisco, CA' },
  { name: 'Jasper AI', website: 'https://www.jasper.ai/careers', description: 'AI content creation platform for marketing teams to produce on-brand content at scale.', tags: ['AI', 'Marketing', 'Content'], employees: '~200', location: 'Austin, TX' },
  { name: 'Character.AI', website: 'https://jobs.character.ai/', description: 'Platform for creating and interacting with AI characters for entertainment and learning.', tags: ['AI', 'Characters', 'Consumer'], employees: '~150', location: 'Menlo Park, CA' },
  { name: 'Adept AI', website: 'https://www.adept.ai/careers', description: 'Building AI agents that can take actions in software and complete real-world tasks autonomously.', tags: ['AI', 'Agents', 'Automation'], employees: '~100', location: 'San Francisco, CA' },
  { name: 'Sierra AI', website: 'https://sierra.ai/careers', description: 'Conversational AI platform helping companies deploy AI agents for customer experience.', tags: ['AI', 'CX', 'Agents'], employees: '~100', location: 'San Francisco, CA' },
  { name: 'Cresta', website: 'https://cresta.com/careers/', description: 'Real-time AI coaching and automation for contact center agents and enterprise sales teams.', tags: ['AI', 'Contact Center', 'SaaS'], employees: '~300', location: 'San Francisco, CA' },
  { name: 'Instabase', website: 'https://instabase.com/careers/', description: 'AI platform for automating complex document understanding and enterprise business workflows.', tags: ['AI', 'Automation', 'Document'], employees: '~300', location: 'San Francisco, CA' },
  { name: 'Samsara', website: 'https://www.samsara.com/company/careers', description: 'Connected operations platform for fleet tracking, safety cameras, and industrial IoT.', tags: ['IoT', 'Fleet', 'SaaS'], employees: '~3,000', location: 'San Francisco, CA' },
  { name: 'Observe.AI', website: 'https://www.observe.ai/company/careers', description: 'Conversation intelligence platform for contact centers powered by AI and automation.', tags: ['AI', 'Contact Center', 'Analytics'], employees: '~400', location: 'San Francisco, CA' },
  { name: 'Lovable', website: 'https://lovable.dev/careers', description: 'AI-powered product builder letting non-engineers build full-stack web apps by chatting.', tags: ['AI', 'No-Code', 'DevTools'], employees: '~30', location: 'Remote' },
  { name: 'Bolt.new', website: 'https://bolt.new', description: 'AI-powered browser-based development environment for instant full-stack app creation.', tags: ['AI', 'DevTools', 'No-Code'], employees: '~30', location: 'Remote' },
  { name: 'Ideogram', website: 'https://ideogram.ai/', description: 'AI image generation startup excelling at typography and realistic photo-like image creation.', tags: ['AI', 'Image Gen', 'Design'], employees: '~50', location: 'Toronto, Canada' },
  { name: 'Luma AI', website: 'https://lumalabs.ai/careers', description: 'AI company building photorealistic 3D and video generation with NeRF and video models.', tags: ['AI', '3D', 'Video Gen'], employees: '~50', location: 'San Francisco, CA' },
  { name: 'Cursor', website: 'https://www.cursor.com/careers', description: 'AI-powered code editor built for pair programming with large language models.', tags: ['AI', 'DevTools', 'Code'], employees: '~50', location: 'San Francisco, CA' },
  { name: 'Magic.dev', website: 'https://magic.dev/careers', description: 'Building next-generation AI software engineering tools with long-context models.', tags: ['AI', 'Code Gen', 'LLM'], employees: '~30', location: 'San Francisco, CA' },
  { name: 'Factory AI', website: 'https://factory.ai/careers', description: 'Autonomous AI software engineering agents that review, fix, and ship code automatically.', tags: ['AI', 'Agents', 'DevTools'], employees: '~30', location: 'San Francisco, CA' },
  { name: 'Codeium', website: 'https://codeium.com/careers', description: 'Free AI coding assistant and developer tools platform supporting 70+ programming languages.', tags: ['AI', 'DevTools', 'Code'], employees: '~100', location: 'Mountain View, CA' },
  { name: 'Tabnine', website: 'https://www.tabnine.com/careers', description: 'AI code completion assistant running locally or in the cloud for privacy-conscious teams.', tags: ['AI', 'DevTools', 'Privacy'], employees: '~100', location: 'Tel Aviv, Israel' },
  { name: 'Continue.dev', website: 'https://continue.dev/', description: 'Open-source AI coding assistant that can be embedded into any IDE or code editor.', tags: ['Open Source', 'AI', 'DevTools'], employees: '~10', location: 'San Francisco, CA' },
  { name: 'Reflect AI', website: 'https://reflect.app/', description: 'AI note-taking and knowledge management app with networked thoughts and backlinks.', tags: ['AI', 'Productivity', 'Notes'], employees: '~10', location: 'Remote' },
  { name: 'Mem.ai', website: 'https://get.mem.ai/', description: 'AI-powered workspace that automatically organizes notes, docs, and ideas for individuals.', tags: ['AI', 'Productivity', 'PKM'], employees: '~20', location: 'San Francisco, CA' },
];

// ─── Seed Stage (40+) ────────────────────────────────────────────────────────
const seedCompanies: Company[] = [
  { name: 'Supermemory', website: 'https://supermemory.ai', description: 'AI-powered second brain for saving, organizing, and instantly recalling everything you read.', tags: ['AI', 'Productivity', 'Seed'], employees: '~10', location: 'Remote' },
  { name: 'Formbricks', website: 'https://formbricks.com/careers', description: 'Open-source survey and experience management platform for modern product teams.', tags: ['Open Source', 'SaaS', 'Surveys'], employees: '~15', location: 'Remote' },
  { name: 'Treblle', website: 'https://treblle.com/careers', description: 'API intelligence and monitoring platform helping developers understand their APIs in production.', tags: ['DevTools', 'API', 'Observability'], employees: '~20', location: 'Remote' },
  { name: 'Docsumo', website: 'https://www.docsumo.com/careers', description: 'Document AI platform automating data extraction from unstructured business documents.', tags: ['AI', 'Document', 'Automation'], employees: '~50', location: 'Mumbai, India' },
  { name: 'Juni', website: 'https://juni.co/careers', description: 'Financial platform built for e-commerce businesses to manage money and cash flow.', tags: ['Fintech', 'E-commerce', 'Neobank'], employees: '~100', location: 'Stockholm, Sweden' },
  { name: 'Windmill.dev', website: 'https://windmill.dev', description: 'Open-source developer platform for building internal tools, workflows, and automated scripts.', tags: ['Open Source', 'DevTools', 'Automation'], employees: '~10', location: 'Remote' },
  { name: 'Trigger.dev', website: 'https://trigger.dev/careers', description: 'Open-source background jobs and workflow automation platform for developers.', tags: ['DevTools', 'Automation', 'Open Source'], employees: '~10', location: 'Remote' },
  { name: 'Scalar', website: 'https://scalar.com/careers', description: 'Beautiful open-source API documentation and testing tool loved by the developer community.', tags: ['DevTools', 'API', 'Open Source'], employees: '~15', location: 'Berlin, Germany' },
  { name: 'Cal.com', website: 'https://cal.com/careers', description: 'Open-source scheduling platform enabling individuals and teams to book meetings seamlessly.', tags: ['Open Source', 'SaaS', 'Scheduling'], employees: '~30', location: 'Remote' },
  { name: 'Novu', website: 'https://novu.co/careers', description: 'Open-source notification infrastructure for sending emails, SMS, push, and in-app alerts.', tags: ['Open Source', 'DevTools', 'Notifications'], employees: '~25', location: 'Tel Aviv, Israel' },
  { name: 'Infisical', website: 'https://infisical.com/careers', description: 'Open-source secrets management platform for syncing environment variables across teams.', tags: ['Open Source', 'Security', 'DevOps'], employees: '~10', location: 'San Francisco, CA' },
  { name: 'Hanko', website: 'https://www.hanko.io/careers', description: 'Open-source passwordless authentication solution with passkeys and biometric support.', tags: ['Open Source', 'Auth', 'Security'], employees: '~10', location: 'Berlin, Germany' },
  { name: 'Zep AI', website: 'https://www.getzep.com/', description: 'Long-term memory infrastructure for AI agents, storing and surfacing contextual data.', tags: ['AI', 'Agents', 'Memory'], employees: '~10', location: 'Remote' },
  { name: 'LangSmith', website: 'https://www.langchain.com/langsmith', description: 'Observability and evaluation platform for debugging and monitoring LLM applications.', tags: ['AI', 'LLM', 'Observability'], employees: '~50', location: 'San Francisco, CA' },
  { name: 'Helicone', website: 'https://www.helicone.ai/', description: 'Open-source LLM observability platform for logging, monitoring, and analyzing AI requests.', tags: ['AI', 'Observability', 'Open Source'], employees: '~10', location: 'San Francisco, CA' },
  { name: 'Braintrust', website: 'https://www.braintrust.dev/careers', description: 'AI evaluation and logging platform for teams building reliable LLM-powered applications.', tags: ['AI', 'Evals', 'LLM'], employees: '~20', location: 'San Francisco, CA' },
  { name: 'Portkey AI', website: 'https://portkey.ai/careers', description: 'AI gateway providing reliability, observability, and guardrails for LLM deployments.', tags: ['AI', 'LLM', 'Gateway'], employees: '~15', location: 'Remote' },
  { name: 'Mastra', website: 'https://mastra.ai', description: 'TypeScript-first AI agent framework for building, testing, and deploying agents quickly.', tags: ['AI', 'Agents', 'Open Source'], employees: '~10', location: 'Remote' },
  { name: 'Encore', website: 'https://encore.dev/careers', description: 'TypeScript and Go backend framework with built-in infrastructure and cloud provisioning.', tags: ['DevTools', 'Backend', 'Cloud'], employees: '~10', location: 'Stockholm, Sweden' },
  { name: 'Unkey', website: 'https://unkey.dev/', description: 'Open-source API key management platform for authentication and rate limiting at scale.', tags: ['Open Source', 'API', 'Auth'], employees: '~5', location: 'Remote' },
  { name: 'Mintlify', website: 'https://mintlify.com/careers', description: 'Beautiful developer documentation platform with AI-powered search and live code examples.', tags: ['DevTools', 'Docs', 'AI'], employees: '~15', location: 'San Francisco, CA' },
  { name: 'Tinybird', website: 'https://www.tinybird.co/careers', description: 'Data platform for building real-time analytics APIs directly from data pipelines.', tags: ['Data', 'Analytics', 'API'], employees: '~50', location: 'Madrid, Spain' },
  { name: 'Turso', website: 'https://turso.tech/careers', description: 'Distributed SQLite database at the edge, built for low-latency global applications.', tags: ['Database', 'Edge', 'SQLite'], employees: '~20', location: 'Remote' },
  { name: 'Xata', website: 'https://xata.io/careers', description: 'Serverless database platform with full-text search and AI vector search for developers.', tags: ['Database', 'AI', 'Serverless'], employees: '~30', location: 'Remote' },
  { name: 'Neon', website: 'https://neon.tech/careers', description: 'Serverless Postgres platform with branching, autoscaling, and instant provisioning.', tags: ['Database', 'Serverless', 'Postgres'], employees: '~80', location: 'Remote' },
  { name: 'Convex', website: 'https://www.convex.dev/careers', description: 'Reactive backend platform combining database, functions, and real-time sync for apps.', tags: ['Backend', 'Database', 'Real-time'], employees: '~30', location: 'San Francisco, CA' },
  { name: 'SigNoz', website: 'https://signoz.io/careers/', description: 'Open-source observability platform as an alternative to Datadog and New Relic.', tags: ['Open Source', 'Observability', 'DevOps'], employees: '~30', location: 'Remote' },
  { name: 'Highlight.io', website: 'https://www.highlight.io/careers', description: 'Open-source full-stack monitoring platform for session replay, logging, and tracing.', tags: ['Open Source', 'Monitoring', 'DevTools'], employees: '~15', location: 'Remote' },
  { name: 'Pylon', website: 'https://usepylon.com/careers', description: 'B2B customer support platform connecting CRMs, Slack, and ticketing for enterprise teams.', tags: ['B2B', 'CX', 'SaaS'], employees: '~20', location: 'San Francisco, CA' },
  { name: 'Plain', website: 'https://www.plain.com/careers', description: 'Modern customer support tool built for developers with API-first integrations and workflows.', tags: ['SaaS', 'CX', 'API'], employees: '~20', location: 'London, UK' },
  { name: 'Loops', website: 'https://loops.so/careers', description: 'Email platform for SaaS companies to send transactional and marketing emails beautifully.', tags: ['SaaS', 'Email', 'Marketing'], employees: '~10', location: 'Remote' },
  { name: 'Resend', website: 'https://resend.com/careers', description: 'Email API for developers to send transactional emails with modern DX and React support.', tags: ['DevTools', 'API', 'Email'], employees: '~15', location: 'Remote' },
  { name: 'Clerk', website: 'https://clerk.com/careers', description: 'Drop-in authentication and user management solution for modern web applications.', tags: ['DevTools', 'Auth', 'SaaS'], employees: '~50', location: 'San Francisco, CA' },
  { name: 'Stytch', website: 'https://stytch.com/careers', description: 'Developer-first authentication infrastructure with passkeys, magic links, and OAuth.', tags: ['DevTools', 'Auth', 'Security'], employees: '~50', location: 'San Francisco, CA' },
  { name: 'Lago', website: 'https://www.getlago.com/careers', description: 'Open-source metering and billing API for SaaS companies with usage-based pricing.', tags: ['Open Source', 'Billing', 'API'], employees: '~20', location: 'Paris, France' },
  { name: 'Abacus.ai', website: 'https://abacus.ai/careers', description: 'AI platform for building and deploying AI applications for enterprises without AI expertise.', tags: ['AI', 'Enterprise', 'MLOps'], employees: '~100', location: 'San Francisco, CA' },
  { name: 'Roboflow', website: 'https://roboflow.com/careers', description: 'Computer vision infrastructure for building, training, and deploying CV models at scale.', tags: ['AI', 'Computer Vision', 'MLOps'], employees: '~50', location: 'Des Moines, IA' },
  { name: 'Scale AI', website: 'https://scale.com/careers', description: 'Data labeling and AI infrastructure platform powering foundation model training globally.', tags: ['AI', 'Data Labeling', 'LLM'], employees: '~1,000', location: 'San Francisco, CA' },
  { name: 'Weights & Biases', website: 'https://wandb.ai/careers', description: 'MLOps platform for experiment tracking, model versioning, and collaboration in AI teams.', tags: ['MLOps', 'AI', 'DevTools'], employees: '~300', location: 'San Francisco, CA' },
  { name: 'Comet ML', website: 'https://www.comet.com/careers', description: 'ML experiment tracking and model production monitoring platform for AI teams.', tags: ['MLOps', 'AI', 'Monitoring'], employees: '~100', location: 'New York, NY' },
  { name: 'Prefect', website: 'https://www.prefect.io/careers', description: 'Modern workflow orchestration platform for data engineers building reliable data pipelines.', tags: ['Data', 'Orchestration', 'Open Source'], employees: '~100', location: 'Remote' },
];

const sections: Section[] = [
  { id: 'maang', title: 'MAANG / Big Tech', subtitle: 'The world\'s most prestigious tech companies', accent: '#2563EB', tagBg: '#EFF6FF', tagText: '#1D4ED8', iconBg: '#DBEAFE', iconText: '#1E40AF', borderHover: '#93C5FD', companies: maangCompanies },
  { id: 'product', title: 'Product Based', subtitle: 'Companies building world-class software products', accent: '#7C3AED', tagBg: '#F5F3FF', tagText: '#6D28D9', iconBg: '#EDE9FE', iconText: '#5B21B6', borderHover: '#C4B5FD', companies: productCompanies },
  { id: 'service', title: 'Service Based', subtitle: 'IT services and consulting firms hiring at scale', accent: '#059669', tagBg: '#ECFDF5', tagText: '#047857', iconBg: '#D1FAE5', iconText: '#065F46', borderHover: '#6EE7B7', companies: serviceCompanies },
  { id: 'unicorn', title: 'Unicorns', subtitle: 'Privately held startups valued at $1B+', accent: '#D97706', tagBg: '#FFFBEB', tagText: '#B45309', iconBg: '#FEF3C7', iconText: '#92400E', borderHover: '#FCD34D', companies: unicornCompanies },
  { id: 'startup', title: 'Startups', subtitle: 'High-growth companies redefining their industries', accent: '#DB2777', tagBg: '#FDF2F8', tagText: '#BE185D', iconBg: '#FCE7F3', iconText: '#9D174D', borderHover: '#F9A8D4', companies: startupCompanies },
  { id: 'seed', title: 'Seed Stage', subtitle: 'Early-stage companies shaping tomorrow\'s tech', accent: '#0891B2', tagBg: '#ECFEFF', tagText: '#0E7490', iconBg: '#CFFAFE', iconText: '#155E75', borderHover: '#67E8F9', companies: seedCompanies },
];

// ─── Card ─────────────────────────────────────────────────────────────────────
function CompanyCard({ company, section }: { company: Company; section: Section }) {
  return (
    <a
      href={company.website}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5"
      style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px rgba(0,0,0,0.07), 0 0 0 1.5px ${section.borderHover}`; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)'; }}
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg font-bold select-none flex-shrink-0" style={{ background: section.iconBg, color: section.iconText }}>
            {company.name.charAt(0)}
          </div>
          <ExternalLink className="w-3.5 h-3.5 mt-1 text-gray-300 group-hover:text-gray-500 transition-colors flex-shrink-0" />
        </div>
        <h4 className="text-sm font-semibold text-gray-900 mb-1 leading-snug">{company.name}</h4>
        <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-3">{company.description}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {company.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: section.tagBg, color: section.tagText }}>{tag}</span>
          ))}
        </div>
        <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-1 text-[10px] text-gray-400">
            <Users className="w-3 h-3" /><span>{company.employees}</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-gray-400">
            <MapPin className="w-3 h-3" /><span className="truncate max-w-[110px]">{company.location}</span>
          </div>
        </div>
      </div>
    </a>
  );
}

// ─── Section Block ────────────────────────────────────────────────────────────
function SectionBlock({ section }: { section: Section }) {
  const [expanded, setExpanded] = useState(false);
  const [visibleCount, setVisibleCount] = useState(9);
  const pageSize = 9;
  const displayed = section.companies.slice(0, expanded ? visibleCount : 9);
  const canLoadMore = expanded && visibleCount < section.companies.length;

  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-8 rounded-full flex-shrink-0" style={{ background: section.accent }} />
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <h3 className="text-base font-semibold text-gray-900">{section.title}</h3>
            <span className="text-xs font-medium px-1.5 py-0.5 rounded-md" style={{ background: section.tagBg, color: section.tagText }}>{section.companies.length}</span>
          </div>
          <p className="text-xs text-gray-400">{section.subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {displayed.map(company => (
          <CompanyCard key={company.name + section.id} company={company} section={section} />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        {!expanded && section.companies.length > 9 && (
          <button
            onClick={() => { setExpanded(true); setVisibleCount(18); }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium rounded-lg transition-colors border"
            style={{ color: section.accent, borderColor: section.borderHover, background: section.tagBg }}
          >
            View all {section.companies.length} companies <ChevronDown className="w-3.5 h-3.5" />
          </button>
        )}
        {canLoadMore && (
          <button
            onClick={() => setVisibleCount(c => Math.min(c + pageSize, section.companies.length))}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium rounded-lg transition-colors border"
            style={{ color: section.accent, borderColor: section.borderHover, background: section.tagBg }}
          >
            Load {Math.min(pageSize, section.companies.length - visibleCount)} more <ChevronDown className="w-3.5 h-3.5" />
          </button>
        )}
        {expanded && !canLoadMore && (
          <button
            onClick={() => { setExpanded(false); setVisibleCount(9); }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-500 bg-gray-50"
          >
            Collapse <ChevronUp className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function TechHiringCompanies() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const totalCount = sections.reduce((a, s) => a + s.companies.length, 0);

  const tabs = [
    { id: 'all', label: 'All', count: totalCount },
    ...sections.map(s => ({ id: s.id, label: s.title, count: s.companies.length })),
  ];

  const visibleSections = activeTab === 'all' ? sections : sections.filter(s => s.id === activeTab);

  return (
    <div className="w-full bg-white rounded-2xl overflow-hidden px-8 md:mt-10 mt-14" style={{ fontFamily: "'DM Sans', 'Outfit', system-ui, sans-serif" }}>
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-gray-100 mt-10">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight mb-0.5">Companies Hiring</h2>
        <p className="text-xs text-gray-400 mb-4">{totalCount}+ companies across MAANG, product, service, unicorn, startup &amp; seed</p>
        {/* Tabs */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {tabs.map(tab => {
            const section = sections.find(s => s.id === tab.id);
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-150 border"
                style={
                  isActive && section
                    ? { background: section.tagBg, color: section.accent, borderColor: section.borderHover }
                    : isActive
                    ? { background: '#F1F5F9', color: '#0F172A', borderColor: '#E2E8F0' }
                    : { background: 'white', color: '#6B7280', borderColor: '#E5E7EB' }
                }
              >
                {tab.label}
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold"
                  style={
                    isActive && section
                      ? { background: section.iconBg, color: section.iconText }
                      : { background: '#F3F4F6', color: '#9CA3AF' }
                  }
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {visibleSections.map(section => (
          <SectionBlock key={section.id} section={section} />
        ))}
      </div>
    </div>
  );
}