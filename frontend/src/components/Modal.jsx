import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import styles from '../styles/modal.css';

const Modal = ({ what, type, registered, setRegistered, user, open, setOpen,setUsers,users,contests,setContests}) => {
  const handleOpen = (event) => {
    event.stopPropagation();
    setOpen(true);
  };

  const handleClose = (event) => {
    if (event) {
      event.stopPropagation();
    }
    setOpen(false);
  };

  const register = async (event) => {
    event.stopPropagation(); 
    try {
      if (!registered) {
        console.log("Registering user",user);
        const resp = await axios.post(`/backend/contest/register/`, { contestName: what, user:user });
       
        setRegistered(true);
        alert('Registration successful!');
      } else {
        console.log("Cancelling registration");
        const resp = await axios.delete(`/backend/contest/delete/${what}/${user}`);
        setRegistered(false);
        alert('Cancellation successful!');
      }
    } catch (err) {
      alert('Registration unsuccessful!');
      console.log(err);
    } finally {
      handleClose(event);
    }
  };

  const handleDelete = async (e,user) => {

    e.stopPropagation();

    try {
        await axios.delete(`backend/user/${user}`)
        setUsers(users.filter(userr => userr.username !== user))
        alert('Uspjesno obrisan user');
    }
    catch (err) {
      alert("Nije uspjesno obrisan user");
        console.log(err)
    }
    finally {
      handleClose(e);
    }
}

const handleDeleteContest = async (e,contest) => {

  e.stopPropagation();

  try {
      await axios.delete(`backend/contest/delete/${what}`)
      const filter = contests.filter(contest => contest.name !== what);
      setContests(filter)
      alert('Uspjesno obrisan contest');
  }
  catch (err) {
    alert("Nije uspjesno obrisan contest");
      console.log(err)
  }
  finally {
    handleClose(e);
  }
}


  return (
    <>
       
        <div className='overlay' onClick={(e) => handleClose(e)}>

          <div className='modal' onClick={(e) => e.stopPropagation()}> 
            {type === 'registration' && (
              <p style = {{
                textAlign:'center'
              }}>{registered ? `Are you sure you want to cancel registration for ${what}?` : `Are you sure you want to register for ${what}?`}</p>
            )}
            {type === 'registration' && (
              <div className='buttonsDiv'>
                <button style={{ marginRight: '20px' }} onClick={register}>
                  Yes
                </button>
                <button onClick={(e) => handleClose(e)}>No</button>
              </div>
            )}

            {type === 'confirmDelete' && <p style = {{
              textAlign:'center'
            }}>Are you sure you want to delete user {user}?</p>}
            {type === 'confirmDelete' && <div className='buttonsDiv'>
                <button style={{ marginRight: '20px' }} onClick={(e) => {handleDelete(e,user)}}>
                  Yes
                </button>
                <button onClick={(e) => handleClose(e)}>No</button>
              </div>}

              {type === 'DeleteContest' && <p style = {{
              textAlign:'center'
            }}>Are you sure you want to delete contest {what}?</p>}
            {type === 'DeleteContest' && <div className='buttonsDiv'>
                <button style={{ marginRight: '20px' }} onClick={(e) => {handleDeleteContest(e,what)}}>
                  Yes
                </button>
                <button onClick={(e) => handleClose(e)}>No</button>
              </div>}
            
          </div>
        </div>
      
    </>
  );
};

export default Modal;
