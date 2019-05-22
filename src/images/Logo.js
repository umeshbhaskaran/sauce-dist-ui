import React from 'react'
import sauce from '../images/sauce.png'

const styles = {
	sauceLogo: {
		maxHeight: 80,
		marginTop: 20,
	},
	caption: {
		 color: 'white', 
		 fontFamily: 'Lato',
		 fontSize: '13px',
		 fontWeight: 'bold',
		 margin: 'auto',
	}
}

const SauceLogo = () => {
	return(
		<figure className="figure">
            <img className="figure-img img-fluid" alt='sauce_logo' src={sauce} style={styles.sauceLogo}/>
            <figcaption className="figure-caption" style={styles.caption}>SAUCE</figcaption>
        </figure>
		)
}

export default SauceLogo;