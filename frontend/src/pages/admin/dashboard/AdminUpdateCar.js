import React from 'react'
import SideBarAdmin from '../../../components/layouts/SideBarAdmin' 
import NavBarAdmin from '../../../components/layouts/NavBarAdmin'
import UpdateCar from '../../../components/admin/car/UpdateCar'
import { useDispatch } from 'react-redux'
import { adminUpdateCar } from '../../../features/carSlice'
import { useParams } from 'react-router-dom'

export default function AdminUpdateCar() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const updateCar = (payload) => {
        dispatch(adminUpdateCar({id: id, params: payload}));
    };

    const onSubmitUpdateCar = (payload) => {
        const updateData = {}
        if (payload) {
            for (const key in payload) {
                const value = payload[key];
                if (key !== '' && value !== null && value !== "" && value !== undefined) {
                    updateData[key] = value;
                }
            }
        }
        updateCar(updateData)
    };

    return (
        <>
            <SideBarAdmin>
                <NavBarAdmin>
                    <UpdateCar onSubmit={onSubmitUpdateCar} />
                </NavBarAdmin>
            </SideBarAdmin>
        </>
    )
}
