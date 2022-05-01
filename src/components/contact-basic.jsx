import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from '@mui/material/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneFlip, faEnvelope, faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons"

const useStyles = makeStyles({
    contact: {
        display: 'grid',
        gridTemplateColumns: '93% 7%',
        borderRadius: 5,
        backgroundColor: "#f5f5f5",
        marginTop: 10,
        padding: 5,
    },
    contactPanel: {
        display: 'grid',
        gridTemplateColumns: '17% 33% 50%',
        cursor: 'pointer',
        "&:hover": {
            background: "#efefef",
        },
    },
    avatar: {
        padding: 5
    },
    fullname: {
        fontSize: 13,
        color: '#9fa8da'
    },
    username: {
        fontSize: 16
    },
    contactNameSection: {
        fontSize: 15,
        textAlign: 'left',
        marginTop: 15
    },
    contactInfoSection: {
        fontSize: 14,
        marginTop: 10,
        display: 'grid',
        gridTemplateRows: '50% 50%'
    },
    iconFormat: {
        color: '#f5f5f5',
        borderRadius: 5,
        width: 10,
        height: 10,
        padding: 5,
        marginRight: 12,
    }, 
    infoFormat: {
        position: 'relative',
        top: -3,
    },
    favouriteSelection: {
        color: '#ffcd38',
        borderRadius: 5,
        width: 20,
        height: 20,
        padding: 5,
        marginTop: 20,
        cursor: 'pointer',
    }
});

function ContactBasic({contact, updateContacts, setContactInDetail, setDetailView}) {
    const classes = useStyles();

    const displayDetailContact = (contact) => {
        setContactInDetail(contact);
        setDetailView(true);
    }

    const setFavourite = (contact) => {
        updateContacts(contact);
    }

    return (
        <div key="{contact.id}" className={classes.contact} style={{color: 'primary'}}>
            <div className={classes.contactPanel} onClick={() => displayDetailContact(contact)}>
                <div className={classes.avatar}>
                    <Avatar src={contact.avatar} sx={{ width: 60, height: 60 }}>{contact.username[0].toUpperCase()}</Avatar>
                </div>
                <div className={classes.contactNameSection}>
                    <strong className={classes.username}>{contact.username}</strong>
                    <div className={classes.fullname}>{contact.name}</div>
                </div>
                <div className={classes.contactInfoSection}>
                    <div>
                        <FontAwesomeIcon icon={faPhoneFlip} className={classes.iconFormat} style={{backgroundColor: '#00e676'}}/>
                        <span className={classes.infoFormat}>{contact.phone}</span>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faEnvelope} className={classes.iconFormat} style={{backgroundColor: '#00b0ff'}}/>
                        <span className={classes.infoFormat}>{contact.email}</span>
                    </div>
                </div>
            </div>
            <div>
                {contact.isFavourite && <FontAwesomeIcon icon={faStar} className={classes.favouriteSelection} onClick={() => {setFavourite(contact)}}/>}
                {!contact.isFavourite && <FontAwesomeIcon icon={farStar} className={classes.favouriteSelection} onClick={() => {setFavourite(contact)}}/>}
            </div>
        </div>
    );
}

export default ContactBasic;