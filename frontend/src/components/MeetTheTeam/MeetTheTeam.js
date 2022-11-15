import './MeetTheTeam.css';

function MeetTheTeam() {
    return (
        <div id="meet-the-team-page">
            <h1>Meet the Team</h1>
            <div id="members">
                <div id="lvp">
                    <div id="lvp-top">
                        <div className="links">
                            <a href="https://www.linkedin.com/in/laviniaparker/" target="_blank" className="center-nav-icon">
                                <img src="https://cdn-icons-png.flaticon.com/512/38/38669.png" alt="LinkedIn" style={{height: "30px"}}/>
                            </a>
                            <a href="https://github.com/lavparker" target="_blank" className="center-nav-icon">
                                <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" style={{height: "30px"}}/>
                            </a>
                            <a href="https://angel.co/u/la-vinia-parker" target="_blank" className="center-nav-icon">
                                <img src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/angellist-512.png" alt="AngelList" style={{height: "30px"}}/>
                            </a>
                        </div>
                    <img src={require('../../assets/lvp.jpg')} id="lvp-pic" alt="lvp-pic" />
                    </div>
                    <div className="bio">
                        <h2>La Vinia Parker</h2>
                        <h6>Backend Lead/Team Lead</h6>
                    </div>
                </div>
                <div id="ian">
                    <div id="ian-top">
                        <div className="links">
                            <a href="https://www.linkedin.com/in/ian-verger-02067951/" target="_blank" className="center-nav-icon">
                                <img src="https://cdn-icons-png.flaticon.com/512/38/38669.png" alt="LinkedIn" style={{height: "30px"}}/>
                            </a>
                            <a href="https://github.com/ianverger" target="_blank" className="center-nav-icon">
                                <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" style={{height: "30px"}}/>
                            </a>
                            <a href="https://angel.co/u/iverger" target="_blank" className="center-nav-icon">
                                <img src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/angellist-512.png" alt="AngelList" style={{height: "30px"}}/>
                            </a>
                        </div>
                        <img src={require('../../assets/ian.jpg')} id="ian-pic" alt="ian-pic" />
                    </div>
                    <div className="bio">
                        <h2>Ian Verger</h2>
                        <h6>Frontend Lead</h6>
                    </div>
                </div>
            <div id="heather">
                    <div id="heather-top">
                        <div className="links">
                            <a href="https://www.linkedin.com/in/heatherpark94/" target="_blank" className="center-nav-icon">
                                <img src="https://cdn-icons-png.flaticon.com/512/38/38669.png" alt="LinkedIn" style={{height: "30px"}}/>
                            </a>
                            <a href="https://github.com/heatherpark201" target="_blank" className="center-nav-icon">
                                <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" style={{height: "30px"}}/>
                            </a>
                            <a href="" target="_blank" className="center-nav-icon">
                                <img src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/angellist-512.png" alt="AngelList" style={{height: "30px"}}/>
                            </a>
                        </div>
                        <img src={require('../../assets/heather_park.jpg')} id="ian-pic" alt="ian-pic" />
                    </div>
                    <div className="bio">
                        <h2>Heather Park</h2>
                        <h6>Flex</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MeetTheTeam;