import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from '@mui/material/IconButton';
import ClearIcon from "@material-ui/icons/Clear";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneFlip, faMessage, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Avatar from '@mui/material/Avatar';
import { useState } from "react";
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

const useStyles = makeStyles({
    contactPanel: {
        borderRadius: 5,
        backgroundColor: "#f5f5f5",
        padding: 10,
        height: 'calc(100vh - 170px)',
        overflowY: 'scroll'
    },
    profile: {
        padding: 5,
        marginBottom: 40
    },
    hideButton: {
        justifyContent: 'top'
    },
    avatarModal: {
        height: 400,
        width: 400,
        borderRadius: '50%',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    iconFormat: {
        color: '#f5f5f5',
        borderRadius: 5,
        width: 15,
        height: 15,
        padding: 5,
        marginRight: 10,
    },
    fullname: {
        fontSize: 14,
        color: '#9fa8da'
    },
    username: {
        fontSize: 24
    },
    avatarSection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 30
    },
    nameInfo: {
        textAlign: 'center'
    },
    detailsSection: {
        marginTop: 12,
        marginBottom: 6,
        fontSize: 14,
        display: 'grid',
        gridTemplateColumns: '80% 20%'
    },
    callButtons: {
        justifyContent: 'right'
    },
    infoText: {
        marginLeft: 20,
        padding: 5,
        fontSize: 14
    },
    clearButton: {
        position: 'absolute',
        float: 'right'
    },
});

function ContactDetail({contact, setDetailView}) {
    const [isAvatarModalOpen, setAvatarModalOpen] = useState(false);
    const classes = useStyles();

    return (
        <div key="{contact.id}" className={classes.contactPanel}>
            <IconButton className={classes.clearButton} onClick={() => setDetailView(false)}><ClearIcon/></IconButton>
            <div className={classes.profile}>
                <div className={classes.avatarSection}>
                    <Avatar src={contact.avatar} onClick={() => setAvatarModalOpen(true)} sx={{ width: 90, height: 90 }}>{contact.username[0].toUpperCase()}</Avatar>
                    <Modal
                        open={isAvatarModalOpen}
                        onClose={() => setAvatarModalOpen(false)}
                    >
                        <div className={classes.avatarModal}>
                            <Avatar src={contact.avatar} sx={{ width: 400, height: 400 }} ></Avatar>
                        </div>
                    </Modal>
                </div>
                <div className={classes.nameInfo}>
                    <strong className={classes.username}>{contact.username}</strong>
                    <div className={classes.fullname}>{contact.name}</div>
                </div>
            </div>
            <Divider variant="middle"><Chip label="Phone" sx={{fontSize: 11}}/></Divider>
            <div className={classes.detailsSection}>
                <div className={classes.infoText}>{contact.phone} </div>
                <div className={classes.callButtons}>
                    <FontAwesomeIcon icon={faPhoneFlip} className={classes.iconFormat} style={{backgroundColor: '#00e676'}}/>
                    <FontAwesomeIcon icon={faMessage} className={classes.iconFormat} style={{backgroundColor: '#4aedc4'}}/>
                </div>
            </div>
            <Divider variant="middle"><Chip label="Email" sx={{fontSize: 11}}/></Divider>
            <div className={classes.detailsSection}>
                <span className={classes.infoText}>{contact.email}</span>
            </div>
            <Divider variant="middle"><Chip label="Company" sx={{fontSize: 11}}/></Divider>
            <div className={classes.detailsSection}>
                <div className={classes.infoText}>
                    <strong>{contact.company.name}</strong>
                    <div style={{fontSize: 13}}>{contact.company.name} aims to {contact.company.bs}.</div>
                </div>
            </div>
            <Divider variant="middle"><Chip label="Website" sx={{fontSize: 11}}/></Divider>
            <div className={classes.detailsSection}>
                <a href="https://www.resonate.cx/about-us/" className={classes.infoText}>{contact.website}</a>
            </div>
            <Divider variant="middle"><Chip label="Address" sx={{fontSize: 11}}/></Divider>
            <div className={classes.detailsSection}>
                <div className={classes.infoText}>
                    <span>{contact.address.street} Street, {contact.address.suite}, {contact.address.city}, {contact.address.zipcode}</span>
                </div>
                <a href={"https://maps.google.com/?q=" + contact.address.geo.lat + "," + contact.address.geo.lng}>
                    <FontAwesomeIcon icon={faLocationDot} className={classes.iconFormat} style={{backgroundColor: '#ff4569'}}/>

                </a>
            </div>
        </div>
    );
}

export default ContactDetail;