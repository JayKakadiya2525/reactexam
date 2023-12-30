import React, { useEffect, useState } from 'react';
import '../Tab/css/Profile.scss';
import { useDarkMode } from '../DarkModeContext';
import Logo from '../../assets/Millie.png';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBTypography
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { getUserUuid } from '../../auth/auth';


function Profile() {
    const { isDarkMode } = useDarkMode();

    const backgroundColor = isDarkMode ? '#262e35' : '#ffffff';
    const textColor = isDarkMode ? '#EFECF1' : '#212529';
    const textColor2 = isDarkMode ? '#EFECF1' : '';
    const secondaryTextColor = isDarkMode ? '#80ACCD' : '#212529';
    const borderColor = isDarkMode ? '#EFECF1' : '#212529';


    const [userData, setUserData] = useState(null); // Added state to store user data

    const fetchUserData = () => {
        const uuid = getUserUuid();

        fetch(`http://localhost:8080/api/users/${uuid}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setUserData(data); 
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    };

    useEffect(() => {
        fetchUserData();
    }, []);


    return (
        <div className={`profile m-0 me-lg-1 ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <div style={{ backgroundColor }}>
                <MDBContainer>
                    <MDBRow className="justify-content-center align-items-center">
                        <MDBCol lg="12" xl="12" className='p-0'>
                            <div>
                                <MDBCard>
                                    <div className="text-white d-flex justify-content-start align-content-center flex-row p-3" style={{ backgroundColor: '#000', width: '100% !important' }}>
                                        <div className="ms-4 d-flex flex-column">
                                            <MDBCardImage
                                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                                                alt="Generic placeholder image"
                                                className="p-0 img-thumbnail"
                                                fluid
                                                style={{ width: '120px', zIndex: '1', color: textColor }}
                                            />

                                        </div>

                                        {userData && (
                                            <div className="ms-3">
                                                <MDBTypography tag="h5">{userData.firstName} {userData.lastName}</MDBTypography>
                                                <MDBCardText>{userData.location}</MDBCardText>
                                            </div>
                                        )}
                                    </div>

                                    {/* <MDBBtn outline color="dark" style={{ height: '36px', zIndex: '2', color: textColor2, borderColor: borderColor }}>
                                        Edit profile
                                    </MDBBtn> */}

                                    <MDBCardBody className="p-2 p-lg-3 text-black" style={{ backgroundColor }}>
                                        <div className="d-flex justify-content-center text-center py-1">
                                            <div>
                                                <MDBCardText className="mb-1 h5" style={{ color: textColor }}>
                                                    253
                                                </MDBCardText>
                                                <MDBCardText className="small mb-0" style={{ color: secondaryTextColor }}>
                                                    Photos
                                                </MDBCardText>
                                            </div>
                                            <div className="px-3">
                                                <MDBCardText className="mb-1 h5" style={{ color: textColor }}>
                                                    1026
                                                </MDBCardText>
                                                <MDBCardText className="small mb-0" style={{ color: secondaryTextColor }}>
                                                    Followers
                                                </MDBCardText>
                                            </div>
                                            <div>
                                                <MDBCardText className="mb-1 h5" style={{ color: textColor }}>
                                                    478
                                                </MDBCardText>
                                                <MDBCardText className="small mb-0" style={{ color: secondaryTextColor }}>
                                                    Following
                                                </MDBCardText>
                                            </div>
                                        </div>
                                    </MDBCardBody>

                                    <MDBCardBody className="py-3 d-flex justify-content-around align-items-center text-black" style={{ backgroundColor, color: textColor }}>
                                        <button className="btn btn-outline-dark" style={{ color: textColor2, borderColor: borderColor }}>
                                            Edit profile
                                        </button>
                                        <button className="btn btn-outline-dark" style={{ color: textColor2, borderColor: borderColor }}>
                                            Edit profile
                                        </button>
                                        <button className="btn btn-outline-dark" style={{ color: textColor2, borderColor: borderColor }}>
                                            Edit profile
                                        </button>
                                    </MDBCardBody>

                                    <MDBCardBody className="text-black p-3" style={{ backgroundColor }}>
                                        <div className="d-flex small justify-content-between align-items-center">
                                            <MDBCardText className="lead fw-normal mt-4" style={{ color: secondaryTextColor }}>
                                                Recent photos
                                            </MDBCardText>
                                            <MDBCardText>
                                                <Link to="" style={{ color: textColor }}>
                                                    Show all
                                                </Link>
                                            </MDBCardText>
                                        </div>

                                        <MDBCardBody className='overflow-y-scroll overflow-x-hidden' style={{ height: '50vh' }}>
                                            <MDBRow className="g-3">
                                                <MDBCol className="mb-2" md="6">
                                                    <MDBCardImage
                                                        src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(12).webp"
                                                        alt="post"
                                                        className="rounded-3 recentlypost"
                                                    />
                                                </MDBCol>
                                                <MDBCol className="mb-2" md="6">
                                                    <MDBCardImage
                                                        src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(12).webp"
                                                        alt="post"
                                                        className="rounded-3 recentlypost"
                                                    />
                                                </MDBCol>
                                            </MDBRow>
                                        </MDBCardBody>
                                    </MDBCardBody>
                                </MDBCard>
                            </div>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        </div >
    );
}

export default Profile;