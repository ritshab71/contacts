import React from "react";
import { useState, useEffect } from "react";
import ContactBasic from "./contact-basic.jsx";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ClearIcon from "@material-ui/icons/Clear";
import InputAdornment from "@material-ui/core/InputAdornment";
import ContactDetail from "./contact-detail.jsx";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook, faStar } from "@fortawesome/free-solid-svg-icons";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles({
    dashboard: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        margin: '60px',
        marginTop: '20px',
        borderRadius: '6px',
        height: 'calc(100vh - 120px)'
    },
    basicContactView: {
        padding: 20,
        paddingRight: 10,
        minWidth: '520px'
    },
    contactsResults: {
        height: 'calc(100vh - 241px)',
        overflowY: 'scroll'
    },
    detailContactView: {
        padding: 20,
        paddingLeft: 10,
        minWidth: '520px',
        minHeight: '500px'
    },
    searchBar: {
        width: '100%',
        backgroundColor: '#f5f5f5',
        borderRadius: 4
    },
    numContacts: {
        float: 'right',
        fontSize: 13,
        textAlign: 'right',
        padding: 3
    },
    filterContacts: {
        marginTop: 5,
        marginBottom: 5,
        fontSize: 10,
        display: 'grid',
        gridTemplateColumns: '50% 50%'

    },
    favouriteSelection: {
        width: 15,
        height: 15
    },
    header: {
        textAlign: 'center',
        justifyContent: 'center'
    }
});

function Dashboard() {
    const [contacts, setContacts] = useState([]);
    const [contactInDetail, setContactInDetail] = useState();
    const [isDetailView, setDetailView] = useState(false);
    const [isFilterFavourites, setFilterFavourites] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const classes = useStyles();

    const getAvatar = (index) => {
        const avatars = [
            "https://randomuser.me/api/portraits/men/1.jpg",
            "https://randomuser.me/api/portraits/women/2.jpg",
            "https://randomuser.me/api/portraits/men/3.jpg",
            "https://randomuser.me/api/portraits/women/4.jpg",
            "https://randomuser.me/api/portraits/men/5.jpg",
            "https://randomuser.me/api/portraits/women/6.jpg",
            "https://randomuser.me/api/portraits/men/7.jpg",
            "https://randomuser.me/api/portraits/women/8.jpg",
            "https://randomuser.me/api/portraits/men/9.jpg",
            "https://randomuser.me/api/portraits/women/10.jpg"
        ]
        return avatars[index];
    }

    const data = localStorage.getItem("contacts");
    useEffect(() => {
        if (data) {
            setContacts(JSON.parse(data));
        } else {
            fetch('https://jsonplaceholder.typicode.com/users', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(res => { return res.json(); })
            .then(contactsData => { 
                    contactsData.forEach((contact, index) => {
                        contact.avatar = getAvatar(index);
                    });
                    contactsData.sort((a, b) => {
                        return a.username.localeCompare(b.username);
                    })
                setContacts(contactsData);
                localStorage.setItem("contacts", JSON.stringify(contactsData));
            })
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("contacts", JSON.stringify(contacts));
    }, [contacts]);

    const updateContacts = (contact) => {
        const newContacts = [...JSON.parse(localStorage.getItem("contacts"))];
        var index = newContacts.findIndex((c) => c.id === contact.id );
        newContacts[index] = {...contact, isFavourite: !contact.isFavourite};
        setContacts(newContacts);
    }

    const filteredContacts = !searchQuery ? contacts : contacts.filter((contact) =>
        contact.phone.toLowerCase().includes(searchQuery.toLowerCase()) || 
        contact.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const resultantContacts = !isFilterFavourites ? filteredContacts : filteredContacts.filter(contact => contact.isFavourite )

    const filterContactsByFavourites = (isFavouritesSet) => {
        isFavouritesSet ? setFilterFavourites(true) : setFilterFavourites(false);
    }

    const handleSearchInput = (e) => {
        setSearchQuery(e.target.value);
    };
    
    const clearQuery = () => {
        setSearchQuery("");
    }

    return (
        <>
        <AppBar position="static">
        <Toolbar className={classes.header}>
            <Typography variant="h5" component="div">
            <Stack direction="row" spacing={2}>
                <FontAwesomeIcon size="lg" icon={faAddressBook}/>
                <strong>ContactIn</strong> 
            </Stack>
          </Typography>
        </Toolbar>
      </AppBar>
        <div className={classes.dashboard}>
            <div className={classes.basicContactView}>
                <TextField 
                    id="outlined-helperText" 
                    className={classes.searchBar}
                    value={searchQuery} 
                    onChange={handleSearchInput}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={clearQuery}><ClearIcon/></IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <div className={classes.filterContacts}>
                    <div>
                        <Stack direction="row" spacing={0.7}>
                            <Chip label="All" size="small" onClick={() => filterContactsByFavourites(false)} variant="filled" color={!isFilterFavourites ? "primary" : "default"}/>
                            <Chip icon={<FontAwesomeIcon style={{color: '#ffcd38'}} icon={faStar}/>} className={classes.filterIcons} label="Favourites" size="small" onClick={() => filterContactsByFavourites(true)} variant="filled" color={isFilterFavourites ? "primary" : "default"}/>
                        </Stack>
                    </div>
                    <div className={classes.numContacts}>{resultantContacts.length} {resultantContacts.length !== 1 ? "contacts" : "contact"}</div>
                </div>
                <div className={classes.contactsResults}>
                    {resultantContacts.map((user) => { 
                        return (<ContactBasic 
                                    contact={user} 
                                    updateContacts={updateContacts}
                                    setContactInDetail={setContactInDetail} 
                                    setDetailView={setDetailView}>
                                </ContactBasic>)})}
                </div>
            </div>
            <div className={classes.detailContactView}>
                {contactInDetail && isDetailView && 
                    <ContactDetail 
                        contact={contactInDetail} 
                        setDetailView={setDetailView}>
                    </ContactDetail>}
            </div>
        </div>
        </>
    );
}

export default Dashboard;