import React, { useRef } from 'react'

export const IndividualData = ({ individualExcelData, employeeName, checkData, setCheckData }) => {

    const checkbox = useRef();
    const handleChange = (data) => {
        // setPersonalData(data);
        if (checkbox.current.checked) {
            const pData = [...checkData, data]
            setCheckData(pData);
        } else {
            const pData = checkData.filter(person => person.LastName !== data.LastName);
            setCheckData(pData);
        }

    }

    console.log(checkData)
    return (
        <><th><input type="checkbox" value={individualExcelData} onChange={() => handleChange(individualExcelData)} ref={checkbox} /></th>
            <th>{individualExcelData.Id}</th>
            <th>{individualExcelData.FirstName}</th>
            <th>{individualExcelData.LastName}</th>
            <th>{individualExcelData.Gender}</th>
            <th>{individualExcelData.Country}</th>
            <th>{individualExcelData.Age}</th>
            <th>{individualExcelData.Date}</th>
        </>
    )
}
