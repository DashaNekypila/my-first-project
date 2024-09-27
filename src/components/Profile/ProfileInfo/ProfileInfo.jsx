import React, { useState } from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from './../../../assets/images/user.png.jpg'
import ProfileDataForm from './ProfileDataForm';

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {
  let [editMode, setEditMode] = useState(false);
  if (!profile) {
    return <Preloader />
  }
  const onMainPhotoSelected = (e) => {
    if (e.target.files[0]) {
      savePhoto(e.target.files[0]);
    }
  }
  const onSubmit = (formData) => {
    saveProfile(formData).then (
      () => {
        setEditMode(false);
      }
    )
  }
  return (
    <div>
      <div>
        {/*<img src='https://media.istockphoto.com/id/1069539210/photo/fantastic-autumn-sunset-of-hintersee-lake.jpg?s=612x612&w=0&k=20&c=oqKJzUgnjNQi-nSJpAxouNli_Xl6nY7KwLBjArXr_GE=' />*/}
      </div>
      <div className={s.descriptionBlock}>
        <img src={profile.photos.large || userPhoto}  className={s.mainPhoto}/>
        {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
        {editMode ? <ProfileDataForm initialValue={profile} profile={profile} onSubmit={onSubmit} /> :
        <ProfileData goToEditMode={() => {setEditMode(true)}} profile={profile} isOwner={isOwner}/>}
        <ProfileStatusWithHooks status={status} 
        updateStatus={updateStatus} />
      </div>
    </div>
  );
}
const ProfileData = ({profile, isOwner, goToEditMode}) => {
  <div>
  {isOwner && <div><button onClick={goToEditMode}>save</button></div>}
          <div>
            <b>Full name </b>: {profile.fullName}
          </div>
          <div>
            <b>Looking for a job </b>: {profile.lookingForAJob ? 'yes' : 'no'}
          </div>
          {profile.lookingForAJob &&
          <div>
            <b>My professional skills </b>: {profile.lookingForAJobDescription}
          </div>}
          <div>
            <b>About me </b>: {profile.aboutMe}
          </div>
          <div>
            <b>Contacts </b>: {Object.keys(profile.contacts).map(key => {
              return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
            })}
          </div>
        </div>
}
const Contact = ({contactTitle, contactValue}) => {
  return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}
export default ProfileInfo;
