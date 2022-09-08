import React, { useState, useEffect, Profiler } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import Anime from "src/anime.min.js";
import $ from "jquery";
import Anime from "@mollycule/react-anime";
import emailjs from 'emailjs-com';
import Aos from 'aos';
import 'aos/dist/aos.css';

const fsab_descr = "Full Stack At Brown completes pro-bono projects for members of the Brown community to give them the ability to provide their users well designed and well built software. FSAB provides our community with workshops and other resources to get involved in the world of software engineering. Officially a frontend engineer, I focus on HTML, CSS, and JavaScript as well as UI design. Recently, I have worked on full stack projects using Flask in Python and SQL.";
const stems_descr = "STEMS is a math and science tutoring program at Hope High School in Providence. Tutors are paired in a teacher's class and help students twice a week. STEMS aims to offer extra help to teachers, provide academic support, and act as mentors for students, and to support a greater self-efficacy for students in STEM fields. As part of the Tutor Development Team, I am responsible for recruiting tutors, community building and meeting planning, running social media, and gathering feedback.";
const pride_descr = "San Diego Pride is a nonprofit that aims to foster pride, equality, and respect for the LGBT community. In addition to holding an annual Pride Parade and Festival, SD Pride is one of the only pride organizations that provides year-round education and advocacy programs. As the Programs Intern, I created, edited, and reviewed content and documents for live programming, organization coalitions, and volunteer resources. I helped manage speakers at livestream events as well as fundraise and moderate social media. With our streamed events, we were able to broaden our reach across the globe, including to those not out and those in countries where there is heavy stigma or homosexuality is criminalized.";
const pride_nums = "Raised $56,454 for a $50,000 goal. Pride week streaming live segments reached 333,414 people, and 265,624 watched Pride Live (the stream in place of the parade and festival). The earned media hit 10.6 million people from the week.";
const aclu_descr = "ACLU's Brown University Chapter seeks to raise awareness around civil liberties issues. Each semester, new working groups dedicated to various civil issues are created. I was a part of the Immigrants' Rights Working Group and we sought to clarify the financial aid and college application process for undocumented/DACA students. I designed a page long infographic representing the culmination of research and interviews of relevant university staff. I also created the new branding for all Brown ACLU social media and am currently designing their website layout."
const ljpc_descr = "La Jolla Pharmaceutical Company develops and commercializes innovative therapies that improve outcomes in patients suffering from life-threatening diseases. In December 2017, GIAPREZA™ (angiotensin II) was approved by the U.S. Food and Drug Administration (FDA) to treat adults with septic or other distributive shock. Using R Studio and Excel, I extractred, organized, merged, and analyzed pharmacokinetic/pharmacodynamic data from clinical trials for toxicology reports. I charted macrophage levels in the blood at different dosages and times to help determine efficacy of drugs in development. I then presented and explained the graphs in internal meetings";
const bwcs_descr = "Captain of Brown Women's Club Soccer. Coordinate with club and league managers; plan games, practices, and social events; manage budgeting and transportation. We play competitively against schools in the New England area. Raised $10,000 last year and helped kick start the inaugural Ivy League spring tournament for women's club soccer.";
const agss_descr = "All Girls STEM Society is a student run nonprofit that aims to empower young girls to pursue STEM through various free events (e.g. outreach, math tournaments) and workshops. In libraries across San Diego County, AGSS runs monthly workshops that involve speakers, original lectures, and hands-on activities. I created and taught circuitry and cellular biology workshops in addition to reviewing the development of other workshops and individually interacting and supporting participants.";
const agss_nums = "Roughly 1000 participants across all events annually, with the All Girls Math Tournament garnering 100+ and STEAM Maker Festivals at the County Fair garnering around 200. In 2017-2018, girls from over 20 new schools participated, with half the workshops ran being brand-new curriculum.";
const discovery_descr = "Software developer intern for Food Network Kitchen Services team at Discovery Inc. Completed tickets along with team in Agile framework. Spearheaded an Operational Excellence project to create a prototype automation workflow that created/updated Jira change management tickets tracking deploys. Helped migrate a legacy API to a new stack. Modified and created new endpoints that are now in production.";
const wbd_descr = "Software developer intern on the Discovery+ Roku team. Adapted components to have dynamic features rather than be defined through static styling and content rails to support mixed content types (e.g. show and page links). Implemented text to speech for my list and continue watching rails for screen readers. Built out a CI/CD testing framework that replicates a remote control by adding user journeys and adapting current journeys to updated feature UI. Automated cutting of release builds involving building, testing, uploading, versioning, and sending slack notifications of status upon completion using a github actions workflow."
const activity_names = ['Warner Bros Discovery', 'Discovery Inc', 'FSAB', 'BWCS', 'STEMS', 'SD PRIDE', 'ACLU', 'LJPC', 'AGSS'];
const activity_sub = [
  'Software Developer Intern','Software Developer Intern','Full Stack At Brown', "Brown Women's Club Soccer",
  'Swearer Tutoring Enrichment in Math and Science',
  'San Diego Pride', 'American Civil Liberties Union - Brown Chapter',
  'La Jolla Pharamceutical Company', 
  'All Girls STEM Society'
];
const activity_dates = [
  'June 2022- Aug 2022','June 2021- Aug 2021', 'Jan 2020 - Present', 'Sep 2019 - Present', 'Sep 2019 - Present',
  'May 2020 - Aug 2020', 'Sep 2019 - Present', 'June 2018 - Aug 2018', 
  'Mar 2016 - Aug 2019'
];
const activity_descr = [
  wbd_descr, discovery_descr, fsab_descr, bwcs_descr, stems_descr, 
  pride_descr,
  aclu_descr, ljpc_descr, 
  agss_descr
];
const activity_nums = ['', '', '', '', '', pride_nums, '', '', agss_nums];
const activity_links = ['', '', '', '', '', 'https://sdpride.org/' ,'https://www.facebook.com/brownaclu/posts/1418416088354923', 'https://www.allgirlsstemsociety.org/2018---2019-events.html', ''];
const activity_linksdescr = ['', '', '', '', '', 'San Diego Pride' ,'Brown ACLU Infographic', '', 'Workshops from 2019'];

const apma360 = "Described diverse problems as PDEs and developed solutions using analytical, numerical or qualitative methods. Topics include first order equations, the wave equation and diffusion processes, and steady state balances for systems in two or three dimensions."
const apma1860= 'Selected topics about the mathematics of graphs with an emphasis on random graph models, the dynamics of processes operating on these graphs (percolation, cascades, epidemics, queuing, synchronization), and their application to biological, social, and technological networks.'
// const cs17 = "Teaches functional programming paradigm. All of the following fundamental computer science techniques are integrated into the course material: algorithms, data structures, analysis, problem solving, abstract reasoning, and collaboration."
// const cs18 = "A continuation of Intro I. Learned to program in Java while continuing to develop algorithmic and analytic skills. Emphasis is placed on object-oriented design and data structures."
const apma1690 ="Examination of probability theory and mathematical statistics from the perspective of computing. Topics include random number generation, Monte Carlo methods, importance sampling, Bayesian networks, dimensionality reduction. Homework done in MATLAB."
const dl = "Deep learning course plus the specialized techniques that it has inspired (e.g. convolutional features and word embeddings). Coursework includes creating different neural networks (e.g. convolutional, recurrent, n-gram) for image and natural language processing using Numpy and Tensorflow, reinforcement learning, and GANs."
const cs33 = "The course covers the organization of computer systems, assembly-language programming, and C-language programming. Extensive programming exercises cover systems-level programming on Unix systems, as well as to multi-threaded programming with POSIX threads."
const apma1200 = "Basic probabilistic problems and methods in operations research and management science. Markov chains, birth-death processes, stochastic service and queueing systems, the theory of sequential decisions under uncertainty, and dynamic programming."
const apma1210 = "An introduction to the basic mathematical ideas and computational methods of optimizing allocation of effort or resources, with or without constraints. Linear programming, network models, dynamic programming, and integer programming."
const cs32 = "Techniques for designing and building scalable, extensible systems using Java and Javascript. Focus on software testing, relational databases, and concurrency techniques. A major component of the course was a group software project of your own design."
const cv = "This course treats vision as inference from noisy and uncertain data and emphasizes probabilistic and statistical approaches. Topics include object recognition, 3D reconstruction, feature recognition, and deep learning."
const cssc = "Half the course is iteratively designing, building, and testing technical projects in partnership with different local social change organizations. Half seminar on examining the positionality and ethics of engaging in social impact work and what it practically means to leverage technology to create social change on an everyday basis."
const course_names = [
  'CS For Social Change', 'Introduction To Software Engineering', 'Computational Probability and Statistics','Graphs and Networks', 
  'Deep Learning', 'Computer Vision', 'Introduction to Computer Systems', 'Operations Research: Deterministic Models', 'Operations Research: Probabilistic Models', 
  'Applied Partial Differential Equations I'
];
const course_grades = ["A","A","A", "A", "A", "A", "A", "A", "A", "A"];
const course_descr = [cssc, cs32, apma1690, apma1860, dl, cv, cs33, apma1210, apma1200, apma360];

const images = [];

const csa = "Static, responsive website created for Brown University's Chinese Students Association for desktop and mobile. Pages for displaying the e-board, events (past and upcoming), and directly emailing the org."
const boc = "Full stack development for Brown University's Outing Club. Users with a brown.edu email are able to register/log in and enter lotteries for upcoming trips they want to go on using Auth0. Each user is weighted based on a variety of variables (e.g. if they won a trip slot prior, if they are a first timer, etc). There is an administrative page that allows authorized users to run lotteries; reset weights; and view, create, edit, and delete rows in the database tables. The lottery results are displayed in admin as well, and emails are sent out once results are calculated."
const search = "Search engine comprised of an Indexer and Querier that processes thousands of XML files from Wikipedia. Calculates word document frequency, inverse document frequency, and page rank to process queries and quickly produce the top 10 most relevant results. The Indexer portion parses files, condenses files into essential terms, records links, and calculates relevant parameters. The Querier processes the query from the user and calculates the relvance score of each document and prints the 10 highest scoring documents if available. Users have the option to include page rank (i.e. the authority of pages, a technique pioneered by Google) in the score."
const recommender = "Builds a decision tree from a provided dataset of objects in order to predict the value of an attribute from a new object not within the dataset (e.g. if a new applicant will be rejected or accepted for a position. New Object = Applicant. Hirability = Attribute). The user can select any attribute to look up a recommendation for."
const connect4 = "Two player game of connect four played in terminal with customizable board dimensions. Option to choose the type of players playing: human player or AI player. The human player is a user interface that asks a real human which move to make. The AI player selects moves based on a game-tree search that looks at all possible game states n steps ahead, where n can be changed. It is assumed all players play with their best interest in mind."
const rackette = "Interpreter that takes in a program written in Racket as a string and processes it in ML to produce results. It handles definitions, conditionals, logic, let expressions, procedure-application expressions, anonymous functions, and nesting. The interpreter is split into components that parse, evaluate, and converts the result back into a string."
const hack = "3D version of the 2D website hosting the Hack at Home Hackathon run from Oct 9-12, 2020. I coded a large part of the user interaction. This includes highlighting clickable objects on hover, determining camera positioning for zooming, and making objects function as hyperlinks or urls for iframes. The website is meant as guide for participants to reference throughout the event and details the organization of the hackathon and its features. Designers created the 3D models used for the site."
const shell = "Implementation of shell in C that displays a prompt and waits until the user types in a line of input. It then parses the input and take the appropriate action. For example, some input is passed on to built-in shell commands, while other inputs specify file redirections and external programs to be executed by the shell."
const cnn = "Implementation of a convolutional neural network to classify cats and dogs from images in the CIFAR10 dataset with an accuracy of 0.74894744 using both the Tensorflow API and my own implementation of conv2d that manually calculates the padding and convolution calculations given inputs, strides, filters, and padding type."
const equilibria = "Full stack web application for users to fairly delegate tasks to other users using linear programming. Users can create events that have a list of tasks and invite other users to input their willingness on a scale of 0-10 to do each task. Once invited to an event, the event will show up on each user's page. Once all users submit their willingness, the creator can click a button to run task assignment and view the results."

const proj_names = ['Hack at Home 3D Website', 'Brown Outing Club Weighted Lottery System', 'Equilibria', 'Brown Chinese Students Association Website', 'Shell', 'Convolutional Neural Network', 'Search', 'Recommender', 'Connect Four', 'Rackette'];
const proj_org = ['Full Stack at Brown', 'Full Stack at Brown', 'Intro To Software Engineering, Final Project', 'Full Stack at Brown', 'Introduction to Computer Systems', 'Deep Learning', 'CS Intro II', 'CS Intro II', 'CS Intro I', 'CS Intro I'];
const proj_descr = [hack, boc, equilibria, csa, shell, cnn, search, recommender, connect4, rackette];
const proj_link = ['https://fullstackatbrown.github.io/hack-at-home/home.html', '','', 'https://github.com/fullstackatbrown/project-csa-website', '', '', '', '', '', ''];
const proj_link2 = ['https://blog.cs.brown.edu/2020/11/04/full-stack-browns-first-hackathon-datathon-and-ctf-hackhome/', '', '', '', '', '', '', '', '', ''];
const proj_link2_name = ['Brown CS Dept blog post with more info', '', '', '', '', '', '', '', '', ''];

const proj_team = ['Johnny Roy, Trevor Lowe, Yilan Sun','Anna Zhao, Lucas Gelfond, Ethan Asis', 'Johnny Ren, Anna Zhao, Aaron Wang', 'Trevor Ing, Casey Kim', 'n/a', 'n/a', 'Carolyn Zech', 'Sean Zhan', 'David Doan', 'Milan Samardziski'];
const proj_time = ['Summer 2020', '2020-2021', 'March 2020','October 2020', 'September 2020', 'Febuary 2020', 'December 2019', 'November 2019', 'October 2019'];
const proj_lang = ['HTML, CSS, JavaScript (ThreeJS)', 'Java, Javascript (ReactJS)', 'Python (Flask), SQL, HTML (Jinja2), CSS', 'HTML, CSS, JavaScript', 'C', 'Python', 'Scala', 'Java', 'ML', 'ML'];
Aos.init({duration: 1500});
class Activity extends React.Component{
  render() {
    const newCol = this.props.isActive ? 'white':'#353839';
    return (
      <div 
        className = {this.props.class} 
        key={this.props.index.toString()}
        style = {{color: newCol}}
        onClick={() => this.props.onClick()}

      >
        <h1>{this.props.name}</h1>
        <h4>{this.props.sub}</h4>
        <h4>{this.props.dates}</h4>
      </div>
    );
  }
}

function Description(props) {
  return(
    <div className="details">
      <p id="descr">{activity_descr[props.index]}</p>
      <p id="numbers">{activity_nums[props.index]}</p>
      <a href={activity_links[props.index]}>{activity_linksdescr[props.index]}</a>
    </div>
  );
}

function Course(props) {
  return(
    <div className="indiv_course">
      <h3 id = "class_name">{course_names[props.index]}</h3>
      <p id = "class_descr">{course_descr[props.index]}</p>
      <p>grade : {course_grades[props.index]}</p>
    </div>
  )
}

// function ScrollAnimation(props) {
//   useEffect(() => {
//     Aos.init({duration: 1500});

//     document.body.addEventListener(
//       "scroll",
//       () => {
//         console.log(document.getQuerySelector('scrollContainter'))
//         document.getQuerySelector('scrollContainter').style.setProperty(
//           "--scroll",
//           window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
//         );
//       },
//       []
//     );
//   }, [])

//   return(
//     <div className = "scroll_containter">
//       <div className="scrollAnim">
//       </div>
//     </div>
//   )
// }

function Img(props) {
  return(
    <div className="image">
      <img src={images[this.props.index]}></img>
    </div>
  )
}

class ExpPage extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      active_component: null,
      size: this.props.width
    }
  } 

  handleClick(i) {
    this.setState({ active_component:i})
  }

  renderActivity(i) {
    // console.log(activity_names[i])
    let col_num;
    if (this.state.size < 950) {
      col_num = "activity_col1";
    } else {
      col_num = i%2 == 0 ? "activity_col1":"activity_col2";
    }
    return <Activity 
      class = {col_num}
      name = {activity_names[i]}
      sub = {activity_sub[i]}
      dates = {activity_dates[i]}
      index = {i}
      isActive = {i == this.state.active_component}
      onClick = {() => this.handleClick(i)}
    />;
  }

  renderDescription(i) {
    return <Description index={i} />
  }

  createCol1() {
    let activities = [];
    let increment = 2;
    // if (this.state.size < 950) {
    //   increment = 1;
    // }
    for (var i = 0; i < activity_names.length; i+=increment){
      activities.push(this.renderActivity(i))
    }
    return activities;
  }

  createCol2() {
    let activities = [];
    // if (this.state.size < 950) {
    //   return;
    // }
    for (var i = 1; i < activity_names.length; i+=2){
      activities.push(this.renderActivity(i))
    }
    return activities;
  }

  renderCourse(i) {
    return <Course index={i} />
  }

  createCourseCatalog(){
    let courses = [];
    for (var i = 0; i < course_names.length; i++){
      courses.push(this.renderCourse(i))
      console.log(course_names[i])
    }
    return courses;
  }

  renderImg(i) {
    return <Img index={i} />
  }

  // renderScrollAnimation() {
  //   return <ScrollAnimation />
  // }

  render() {
    return (
      <div id="exp_pg">
        <div className="exp_banner">
          <div className="exp_title">
          <a id="exp"></a>
            <h1 data-aos='fade-up'>
              Experiences in: Full Stack Development, Community Engagment, Academics
            </h1>
          </div>
          <div className="exp_pic">
            {/* {this.renderImg(this.state.active_component)} */}
          </div>
        </div>
        <div className="activity_section">
          <div className="activity_text">
            <h3 id="activity_header">
              <span style={{color: '#FFE12B'}}>&#8212; </span>
              internships 
              <span style={{color: '#FFE12B'}}> &amp; </span> 
              <br></br> 
              activities
            </h3>
            <h5 id="activity_sub">scroll / click an activity more information</h5>
            {this.renderDescription(this.state.active_component)}
          </div>
          <div className="activity_names" ref={this.myRef} id="scrollContainer">
            <div className="name_col" id="col1">
              {this.createCol1()}
            </div>
            <div className="name_col" id="col2">
              {this.createCol2()}
            </div>
              {/* {this.renderScrollAnimation()} */}
          </div>
        </div>
        <div className="course_section">
          <div className="activity_text" id="courses">
            <h3 id="activity_header">
              <span style={{color: '#FFE12B'}}>&#8212; </span>
              relevant courses 
            </h3>
          </div>
          <div className="course_catalog">
            {this.createCourseCatalog()}
          </div>
          <div className="nav_arrows" data-aos='fade-down' id = "arrows1">
            <a href="#home"><i className="fa fa-chevron-up" aria-hidden="true"></i></a>
            <a href="#proj"><i className="fa fa-chevron-down" aria-hidden="true"></i></a>
          </div>
        </div>
      </div>
    );
  }
}

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
    }
  } 

  onClick() {
    this.setState({collapsed: !this.state.collapsed});
    console.log(this.state.collapsed)
  }

  render() {
    return(
      <div className="project">
        <div className="project_container">
          <button className="proj_quickfact" onClick={() => this.onClick()}>
            <div className= "proj_name">
              <h2>{proj_names[this.props.index]}</h2>
              <h2 className = "collapsible">+</h2>
            </div>
            <h3><span style={{color: '#FFE12B'}}>&#8212; </span> {proj_org[this.props.index]}</h3>
            <h5>
              Languages: {proj_lang[this.props.index]} &#8729; 
              Team: {proj_team[this.props.index]}
              <br></br>
              <br></br>
              Date: {proj_time[this.props.index]}
            </h5>
          </button>
          <div className = "proj_descr" style={ this.state.collapsed ? { display: 'none' } : { display: 'block' } }>
            <p>{proj_descr[this.props.index]}</p>
            <a href={proj_link[this.props.index]}>{proj_link[this.props.index]}</a>
            <br/>
            <a href={proj_link2[this.props.index]}>{proj_link2_name[this.props.index]}</a>
          </div>
        </div>
        <hr data-aos="color"></hr>
      </div>
    );
  }
}

class ProjPage extends React.Component {
  renderProject(i) {
    return <Project index={i} />
  }

  createProjList() {
    let projects = [];
    for (var i = 0; i<proj_names.length; i++){
      projects.push(this.renderProject(i))
    }
    return projects;
  }

  render () {
    return(
      <div className = "proj_pg">
        <div className = "proj_title">
        <a id="proj"></a>
          <h1 id="circle">
            Projects
          </h1>
        </div>
        <div className = 'projList_containter'>
          <div className = "projList">
            {this.createProjList()}
          </div>
          <div className="nav_arrows" id='arrows2' data-aos='fade-down'>
            <a href="#exp"><i className="fa fa-chevron-up" aria-hidden="true"></i></a>
            <a href="#res"><i className="fa fa-chevron-down" aria-hidden="true"></i></a>
          </div>
        </div>
      </div>
    );
  }
}

function Resume() {
  return(
    <div className = "rotate">
      <a href="https://docs.google.com/document/d/1KhPbLLiRR5HEbkvn7Tt-W_UsvwNp0U06kBfToMZj1I8/edit?usp=sharing" id='resume' target='_blank'>
      Resume
      </a>
    </div>
  );
}

class Email extends React.Component {
  sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('gmail', 'template_pqysy24', e.target, 'user_GI83ra8U8aqwo06w46tiZ')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  }

  render() {
    return (
      <div className = 'contact'>
        <h1>Get in Touch</h1>
        <form className="contact-form" onSubmit={this.sendEmail}>
            <input type="hidden" name="contact_number" />
            <div className = 'contact_info'>
              <div className = 'input'>
                <label>Name</label><br></br>
                <input type="text" name="user_name" placeholder="first last" />
              </div>
              <div className = 'input'>
                <label>Email</label><br></br>
                <input type="email" name="user_email" placeholder="email@mailbox.com"/> 
              </div>
            </div>
            <div>
              <label>Message</label><br></br>
              <textarea name="message" placeholder="your message here"/>
            </div>
          <input type="submit" value="Send" />
        </form>
      </div>
    );
  }
}

function MoreInfo(){
  return (
    <div className="moreinfo_pg">
      <a id="res"></a>
      <h1>More Info: <br></br>&nbsp;&nbsp;&nbsp; Resume, Contact</h1>
      <div className="info_content">
        <Email />
        <Resume />
      </div>
    </div>
  )
}

function About(){
  return (
    <div>
      <div id="landingpg">
      <a id="home"></a>
        <div className = "nav">
          <a href = "#exp">EXPERIENCE</a>
          <a href = "#proj">PROJECTS</a>
          <a href = "#res">CONTACT/RESUME</a>
              
          <a href="#res">
            <i className="fa fa-envelope" aria-hidden="true" ></i>
          </a>
          <a href="https://www.linkedin.com/in/claraguo" target="_blank">
            <i className="fa fa-linkedin" aria-hidden="true"></i>
          </a>
          <a href="https://www.facebook.com/profile.php?id=100013451281570" target="_blank">
            <i className="fa fa-facebook-square" aria-hidden="true"></i>
          </a>
          <a href="https://github.com/guoclara" target="_blank">
            <i className="fa fa-github" aria-hidden="true"></i>
          </a>
        </div>
        <div className = "initials">
          <img src={require('./initials.png')} alt="Logo"></img>
        </div>
        <div className="about_pg">
          <img src= {require('./profile.png')} alt="Profile Photo"></img>
          <p>
            Hi! My name is Clara Guo. I'm a senior studying Applied Math-Computer Science at Brown Univeristy and am graduating in May 2023. I'm looking for an opportunity to start my professional career as a software engineer.
            <br></br>
            <br></br>
            I am passionate about creating technology that touches a wide audience and makes their lives better in some way, whether that's through providing entertainment through streaming or through helping local communities with their tech needs.
            <br></br>
            <br></br> 
            Take a look at the rest of the website, and please contact me if you have any questions!
            My socials, email, resume and github can be found on the bar to the right of the home page</p>
          </div>
      </div>
    </div>
  );
}

class Website extends React.Component {
  render () {
    return(
      <div className = "website">
        <About />
        <ExpPage />
        <ProjPage />
        <MoreInfo />
       
      </div>
    );
  }
}

ReactDOM.render(
  <Website />,
  document.getElementById('root')
);
