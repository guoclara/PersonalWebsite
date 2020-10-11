import React, { useState, useEffect } from 'react';
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
const bwcs_descr = "Brown Women's Club Soccer plays competitively against schools in the New England area.";
const agss_descr = "All Girls STEM Society is a student run nonprofit that aims to empower young girls to pursue STEM through various free events (e.g. outreach, math tournaments) and workshops. In libraries across San Diego County, AGSS runs monthly workshops that involve speakers, original lectures, and hands-on activities. I created and taught circuitry and cellular biology workshops in addition to reviewing the development of other workshops and individually interacting and supporting participants.";
const agss_nums = "Roughly 1000 participants across all events annually, with the All Girls Math Tournament garnering 100+ and STEAM Maker Festivals at the County Fair garnering around 200. In 2017-2018, girls from over 20 new schools participated, with half the workshops ran being brand-new curriculum.";
const activity_names = ['FSAB', 'STEMS', 'SD PRIDE', 'ACLU', 'LJPC', 'BWCS', 'AGSS'];
const activity_sub = [
  'Full Stack At Brown', 'Swearer Tutoring Enrichment in Math and Science',
  'San Diego Pride', 'American Civil Liberties Union - Brown Chapter',
  'La Jolla Pharamceutical Company', "Brown Women's Club Soccer",
  'All Girls STEM Society'
];
const activity_dates = [
  'Jan 2020 - Present', 'Sep 2019 - Present', 'May 2020 - Present',
  'Sep 2019 - Present', 'June 2018 - Aug 2018', 'Sep 2019 - Present',
  'Mar 2016 - Aug 2019'
];
const activity_descr = [
  fsab_descr, stems_descr, pride_descr,
  aclu_descr, ljpc_descr, bwcs_descr,
  agss_descr
];
const activity_nums = [ '', '', pride_nums, '', '', '', agss_nums];
const activity_links = ['', '', 'https://sdpride.org/' ,'https://www.facebook.com/brownaclu/posts/1418416088354923', '', 'https://www.allgirlsstemsociety.org/2018---2019-events.html', ''];
const activity_linksdescr = ['', '', 'San Diego Pride' ,'Brown ACLU Infographic', '', '', 'Workshops from 2019'];

const apma360 = "Described problems quantitatively as PDEs, discovered how seemingly unrelated contexts can result in similar equations; and developed methods for solution using analytical, numerical or qualitative methods. Contexts include first order equations; the second order wave equation and problems involving diffusion processes; steady state balances for systems in two or three dimensions; together with insights from theory."
const apma1655= 'An integrated first course in mathematical statistics. Covered probability and statistics, integrated with its probabilistic foundation. Specific topics include probability spaces, discrete and continuous random variables, methods for parameter estimation, confidence intervals, and hypothesis testing.'
const cs17 = "Teaches functional programming paradigm through the languages Racket and ML. All of the following fundamental computer science techniques are integrated into the course material: algorithms, data structures, analysis, problem solving, abstract reasoning, and collaboration. Concrete examples are drawn from different subareas of computer science: arbitrary-precision arithmetic, natural language processing, databases, and strategic games."
const cs18 = "A continuation of CSCI 0170. Learned to program in Java while continuing to develop algorithmic and analytic skills. Emphasis is placed on object-oriented design, imperative programming, and the implementation and use of data structures. Examples are drawn from such areas as databases, strategy games, web programming, graphical user interfaces, route finding, and data compression. Lab work done with the assistance of TAs."
const apma350 ="Comprehensive introduction to ordinary differential equations and their applications. Demonstrated how applied mathematicians use ordinary differential equations to solve practical applications, from understanding the underlying problem, creating a differential-equations model, solving the model using analytical, numerical, or qualitative methods, and interpreting the findings in terms of the original problem. We will also learn about the underlying rigorous theoretical foundations of differential equations."
const dl = "Deep leaning, plus the specialized techniques that it has inspired (e.g. convolutional features and word embeddings) have lead to rapid improvements in many applications such as computer vision, machine translation, and computer Go. This course intends to give students a practical understanding of deep learning as applied in these and other areas. It also teaches the Tensorflow programming language for the expression of deep leaning algorithms. (The primary API for Tensorflow is from Python.)"
const cs33 = "High-level computer architecture and systems programming. The course covers the organization of computer systems (in terms of storage units, caches, processors, and I/O controllers) and teaches students assembly-language programming and C-language programming. Extensive programming exercises introduce students to systems-level programming on Unix systems, as well as to multi-threaded programming with POSIX threads."
const apma1210 = "An introduction to the basic mathematical ideas and computational methods of optimizing allocation of effort or resources, with or without constraints. Linear programming, network models, dynamic programming, and integer programming."
const course_names = [
  'Applied Partial Differential Equations I', 'Statistical Inference I', 
  'Computer Science: An Integrated Introduction (CS0170)', 'Computer Science: An Integrated Introduction (CS0180)', 
  'Applied Ordinary Differential Equations','Deep Learning', 'Introduction to Computer Systems', 'Operations Research: Deterministic Models'
];
const course_grades = ["A", "A", "A", "A", "A", "current course", "current course", "current course"];
const course_descr = [apma360, apma1655, cs17, cs18, apma350, dl, cs33, apma1210];

const images = [];

const csa = "Static, responsive website created for Brown University's Chinese Students Association for desktop and mobile. Pages for displaying the e-board, events (past and upcoming), and directly emailing the org."
const boc = "Full stack development for Brown University's Outing Club. Users with a brown.edu email are able to register/log in and enter lotteries for upcoming trips they want to go on using Auth0. Each user is weighted based on a variety of variables (e.g. if they won a trip slot prior, if they are a first timer, etc). There is an administrative page that allows authorized users to run lotteries; reset weights; and view, create, edit, and delete rows in the database tables. The lottery results are displayed in admin as well, and emails are sent out once results are calculated."
const search = "Search engine comprised of an Indexer and Querier that processes thousands of XML files from Wikipedia. Calculates word document frequency, inverse document frequency, and page rank to process queries and quickly produce the top 10 most relevant results. The Indexer portion parses files, condenses files into essential terms, records links, and calculates relevant parameters. The Querier processes the query from the user and calculates the relvance score of each document and prints the 10 highest scoring documents if available. Users have the option to include page rank (i.e. the authority of pages, a technique pioneered by Google) in the score."
const recommender = "Builds a decision tree from a provided dataset of objects in order to predict the value of an attribute from a new object not within the dataset (e.g. if a new applicant will be rejected or accepted for a position. New Object = Applicant. Hirability = Attribute). The user can select any attribute to look up a recommendation for."
const connect4 = "Two player game of connect four played in terminal with customizable board dimensions. Option to choose the type of players playing: human player or AI player. The human player is a user interface that asks a real human which move to make. The AI player selects moves based on a game-tree search that looks at all possible game states n steps ahead, where n can be changed. It is assumed all players play with their best interest in mind."
const rackette = "Interpreter that takes in a program written in Racket as a string and processes it in ML to produce results. It handles definitions, conditionals, logic, let expressions, procedure-application expressions, anonymous functions, and nesting. The interpreter is split into components that parse, evaluate, and converts the result back into a string."
const hack = "3D version of the 2D website hosting the Hack at Home Hackathon run from Oct 9-12, 2020. I coded part of the user interaction. This includes highlighting clickable objects on hover, determining camera positioning for zooming, and making objects function as hyperlinks or urls for iframes. The website is meant as guide for participants to reference throughout the event and details the organization of the hackathon and its features."
const proj_names = ['Hack at Home 3D Website', 'Brown Chinese Students Association Website', 'Brown Outing Club Weighted Lottery System', 'Search', 'Recommender', 'Connect Four', 'Rackette'];
const proj_org = ['Full Stack at Brown', 'Full Stack at Brown', 'Full Stack at Brown', 'CSCI0180', 'CSCI0180', 'CSCI0170', 'CSCI0170'];
const proj_descr = [hack, csa, boc, search, recommender, connect4, rackette];
const proj_link = ['https://hackathome.org/home.html', 'https://github.com/FullStackAtBrownTeam/CSA-Website', boc, search, recommender, connect4, rackette];

const proj_team = ['Johnny Roy, Trevor Lowe, Yilan Sun', 'Trevor Ing, Casey Kim', 'Anna Zhao, Lucas Gelfond, Ethan Asis', 'Carolyn Zech', 'Sean Zhan', 'David Doan', 'Milan Samardziski'];
const proj_time = ['Summer 2020', 'Ongoing', 'March 2020', 'Febuary 2020', 'December 2019', 'November 2019'];
const proj_lang = ['HTML, CSS, JavaScript (ThreeJS)', 'HTML, CSS, JavaScript', 'Python (Flask), SQL, HTML (Jinja2), CSS', 'Scala', 'Java', 'ML', 'ML'];
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
    for (var i = 1; i < course_names.length; i++){
      courses.push(this.renderCourse(i))
    }
    console.log("ehllo")
    console.log(course_names.length)
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
            <a href="#home"><i class="fa fa-chevron-up" aria-hidden="true"></i></a>
            <a href="#proj"><i class="fa fa-chevron-down" aria-hidden="true"></i></a>
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
            <a href="#exp"><i class="fa fa-chevron-up" aria-hidden="true"></i></a>
            <a href="#res"><i class="fa fa-chevron-down" aria-hidden="true"></i></a>
          </div>
        </div>
      </div>
    );
  }
}

function Resume() {
  return(
    <div className = "rotate">
      <a href="https://docs.google.com/document/d/1sBqczH-XryGVgLevCrH_9nN1m0L26PAm2h6pR3OkKds/edit?usp=sharing" id='resume'>
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
              
          <a href="#res" target="_blank">
            <i class="fa fa-envelope" aria-hidden="true" ></i>
          </a>
          <a href="https://www.linkedin.com/in/claraguo" target="_blank">
            <i class="fa fa-linkedin" aria-hidden="true"></i>
          </a>
          <a href="https://www.facebook.com/profile.php?id=100013451281570" target="_blank">
            <i class="fa fa-facebook-square" aria-hidden="true"></i>
          </a>
          <a href="https://github.com/guoclara" target="_blank">
            <i class="fa fa-github" aria-hidden="true"></i>
          </a>
        </div>
        <div className = "initials">
          <img src={require('/Users/claraguo/Documents/GitHub/PersonalWebsite/portfolio/src/initials.png')} alt="Logo"></img>
        </div>
        <div className="about_pg">
          <img src= {require('/Users/claraguo/Documents/GitHub/PersonalWebsite/portfolio/src/profile.png')} alt="Profile Photo"></img>
          <p>
            Hi! My name is Clara Guo. I'm a sophomore studying Applied Math-Computer Science at Brown Univeristy.
            I'm extremely passionate about understanding how to take data and information in the world and
            making it easier for everyone to understand, especially when it comes to pushing for social change.
            <br></br>
            <br></br>
            Trying to figure out what I wanted to do with my life, I came across this article describing how math professors testified on the likelihood 
            that the majority party gerrymandered their voting districts and how they were able to provide evidence arguing that it 
            was nearly certain they had. I want to take advantage of the potential STEM has to transform society and communities.
            <br></br>
            <br></br>
            I'm driven by this desire and it translates to what I do and how I do it. I'm someone who thinks
            on their feet and isn't afraid of failing. I'm proactive, self-motivated, creative and collaborative. I'm able to 
            practice this in my academic career as well as my hobbies, some of which include playing soccer, cooking, and whittling. 
            I always want to learn more, whether that means teaching myself how to carve block prints or learning html to make this website.
            <br></br>
            <br></br>
            Take a look at the rest of the website, and please contact me if you have any questions!
            My socials, email, resume and github can be found on the bar on the right of the home page</p>
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
