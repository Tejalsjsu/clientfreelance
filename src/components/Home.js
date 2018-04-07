var img1 = require('../image/banner1.png');
var img2 = require('../image/banner2.png');
var React = require('react');
var Carousel = require('react-bootstrap').Carousel;
let imgStyle = {width: '100%', height: '700px'};
let footerText = {color: '#5DADE2'}


function Home(){
    return(
        <div className=".container-fluid">
        <div id="myCarousel" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner" role="listbox">
        <Carousel>
            <Carousel.Item>
                <img style={imgStyle} alt="freelance.com" src={img1} />
                <Carousel.Caption>
                    <h3>Freelancer</h3>
                    <p>Work at your convinience.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img style={imgStyle} alt="freelance.com" src={img2} />
                <Carousel.Caption>
                    <h3>Freelancer</h3>
                    <p>Work anywhere, anytime.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
        </div>
        </div>
            <div className="container">
            <div  className="col-sm-8">
                <h2> Need work done? </h2>
                   <p>It's easy. Simply post a job you need completed and receive competitive bids from freelancers within minutes.</p>
                    <p>Whatever your needs, there will be a freelancer to get it done: from web design, mobile app development, virtual assistants, product manufacturing, and graphic design (and a whole lot more).</p>
                   <p> With secure payments and thousands of reviewed professional to choose from, Freelancer.com is the simplest and safest way to get work done online.</p>
                <br/>
                <div align="left">
                        &#x2705; What’s great about it?  <br/>
                &#x2705; You only have to pay for work when it has been completed and you’re 100% satisfied. <br/>
                    &#x2705;You’ll receive free bids from our talented freelancers within seconds. <br/>
                    &#x2705; We’re always here to help. Our support consists of real people who are available 24/7. <br/>
                            &#x2705; You can live chat with your freelancers to get constant updates on the progress of your work. <br/>
                </div>

            </div>
            </div>
            <div ><br/>
                <footer className="footer">
                <p style={footerText}>Freelancer ® is a registered Trademark of Freelancer Technology Pty Limited (ACN 142 189 759)

                    Copyright © 2018 Freelancer Technology Pty Limited (ACN 142 189 759)</p>
                </footer>
            </div>
        </div>

        )
}

module.exports = Home;