const helper = require('./helper.js');
const React = require('react');
const {useState, useEffect } = React;
const { createRoot } = require('react-dom/client');
let starImage = '/assets/img/trans.png'; // Default image path
let pfPicture = '/assets/img/starryBlue.png';


const handleStar = (e, onStarAdded) => {//create stars!!
    e.preventDefault();
    helper.hideError();

    let rarity;
    let rates = Math.random() * 100;

    if (rates < 1) {
        rarity = 5; // 1% chance
        starImage = '/assets/img/gold5.png';
    } else if (rates < 9) {
        rarity = 4; // 8% chance (cumulative up to 9%)
        starImage = '/assets/img/purple4.png'; // Update image for rarity 4
    } else {
        rarity = 3; // Default case (91% chance)
        starImage = '/assets/img/blue3.png'; // Update image for rarity 3
    }
    
    console.log(`Rarity: ${rarity}`);

    helper.sendPost(e.target.action, {rarity}, onStarAdded);
    
    return false;
}

const StarForm = (props) => {//basically just a button to ask for a star

    return(
        <form id="starForm"
            onSubmit={(e) => handleStar(e, props.triggerReload)}
            name="starForm"
            action="/maker"
            method="POST"
            className="starForm"
        >
            <input className="makeStarSubmit" type="submit" value="Make Star" />
            
        </form>
        
    );
};

const StarList = (props) => {//history list of all stars
    const [stars, setStars] = useState(props.stars);

    useEffect(() => {
        const loadStarsFromServer = async () => {
            const response = await fetch('/getStars');
            const data = await response.json();
            setStars(data.stars);
        };
        loadStarsFromServer();
    }, [props.reloadStars]);

    if(stars.length === 0) {
        return (
            <div className="starList">
                <h3 className="emptyStar">No Stars Yet!</h3>
            </div>
        );
    }

    const starNodes = stars.toReversed().map(star => {//inverted order so newest at the top
        return (
            <div key={star.id} className="star">
                <img src="/assets/img/face.jpg" alt="star face" className="starFace" />
                <h3 className="starRarity">Rarity: {star.rarity}</h3>
                <h4 className="starRarity">Star Date: {star.createdDate}</h4>
            </div>
        );
    });

    return (
        <div className="starList">
            {starNodes}
        </div>
    );
};

const StarInventory = (props) => {//count of each star rarity in posession

    const [stars, setStars] = useState(props.stars);

    useEffect(() => {
        const loadStarsFromServer = async () => {
            const response = await fetch('/getStars');
            const data = await response.json();
            setStars(data.stars);
        };
        loadStarsFromServer();
    }, [props.reloadStars]);

    // if(stars.length === 0) {
    //     return (
    //         <div className="starList">
    //             <h3 className="emptyStar">No Stars Yet!</h3>
    //         </div>
    //     );
    // }

    let star5 = 0;
    let star4 = 0;
    let star3 = 0;

    if(stars.length > 0){
        for(star of stars){
            if(star.rarity == 5){
                star5++;
            }
            else if(star.rarity == 4){
                star4++;
            }
            else if(star.rarity == 3){
                star3++;
            }
        }
    }
    

    return (
        <div>
            <div>
                <img src="/assets/img/gold5.png" alt="star face" className="starFace" />
                <h3 className="starRarity">Rarity: 5</h3>
                <h4>Count: {star5}</h4>
            </div>

            <div>
                <img src="/assets/img/purple4.png" alt="star face" className="starFace" />
                <h3 className="starRarity">Rarity: 4</h3>
                <h4>Count: {star4}</h4>
            </div>

            <div>
                <img src="/assets/img/blue3.png" alt="star face" className="starFace" />
                <h3 className="starRarity">Rarity: 3</h3>
                <h4>Count: {star3}</h4>
            </div>
        </div>
    );
};

const StarProfile = (props) => {//its supposed to change the logo color....its not working. i get as far as some console outputs saying its changed but not the actual image

    const [pfPicture, setPfPicture] = useState('/assets/img/starryBlue.png'); // Default profile picture

    const handlePfpClick = (newPfp) => {
        setPfPicture(newPfp);
        console.log(`Profile picture changed to: ${newPfp}`);
    }

    return (
        <div class="pfp">
            <h3>Profile Picture Selection</h3>
            <button type="submit" onClick={() => handlePfpClick('/assets/img/starryBlue.png')}>
                <img src='/assets/img/starryBlue.png' width="80" alt="buttonpng" border="0" />
            </button>
            <button type="submit" onClick={() => handlePfpClick('/assets/img/starryRed.png')}>
                <img src='/assets/img/starryRed.png' width="80" alt="buttonpng" border="0" />
            </button>
            <button type="submit" onClick={() => handlePfpClick('/assets/img/starryMagenta.png')}>
                <img src='/assets/img/starryMagenta.png' width="80" alt="buttonpng" border="0" />
            </button>
            <button type="submit" onClick={() => handlePfpClick('/assets/img/starryGreen.png')}>
                <img src='/assets/img/starryGreen.png' width="80" alt="buttonpng" border="0" />
            </button>
            {/* {['starryBlue', 'starryRed', 'starryMagenta', 'starryGreen'].map((color) => (
                <button key={color} type="button" onClick={() => handlePfpClick(`/assets/img/${color}.png`)}>
                    <img src={`/assets/img/${color}.png`} width="80" alt={`${color} profile`} />
                </button>
            ))} */}
        </div>
    );
};

const handlePasswordChange = async (e) => {//very similar to login signup combined
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#username').value;
    const oldPass = e.target.querySelector('#oldPass').value;
    const newPass = e.target.querySelector('#newPass').value;
    const newPass2 = e.target.querySelector('#newPass2').value;


    if (!username || !oldPass || !newPass || !newPass2) {
        helper.handleError('All fields are required!');
        return false;
    }

    if(newPass !== newPass2) {
        helper.handleError('Passwords do not match!');
        return false;
    }

    // helper.sendPost(e.target.action, {newPass});
    helper.sendPost('/changePassword', { username, oldPass, newPass, newPass2 }, (data) => {
        if (data.error) {
            helper.handleError(data.error);
        } else {
            helper.handleSuccess('Password updated successfully!');
        }
    });

    console.log("password change button pressed");

    return false;
}

const StarcallWindow = () => {//loads rates, button form, and loads star based on results
    const [reloadStars, setReloadStars] = useState(false);

    return (
        <div id="stars">
            <div id="makeStar">
                <StarForm triggerReload={() => setReloadStars(!reloadStars)} />

                <img src={starImage} alt="Generated Star" width="200" className="starImage center" />

                <img src='/assets/img/blue3.png' alt="Generated Star" width="30" className="starImage" />
                <h3 className="starRarity">Rarity: 3.......91%</h3>
                <img src='/assets/img/purple4.png' alt="Generated Star" width="30" className="starImage" />
                <h3 className="starRarity">Rarity: 4........8%</h3>
                <img src='/assets/img/gold5.png' alt="Generated Star" width="30" className="starImage" />
                <h3 className="starRarity">Rarity: 5........1%</h3>
            </div>
        </div>

    );
};

const HistoryWindow = () => {//loads history...thats about it
    const [reloadStars, setReloadStars] = useState(false);

    return (
        <div>
            <div id="stars">
                <StarList stars={[]} reloadStars={reloadStars} />
            </div>
        </div>
    );
};

const InventoryWindow = () => {//loads the inventory layout
    return (
        <div>
            <div id="stars">
                <StarInventory stars={[]}/>
            </div>
        </div>
    );
};

const ProfileWindow = () => {//loads pretty icons that arent working :(
    return (
        <div>
            <div id="stars">
                <StarProfile/>
            </div>
        </div>
    );
};

const PasswordChangeWindow = (props) => {//loads a new version of signup customized to password change. at least it looks nice...
    return (
        <form id="passwordChangeForm"
            name="passwordChangeForm"
            onSubmit={handlePasswordChange}
            action="/changePassword"
            method="POST"
            className="pswdChangeForm"
        >
            <label htmlFor="username">Username: </label>
            <input id="username" type="text" name="username" placeholder="username" />
            <label htmlFor="A">Old Password: </label>
            <input id="oldPass" type="password" name="oldPass" placeholder="old password" />
            <label htmlFor="pass">New Password: </label>
            <input id="newPass" type="password" name="newPass" placeholder="new password" />
            <label htmlFor="pass">New Password: </label>
            <input id="newPass2" type="password" name="newPass2" placeholder="retype new password" />
            <input className="formSubmit" type="submit" value="Change" />
            
        </form>
    );
};

const init = () => {
    const makerButton = document.getElementById('makerButton');//for event listeners
    const historyButton = document.getElementById('historyButton');
    const inventoryButton = document.getElementById('inventoryButton');
    const profileButton = document.getElementById('profileButton');
    const changePasswordButton = document.getElementById('changePasswordButton');

    const root = createRoot(document.getElementById('app'));


    makerButton.addEventListener('click', (e) => {//the event listeners in question
        e.preventDefault();
        root.render( <StarcallWindow />);
        return false;
    });

    historyButton.addEventListener('click', (e) => {
        e.preventDefault();
        root.render( <HistoryWindow /> );
        return false;
    });

    inventoryButton.addEventListener('click', (e) => {
        e.preventDefault();
        root.render( <InventoryWindow /> );
        return false;
    });

    profileButton.addEventListener('click', (e) => {
        e.preventDefault();
        root.render( <ProfileWindow /> );
        return false;
    });
    
    changePasswordButton.addEventListener('click', (e) => {//lots of pages
        e.preventDefault();
        root.render( <PasswordChangeWindow /> );
        return false;
    });


    root.render( <InventoryWindow />);//default goes to inventory
};

window.onload = init;
