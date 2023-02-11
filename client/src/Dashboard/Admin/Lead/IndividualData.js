import React from 'react'

export const IndividualData = ({ individualExcelData, employeeName, checkData, setCheckData, handleChange, checkbox }) => {

    return (
        <>
            <th><input type="checkbox" checked={individualExcelData?.isChecked} onChange={(e) => handleChange(e, individualExcelData.FirstName)} /></th>
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
