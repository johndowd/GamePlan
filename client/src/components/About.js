import React from 'react';

const About = (props) => {
  return (
    <div className='content-background white-background about'>
      <h1>About the dev</h1>
      <div className='row'>
        <img src="https://media.licdn.com/dms/image/D4E35AQH05EGZS78MoA/profile-framedphoto-shrink_400_400/0/1675701305819?e=1678395600&v=beta&t=sahAIKtuku7m4pZU9v1byQxC0THFYy_sxA8ErTFVYUA" />
        <div className='text'>
          <h2>Jack Dowd</h2>
          <p>
            Hi! I'm Jack (or John!), an aspiring web developer living in Boston, MA. After  a long list of high visibility roles throughout my retail leadership career, I've decided to pursue a career in software development. I have a passion for community service, and surprisingly, board games!
          </p>
        </div>
      </div>
      <h2>Links</h2>
      <div className=''>
        <a href='https://github.com/johndowd'> github </a>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a href='https://www.linkedin.com/in/john-m-dowd/'> Linkedin </a>
      </div>
    </div>
  )
}

export default About;