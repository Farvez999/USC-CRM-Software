import React from 'react'

export const IndividualData = ({ individualExcelData, employeeName, checkData, setCheckData, handleChange, checkbox }) => {

    return (
        <>
            <th><input type="checkbox" checked={individualExcelData?.isChecked} onChange={(e) => handleChange(e, individualExcelData.Name)} /></th>
            <th>{individualExcelData.Id}</th>
            <th>{individualExcelData.Name}</th>
            <th>{individualExcelData.Phone}</th>
            <th>{individualExcelData.Email}</th>
            <th>{individualExcelData.FirstFollowup}</th>
            <th>{individualExcelData.SecondFollowup}</th>
            <th>{individualExcelData.ThirdFollowup}</th>
            <th>{individualExcelData.NextFollowupDate}</th>
            <th>{individualExcelData.Remark}</th>
            <th>{individualExcelData.RemarkTwo}</th>
            <th>{individualExcelData.AdmissionStates}</th>
        </>
    )
}
