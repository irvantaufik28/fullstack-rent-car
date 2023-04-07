import React from 'react'
import { useSelector } from 'react-redux'
import { selectGetUser } from '../../../store/selector/selector'
import './userprofile.css'
import { Link } from 'react-router-dom'
export default function UserProfile() {



    const userData = useSelector(selectGetUser);
    const mainAddress = userData?.user_detail?.customer_address?.find(addr => addr.is_main_address);
    const addressType = mainAddress?.address_type?.name;
    const detailAddres = mainAddress?.detail_address;
    const cityName = mainAddress?.cities?.name;
    // const isMainAddress = mainAddress?.is_main_address;
    const provinceName = mainAddress?.cities?.provinces?.name;




    return (
        <>
            <div className="container rounded bg-white mt-5 mb-5">
                <div className="row">
                    <div className="col-md-3 border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-gNclassNamees-profile.jpg" alt='noimage' /><span className="font-weight-bold"></span><span className="text-black-50">
                            <strong>
                            <p>
                                {userData?.user_detail?.first_name ?? 'Unknown'} {userData?.user_detail?.last_name ?? 'Unknown'}
                            </p>
                            </strong>
                            </span><span> </span></div>
                    </div>
                    <div className="col-md-5 border-right">
                        <div className="p-3 py-5">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-right">User Profile Profile</h4>
                            </div>
                            <div className="row mt-2">

                                <div className="col-md-6"><label className="labels">Name</label><p>{userData?.user_detail?.first_name ?? 'Unknown'}</p></div>
                                <div className="col-md-6"><label className="labels">Surname</label><p>{userData?.user_detail?.last_name ?? 'Unknown'}</p></div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12"><label className="labels">Mobile Number</label><p>{userData?.user_detail?.phone_number ?? 'Unknown'}</p></div>

                                <div className="col-md-12"><label className="labels">Address</label>
                                    <p>{detailAddres}</p>
                                </div>
                                {/* <div className="col-md-12"><label className="labels">Postcode</label></div> */}
                                {/* <div className="col-md-12"><label className="labels">State</label></div> */}
                                <div className="col-md-12"><label className="labels">Address Type</label>
                                    <p>{addressType}</p>
                                </div>
                                <div className="col-md-12"><label className="labels">City</label>
                                    <p>{cityName}</p>
                                </div>
                                <div className="col-md-12"><label className="labels">Province</label>
                                    <p>{provinceName}</p>
                                </div>
                            </div>
                            <div className="row mt-3">
                                {/* <div className="col-md-6"><label className="labels">Country</label></div> */}
                                {/* <div className="col-md-6"><label className="labels">State/Region</label></div> */}
                            </div>
                            <div className="mt-5 text-center">
                                <Link to={'/user/profile/setting'}>
                                    <button className="btn btn-primary profile-button" type="button">edit profile</button>
                                </Link>

                            </div>
                        </div>
                    </div>

                </div>
            </div>



        </>


    )
}
