import React from 'react'
import SideBarAdmin from '../../../components/layouts/SideBarAdmin' 
import NavBarAdmin from '../../../components/layouts/NavBarAdmin'
import UpdateCar from '../../../components/admin/car/UpdateCar'
import { useDispatch } from 'react-redux'
import { adminUpdateCar } from '../../../features/carSlice'
import { useParams } from 'react-router-dom'

export default function AdminUpdateCarPage() {
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
        console.log(updateData)
        updateCar(updateData)
    };

    return (
        <>
                <NavBarAdmin />
            <SideBarAdmin>
                    <UpdateCar onSubmit={onSubmitUpdateCar} />
            </SideBarAdmin>
            
        </>
    )
}
